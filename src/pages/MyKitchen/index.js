import React, { Component, Fragment } from "react";
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


const isExpired  = (item) => {
  let todaysDate = new Date();
  let itemExpiryDate = new Date(item.expiry);

  return itemExpiryDate.getTime() < todaysDate.getTime();
}

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
      <div className="card" >
          <div className="card-body">
            <h3 className="card-title">{item.name}</h3>
            <hr />
            <h5>{item.category}</h5>
            <p>{item.expiry}</p>
            <p>{renderExpiringSoonBadge(item)}</p>
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
    //<InventoryList/>
    <Slider {...sliderSettings}>
      {data.map((item, index) => {
        return (
          <div className="slider-item-container" key={index}>
            {renderNotExpiredItem(item)}
          </div>
        );
      })}
    </Slider>
  );
}


const getSlider = (data) => {
  if(data.length < 2) {
    return (
      <Fragment>
        {getSliderResponsive('mobile', data)}
      </Fragment>
    );
  }
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
  if(data.length < 1) {
    return (
      <Fragment/>
    )
  }

  let carouselControls = (
    <li data-target="#carouselExampleControls" data-slide-to="0" class="active"></li>
  )

  let carouselItems = (
    <div className="carousel-item active">
      <img className="d-block w-100" src="https://placekitten.com/200/300" alt="Slide" />
    </div>
  );

  data.shift();

  return (
    <div className="carousel-container">
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          {carouselControls}
          {data.map( (item, index) => {
            return (
              <li key={index} data-target="#carouselExampleControls" data-slide-to={index+1}></li>
            );
          })}
        </ol>
        <div className="carousel-inner">
          {carouselItems}
          {data.map((item, index)=>{
            return (
              <div className="carousel-item" key={index}>
                <img className="d-block w-100" src="https://placekitten.com/200/300" alt="Slide" />
              </div>
            );
          })}
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

const getJumbotron = () => {
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


const getBottomRow = (expired) => {
  if(expired.length > 0) {
    return (
      <Fragment>
        <div className="col-md-6">
          {getCarousel(expired)}
        </div>
        <div className="col-md-6">
          {getJumbotron()}
        </div>
      </Fragment>
    );
  }else {
    return (
      <div className="col">
        {getJumbotron()}
      </div>
    );
  }
}
class MyKitchen extends Component {

  constructor (props) {
    super(props);

    this.state = {
      inventory: [],
      expired: []
    };
  }

  componentDidMount() {
    let token = getToken();
    // List items from API 
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/listAllItems',{token: token})
    .then (res => {
      if(res.data.items === null || res.data.items === undefined) {
        throw new Error("Unable to obtain data.items from fetch call");
      }
      let inventory = [];
      let expired = [];
      res.data.items.forEach((item) => {
        if(isExpired(item)) {
          expired.push(item);
        }else {
          inventory.push(item);
        }
      });
      this.setState({inventory: inventory, expired: expired});
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
              {getSlider(this.state.inventory)}
            </div>
          </div>
          <div className="row bottom-row">
            {getBottomRow(this.state.expired)}
          </div>
			</div>
		);
	};
}

export default MyKitchen;