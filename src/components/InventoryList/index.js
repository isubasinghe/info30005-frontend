import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../../helpers/jwtHelper';


class InventoryList extends Component {

  constructor (props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    let token = getToken();
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/listAllItems',{token: token})
      .then (res => {
          this.setState({items: res.data[0].items});
          console.log(res);
      })
      .catch(err => {
        console.log("hihi");
      });
  }


  // Only render item if not expired
  /*renderNotExpiredItem(item) {
    let todaysDate = new Date();
    if (item.expiry > todaysDate) {
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
    } else {
      // skip rendering
    }
  }*/
//{renderNotExpiredItem(item)}
  
  
  render() {
    //let todaysDate = new Date();
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
