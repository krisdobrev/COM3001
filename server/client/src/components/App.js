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
import { Footer } from "./footer/Footer";
import { ProductDetail } from "./productDetail/ProductDetail";
import SearchTitle from "./search/SearchTitle";
import SearchCategory from "./searchCategory/SearchCategory";
import Orders from "./order/Orders";
import PaymentCompleted from "./stripe/PaymentCompleted";
import Success from "./checkout/Success";
import { CategoryDisplay } from "./category/CategoryDisplay";
import { Carousel } from "./carousel/Carousel";
import AdminTable from "./admin/AdminTable";
import { AdminProducts } from "./admin/AdminProducts/AdminProducts";
import { CreateProduct } from "./admin/AdminCreateProduct/CreateProduct";
import { EditProduct } from "./admin/AdminEditProduct/EditProduct";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Carousel} />
            <Route exact path="/" component={CategoryDisplay} />

            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/user/orders" component={Orders} />
            <Route path="/payment" component={PaymentCompleted} />
            <Route exact path="/order/success" component={Success} />

            <Route exact path="/all/products" component={AllProducts} />
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

            <Route path="/admin/orders" component={AdminTable} />
            <Route path="/admin/products" component={AdminProducts} />
            <Route
              exact
              path="/admin/product/new/create"
              component={CreateProduct}
            />
            <Route exact path="/admin/product/:id" component={EditProduct} />
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
