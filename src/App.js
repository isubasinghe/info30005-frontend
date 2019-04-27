import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignUp from './UserAuth/Signup';
import SignIn from './UserAuth/Signin';
import ForgotPassword from './UserAuth/ForgotPassword';
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
            <NavLink to="/signin" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
            <NavLink to="/signup" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
          </div>

        </div>
        <div className="App">
            <Route exact path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/forgot-password" component={ForgotPassword}/>
        </div>

      </Router>

    );
  }
}

export default App;
