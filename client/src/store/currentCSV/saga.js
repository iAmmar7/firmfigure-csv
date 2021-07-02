import { takeLatest, put, call } from "redux-saga/effects";

// CurrentCSV Redux states
import store from "../";
import { UPLOAD_CSV, UPLOAD_CSV_FAILED } from "./actionTypes";
import {
  uploadCSVSuccessful,
  uploadCSVFailed,
  updateUploading,
} from "./actions";

import { post } from "../../helpers/api_helper";

function* uploadCSV({ payload: { data } }) {
  const formData = new FormData();
  formData.append("csv", data);

  try {
    const response = yield call(post, "/user/csv-upload", formData, {
      onUploadProgress: progressEvent => {
        if (progressEvent.lengthComputable) {
          store.dispatch(
            updateUploading(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      },
    });
    yield put(uploadCSVSuccessful(response.csv));
  } catch (error) {
    yield put(uploadCSVFailed(error?.response?.message || "Unknown error"));
  }
}
export default function* currentCSVSaga() {
  yield takeLatest(UPLOAD_CSV, uploadCSV);
}
