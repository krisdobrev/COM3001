import {
  FETCH_USER,
  AUTH_USER,
  AUTH_ERROR,
  SIGNOUT_USER,
} from "../actions/types";

const INITIAL_STATE = {
  authenticated: "",
  isAuthenticated: false,
  errorMessage: "",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload,
        isAuthenticated: true,
        errorMessage: null,
      };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case SIGNOUT_USER:
      return {
        ...state,
        authenticated: action.payload,
        isAuthenticated: false,
        errorMessage: null,
      };
    case FETCH_USER:
      return {
        ...state,
        authenticated: action.payload || false,
        isAuthenticated: action.payload || false,
      };
    default:
      return state;
  }
}
