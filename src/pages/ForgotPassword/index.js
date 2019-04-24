import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './forgotPW.css';

class ForgotPWForm extends Component {
	
	constructor() {
		super();

		//Default state of these values
		this.state = {
			email: "",
			password: ""
		};

		// When called, will cause handleChange function with the event e = this
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange (e) {
		let target = e.target;
		let value = target.type === "checkbox"?target.checked : target.value;
		let name = target.name;

		//Will update value when it changes
		this.setState({
			[name]: value
		})
	}

	handleSubmit(e) {
		e.preventDefault();

		console.log("The form was submitted with the following data:");
		console.log(this.state);
	}

	render() {
		return (
			<div className="FormCenter">
				<div className="FormTitle">Forgot Password</div>

				<form className="FormField" onSubmit={this.handleSubmit}>
					<div className="FormField">
						<label className="FormField__Label" htmlFor="email">Email</label>
						<input type="email" id="email" className="FormField__Input"
							placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange}/>
					</div>

					<div className="FormField">
						<button className="FormField__Button mr-20">Reset Password</button>
					</div>
				</form>

			</div>
		);
	}
}

export default ForgotPWForm;