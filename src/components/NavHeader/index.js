import React, { Component } from "react";
import { Link, NavLink }  from 'react-router-dom';
import { isLoggedIn } from '../../helpers/jwtHelper';

// Navigation bar depends on whether or not user has logged in
const conditionalRender = () => {
  
    if(isLoggedIn()) {
      // Logged in, user can access inventory, recipes and details of account
      return (
        <div className="btn-group" role="group" >
          <NavLink to="/recipes" type="button" className="btn btn-secondary text-white"
                   activeClassName="btn btn-active">recipes</NavLink>
          <NavLink to="/my-kitchen" type="button" className="btn btn-secondary text-white"
                   activeClassName="btn btn-active">my kitchen</NavLink>
          <NavLink to="/my-account" type="button" className="btn btn-secondary text-white"
                   activeClassName="btn btn-active">my account</NavLink>
        </div>
      );
    } else {
      // Not logged in, user must sign in or sign up
      return (
        <div className="btn-group" role="group" aria-label="Navigation bar">
          <NavLink to="/sign-in" type="button" className="btn btn-secondary text-white"
                    activeClassName="btn btn-active">sign in</NavLink>
          <NavLink to="/sign-up" type="button" className="btn btn-secondary text-white"
                  activeClassName="btn btn-active">sign up</NavLink>
        </div>
      );
    }
  } 


class NavHeader extends Component {

  render() {
    return (
      <div className="SimpleHeader">
        {conditionalRender()}
      </div>
    );
  }
}

export default NavHeader;