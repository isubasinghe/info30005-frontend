import React, { Component } from "react";
import { NavLink }  from 'react-router-dom';
import withAuth from '../../helpers/withAuth';
import './nav.scss';


class NavHeader extends Component {

  getRender() {
    if(this.props.loggedIn) {
      return (
        <div className="btn-group" role="group" >
          <NavLink to="/my-recipes" type="button" className="btn btn-secondary text-white mt-2"
                   activeClassName="btn btn-active text-dark ">my recipes</NavLink>
          <NavLink exact to="/" type="button" className="btn btn-secondary text-white mt-2"
                   activeClassName="btn btn-active text-dark">my kitchen</NavLink>
          <NavLink to="/marketplace" type="button" className="btn btn-secondary text-white mt-2"
                   activeClassName="btn btn-active text-dark">marketplace</NavLink>

          <NavLink to="/logout" type="button" className="btn btn-secondary text-white mt-2 btn-logout"
                   activeClassName="btn btn-active text-dark" onClick={this.props.handleLogOut}>logout</NavLink>
        </div>
      );
    }else {
      // Not logged in, user must sign in or sign up
      return (
        <div className="btn-group" role="group" aria-label="Navigation bar">
          <NavLink to="/sign-in" type="button" className="btn btn-secondary text-white mt-2"
                    activeClassName="btn text-dark btn-active">sign in</NavLink>
          <NavLink to="/sign-up" type="button" className="btn btn-secondary text-white mt-2"
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
