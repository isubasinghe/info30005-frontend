
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/Signin';
import ForgotPassword from './UserAuth/ForgotPassword';
import logo from './photos/logo.png';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="row p-4 bg-primary">
            <div className="col">
              <div className="media">
                <Link to="/">
                  <img className="m-0" src={logo} alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col-">
              <div className="btn-group" role="group" aria-label="Navigation bar">
                <NavLink to="/sign-in" type="button" className="btn btn-secondary text-white"
                          activeClassName="btn btn-active">Sign In</NavLink>
                <NavLink to="/sign-up" type="button" className="btn btn-secondary text-white"
                         activeClassName="btn btn-active">Sign Up</NavLink>
              </div>
            </div>
          </div>
              <Route exact path="/sign-up" component={SignUp} />
              <Route path="/sign-in" component={SignIn} />
              <Route path="/forgot-password" component={ForgotPassword}/>
        </div>
      </Router>
    );
  }
}

export default App;
