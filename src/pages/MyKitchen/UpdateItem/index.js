import React, { Component, Fragment } from "react";
import axios from 'axios';
import { getToken, getLocation } from '../../../helpers/jwtHelper';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class UpdateItem extends Component {

  constructor (props) {
    super(props);
    
    this.state = {
      name: '',
      category: '',
      expiry: '',
      showUpdateModal: true,
      location: getLocation(),
      quantity: 0,
      units: 'piece',
      failed: false,
      errMsg: ''
    };

  console.log(props);

}

  handleSubmit = e => {
    e.preventDefault();
    console.log("handle submit");

    const item = {
      name: this.state.name,
      // default category
      category: this.state.category,
      location: this.state.location,
      expiry: this.state.expiry,
      quantity: parseInt(this.state.quantity, 10),
      // default unit
      units: this.state.units
    }

    
    console.log(item);
    // List items from API 
    let token = getToken();
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/updateQuantity', {token: token, item: item})
    .then (res => {
       console.log(res.data);
       let inventory = this.props.inventory;
       inventory.push(item);
       this.props.setInventory(inventory);
       toast("Updated item quantity");
    })
    .catch(err => {
      toast(err.response.data.msg);
    });

    this.props.setShowUpdateModal(false);
  }

  handleQuantityChange = e => {
    this.setState({quantity: e.target.value});
  }

  handleUnitsChange = e => {
    this.setState({units: e.target.value});
  }

  render() {

    return (

      <Fragment>
        <form onSubmit={(e) => {e.preventDefault()}}>
          
          <div className="form-group">
            <label for="item-quantity" className="col-form-label">quantity</label>
            <input type="number" class="form-control text-blue" id="item-quantity" 
              required onChange={this.handleQuantityChange}>
            </input>
          </div>
          <div className="form-group">
            <label for="item-units" class="col-form-label">units</label>
            <select className="form-control text-blue" id="item-units" onChange={this.handleUnitsChange}>
              <option>piece</option>
              <option>g</option>
              <option>kg</option>
              <option>mL</option>
              <option>L</option>
            </select>
          </div>

          <div className="modal-footer">
              <button type="submit" className="btn btn-primary btn-center" data-dismiss="modal" 
                onClick={this.handleSubmit}>update</button>
            </div>
        </form>
      </Fragment>
    );
  };
}

export default UpdateItem;