import React, { Component } from "react";
import { Link }  from 'react-router-dom';
import axios from 'axios';
import { storeToken } from '../../helpers/jwtHelper';
import './signin.scss';
import ErrorMessage from './ErrorMessage';


class SignInForm extends Component {

  constructor(){
      super();

      this.state = {
          email:'',
          password:'',
          userValid: false,
          valid: false,
          msg: ''
      };

      // When called this will cause the handleChange functions with the event e = this.
      this.handleEmailChange = this.handleEmailChange.bind(this);
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
      .then(res => {
          // Only logged in if user is valid and password match user email
          storeToken(res.data.token);
          console.log("LOGGED IN, now in my kitchen");
          window.location = "/";

      }).catch(err => {
          const valid = this.state.valid;
          this.setState( { valid : !valid, msg: err.response.data.msg} );
          console.log(err.response.data.msg);
      });

  }

  render() {
      return (
        <div className="d-flex justify-content-center">

            <div className="signin-container">
              <div className="col mt-5 pl-5 pr-5 pt-2 bg-white">
                  <h2 className="text-center p-3 mt-5 text-white font-weight-lighter text-lowercase bg-blue rounded">sign in </h2>
                  <form onSubmit={this.handleSubmit}>

                      <div className="form-group pt-4 pl-5 pr-5">
                          <p className="text-center text-blue font-weight-lighter text-lowercase">email*</p>
                          <input type="email" className="form-control border-primary text-center text-blue font-weight-light"
                                  id="email" placeholder="enter your email" required onChange={this.handleEmailChange}/>
                          <div className="invalid-tooltip"> </div>
                      </div>
                      <div className="form-group pt-4 pl-5 pr-5">
                          <p className="text-center text-blue font-weight-lighter text-lowercase">password*</p>
                          <input type="password" className="form-control border-primary text-center text-blue font-weight-light"
                                  id="password" placeholder="enter your password" required onChange={this.handlePasswordChange}/>
                          <div className="invalid-tooltip"> </div>
                      </div>
                      <div className="form-group text-center">
                        <h6 className="text-blue"> <small> * fields are required </small> </h6>
                          <button type="submit" className="btn text-center btn-white font-weight-light border-white text-dark
                                    bg-bground m-3 mb-5">sign in</button>
                          {this.state.valid && <ErrorMessage msg={this.state.msg.toLowerCase()}/>}
                      </div>
                  </form>
              </div>
            </div>
        </div>
      )
  };
}

export default SignInForm;
