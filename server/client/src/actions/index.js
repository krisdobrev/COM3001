import axios from "axios";
import { FETCH_USER, SIGNOUT_USER } from "./types";
import { AUTH_USER } from "./types";
import { AUTH_ERROR } from "./types";

export const fetchUser = () => async (dispatch) => {
  //can refactor 88 video
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const signup =
  ({ email, password }, callback) =>
  async (dispatch) => {
    try {
      const res = await axios.post("/api/signup", { email, password });

      dispatch({ type: AUTH_USER, payload: res.data.token });
      localStorage.setItem("token", res.data.token);
      callback();
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: "Email is already in use" });
    }
  };

export const signin =
  ({ email, password }, callback) =>
  async (dispatch) => {
    try {
      const res = await axios.post("/api/signin", { email, password });

      dispatch({ type: AUTH_USER, payload: res.data.token });
      localStorage.setItem("token", res.data.token);
      callback();
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: "Invalid email/password" });
    }
  };

export const signout = () => {
  localStorage.removeItem("token");
  axios.get("/api/logout");
  return {
    type: SIGNOUT_USER,
    payload: false,
  };
};
