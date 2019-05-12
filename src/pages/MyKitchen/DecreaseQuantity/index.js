import React, { Component, Fragment } from "react";
import axios from 'axios';
import { getToken } from '../../../helpers/jwtHelper';
import {Button} from 'react-bootstrap';
class DecreaseQuantity extends Component {

	constructor (props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);

    }

	handleSubmit = e => {
    // prevent page from reloading
    e.preventDefault();
    
    let token = getToken();
    console.log(this.props.item._id);
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/decreaseQuantity',{token: token, id: this.props.item._id})
    .then (res => {
        console.log(res);
        window.location ="/";
    })
    .catch(err => {
        alert("Could not retrieve data");
    });
  }

	render() {
		return (
			<button type="button" className="btn btn-danger" style={{backgroundColor: 'transparent',color: 'red'}} onClick={this.handleSubmit}>
                -
            </button>
		)
	};
}

export default DecreaseQuantity;
