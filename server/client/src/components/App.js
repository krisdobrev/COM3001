import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./header/Header";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import AllProducts from "./products/AllProducts";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";
import { Footer } from "./Footer";
import { ProductDetail } from "./productDetail/ProductDetail";
import SearchTitle from "./search/SearchTitle";
import SearchCategory from "./searchCategory/SearchCategory";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={AllProducts} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route
              exact
              path="/products/search/:title"
              component={SearchTitle}
            />
            <Route
              exact
              path="/products/:category"
              component={SearchCategory}
            />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
