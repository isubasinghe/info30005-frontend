import React, { Component } from "react";
import axios from 'axios';
import { Link }  from 'react-router-dom';
import './signin.css';


class SignInForm extends Component {
	constructor(props) {
		super(props);

		//The default state of these values
		this.state = {
			email: "",
			password: ""
		};

		this.handleChange = this.handleChange.bind(this); // When called this will cause the handleChange function with
		// the event e = this.
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	//handleEmail(e) {
	//	this.setState({email : e.target.value});
	//}
	componentDidMount() {
		axios.get('https://').then(res=> {
			console.log(res);
			this.setState({ email: res.data });
		})

	}

	handleChange(e) {
		let target = e.target;
		let value = target.type === "checkbox"?target.checked : target.value;
		let name = target.name;

		//When the value changes it will update the value above.
		this.setState({
			[name]: value
		});
	}

	handleSubmit(e) {
		// Stopping browser for reloading page
		e.preventDefault();

		// 
		this.setState({
			email: e.target.value,
			password: e.target.value,
		})

		// Post to API
		//axios.post('http://localhost:3000/sign-in', {}).then(res=> {
		//	console.log(res);
		//	console.log(res.data);
		//})

		console.log("The form was submitted with the following data:");
		console.log(this.state);

	}



	render() {
		return(
			<div className="FormCenter">
				<div className="FormTitle">Sign in</div>
				<form className="FormField" onSubmit={this.handleSubmit}>
					<div className="FormField">
						<label className="FormField__Label" htmlFor="email">Email</label>
						<input type="email" id="email" className="FormField__Input"
						       placeholder="Enter your email" name ="email" value={this.state.email} onChange={this.handleChange} />
					</div>
					<div className="FormField">
						<label className="FormField__Label" htmlFor="password">Password</label>
						<input type="password" id="password" className="FormField__Input"
						       placeholder="Enter your password" name ="password" value={this.state.password} onChange={this.handleChange} />
					</div>
					<div className="FormField">
						<Link to="/forgot-password" className="FormField__Link__No__Underline">Forgot password?</Link>
					</div>
					<div className="FormField">
						<button className="FormField__Button mr-20">Sign In</button>
						<Link to="/my-kitchen"></Link>
					</div>
					<div className="FormField">
						<Link to="/sign-up" className="FormField__Link">Create an account</Link>
					</div>
				</form>
			</div>

		);
	}
}

export default SignInForm;