import React, { Component, Fragment } from "react";
import axios from 'axios';
import { getToken } from '../../../helpers/jwtHelper';
import {Button} from 'react-bootstrap';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
class IncreaseQuantity extends Component {

	constructor (props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);

    }

	handleSubmit = e => {

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
        toast("Increased quanity for item " + item.name);
        
    })
    .catch(err => {
        toast(err.response.data.msg);
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
