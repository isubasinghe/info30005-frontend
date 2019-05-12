import React, { Component } from "react";
import axios from 'axios';
import { getToken } from '../../../helpers/jwtHelper';

const renderListOfItems = (data) => {

  data.map((item, index)=>{
    let itemExpiryDate = new Date(item.expiry);
    return (
      <option key={index}>
        {console.log("%s -- expiry date: %s", item.name.toLowerCase(),itemExpiryDate.toDateString())}
        {item.name.toLowerCase()} -- expiry date: {itemExpiryDate.toDateString()}
      }
      </option>
    );
  })
}


class UpdateItem extends Component {

  constructor (props) {
    super(props);

    this.state = {
      quantity: 0,
      units: '' 
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    const item = {
      quantity: this.state.quantity,
      units: this.state.units
    }

    let token = getToken();
    // List items from API 
    /*axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/updateQuantity',
        {token: token, "items.id": id, "items.$.quantity": quantity})
    .then (res => {
       console.log(res);
    })
    .catch(err => {
      alert("Could not add item to database");
      console.log(err);
    });*/
  }

  handleQuantityChange = e => {
    this.setState({quantity: e.target.value});
  }

  handleUnitsChange = e => {
    this.setState({units: e.target.value});
  }

	render() {

		return (
			<form onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label for="item-name" class="col-form-label">select item to update</label>
          <select>
            {renderListOfItems(this.props.items)}
          </select>
        </div>
        <div class="form-group">
          <label for="item-quantity" class="col-form-label">quantity</label>
          <input type="number" class="form-control text-blue" id="item-quantity" onChange={this.handleQuantityChange}>
          </input>
        </div>
        <div class="form-group">
          <label for="item-units" class="col-form-label">units</label>
          <select class="form-control text-blue" id="item-units" onChange={this.handleUnitsChange}>
            <option>piece</option>
            <option>g</option>
            <option>kg</option>
            <option>mL</option>
            <option>L</option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">update</button>
        </div>
      </form>
		);
	};
}

export default UpdateItem;