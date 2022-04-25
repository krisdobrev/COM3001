import axios from "axios";
import { FETCH_USER, SIGNOUT_USER, AUTH_ERROR, AUTH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
  //can refactor 88 video
  const res = await axios.get("/api/current_user");
  //localStorage.setItem("google", res.data);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const signup =
  ({ email, password }, callback) =>
  async (dispatch) => {
    try {
      const res = await axios.post("/api/signup", { email, password });

      dispatch({ type: AUTH_USER, payload: res.data });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
      callback();
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: "Email is already in use!" });
    }
  };

export const signin =
  ({ email, password }, callback) =>
  async (dispatch) => {
    try {
      const res = await axios.post("/api/signin", { email, password });

      dispatch({ type: AUTH_USER, payload: res.data });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
      callback();
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: "Invalid email/password" });
    }
  };

export const signout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  axios.get("/api/logout");
  return {
    type: SIGNOUT_USER,
    payload: false,
  };
};
