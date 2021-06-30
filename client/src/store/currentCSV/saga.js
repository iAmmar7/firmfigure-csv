import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Account Redux states
import { UPLOAD_CSV, UPLOAD_CSV_FAILED } from "./actionTypes";
import { uploadCSVSuccessful, uploadCSVFailed } from "./actions";

import { post } from "../../helpers/api_helper";

function* uploadCSV({ payload: { data } }) {
  console.log("saga", data);
  try {
    const response = yield call(post, "/user/csv-upload", data);
    console.log("saga response", response);
    console.log(response);
    yield put(uploadCSVSuccessful(response));
  } catch (error) {
    yield put(
      uploadCSVFailed(error?.response?.data?.message || "Unknown error")
    );
  }
}

function* uploadCSVError(error) {
  yield put(uploadCSVFailed(error));
}

function* currentCSVSaga() {
  yield takeEvery(UPLOAD_CSV, uploadCSV);
  yield takeEvery(UPLOAD_CSV_FAILED, uploadCSVError);
}

export default currentCSVSaga;
