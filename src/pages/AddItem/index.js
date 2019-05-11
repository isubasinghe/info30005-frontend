import React, { Component } from "react";
import { Link }  from 'react-router-dom';
import axios from 'axios';
import { storeToken } from '../../helpers/jwtHelper';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddItemForm extends Component {

  constructor(){
      super();

      this.state = {
          name:'',
          category:'',
        //   location: {type: 'Point', coordinates : []},
          quantity: 0,
          units: 0,
          expiry: new Date()
      };

      // When called this will cause the handleChange functions with the event e = this.
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleCategoryChange = this.handleCategoryChange.bind(this);
    //   this.handleLocationChange = this.handleLocationChange.bind(this);
      this.handleQuantityChange = this.handleQuantityChange.bind(this);
      this.handleUnitsChange = this.handleUnitsChange.bind(this);
      this.handleExpiryChange = this.handleExpiryChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleNameChange(e) {
      this.setState({
          name: e.target.value,
      });
  }

  handleCategoryChange(e) {
      this.setState({
          category: e.target.value
      });
  }
  handleQuantityChange(e) {
    this.setState({
        quantity: e.target.value
    });
}
handleUnitsChange(e) {
    this.setState({
        units: e.target.value
    });
}
handleExpiryChange(date) {
    this.setState({
        expiry: date
    });
}
// handleLocationChange(e) {
//     this.setState({
//         location: {coordinates: e.target.value}
//     });
// }

  handleSubmit(e) {
      // Prevent page from reloading
      e.preventDefault();

      axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/addItem', {
        name: this.state.name,
        category: this.state.category,
        // location: {coordinates: this.state.location.coordinates},
        quantity: this.state.quantity,
        units: this.state.units,
        expiry: this.state.expiry,

      })
      .then(res => {
          console.log("Added item");
          window.location = "/";

      }).catch(err => {
        alert("Could not create item");
        console.log(err);
      });

  }

  render() {
      return (
        <div className="d-flex justify-content-center">

            <div className="signin-container">
            <div className="col mt-5 pl-5 pr-5 pt-2 bg-white">
                <h2 className="text-center p-3 mt-5 text-white font-weight-lighter text-lowercase bg-blue rounded">Add Item </h2>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group pt-4 pl-5 pr-5">
                        <p className="text-center text-blue font-weight-lighter text-lowercase">Name</p>
                        <input type="name" className="form-control border-primary text-center text-blue font-weight-light"
                                id="name" placeholder="enter your name" required onChange={this.handleNameChange}/>
                        <div className="invalid-tooltip"> </div>
                    </div>
                    <div className="form-group pt-4 pl-5 pr-5">
                        <p className="text-center text-blue font-weight-lighter text-lowercase">Category</p>
                        <input type="category" className="form-control border-primary text-center text-blue font-weight-light"
                                id="category" placeholder="enter your category" required onChange={this.handlePasswordChange}/>
                        <div className="invalid-tooltip"> </div>
                    </div>
                    {/* <div className="form-group pt-4 pl-5 pr-5">
                        <p className="text-center text-blue font-weight-lighter text-lowercase">Location</p>
                        <input type="location" className="form-control border-primary text-center text-blue font-weight-light"
                                id="location" placeholder="enter your location" required onChange={this.handleLocationChange}/>
                        <div className="invalid-tooltip"> </div>
                    </div> */}
                    <div className="form-group pt-4 pl-5 pr-5">
                        <p className="text-center text-blue font-weight-lighter text-lowercase">Quantity</p>
                        <input type="quantity" className="form-control border-primary text-center text-blue font-weight-light"
                                id="quantity" placeholder="enter your quantity" required onChange={this.handleQuantityChange}/>
                        <div className="invalid-tooltip"> </div>
                    </div>
                    <div className="form-group pt-4 pl-5 pr-5">
                        <p className="text-center text-blue font-weight-lighter text-lowercase">Units (kg/L)</p>
                        <input type="units" className="form-control border-primary text-center text-blue font-weight-light"
                                id="units" placeholder="enter your units" required onChange={this.handleUnitsChange}/>
                        <div className="invalid-tooltip"> </div>
                    </div>
                    <div className="form-group pt-4 pl-5 pr-5">
                        <p className="text-center text-blue font-weight-lighter text-lowercase">Expiry Date</p>
                        <DatePicker
                            selected={this.state.expiry}
                            onChange={this.handleExpiryChange}
                        />
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn text-center btn-white font-weight-light border-white text-dark
                                  bg-bground m-3 mb-5">Add</button>
                        {this.state.valid && <p msg="errorr"/>}
                    </div>
                </form>
            </div>
            </div>
        </div>
      )
  };
}

export default AddItemForm;
