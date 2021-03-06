import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router';
import ShowErrorMessage from './ErrorMessage';


import './signup.scss';
import { toast } from "react-toastify";

class SignUpForm extends Component {

	constructor(){
		super();

		this.state = {
			name:'',
			email:'',
			password:'',
			address: '',
			valid: false
		};

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
			address: this.state.address
		};

		// Create user in database
		axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/auth/signup', newUser)
			.then(res => {
			// Redirect to page where it says to check user's email only if user written in db
			this.setState({redirect: true});
			toast("Please check your email");

		}).catch(err => {
			// Already a user with the inputted email
			const valid = this.state.valid;
			this.setState( { valid : !valid, errMsg: err.response.data.msg } );
		});


	};


	render() {

		if (this.state.redirect) {
			return <Redirect push to="sign-up/check-email"/>
		}

		return (

			<div className="d-flex justify-content-center">
				<div className="signup-container">
					<div className="col mt-5 pl-5 pr-5 pt-3 bg-white">
						<h2 className="text-center p-3 mt-5 text-white font-weight-lighter text-lowercase bg-blue rounded">sign up </h2>
						<form onSubmit={this.handleSubmit}>
							<div className="form-group pt-3 pl-5 pr-5">
								<p className="text-center text-blue font-weight-lighter text-lowercase">name*</p>
								<input type="text" className="form-control border-primary text-center text-blue font-weight-light"
									id="name" placeholder="enter a name with alphabetic characters" onChange={this.handleName} required />
								<div className="invalid-tooltip"> </div>
							</div>
							<div className="form-group pt-3 pl-5 pr-5">
								<p className="text-center text-blue font-weight-lighter text-lowercase">email*</p>
								<input type="email" className="form-control border-primary text-center text-blue font-weight-light"
									id="email" placeholder="enter a valid email" onChange={this.handleEmail} required />
								<div className="invalid-tooltip"> </div>
							</div>
							<div className="form-group pt-3 pl-5 pr-5">
								<p className="text-center text-blue font-weight-lighter text-lowercase">password*</p>
								<input type="password" className="form-control border-primary text-center text-blue font-weight-light"
									id="password" placeholder="please enter a password" onChange={this.handlePassword} required />
									<h6 className="p-2 text-center text-blue"> <small>minimum of 6 characters + include a lowercase, uppercase and a special character </small></h6>
								<div className="invalid-tooltip"> </div>
							</div>
							<div className="form-group pt-3 pl-5 pr-5">
								<p className="text-center text-blue font-weight-lighter text-lowercase">address*</p>
								<input type="text" className="form-control border-primary text-center text-blue font-weight-light"
									id="address" placeholder="enter a valid address" onChange={this.handleAddress} required />
								<div className="invalid-tooltip"> </div>
							</div>
							<div className="form-group text-center">
								<h6 className="text-blue"> <small> * fields are required </small> </h6>
								<button type="submit" className="btn text-center btn-white font-weight-light border-white bg-bground m-4">sign up</button>
								{this.state.valid && <ShowErrorMessage msg={this.state.errMsg.toLowerCase()}/>}
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	};
}

export default SignUpForm;
