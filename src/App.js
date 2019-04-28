import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import logo from './photos/logo.png';
import NavHeader from './components/NavHeader';
import SignUp from './pages/SignUp';
import SignIn from './pages/Signin';
import Homepage from './pages/Homepage';
import Verify from './pages/Verifypage';


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
              <NavHeader />
            </div>
          </div>
          
          <Route exact path="/" component = {Homepage} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/sign-up/check-email" component={CheckEmail}/>
          <Route exact path="/sign-in" component={SignIn} />
          <Route path="/verify/:key" component={Verify} />
          <Route exact path="/forgot-password" component={ForgotPassword}/>
          <Route path="/forgot-password/reset-password" component={ResetPassword}/>
          
        </div>
      </Router>
    );
  }
}

export default App;
