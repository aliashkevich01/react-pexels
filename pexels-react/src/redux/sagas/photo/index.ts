import { FETCH_OPTIONS } from "../../../interfaces/FetchOptions";
import { apply, call, put, select, take, fork, takeLatest} from 'redux-saga/effects'
import { LOAD_BACKGROUND, LOAD_PHOTOS, LOAD_PHOTOS_FAILED, LOAD_PHOTOS_SUCCESS } from "../../reducers/photo/actions";
import { LOCATION_CHANGE } from "connected-react-router";
import { ResponseInterface } from "../../../interfaces/responseInterface";
import { PayloadInterface } from "../../../interfaces/ActionInterface";
import { StateInterface } from "../../../interfaces/StateInterface";
import { stateInterface } from "../../reducers/photo";
import { createRequestString, getRandomInt } from "../../utils";
import { PhotoInterface } from "../../../interfaces/PhotoInterface";

export function* loadPhotos(action : { payload: PayloadInterface , type: string }) {
  let { query, page, orientation, size, color, locale } = action.payload;
  if(sessionStorage.getItem('query') !== '' &&  sessionStorage.getItem('query')) {
    const str = JSON.stringify(sessionStorage.getItem('query'))
    query = str.substring(1, str.length - 1);
  }
  const resp: Response = yield call(
      fetch,
      createRequestString(query, page, orientation, size, color),
      FETCH_OPTIONS);
  try {
    const curData: ResponseInterface = yield apply(resp, resp.json, []);
    const data: PayloadInterface = {
    query: query,
    page: page,
    data: curData,
    orientation: orientation,
    size: size,
    color: color,
    locale: locale,
  }
  yield put({
    type: LOAD_PHOTOS_SUCCESS,
    payload: data
  });
  }
  catch(e) {
    yield put({
      type: LOAD_PHOTOS_FAILED,
      payload: e
    });
  }
};
export function* loadBackground() {
      const state: stateInterface = yield select((state: StateInterface) => state.photo);
      const { query, page, data, orientation, size, color, locale } = state;
      const id = getRandomInt(200000);
      const requestString = `https://api.pexels.com/v1/photos/${id}`;
      const resp: Response = yield call(
        fetch,
        requestString,
        FETCH_OPTIONS);
      try {
        const backPhoto: PhotoInterface = yield apply(resp, resp.json, []);
        const data: PayloadInterface = {
          query: query,
          page: page,
          data: state.data,
          orientation: orientation,
          size: size,
          color: color,
          backPhoto: backPhoto,
          locale: locale,
        }
        yield put({
          type: LOAD_PHOTOS_SUCCESS,
          payload: data
        });
      }
      catch(e) {
        yield put({
          type: LOAD_PHOTOS_FAILED,
          payload: e
        });
      }
}
export function* loadOnEntry() {
  while(1) {
    const action: unknown = yield take(LOCATION_CHANGE);
    const state:stateInterface = yield select((state: StateInterface) => state.photo);
    const { page, query, orientation, size, color } = state;
    yield put({
      type: LOAD_PHOTOS,
      payload: {
        page,
        query, 
        orientation, 
        size, 
        color
      }
    })
  }
}
export default function* photoSaga() {
 // yield fork(loadBackground);
  yield fork(loadOnEntry);
  yield takeLatest(LOAD_PHOTOS, loadPhotos);
}