import {
  UPLOAD_CSV,
  UPLOAD_CSV_SUCCESSFUL,
  UPLOAD_CSV_FAILED,
} from "./actionTypes";

export const uploadCSV = data => {
  console.log("action", data);
  return {
    type: UPLOAD_CSV,
    payload: { data },
  };
};

export const uploadCSVSuccessful = user => {
  return {
    type: UPLOAD_CSV_SUCCESSFUL,
    payload: user,
  };
};

export const uploadCSVFailed = error => {
  return {
    type: UPLOAD_CSV_FAILED,
    payload: error,
  };
};
