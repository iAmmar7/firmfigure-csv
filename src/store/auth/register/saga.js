import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { REGISTER_USER } from "./actionTypes";
import { registerUserSuccessful, registerUserFailed } from "./actions";

import { post } from "../../../helpers/api_helper";

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
    const response = yield call(post, "/auth/signup", user);
    yield put(registerUserSuccessful(response));
  } catch (error) {
    yield put(
      registerUserFailed(error?.response?.data?.message || "Unknown error")
    );
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
