import React, { Component, Fragment } from "react";
import axios from 'axios';
import { getToken } from '../../helpers/jwtHelper';




const getFirstDescription = (data) => {
  return (
    <div className="jumbotron-container">
        <div className="jumbotron">
            <h1 className="display-4">
            Recipe preview
            </h1>
            <hr className="my-4" />
            <p>{data[0].title}</p>
            <p><a className="button-bground"href={data[0].f2f_url} >Go to recipe</a></p>
        </div>
    </div>
  );
}

class Preview extends Component {

	constructor (props) {
	    super(props);

	    this.state = {
	      recipes: []
	    };
	  }

	componentDidMount() {
    let token = getToken();
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/recipe/generate',{token: token})
      .then (res => {
          console.log(res);
          this.setState({recipes: res.data.recipes});

      })
      .catch(err => {
        alert("Could not retrieve data");
        console.log(err);
      });
  }

	render() {
		return (
			<div>{getFirstDescription(this.state.recipes)}
            </div>
		)
	};
}

export default Preview;
