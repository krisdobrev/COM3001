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
import PaymentCompleted from "./stripe/PaymentCompleted";
import { CategoryDisplay } from "./category/CategoryDisplay";

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
            <Route exact path="/" component={CategoryDisplay} />
            <Route exact path="/" component={AllProducts} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route path="/payment" component={PaymentCompleted} />
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

function mapStateToProps(state) {
  return { auth: state.auth, cart: state.cart };
}

export default connect(mapStateToProps, actions)(App);
