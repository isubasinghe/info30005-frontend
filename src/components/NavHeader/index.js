import React, { Component } from "react";
import { Link, NavLink }  from 'react-router-dom';
import { isLoggedIn, removeToken } from '../../helpers/jwtHelper';

import './nav.scss';


const handleLogoutButton = () => {
  removeToken();
  window.location = "/";
}

const conditionalRender = () => {
  
    if(isLoggedIn()) {
      return (
        <div className="btn-group" role="group" >
          <NavLink to="/recipes" type="button" className="btn btn-secondary text-white"
                   activeClassName="btn btn-active">recipes</NavLink>
          <NavLink to="/my-kitchen" type="button" className="btn btn-secondary text-white"
                   activeClassName="btn btn-active">my kitchen</NavLink>
          <NavLink to="/my-account" type="button" className="btn btn-secondary text-white"
                   activeClassName="btn btn-active">my account</NavLink>
                   
          <NavLink to="/logout" type="button" className="btn btn-secondary text-white btn-logout"
                   activeClassName="btn btn-active" onClick={handleLogoutButton}>Logout</NavLink>
        </div>
      );
    } else {
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
      <div className="nav-container">
        {conditionalRender()}
      </div>
    );
  }
}

export default NavHeader;