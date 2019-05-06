import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../../helpers/jwtHelper';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';


// Only render item if not expired
const renderNotExpiredItem = (item) => {
  let todaysDate = new Date();
  let itemExpiryDate = new Date(item.expiry);

  // Check if item is expired
  if (itemExpiryDate.getTime() > todaysDate.getTime()) {
    // Not expired, render the item
    return (
      /*<div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>*/


      /*<Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>*/

      // NB NB NB I HAVE USED REACT BOOTSTRAP - CAN WE DO THAT OR DO WE NEED TO USE BOOTSTRAP
      <Card border="secondary" text="blue" bg-center style={{ width: '5rem' }}>
        <Card.Body>
          <Card.Title>{item.name} </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>  
          <Card.Text> {item.expiry} </Card.Text>
          {renderExpiringSoonBadge(item)}
        </Card.Body>
      </Card>
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
      <ul>
        {this.state.items.map(item =>
          <div key={item.index}>
          <CardDeck>
            {renderNotExpiredItem(item)}
            </CardDeck>
          </div>)}
      </ul>
    )
  }
}

export default InventoryList;
