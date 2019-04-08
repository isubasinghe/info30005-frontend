import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './signup.css';

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
		return(
			<div className="FormCenter">
				<div className="FormTitle">Sign up</div>
				<form className="ForField" onSubmit={this.handleSubmit}>
					<div className="FormField">
						<label className="FormField__Label" htmlFor="email">Email</label>
						<input type="email" id="email" className="FormField__Input"
						       placeholder="Enter your email" name ="email" onChange={this.handleChange}
										value={this.state.email}/>
					</div>
					<div className="FormField">
						<label className="FormField__Label" htmlFor="f_name">First Name</label>
						<input type="text" id="f_name" className="FormField__Input"
						       placeholder="Enter your first name" name ="f_name" onChange={this.handleChange}
						       value={this.state.f_name} />
					</div>
					<div className="FormField">
						<label className="FormField__Label" htmlFor="l_name">Last Name</label>
						<input type="text" id="l_name" className="FormField__Input"
						       placeholder="Enter your last name" name ="l_name" onChange={this.handleChange}
						       value={this.state.l_name}/>
					</div>
					<div className="FormField">
						<label className="FormField__Label" htmlFor="password">Password</label>
						<input type="password" id="password" className="FormField__Input"
						       placeholder="Enter your password" name ="password" onChange={this.handleChange}
						       value={this.state.password} />
					</div>
					<div className="FormField">
						<label className="FormField__CheckboxLabel">
							<input className="FormField__Checkbox" type="checkbox" name="hasAgreed" onChange={this.handleChange}
							       value={this.state.hasAgreed} />
							I agree all statements in <a href="" className="FormField__TermsLink">
							terms of service</a>
						</label>
					</div>
					<div className="FormField">
						<button className="FormField__Button mr-20">Sign Up</button>
					</div>
					<div className="FormField">
						<Link to="/sign-in" className="FormField__Link"> I'm already a member</Link>
					</div>
				</form>
			</div>
		);
	}
}

export default SignUpForm;