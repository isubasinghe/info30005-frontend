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
    let token = getToken();
    console.log(this.props.item._id);
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/decreaseQuantity',{token: token, id: this.props.item._id})
    .then (res => {
        console.log(res);
        let item = this.props.item;
        item.quantity -= 1;
        let inventory = this.props.inventory;
        if(item.quantity == 0) {
            inventory.splice(this.props.index, 1);
        }else {
            inventory[this.props.index] = item;
        }
        
        this.props.setInventory(inventory);
    })
    .catch(err => {
        console.log(err.data);
        console.log(err);
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
