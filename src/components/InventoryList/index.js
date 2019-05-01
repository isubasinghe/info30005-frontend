import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../../helpers/jwtHelper';


// Only render item if not expired
const renderNotExpiredItem = (item) => {
  let todaysDate = new Date();
  let itemExpiryDate = new Date(item.expiry);

  // Check if item is expired
  if (itemExpiryDate.getTime() > todaysDate.getTime()) {
    // Not expired, render the item
    return (
      <div className="Item-container" >
        <h1>
          {item.name}
        </h1>
        <h2>
          {item.category}
        </h2>
        <h3>
          {item.expiry}
        </h3>
      </div>
    )
  }
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
          this.setState({items: res.data[0].items});
          console.log(res);
      })
      .catch(err => {
      });
  }

  
  render() {
    return (
      <ul>
        {this.state.items.map(item =>
          <div key={item.index}>
            {renderNotExpiredItem(item)}
          </div>)}
      </ul>
    )
  }
}

export default InventoryList;
