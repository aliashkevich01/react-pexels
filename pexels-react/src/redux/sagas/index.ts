import { spawn } from "redux-saga/effects";
import photoSaga from "./photo";

export default function* rootSaga() {
  yield spawn(photoSaga);
}