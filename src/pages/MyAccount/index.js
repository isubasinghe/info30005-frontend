import React, { Component } from "react";
import withAuth from '../../helpers/withAuth';

class MyAccount extends Component {
  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}


export default withAuth(MyAccount);