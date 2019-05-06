import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../../helpers/jwtHelper';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';


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
      <ul>
        {this.state.recipes.map(recipe =>
          <div key={recipe.recipe_id}>
          <CardDeck>
            <Card border="secondary" text="blue" bg-center style={{ width: '5rem' }}>
              <Card.Img variant="top" src={recipe.image_url} responsive />
              <Card.Body>
                <Card.Title>{recipe.title} </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{recipe.publiser}</Card.Subtitle>  
                <Card.Text> Publisher: {recipe.publisher}</Card.Text>
                <div className="form-group pt-4">
                        <Card.Link to={recipe.f2f_url} className="btn text-blue text-center font-weight-light m-4">
                            Click here to go to recipe</Card.Link>
                    </div>
              </Card.Body>
            </Card>
          </CardDeck>
          </div>)}
      </ul>
    )
  }
}

export default RecipeList;
