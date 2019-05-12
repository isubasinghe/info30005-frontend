import React, { Component } from "react";
import axios from 'axios';
import { getToken, getLocation } from '../../../helpers/jwtHelper';


class AddItem extends Component {

  constructor (props) {
    super(props);
    
    this.state = {
      showModal: true,
      name: '',
      category: 'FRUIT',
      expiry: '',
      location: getLocation(),
      quantity: 0,
      units: ''
    };
    console.log(props);
    
  }

  handleSubmit = e => {
    console.log("handle submit");
    e.preventDefault();

    const item = {
      name: this.state.name,
      // default category
      category: this.state.category,
      location: this.state.location,
      expiry: this.state.expiry,
      quantity: parseInt(this.state.quantity, 10),
      // default unit
      units: 'piece'
    }

    let token = getToken();

    console.log(item);
    // List items from API 
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/addItem', {token: token, item: item})
    .then (res => {
       console.log(res.data);
       let inventory = this.props.inventory;
       inventory.push(item);
       this.props.setInventory(inventory);
    })
    .catch(err => {
      alert("Could not add item to database");
      console.log(err.response.data);
    });

    this.props.setShowModal(false);
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

  handleQuantityChange = e => {
    this.setState({quantity: e.target.value});
  }

  handleUnitsChange = e => {
    this.setState({units: e.target.value});
  }

	render() {

		return (


			<form onSubmit={(e) => {e.preventDefault()}}>
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
         <label htmlFor="expiry-date" className="col-form-label">expiry date</label>
          <div>
            <input className="form-control text-blue" type="date" id="expiry-date" onChange={this.handleExpiryChange}></input>
          </div>
        </div>
        <div className="modal-footer">
            <button type="submit" className="btn btn-primary btn-center" data-dismiss="modal" onClick={this.handleSubmit}>add</button>
          </div>
      </form>
		);
	};
}

export default AddItem;