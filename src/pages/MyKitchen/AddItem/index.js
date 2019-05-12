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
      quantity: parseInt(this.state.quantity, 10),
      units: this.state.units
    }

    let token = getToken();

    console.log(item);
    // List items from API 
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/addItem', {token: token, item: item})
    .then (res => {
       console.log(res.data);
    })
    .catch(err => {
      alert("Could not add item to database");
      console.log(err.response.data);
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
        <div className="form-group">
          <label htmlFor="item-name" className="col-form-label">name of item</label>
          <input type="text" className="form-control text-blue" id="item-name" required 
              onChange={this.handleNameChange}></input>
        </div>
        <div className="form-group">
          <label htmlFor="item-category" className="col-form-label">category</label>
          <select className="form-control text-blue" id="item-category" onChange={this.handleCategoryChange}>
            <option>FRUIT</option>
            <option>VEG</option>
            <option>MEAT</option>
            <option>FISH</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="item-quantity" className="col-form-label">quantity</label>
          <input type="number" className="form-control text-blue" id="item-quantity" required 
              onChange={this.handleQuantityChange}></input>
        </div>
        <div className="form-group">
          <label htmlor="item-units" className="col-form-label">units</label>
          <select className="form-control text-blue" id="item-units" onChange={this.handleUnitsChange}>
            <option>piece</option>
            <option>g</option>
            <option>kg</option>
            <option>mL</option>
            <option>L</option>
          </select>
        </div>
        <div className="form-group">
         <label htmlFor="expiry-date" className="col-form-label" onChange={this.handleExpiryChange}>expiry date</label>
          <div>
            <input className="form-control text-blue" type="date" id="expiry-date"></input>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="item-location" className="col-form-label" onChange={this.handleLocationChange}>location</label>
          <input type="text" className="form-control text-blue" id="item-name"></input>
        </div>
        <div className="modal-footer">
            <button type="submit" className="btn btn-primary btn-center">add</button>
          </div>
      </form>
		);
	};
}

export default AddItem;