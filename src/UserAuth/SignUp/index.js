import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './signup.css';

class SignUpForm extends Component {
	
	constructor(props){

		super(props);

		this.state = {
			email:'',
			f_name:'',
			l_name:'',
			password:'',
			confirm_password: '',
			address: '',
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

		// Prevents page from reloading
		e.preventDefault();
		
		//if ((e.target.value===this.state.confirm_password) &&
		//	(e.target.value!== this.state.password)) {
			
		//	alert("Passwords don't match");
		//}

		// 
		const user = {
			[e.target.name]: e.target.value,
		}

		// Post user to API
		axios.get('/auth/signup', {user})
			.then(res => {
				console.log(res);
				console.log(res.data);
			});
		
		console.log('The form was submitted with the following data: ');		
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
										value={this.state.email} required/>
					</div>
					<div className="FormField">
						<label className="FormField__Label" htmlFor="f_name">First Name</label>
						<input type="text" id="f_name" className="FormField__Input"
						       placeholder="Enter your first name" name ="f_name" onChange={this.handleChange}
						       value={this.state.f_name} required/>
					</div>
					<div className="FormField">
						<label className="FormField__Label" htmlFor="l_name">Last Name</label>
						<input type="text" id="l_name" className="FormField__Input"
						       placeholder="Enter your last name" name ="l_name" onChange={this.handleChange}
						       value={this.state.l_name} required/>
					</div>
					<div className="FormField">
						<label className="FormField__Label" htmlFor="password">Password</label>
						<input type="password" id="password" className="FormField__Input"
						       placeholder="Enter your password" name ="password" onChange={this.handleChange}
						       value={this.state.password} required />
					</div>
					<div className="FormField">
						<label className="FormField__Label" htmlFor="confirm_password">Verify Password</label>
						<input type="password" id="confirm_password" className="FormField__Input"
							onChange={this.handleChange}
							placeholder="Verify your password" name="confirm_password"
							value={this.state.confirm_password} required/>
					</div>
					<div className="FormField">
						<label className="FormField__Label" htmlFor="address"> Address</label>
						<input type="address" id="address" className="FormField__Input"
							onChange={this.handleChange} placeholder="Enter your address"
							name="address" value={this.state.address} required/>
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
						<button className="FormField__Button mr-20" type="submit">Sign Up</button>
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