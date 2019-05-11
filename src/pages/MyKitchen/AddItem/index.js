import React, { Component } from "react";
import axios from 'axios';
import { getToken } from '../../../helpers/jwtHelper';


class AddItem extends Component {

  constructor (props) {
    super(props);

    this.state = {
      name: '',
      category: '',
      expiry: '',
      location: '',
      quantity: 0,
      units: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    const item = {
      name: this.state.name,
      category: this.state.category,
      expiry: this.state.expiry,
      location: this.state.location,
      quantity: this.state.quantity,
      units: this.state.units
    }

    let token = getToken();
    // List items from API 
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/addItem', {token: token, item: item})
    .then (res => {
       console.log(res);
    })
    .catch(err => {
      alert("Could not add item to database");
      console.log(err);
    });
  }

  handleNameChange = e => {
    this.setState({name: e.target.value});
  }

  handleCategoryChange = e => {
    this.setState({category: e.target.value});
  }

  handleExpiryChange = e => {
    this.setState({expiry: e.target.value});
  }

  handleLocationChange = e => {
    this.setState({location: e.target.value});
  }

  handleQuantityChange = e => {
    this.setState({quantity: e.target.value});
  }

  handleUnitsChange = e => {
    this.setState({units: e.target.value});
  }

	render() {

		return (
			<form onSubmit = {this.handleSubmit}>
        <div class="form-group">
          <label for="item-name" class="col-form-label">name of item</label>
          <input type="text" class="form-control text-blue" id="item-name" required 
              onChange={this.handleNameChange}></input>
        </div>
        <div class="form-group">
          <label for="item-category" class="col-form-label">category</label>
          <select class="form-control text-blue" id="item-category" onChange={this.handleCategoryChange}>
            <option>FRUIT</option>
            <option>VEG</option>
            <option>MEAT</option>
            <option>FISH</option>
          </select>
        </div>
        <div class="form-group">
          <label for="item-quantity" class="col-form-label">quantity</label>
          <select class="form-control text-blue" id="item-quantity" onChange={this.handleQuantityChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
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
        <div class="form-group">
         <label for="expiry-date" class="col-form-label" onChange={this.handleExpiryChange}>expiry date</label>
          <div>
            <input class="form-control text-blue" type="date" id="expiry-date"></input>
          </div>
        </div>
        <div class="form-group">
          <label for="item-location" class="col-form-label" onChange={this.handleLocationChange}>location</label>
          <input type="text" class="form-control text-blue" id="item-name"></input>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-primary btn-center">add</button>
          </div>
      </form>
		);
	};
}

export default AddItem;