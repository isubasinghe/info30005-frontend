import React, { Component } from "react";
import { Link, NavLink }  from 'react-router-dom';
import { isLoggedIn } from '../../helpers/jwtHelper';

class NavHeader extends Component {

  const conditionalRender = () => {
  
    if(isLoggedIn()) {
      return (
          <div/>
      );
    } else {
      return (
        <div className="btn-group" role="group" aria-label="Navigation bar">
          <NavLink to="/sign-in" type="button" className="btn btn-secondary text-white"
                    activeClassName="btn btn-active">Sign In</NavLink>
          <NavLink to="/sign-up" type="button" className="btn btn-secondary text-white"
                  activeClassName="btn btn-active">Sign Up</NavLink>
        </div>
      );
    }
  } 

  render() {
    return (
      <div className="SimpleHeader">
        {conditionalRender()}
      </div>
    );
  }
}

export default NavHeader;