import React, { Component, Fragment } from "react";
import MediaQuery from 'react-responsive';
import axios from 'axios';
import { getToken } from '../../helpers/jwtHelper';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import withAuth from '../../helpers/withAuth';

import './myrecipes.scss';

function CustNextArrow (props) {
  const {className, style, onClick} = props;
  return (
    <div
      className = {className}
      style = {{...style, display: "block", background: "#7075A3"}}
      onClick = {onClick}
      />
  );
}

function CustPrevArrow (props) {
  const {className, style, onClick} = props;
  return (
    <div
      className = {className}
      style = {{...style, display: "block", background: "#7075A3" }}
      onClick = {onClick}
      />
  );
}

const sliderSettingsDesktop = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
  nextArrow: <CustNextArrow/>,
  prevArrow: <CustPrevArrow/>
};

const sliderSettingsMobile = {
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false,
  nextArrow: <CustNextArrow/>,
  prevArrow: <CustPrevArrow/>
};

const getSliderResponsive = (device, data) => {
  let sliderSettings = sliderSettingsDesktop;
  if(device==='mobile') {
    sliderSettings = sliderSettingsMobile;
  }
  return (
    <Slider {...sliderSettings}>
      {data.map((recipe, index) => {
        return (
          <div className="card mt-5" key={recipe.index}>
          <div className="card-body">
            <h5 className="card-title bg-primary text-white p-3">{recipe.title}</h5>
            <hr />
            <h7>Publisher: {recipe.publisher}</h7>
            <p><a className="button-bground"href={recipe.f2f_url} >Go to recipe</a></p>
              <div className="media">
                <img className="d-block bg-bground" src={recipe.image_url} alt="A food recipe" />
              </div>
          </div>
        </div>
        );
      })}
    </Slider>
  );
}


const getSlider = (data) => {
  return (
    <Fragment>
      <MediaQuery query="(min-width: 1224px)">
        {getSliderResponsive('desktop', data)}
      </MediaQuery>
      <MediaQuery  query="(max-width: 1224px)">
        <div className="slick-mobile">
          {getSliderResponsive('mobile', data)}
        </div>
      </MediaQuery>
    </Fragment>
  );
}

class MyRecipes extends Component {

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

//{getCarousel(this.state.items)}
//{getJumbotron(<RecipeList/>)}

	render() {
		return (
			<div className="container">
	          <div className="row">
	            <div className="col">
	              {getSlider(this.state.recipes)}
	            </div>
	          </div>
	          <div className="row bottom-row">
	            <div className="col-md-6">

	            </div>
	            <div className="col-md-6">

	            </div>
	          </div>
			</div>
		)
	};
}

export default withAuth(MyRecipes);
