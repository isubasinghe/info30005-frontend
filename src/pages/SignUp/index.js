import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class SignUpForm extends Component {
	constructor(){

		super();

		this.state = {
			name:'',
			email:'',
			password:'',
			//verify_pw: '',
			address: ''
		};

		//this.handleChange = this.handleChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
	};

	handleEmail = event => {
		this.setState({email : event.target.value}); 
	};

	handleName = event => {
		this.setState({name : event.target.value });
	};

	handlePassword = event => {
		this.setState({password : event.target.value});
	};

	handleVerifyPW = event => {
		this.setState({verify_pw : event.target.value});
	};

	handleAddress = event => {
		this.setState({address : event.target.value});
	};

	handleSubmit = event => {

		// Stop browser from reloading page
		event.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			//verify_pw: this.state.verify_pw,
			address: this.state.address
		};
		
		axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/auth/signup', {...newUser})
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
					<h2 className="text-center p-3 mt-5 text-white font-weight-lighter text-uppercase bg-blue">Sign Up </h2>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group pt-4">
							<p className="text-center text-blue font-weight-lighter text-uppercase">Name</p>
							<input type="text" className="form-control border-primary text-center text-blue font-weight-light"
							       id="email" placeholder="Please enter you name" onChange={this.handleName} required />
							<div className="invalid-tooltip"> </div>
						</div>
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
						<div className="form-group pt-4">
							<p className="text-center text-blue font-weight-lighter text-uppercase">Address</p>
							<input type="text" className="form-control border-primary text-center text-blue font-weight-light"
							       id="address" placeholder="Please enter you address" onChange={this.handleAddress} required />
							<div className="invalid-tooltip"> </div>
						</div>
						<div className="form-group text-center">
							<button type="submit" className="btn text-center btn-white font-weight-light border-white
							         bg-bground m-4">Sign Up</button>
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