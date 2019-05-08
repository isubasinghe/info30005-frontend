import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../../helpers/jwtHelper';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Slider from "react-slick";

// Only render item if not expired
const renderNotExpiredItem = (item) => {
  let todaysDate = new Date();
  let itemExpiryDate = new Date(item.expiry);

  // Check if item is expired
  if (itemExpiryDate.getTime() > todaysDate.getTime()) {
    // Not expired, render the item
    return (
        <div className="card" key={item.index}>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <hr />
              <p>This is food</p>
            </div>
          </div>

        /*<Card.Body>
          <Card.Title>{item.name} </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>  
          <Card.Text> {item.expiry} </Card.Text>
          {renderExpiringSoonBadge(item)}
        </Card.Body>*/

    )
  }
}

const renderExpiringSoonBadge = (item) => {
  if (itemExpiringSoon(item)) {
    return (
      <span class="badge badge-primary badge-pill" text-center>expiring soon</span>
      )
  }
}

const itemExpiringSoon = (item) => {
  let todaysDate = new Date();
  let itemExpiryDate = new Date(item.expiry);

  // Check if item is close to expire
  if ((itemExpiryDate.getDate()-todaysDate.getDate()) <= 2 && itemExpiryDate.getYear()===todaysDate.getYear() 
      && itemExpiryDate.getMonth() === todaysDate.getMonth()) {
    console.log(itemExpiryDate.getDate()-todaysDate.getDate());
    return true;
  }
  return false;
}


class InventoryList extends Component {

  constructor (props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    let token = getToken();
    // List items from API 
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/listAllItems',{token: token})
      .then (res => {
          this.setState({items: res.data.items});
          console.log(res.data);
      })
      .catch(err => {
        alert("Could not retrieve data");
        console.log(err);
      });
  }

  
  render() {
    return (
      this.state.items.map(item =>
        {renderNotExpiredItem(item)})
    )
  }
}

export default InventoryList;
