import {
  UPLOAD_CSV,
  UPLOAD_CSV_SUCCESSFUL,
  UPLOAD_CSV_FAILED,
  UPLOAD_CSV_CLEAR,
  UPLOAD_CSV_UPLOADING,
} from "./actionTypes";

export const uploadCSV = data => {
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

export const updateUploading = num => {
  return {
    type: UPLOAD_CSV_UPLOADING,
    payload: num,
  };
};

export const clearAll = () => {
  return {
    type: UPLOAD_CSV_CLEAR,
  };
};
