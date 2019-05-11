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
		
		return (
			<>
			<Alert show={this.state.show} variant="warning">
				<Alert.Heading> Error signing up </Alert.Heading>
				<p> {this.props.msg} </p>
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