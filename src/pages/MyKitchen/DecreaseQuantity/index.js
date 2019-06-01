import React, { Component, Fragment } from "react";
import axios from 'axios';
import { getToken } from '../../../helpers/jwtHelper';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from "react-bootstrap-sweetalert";
class DecreaseQuantity extends Component {

	constructor (props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            showConfirm: false,
        }

    }

    handleConfirm = () => {
        let newQuantity = this.props.item.quantity-this.changeQuantity(this.props.item.units);
        if(newQuantity > 0){
            this.handleSubmit();
        }
        else{
            this.setState({showConfirm: true});
        }
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
    console.log(this.props.item._id);
    let newQuantity = this.props.item.quantity-this.changeQuantity(this.props.item.units)
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/updateQuantity',{token: token, quantity: newQuantity, id: this.props.item._id})
    .then (res => {
        console.log(res);
        let item = this.props.item;
        item.quantity = newQuantity;
        let inventory = this.props.inventory;
        if(item.quantity == 0) {
            inventory.splice(this.props.index, 1);
        }else {
            inventory[this.props.index] = item;
        }
        
        this.props.setInventory(inventory);
        this.setState({showConfirm: false});
        toast("Removed quanitity for item " + item.name);
    })
    .catch(err => {
        toast(err.response.data.msg);
        console.log(err.response.data.msg);
        console.log(err.data);
        console.log(err);
    });
  }
  cancelDelete = e =>{
      this.setState({showConfirm: false});
  }

	render() {
		return (
            <Fragment>
            <button type="button" className="btn btn-danger" style={{backgroundColor: 'transparent',color: 'red'}} onClick={this.handleConfirm}>
                -
            </button>
            {this.state.showConfirm && <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title="Are you sure?"
            onConfirm={this.handleSubmit}
            onCancel={this.cancelDelete}
            >
            </SweetAlert>}
            </Fragment>
			
		)
	};
}

export default DecreaseQuantity;
