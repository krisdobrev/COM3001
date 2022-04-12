import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Signup from "../components/auth/Signup";
import Signin from "../components/auth/Signin";
import HeaderTest from "./HeaderTest";
import SigninTest from "./auth/SigninTest";
import SignupTest from "./auth/SignupTest";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <HeaderTest />
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={SignupTest} />
            <Route exact path="/signin" component={SigninTest} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
