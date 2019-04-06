import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import logo from './photos/logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="Header__Cont">
          <Link to="/">
            <img src={logo} className="App__Logo" alt = "Logo" />
          </Link>
            <div className="PageSwitcher">
              <NavLink exact to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
              <NavLink exact to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            </div>
        </div>
        <div className="App">
            <Route exact path="/sign-up" component={SignUpForm}>
            </Route>
            <Route path="/sign-in" component={SignInForm}>
            </Route>
        </div>
      </Router>
    );
  }
}

export default App;
