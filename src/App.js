
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/Signin';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import CheckEmail from './pages/SignUp/CheckEmail';
import MyKitchen from './pages/MyKitchen';
import MyRecipes from './pages/MyKitchen/MyRecipes';
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
                <NavLink to="/sign-in" type="button" className="btn btn-secondary text-blue"
                          activeClassName="btn btn-active">Sign In</NavLink>
                <NavLink to="/sign-up" type="button" className="btn btn-secondary text-blue"
                         activeClassName="btn btn-active">Sign Up</NavLink>
              </div>
            </div>
          </div>
              <Route exact path="/sign-up" component={SignUp} />
              <Route path="/sign-up/check-email" component={CheckEmail}/>
              <Route path="/sign-in" component={SignIn} />
              <Route exact path="/forgot-password" component={ForgotPassword}/>
              <Route path="/forgot-password/reset-password" component={ResetPassword}/>
              <Route path="/my-kitchen" component={MyKitchen}/>
              <Route path="/my-kitchen/my-recipes" component={MyRecipes}/>
              
        </div>
      </Router>
    );
  }
}

export default App;
