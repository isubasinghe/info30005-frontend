import React, { Component } from 'react';
import axios from 'axios';
import { isLoggedIn, removeToken } from '../../helpers/jwtHelper';


class InventoryList extends Component {

  constructor (props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/listAllItems')
      .then (res => {
          this.setState({items: res.data});
          console.log(res);
      })
  }
  
  render() {
    return (
      <ul>
        {this.state.items.map(item =>
          <li key={item.index}>
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
          </li>)}
      </ul>
    )
  }
}

export default InventoryList;
