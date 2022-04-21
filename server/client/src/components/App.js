import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./header/Header";
import Landing from "./Landing";
import Signup from "../components/auth/Signup";
import Signin from "../components/auth/Signin";
import HeaderTest from "./HeaderTest";
import SigninTest from "./auth/SigninTest";
import SignupTest from "./auth/SignupTest";
import LandingTest from "./products/LandingTest";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";
import { Footer } from "./Footer";
import { ProductDetail } from "./productDetail/ProductDetail";
import SearchTitle from "./search/SearchTitle";

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
            <Route exact path="/" component={LandingTest} />
            <Route exact path="/signup" component={SignupTest} />
            <Route exact path="/signin" component={SigninTest} />
            <Route path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/products/search/:title" component={SearchTitle} />

            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
