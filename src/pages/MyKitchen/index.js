import React, { Component, Fragment } from "react";
import { NavLink }  from 'react-router-dom';
import MediaQuery from 'react-responsive';
import axios from 'axios';
import { getToken } from '../../helpers/jwtHelper';


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

const renderExpiringSoonBadge = (item) => {
  if (itemExpiringSoon(item)) {
    return (
      <span class="badge badge-primary badge-pill" text-center>expiring soon</span>
      )
  }
}

const itemExpiringSoon = (item) => {
  let todaysDate = new Date();
  let itemExpiryDate = new Date(item.expiry);

  // Check if item is close to expire
  if ((itemExpiryDate.getDate()-todaysDate.getDate()) <= 2 && itemExpiryDate.getYear()===todaysDate.getYear() 
      && itemExpiryDate.getMonth() === todaysDate.getMonth()) {
    console.log(itemExpiryDate.getDate()-todaysDate.getDate());
    return true;
  }
  return false;
}

// Only render item if not expired
const renderNotExpiredItem = (item) => {
  let todaysDate = new Date();
  let itemExpiryDate = new Date(item.expiry);

  // Check if item is expired
  if (itemExpiryDate.getTime() > todaysDate.getTime()) {
    // Not expired, render the item
    return (
      <div className="card" key={item.index}>
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <hr />
            <h7>{item.category}</h7>
            <p>Expiry date: {itemExpiryDate.toDateString()}</p>
            <p>{renderExpiringSoonBadge(item)}</p>
          </div>
        </div>
    )
  }
}

const renderExpiredItem = (item) => {
  let todaysDate = new Date();
  let itemExpiryDate = new Date(item.expiry);

  // Check if item is expired
  if (itemExpiryDate.getTime() < todaysDate.getTime()) {
    // Expired, render the item
    return (
      <div className="card" key={item.index}>
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <hr />
            <h7>{item.category}</h7>
            <p>{itemExpiryDate}</p>
          </div>
        </div>
    )
  }
}

const getSliderResponsive = (device, data) => {
  let sliderSettings = sliderSettingsDesktop;
  if(device==='mobile') {
    sliderSettings = sliderSettingsMobile;
  }
  return (
    <Slider {...sliderSettings}>
      {data.map((item, index) => {
        return (
          renderNotExpiredItem(item)
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
            {renderExpiredItem}
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

const getJumbotron = (item) => {
  return (
    <div className="jumbotron-container">
      <div className="jumbotron">
        <h1 className="display-4">
          {console.log(item)}
        </h1>
        <hr className="my-4" />
        
      </div>
    </div>
  );
}

class MyKitchen extends Component {

  constructor (props) {
    super(props);

    this.state = {
      items: [],
      recipes: []
    };
  }

  componentDidMount() {
    let token = getToken();
    // List items from API 
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/listAllItems',{token: token})
      .then (res => {
          this.setState({items: res.data.items});
          //console.log(res.data);
      })
      .catch(err => {
        alert("Could not retrieve data");
        console.log(err);
      });

    // List recipes from API
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
      
			<div className="container">
          <div className="row">
            <div className="col">
              {getSlider(this.state.items)}
            </div>
          </div>
          <div className="row bottom-row">
            <div className="col-md-6">
              {getCarousel(this.state.items)}
            </div>
            <div className="col-md-6">
              
              {getJumbotron(this.state.recipes[0])}

              
            </div>
          </div>
			</div>
		);
	};
}

export default MyKitchen;