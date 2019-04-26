import React, { Component } from "react";
import { Link } from 'react-router-dom';

class SignUpForm extends Component {
	constructor(){

		super();

		this.state = {
			email:'',
			f_name:'',
			l_name:'',
			password:'',
			hasAgreed: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange (e) {

		let target = e.target;
		let value = target.type === 'checkbox' ? target.checked : target.value;
		let name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit (e) {

		e.preventDefault();

		console.log('The from was submitted with the following data: ');
		console.log(this.state);
	}

	render() {
		return (
			<div className="row">
				<div className="col-sm">
				</div>
				<div className="col-4 mt-5 pl-5 pr-5 bg-white">
					<h2 className="text-center p-3 mt-5 text-white font-weight-lighter text-uppercase bg-blue">Sign Up </h2>
					<form>
						<div className="form-group pt-4">
							<p className="text-center text-blue font-weight-lighter text-uppercase">Name</p>
							<input type="text" className="form-control border-primary text-center text-blue font-weight-light"
							       id="email" placeholder="Please enter you email" required />
							<div className="invalid-tooltip"> </div>
						</div>
						<div className="form-group pt-4">
							<p className="text-center text-blue font-weight-lighter text-uppercase">Email</p>
							<input type="email" className="form-control border-primary text-center text-blue font-weight-light"
							       id="email" placeholder="Please enter you email" required />
							<div className="invalid-tooltip"> </div>
						</div>
						<div className="form-group pt-4">
							<p className="text-center text-blue font-weight-lighter text-uppercase">Password</p>
							<input type="password" className="form-control border-primary text-center text-blue font-weight-light"
							       id="password" placeholder="Please enter your password" required />
							<div className="invalid-tooltip"> </div>
						</div>
						<div className="form-group pt-4">
							<p className="text-center text-blue font-weight-lighter text-uppercase">Address</p>
							<input type="text" className="form-control border-primary text-center text-blue font-weight-light"
							       id="address" placeholder="Please enter you address" required />
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