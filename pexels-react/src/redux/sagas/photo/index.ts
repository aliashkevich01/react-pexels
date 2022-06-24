import { FETCH_OPTIONS } from '../../../constants/FetchOptions';
import { apply, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import {
  LOAD_BACKGROUND_SUCCESS,
  LOAD_PHOTOS,
  LOAD_PHOTOS_FAILED,
  LOAD_PHOTOS_SUCCESS,
} from '../../actions/actions';
import { ResponseInterface } from '../../../interfaces/responseInterface';
import { PayloadInterface } from '../../../interfaces/ActionInterface';
import { StateInterface } from '../../../interfaces/StateInterface';
import { stateInterface } from '../../reducers/photo';
import { createRequestString, getRandomInt } from '../../../utils';
import { PhotoInterface } from '../../../interfaces/PhotoInterface';
import { PHOTOS_IDS } from '../../../constants';

export function* loadPhotos(action: { payload: PayloadInterface; type: string }) {
  const { query, page, orientation, size, color, locale } = action.payload;
  try {
    const resp: Response = yield call(
      fetch,
      createRequestString(query, page, orientation, size, color),
      FETCH_OPTIONS
    );
    const curData: ResponseInterface = yield apply(resp, resp.json, []);
    const data: PayloadInterface = {
      query: query,
      page: page,
      data: curData,
      orientation: orientation,
      size: size,
      color: color,
      locale: locale,
    };
    yield put({
      type: LOAD_PHOTOS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    if (e instanceof Error) {
      yield put({
        type: LOAD_PHOTOS_FAILED,
        payload: e.message,
      });
    }
  }
}
export function* loadBackground() {
  if (window.location.pathname === '/') {
    const id = getRandomInt(PHOTOS_IDS.length);
    const requestString = `https://api.pexels.com/v1/photos/${PHOTOS_IDS[id]}`;
    const resp: Response = yield call(fetch, requestString, FETCH_OPTIONS);
    const backPhoto: PhotoInterface = yield apply(resp, resp.json, []);
    yield put({
      type: LOAD_BACKGROUND_SUCCESS,
      payload: backPhoto,
    });
  }
}
export function* loadOnEntry() {
  const state: stateInterface = yield select((state: StateInterface) => state.photo);
  const { page, query, orientation, size, color } = state;
  yield put({
    type: LOAD_PHOTOS,
    payload: {
      page,
      query,
      orientation,
      size,
      color,
    },
  });
}
export default function* photoSaga() {
  yield fork(loadBackground);
  yield fork(loadOnEntry);
  yield takeLatest(LOAD_PHOTOS, loadPhotos);
}
