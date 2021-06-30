import {
  UPLOAD_CSV,
  UPLOAD_CSV_SUCCESSFUL,
  UPLOAD_CSV_FAILED,
} from "./actionTypes";

const initialState = {
  error: null,
  loading: false,
  csv: null,
};

const currentCSV = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_CSV:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case UPLOAD_CSV_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        csv: action.payload,
        error: null,
      };
      break;
    case UPLOAD_CSV_FAILED:
      state = {
        ...state,
        csv: null,
        loading: false,
        error: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default currentCSV;
