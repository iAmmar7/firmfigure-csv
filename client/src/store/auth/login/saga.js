import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { post } from "../../../helpers/api_helper.js";

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(post, "/auth/login", user);
    localStorage.setItem("authUser", JSON.stringify(response.user));
    localStorage.setItem("authToken", response.token);
    yield put(loginSuccess(response.user));
    // history.push("/dashboard");
    history.push("/csv-loader");
  } catch (error) {
    yield put(apiError(error?.response?.data?.message || "Unknown error"));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
