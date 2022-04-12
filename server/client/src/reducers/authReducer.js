import {
  FETCH_USER,
  AUTH_USER,
  AUTH_ERROR,
  SIGNOUT_USER,
} from "../actions/types";

const INITIAL_STATE = {
  authenticated: "",
  errorMessage: "",
};

export default function (state = INITIAL_STATE, action) {
  // state could be {}
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case SIGNOUT_USER:
      return { ...state, authenticated: action.payload };
    case FETCH_USER:
      return { ...state, authenticated: action.payload || false };
    default:
      return state;
  }
}
