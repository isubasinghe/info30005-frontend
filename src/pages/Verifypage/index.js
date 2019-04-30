import React, { Component } from 'react';
import axios from 'axios';
import './verify.scss';

class Verify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      verified: null,
      returnText: '',
    };

  }

  componentWillMount() {
    axios.get('http://foodspan.ap-southeast-1.elasticbeanstalk.com/auth/verify/' + this.props.match.params.key)
    .then(data => {
      console.log(data.data);
      if(data.data.msg === "Verfied user") {
        this.setState({verified: true});
      }else {
        this.setState({verified: false, returnText: 'Invalid verify key was supplied'});
      }
    }).catch(err => {
      // Internal server error
      this.setState({verified: false, returnText: 'Internal server error occurred'});
    });
  }


  renderAfterPost() {
    if(this.state.verified === true) {
      return (
        <div className="jumbotron">
          <h1 className="display-4">Email Verified</h1>
          <p className="lead">Welcome to FoodSpan</p>
          <hr className="my-4" />
          <p>FoodSpan is guranteed to provide you with a great experience in reducing your food wastage</p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="/" role="button">Show me more</a>
          </p>
        </div>
      );
    }else if(this.state.verified === false) {
      return (
        <div className="alert alert-danger" role="alert">
          {this.state.returnText}
        </div>
      );
    }else {
      return (
        <div className="spinner-container">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="verified-container">
        {this.renderAfterPost()}
      </div>
    );
  }
}

export default Verify;