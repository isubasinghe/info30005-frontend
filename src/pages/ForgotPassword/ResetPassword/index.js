import React, { Component } from "react";
import { Link } from 'react-router-dom';

class ResetPWForm extends Component {
	
	constructor() {
		super();

		//Default state of these values
		this.state = {
			password: '',
			verify_password: ''
		};
	}

	handleEmail = event => {
		this.setState({email : event.target.value}); 
	}

	handleSubmit(e) {
		// Prevent page from reloading
		e.preventDefault();

	}

	render() {
		return (
			<div className="row">
				<div className="col-sm">
				</div>
				<div className="col-4 mt-5 pl-5 pr-5 bg-white">
					<h2 className="text-center p-3 mt-5 text-white font-weight-lighter text-uppercase bg-blue">Change password</h2>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group pt-4">
							<p className="text-center text-blue font-weight-lighter text-uppercase">Password</p>
							<input type="password" className="form-control border-primary text-center text-blue font-weight-light"
							       id="password" placeholder="Enter your password" required onChange={this.handlePasswordChange}/>
							<div className="invalid-tooltip"> </div>
						</div>
						<div className="form-group pt-4">
							<p className="text-center text-blue font-weight-lighter text-uppercase">Verify Password</p>
							<input type="password" className="form-control border-primary text-center text-blue font-weight-light"
							       id="verify_password" placeholder="Enter your password" required onChange={this.handlePasswordChange}/>
							<div className="invalid-tooltip"> </div>
						</div>
						<div className="FormField">
							<Link to="/sign-in" className="btn text-center text-blue font-weight-light  m-4">Back to sign in</Link>
						</div>
						<div className="form-group text-center">
							<button type="submit" className="btn text-center btn-white font-weight-light border-white
							         bg-bground m-4">Reset password</button>
						</div>
					</form>
				</div>
				<div className="col-sm">
				</div>
			</div>
		);
	}
}

export default ResetPWForm;