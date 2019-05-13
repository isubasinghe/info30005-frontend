import React, { Component, Fragment } from "react";
import axios from 'axios';
import { getToken } from '../../../helpers/jwtHelper';
import {Button} from 'react-bootstrap';
class IncreaseQuantity extends Component {

	constructor (props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);

    }

	handleSubmit = e => {
    // prevent page from reloading
    e.preventDefault();

    let token = getToken();
    console.log(this.props.item._id);

    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/increaseQuantity',{token: token, id: this.props.item._id})
    .then (res => {
        console.log(res);
        let item = this.props.item;
        item.quantity += 1;
        let inventory = this.props.inventory;
        inventory[this.props.index] = item;
        this.props.setInventory(inventory);
        
    })
    .catch(err => {
        alert("Could not retrieve data");
    });

    
  }

	render() {
		return (
			<button type="button" className="btn btn-success" style={{backgroundColor: 'transparent', color: 'green'}} onClick={this.handleSubmit}>
                +
            </button>
		)
	};
}

export default IncreaseQuantity;
