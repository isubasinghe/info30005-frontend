import React, { Component } from "react";
import Alert from 'react-bootstrap/Alert';

class ShowErrorMessage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			show: true
		};
	}
	
	render () {
		const handleHide = () => this.setState({show:false});
		//const handleShow = () => this.setState({show:true})

		return (
			<>
			<Alert show={this.state.show} variant="warning">
				<Alert.Heading> Email already in use </Alert.Heading>
				<p> Use another email to create your account </p>
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

export default ShowErrorMessage;