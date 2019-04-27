import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class SignUpForm extends Component {

	constructor(){
		super();

		this.state = {
			name:'',
			email:'',
		};

	};

	handleEmail = event => {
		this.setState({email : event.target.value}); 
	};

	handlePassword = event => {
		this.setState({password : event.target.value});
	};

	handleSubmit = event => {

		// Stop browser from reloading page
		event.preventDefault();

		const user = {
			name: this.state.name,
			password: this.state.password
		};

		axios.get('http://foodspan.ap-southeast-1.elasticbeanstalk.com/auth/signin', user)
			.then(res => {
				console.log(res.data);
		}).catch(err => {
			console.log(err);
		});
	};

	render() {
		return (
			<div className="row">
				<div className="col-sm">
				</div>
				<div className="col-4 mt-5 pl-5 pr-5 bg-white">
					<h2 className="text-center p-3 mt-5 text-white font-weight-lighter text-uppercase bg-blue">Sign In</h2>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group pt-4">
							<p className="text-center text-blue font-weight-lighter text-uppercase">Email</p>
							<input type="email" className="form-control border-primary text-center text-blue font-weight-light"
							       id="email" placeholder="Please enter you email" onChange={this.handleEmail} required />
							<div className="invalid-tooltip"> </div>
						</div>
						<div className="form-group pt-4">
							<p className="text-center text-blue font-weight-lighter text-uppercase">Password</p>
							<input type="password" className="form-control border-primary text-center text-blue font-weight-light"
							       id="password" placeholder="Please enter your password" onChange={this.handlePassword} required />
							<div className="invalid-tooltip"> </div>
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

export default SignUpForm;