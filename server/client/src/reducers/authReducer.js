import {
  FETCH_USER,
  AUTH_USER,
  AUTH_ERROR,
  SIGNOUT_USER,
} from "../actions/types";

const INITIAL_STATE = {
  authenticated: "",
  google: "",
  isAuthenticated: false,
  isAdmin: false,
  errorMessage: "",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload.token,
        id: action.payload.id,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin,
        errorMessage: null,
      };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case SIGNOUT_USER:
      return {
        ...state,
        authenticated: false, //action.payload,
        isAuthenticated: false,
        id: false,
        google: false,
        errorMessage: null,
      };
    case FETCH_USER:
      return {
        ...state,
        google: action.payload || false,
        id: action.payload._id || false,
        isAdmin: action.payload.isAdmin || false,
      };
    default:
      return state;
  }
}
