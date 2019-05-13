
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
      style = {{...style}}
      onClick = {onClick}
      />
  );
}

function CustPrevArrow (props) {
  const {className, style, onClick} = props;
  return (
    <div
      className = {className}
      style = {{...style}}
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
  if (data.length > 0 ){
    return (
      <Slider {...sliderSettings}>
        {data.map((recipe, index) => {
          return (
            <div className="card mt-5" key={recipe.index}>
            <div className="card-body">
              <h5 className="card-title bg-primary text-white p-3">{recipe.title}</h5>
              <hr />
              <h7>publisher: {recipe.publisher}</h7>
              <p><a className="button-bground"href={recipe.f2f_url} target="_blank">go to recipe</a></p>
                <div className="media">
                  <img className="d-flex bg-bground justify-content-center" src={recipe.image_url} alt="a food recipe" />
                </div>
            </div>
          </div>
          );
        })}
      </Slider>
    );
  }
  else{
    return (
      <div className="jumbotron">
      <h1 className="display-4">we're having troubles generating recipes for now</h1>
      <p className="lead">additionally, please ensure you have added some items in my kitchen</p>
      <hr className="my-4"></hr>
      <p>head back over to my kitchen to see what items you have</p>
      <p className="lead">
        <a className="btn btn-primary btn-lg" href="/" role="button">my kitchen</a>
      </p>
      </div>
    )
  }
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
      });
  }

	render() {
		return (
			<div className="container">
	          <div className="row">
	            <div className="col">
	              {getSlider(this.state.recipes)}
	            </div>
	          </div>
			</div>
		)
	};
}

export default withAuth(MyRecipes);
