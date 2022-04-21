import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import errorReducer from "./errorReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  auth: authReducer,
  // form: formReducer,
  product: productReducer,
  error: errorReducer,
  cart: cartReducer,
  order: orderReducer,
});
