import React, { Component } from "react";
import { Link }  from 'react-router-dom';
import axios from 'axios';
import { getToken, storeToken, isLoggedIn } from '../../helpers/jwtHelper';

class SignInForm extends Component {

	constructor(){
		super();

		this.state = {
			name:'',
			email:'',
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

		}).catch(err => {
			console.log(err);
		});

		this.props.history.push('/my-kitchen');

	}
	render() {
		return (
			<div className="row">
				<div className="col-sm">
				</div>
				<div className="col-4 mt-5 pl-5 pr-5 bg-white">
					<h2 className="text-center p-3 mt-5 text-white font-weight-lighter text-uppercase bg-blue">Sign In </h2>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group pt-4">
							<p className="text-center text-blue font-weight-lighter text-uppercase">Email</p>
							<input type="email" className="form-control border-primary text-center text-blue font-weight-light"
							       id="email" placeholder="Enter you email" required onChange={this.handleEmailChange}/>
							<div className="invalid-tooltip"> </div>
						</div>
						<div className="form-group pt-4">
							<p className="text-center text-blue font-weight-lighter text-uppercase">Password</p>
							<input type="password" className="form-control border-primary text-center text-blue font-weight-light"
							       id="password" placeholder="Enter your password" required onChange={this.handlePasswordChange}/>
							<div className="invalid-tooltip"> </div>
						</div>
						<div className="form-group pt-4">
							<Link to="/forgot-password" className="btn text-center text-blue font-weight-light m-4">Forgot password?</Link>
						</div>
						<div className="form-group text-center">
							<button type="submit" className="btn text-center btn-white font-weight-light border-white
							         bg-bground m-4">Sign In</button>
						</div>
					</form>
				</div>
				<div className="col-sm">
				</div>
			</div>
		)
	};
}

export default SignInForm;