import { FETCH_OPTIONS } from '../../../constants/FetchOptions';
import { apply, call, put, select, fork, takeLeading } from 'redux-saga/effects';
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
import { LOCATION_CHANGE } from 'connected-react-router';

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
      query,
      page,
      data: curData,
      orientation,
      size,
      color,
      locale,
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
  if (window.location.pathname === '/' || window.location.pathname === '') {
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
  if (window.location.pathname === '/') {
    const { query, page, orientation, size, color } = state;
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
  } else {
    let searchQuery = '';
    if (window.location.pathname === '/categories') {
      const sp = new URLSearchParams(window.location.search);
      searchQuery = String(sp.get('search'));
    }
    const { page, orientation, size, color } = state;
    const query = searchQuery ? searchQuery : state.query;
    console.log(query);
    yield put({
      type: LOAD_PHOTOS,
      payload: {
        page,
        query: query,
        orientation,
        size,
        color,
      },
    });
  }
}
export default function* photoSaga() {
  yield fork(loadBackground);
  yield takeLeading(LOCATION_CHANGE, loadOnEntry);
  yield takeLeading(LOAD_PHOTOS, loadPhotos);
}
