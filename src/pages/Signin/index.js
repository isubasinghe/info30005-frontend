import React, { Component } from "react";
import { Link }  from 'react-router-dom';
import axios from 'axios';
import { storeToken } from '../../helpers/jwtHelper';

import './signin.scss';

class SignInForm extends Component {

  constructor(){
      super();

      this.state = {
          email:'',
          password:'',

      };

      this.handleEmailChange = this.handleEmailChange.bind(this); // When called this will cause the handleChange function with
      // the event e = this.
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      
  }

  handleEmailChange(e) {
      this.setState({
          email: e.target.value,
      });
  }

  handlePasswordChange(e) {
      this.setState({
          password: e.target.value
      });
  }


  handleSubmit(e) {
      // Prevent page from reloading
      e.preventDefault();

      axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/auth/signin', {
          email: this.state.email,
          password: this.state.password,
      })
      .then(data => {
          storeToken(data.data.token);
          console.log("LOGGED IN, now in my kitchen");
          window.location = "/";

      }).catch(err => {
          alert("Failed to sign in");
          console.log(err);
      });
  
  }


  render() {
      return (
        <div className="d-flex justify-content-center">
            
            <div className="signin-container">
            <div className="col mt-5 pl-5 pr-5 pt-2 bg-white">
                <h2 className="text-center p-3 mt-5 text-white font-weight-lighter text-uppercase bg-blue rounded">Sign In </h2>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group pt-4">
                        <p className="text-center text-blue font-weight-lighter text-uppercase">Email</p>
                        <input type="email" className="form-control border-primary text-center text-blue font-weight-light"
                                id="email" placeholder="Enter your email" required onChange={this.handleEmailChange}/>
                        <div className="invalid-tooltip"> </div>
                    </div>
                    <div className="form-group pt-4">
                        <p className="text-center text-blue font-weight-lighter text-uppercase">Password</p>
                        <input type="password" className="form-control border-primary text-center text-blue font-weight-light"
                                id="password" placeholder="Enter your password" required onChange={this.handlePasswordChange}/>
                        <div className="invalid-tooltip"> </div>
                    </div>
                    <div className="form-group pt-4">
                        <Link to="/forgot-password" className="btn text-blue text-center font-weight-light m-4">Forgot password?</Link>
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn text-center btn-white font-weight-light border-white
                                  bg-bground m-4">Sign In</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
      )
  };
}

export default SignInForm;