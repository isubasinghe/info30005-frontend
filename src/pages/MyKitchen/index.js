import React, { Component, Fragment } from "react";
import { NavLink }  from 'react-router-dom';
import MediaQuery from 'react-responsive';
import InventoryList from '../../components/InventoryList';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './mykitchen.scss';



const sliderSettingsDesktop = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
};

const sliderSettingsMobile = {
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
};

const data = [{name: 'Salmon'}, {name: 'Chicken'}, {name: 'Vegetable'}, {name: 'Beef'}, {name: 'Brocolli'}, {name: 'Apple'}];

const getSliderResponsive = (device, data) => {
  let sliderSettings = sliderSettingsDesktop;
  if(device==='mobile') {
    sliderSettings = sliderSettingsMobile;
  }
  return (
    <Slider {...sliderSettings} >
      {data.map((item, index) => {
        return (
          <div className="card" key={index}>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <hr />
              <p>This is food item</p>
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


const getCarousel = (data) => {
  return (
    <div className="carousel-container">
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="https://placekitten.com/400/200" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://placekitten.com/400/200" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://placekitten.com/400/200" alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  )
}

const getJumbatron = () => {
  return (
    <div className="jumbotron-container">
      <div className="jumbotron">
        <h1 className="display-4">
          Recipe preview
        </h1>
        <hr className="my-4" />
      </div>
    </div>
  );
}

class MyKitchen extends Component {

	render() {

		return (
      
			<div className="container">
          <div className="row">
            <div className="col">
              {getSlider(data)}
            </div>
          </div>
          <div className="row bottom-row">
            <div className="col-md-6">
              {getCarousel()}
            </div>
            <div className="col-md-6">
              {getJumbatron()}
            </div>
          </div>
			</div>
		);
	};
}

export default MyKitchen;