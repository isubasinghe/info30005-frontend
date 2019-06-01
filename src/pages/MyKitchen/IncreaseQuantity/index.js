import React, { Component } from "react";
import axios from 'axios';
import { getToken } from '../../../helpers/jwtHelper';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
class IncreaseQuantity extends Component {

	constructor (props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    changeQuantity(units){
        if(units === "piece"){
            return 1;
        }
        else{
            return 100;
        }
    
    }

	handleSubmit = e => {

    let token = getToken();
    let newQuantity = this.props.item.quantity+ this.changeQuantity(this.props.item.units);
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/updateQuantity',{token: token, quantity: newQuantity, id: this.props.item._id})
    .then (res => {
        let item = this.props.item;
        item.quantity = newQuantity;
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
