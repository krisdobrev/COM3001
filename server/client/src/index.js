//import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./components/App";
import reducers from "./reducers";

if (localStorage.getItem("isadmin") != null) {
} else {
  localStorage.setItem("isAdmin", false);
}

if (localStorage.getItem("order") != null) {
} else {
  localStorage.setItem("order", false);
}

const store = createStore(
  reducers,
  {
    auth: {
      authenticated: localStorage.getItem("token") || false,
      id: localStorage.getItem("id") || false,
      google: localStorage.getItem("google") || false,
      isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
      order: localStorage.getItem("order") || false,
    },
  },
  composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider resetCSS={true}>
      <App />
    </ChakraProvider>
  </Provider>,
  document.querySelector("#root")
);
