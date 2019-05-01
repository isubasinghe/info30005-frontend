import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../../helpers/jwtHelper';


class RecipeList extends Component {

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
          console.log("hello");
          console.log(res);
          this.setState({recipes: res.data[0].items});
          //console.log(res);

      })
      .catch(err => {
        console.log("world");
      });
  }

  
  
  render() {
    return (
      <ul>
        {this.state.recipes.map(recipe =>
          <li key={recipe.key}>
            <div className="Item-container" >
              <img src="recipe.image_url" alt="recipe"></img>
              <h1>
                {recipe.title}
              </h1>
              <h2>
                {recipe.publisher}
              </h2>
              <h3>
                {recipe.ingredients}
              </h3>
            </div>
          </li>)}
      </ul>
    )
  }
}

export default RecipeList;
