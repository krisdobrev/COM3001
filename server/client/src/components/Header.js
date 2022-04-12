import React, { Component } from "react";
import { connect } from "react-redux";
import { signout } from "../actions/index";
import "./style/HeaderStyle.css";

class Header extends Component {
  renderContent() {
    switch (this.props.auth.authenticated) {
      case null:
        return (
          <li>
            <a href="/signin">Login</a>
            <a href="/signup">Signup</a>
          </li>
        );
      case false:
        return (
          <li>
            {/*<a href="/auth/google">Login</a>*/}
            <a href="/signin">Login</a>
            <a href="/signup">Signup</a>
          </li>
        );
      default:
        return (
          <li>
            <a onClick={() => this.props.dispatch(signout())}>Logout</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav className="header">
        <div className="nav-wrapper">
          <a href="/" className="left brand-logo">
            StoreName
          </a>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
