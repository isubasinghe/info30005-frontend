import React, { Component } from "react";
import Alert from 'react-bootstrap/Alert';

class InvalidEmail extends Component {

	constructor(props) {
		super(props);

		this.state = {
			show: true
		};
	}
	
	render () {
		const handleHide = () => this.setState({show:false});
		
		return (
			<>
			<Alert show={this.state.show} variant="warning">
				<Alert.Heading> Invalid </Alert.Heading>
				<p> There is no user with this email </p>
				<div className="d-flex justify-content-end">
					<button onClick={handleHide}
						variant="outline-success"> Close
					</button>
				</div>
			</Alert>

			{!this.state.show}
			</>
		)	
	}
}

export default InvalidEmail;