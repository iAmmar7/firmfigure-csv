import {
  UPLOAD_CSV,
  UPLOAD_CSV_SUCCESSFUL,
  UPLOAD_CSV_FAILED,
  UPLOAD_CSV_CLEAR,
  UPLOAD_CSV_UPLOADING,
} from "./actionTypes";

const initialState = {
  error: null,
  loading: false,
  uploading: 0,
  csv: null,
};

const currentCSV = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_CSV:
      state = {
        ...state,
        loading: true,
        uploading: 0,
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
    case UPLOAD_CSV_UPLOADING:
      state = {
        ...state,
        uploading: action.payload,
      };
      break;
    case UPLOAD_CSV_CLEAR:
      state = {
        ...initialState,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default currentCSV;
