import axios from "axios";
import { returnErrors } from "./errorActions";
import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from "./types";

export const getOrders = (id) => (dispatch) => {
  dispatch(setOrdersLoading());
  axios
    .get(`/api/order/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const checkout =
  (fullName, address, zipCode, city, email, paymentOption, userId) =>
  (dispatch) => {
    axios
      .post(`/api/order/${userId}`, {
        fullName,
        address,
        zipCode,
        city,
        email,
        paymentOption,
      })
      .then((res) =>
        dispatch({
          type: CHECKOUT,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};
