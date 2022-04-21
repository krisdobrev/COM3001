import axios from "axios";
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  PRODUCTS_LOADING,
  CURRENT_PRODUCT,
  SEARCH_PRODUCTS,
} from "./types";

import { returnErrors } from "./errorActions";

// Add actions for get one product and get producy by category

export const getProducts = () => (dispatch) => {
  dispatch(setProductsLoading());
  axios
    .get("/api/products")
    .then((res) =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getOneProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/${id}`);
    dispatch({ type: CURRENT_PRODUCT, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const searchProduct = (title) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/search/${title}`);
    dispatch({ type: SEARCH_PRODUCTS, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
export const addProduct = (PRODUCT) => (dispatch) => {
  axios
    .post("/api/product", PRODUCT)
    .then((res) =>
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteProduct = (id) => (dispatch) => {
  axios
    .delete(`/api/product/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateProduct = (id, product) => (dispatch) => {
  axios
    .put(`/api/product/${id}`, product)
    .then((res) =>
      dispatch({
        type: UPDATE_PRODUCT,
        payload: Promise.all([id, res.data]),
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setProductsLoading = () => {
  return {
    type: PRODUCTS_LOADING,
  };
};
