import React, { Component, Fragment } from "react";
import axios from 'axios';
import { getToken } from '../../helpers/jwtHelper';
import {Button} from 'react-bootstrap';
import './preview.scss';

class Preview extends Component {

	constructor (props) {
	    super(props);

	    this.state = {
          recipes: [],
          showSpinner: true
	    };
    }
    getFirstDescription(data){
        console.log(data[0]);
        if(this.state.showSpinner === true){
            return(
                <div className="spinner-container">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                    </div>
                </div>
                </div>
            )
        }
        else{
            return (
                <div className="jumbotron-container">
                    <div className="jumbotron">
                        <h1 className="display-4">
                        Recipe preview
                        </h1>
                        <p>{data[0].title}</p>
                        <Button className="previewButton" variant="primary" href={data[0].f2f_url} >Go to recipe</Button>
                    </div>
                </div>
            );
        }
    }

	componentDidMount() {
    let token = getToken();
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/recipe/generate',{token: token})
      .then (res => {
          console.log(res);
          this.setState({recipes: res.data.recipes, showSpinner: false});

      })
      .catch(err => {
        alert("Could not retrieve data");
        console.log(err);
      });
  }

	render() {
		return (
			<div>{this.getFirstDescription(this.state.recipes)}
            </div>
		)
	};
}

export default Preview;