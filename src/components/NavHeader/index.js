import React, { Component } from "react";
import { NavLink }  from 'react-router-dom';
import { isLoggedIn, removeToken } from '../../helpers/jwtHelper';
import withAuth from '../../helpers/withAuth';
import './nav.scss';


class NavHeader extends Component {

  constructor(props) {
    super(props);
    console.log(this.state);
    console.log(this.props);
  }

  getRender() {
    if(this.props.loggedIn) {
      return (
        <div className="btn-group" role="group" >
          <NavLink to="/my-recipes" type="button" className="btn btn-secondary text-white"
                   activeClassName="btn btn-active">my recipes</NavLink>
          <NavLink to="/" type="button" className="btn btn-secondary text-white"
                   activeClassName="btn btn-active text-">my kitchen</NavLink>
          <NavLink to="/my-account" type="button" className="btn btn-secondary text-white"
                   activeClassName="btn btn-active">my account</NavLink>

          <NavLink to="/logout" type="button" className="btn btn-secondary text-white btn-logout"
                   activeClassName="btn btn-active" onClick={this.props.handleLogOut}>logout</NavLink>
        </div>
      );
    }else {
      // Not logged in, user must sign in or sign up
      return (
        <div className="btn-group" role="group" aria-label="Navigation bar">
          <NavLink to="/sign-in" type="button" className="btn btn-secondary text-white"
                    activeClassName="btn text-dark btn-active">sign in</NavLink>
          <NavLink to="/sign-up" type="button" className="btn btn-secondary text-white"
                  activeClassName="btn text-dark btn-active">sign up</NavLink>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="nav-container">
        {this.getRender()}
      </div>
    );
  }
}

export default withAuth(NavHeader, false);
