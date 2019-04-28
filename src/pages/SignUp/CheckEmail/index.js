import React, { Component } from "react";

class CheckEmail extends Component {

	// When clicked on Sign in button, redirect to sign in page
	handleSubmit = event => {
		this.props.history.push('/sign-in');
	}

	render() {
		return (
			<div className="row">
				<div className="col-sm">
				</div>
				<div className="col-4 mt-5 pl-5 pr-5 bg-white">
					<h2 className="text-center p-3 mt-5 text-white font-weight-lighter text-uppercase bg-blue">Check your email to verify your account</h2>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group text-center">
							<button type="submit" className="btn text-center btn-white font-weight-light border-white bg-bground m-4">Sign In</button>
						</div>
					</form>
				</div>
				<div className="col-sm">
				</div>
			</div>
		)
	};
}

export default CheckEmail;