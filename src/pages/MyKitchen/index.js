import React, { Component, Fragment } from "react";
import MediaQuery from 'react-responsive';
import axios from 'axios';
import { getToken } from '../../helpers/jwtHelper';

import Preview from './preview.js';

import AddItem from './AddItem';
import IncreaseQuantity from './IncreaseQuantity';
import DecreaseQuantity from './DecreaseQuantity';
import Remove from './RemoveButton';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './mykitchen.scss';
import AutoSuggest from "../../components/AutoSuggest";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{...style}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    />
  );
}

const sliderSettingsDesktop = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};

const sliderSettingsMobile = {
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};

// Buttons to either enter a new item or update a new one
const getButtonToolbar = (inventory, setInventory, showModal, setShowModal) => {
  return (
    <Fragment>
      <button type="button" onClick={()=>{setShowModal(true)}} className="btn btn-secondary add-button" data-toggle="modal" data-target=".bd-add-modal-lg">+</button>
      {showModal && addNewItem(inventory, setInventory, setShowModal)}
    </Fragment>
  );
}

// Add new item to inventory
const addNewItem = (inventory, setInventory, setShowModal) => {
  return (
    <div className="modal fade bd-add-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalScrollableTitle">add new item</h5>
            <button id="close-modal" type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <AddItem setShowModal={setShowModal} inventory={inventory} setInventory={setInventory} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Check if an item is expired
const isExpired  = (item) => {
  let todaysDate = new Date();
  let itemExpiryDate = new Date(item.expiry);


  return itemExpiryDate.getTime() < todaysDate.getTime();
}

// Render a badge on items that are expiring soon
const renderExpiringSoonBadge = (item) => {
  let itemExpiryDate = new Date(item.expiry);
  let todaysDate = new Date();
  let daysToExpire = itemExpiryDate.getDate()-todaysDate.getDate();

  if (itemExpiringSoon(item)) {
    return (
      <div>
        <span className="badge badge-primary badge-pill" text-center="true">expiring in {daysToExpire} day(s)</span>
      </div>
      )
  }
}

// Check if an item is expiring soon
const itemExpiringSoon = (item) => {
  let todaysDate = new Date();
  let itemExpiryDate = new Date(item.expiry);

  // Check if item is close to expire
  if ((itemExpiryDate.getDate()-todaysDate.getDate()) <= 2 && itemExpiryDate.getYear()===todaysDate.getYear() 
      && itemExpiryDate.getMonth() === todaysDate.getMonth()) {
    return true;
  }
  return false;
}

// Only render item if not expired
const renderNotExpiredItem = (item, index, inventory, setInventory) => {
  let itemExpiryDate = new Date(item.expiry);

  // Check if item is expired
  if (daysOverdue(item)===0 && monthsOverdue(item)===0 && yearsOverdue(item)===0) {
    // Not expired, render the item
    return (
      <div className="card card-inventory" >
          <div className="card-body">
            <h3 className="card-title text-center">{item.name.toLowerCase()} {renderExpiringSoonBadge(item)}</h3>
            <hr />
            <div className="h5 text-center">{item.category}</div>
            <p><b>expiring on:</b> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp; {itemExpiryDate.toDateString()}</p>
            <hr className="hr"/>
            
            <div className="d-flex justify-content-between quantity-group">
              <DecreaseQuantity index={index} inventory={inventory} setInventory={setInventory} item={item}></DecreaseQuantity>
              <p>{item.quantity} {item.units}</p>
              <IncreaseQuantity index={index} inventory={inventory} setInventory={setInventory} item={item}></IncreaseQuantity> 
            </div>
          </div>
        </div>
    )
  }
}

const SliderFC = (props) => {
  let [sliderRef, setRef] = React.useState(React.createRef());
  let sliderSettings = sliderSettingsDesktop;
  if(props.device==='mobile') {
    sliderSettings = sliderSettingsMobile;
  }

  return (

    <div className="container">
      <div className="row">
        <div className="col d-flex justify-content-center" style={{marginBottom: '10px'}}>
          <AutoSuggest slider={sliderRef} inventory={props.data} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Slider ref={slider => setRef(slider)} {...sliderSettings}>
            {props.data.map((item, index) => {
              return (
                  <div className="slider-item-container" key={index}>
                    {renderNotExpiredItem(item, index, props.data, props.setInventory)}
                  </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
    

  );
}

// Make inventory slider responsive to different devices
const getSliderResponsive = (device, data, setInventory) => {
  return (
    <SliderFC device={device} data={data} setInventory={setInventory} />
  )
}

// Slider with the user's items
const getSlider = (data, setInventory) => {
  if(data.length < 2) {
    return (
      <Fragment>
        {getSliderResponsive('mobile', data, setInventory)}
      </Fragment>
    );
  }
  return (
    <Fragment>
      <MediaQuery query="(min-width: 1224px)">
        {getSliderResponsive('desktop', data, setInventory)}
      </MediaQuery>
      <MediaQuery  query="(max-width: 1224px)">
        <div className="slick-mobile">
          {getSliderResponsive('mobile', data, setInventory)}
        </div>
      </MediaQuery>
    </Fragment>
  );
} 

// Find how many days it has been since item expired
const daysOverdue = (item) => {
  let itemExpiryDate = new Date(item.expiry);
  let todaysDate = new Date();

  // Double-checking if item is expired
  if (isExpired(item)) {
    let daysOverdue = todaysDate.getDate()-itemExpiryDate.getDate();
    return Math.abs(daysOverdue);
  }
  else {
    // Not expired yet, days overdue = 0
    return 0;
  }
}

// Find how many months it has been since item expired
const monthsOverdue = (item) => {
  let itemExpiryDate = new Date(item.expiry);
  let todaysDate = new Date();

  // Double-checking if item is expired
  if (isExpired(item)) {
    let monthsOverdue = todaysDate.getMonth()-itemExpiryDate.getMonth();
    return Math.abs(monthsOverdue);
  }
  else {
    // Not expired yet, months overdue = 0
    return 0;
  }
}

// Find how many years it has been since item expired
const yearsOverdue = (item) => {
  let itemExpiryDate = new Date(item.expiry);
  let todaysDate = new Date();

  // Double-checking if item is expired
  if (isExpired(item)) {
    let yearsOverdue = todaysDate.getYear() - itemExpiryDate.getYear();
    return Math.abs(yearsOverdue);
  }
  else {
    // Not expired yet, years overdue = 0
    return 0;
  }
}

// Carousel with items that has expired but has not been used by user
const getCarousel = (data, setExpired) => {
  if(data.length < 1) {
    return (
      <Fragment/>
    )
  }

  let carouselControls = (
    <li data-target="#carouselExampleControls" data-slide-to="0" className="active"></li>
  )

  let carouselItems = (
    <div className="carousel-item active">
      <img className="d-block w-100 " src="https://steamuserimages-a.akamaihd.net/ugc/776155680297657535/02F0EABF17FE99701D05F371387381E3DD696C6C/" alt="Slide" />
      <div className="carousel-caption">
      <Remove index={0} item={data[0]} expiry={data} setExpired={setExpired} ></Remove>
        <h2 className="h2-responsive">{data[0].name.toLowerCase()} expired</h2>
        <p>{daysOverdue(data[0])} days, {monthsOverdue(data[0])} months, and {yearsOverdue(data[0])} years ago</p>
      </div>
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
                <img className="d-block w-100" src="https://steamuserimages-a.akamaihd.net/ugc/776155680297657535/02F0EABF17FE99701D05F371387381E3DD696C6C/" alt="Slide" />
                <div className="carousel-caption">
                <Remove index={index} item={data[0]} expiry={data} setExpired={setExpired} ></Remove>
                  <h2 className="h2-responsive">{item.name.toLowerCase()} expired</h2>
                  <p>{daysOverdue(item)} days, {monthsOverdue(item)} months, and {yearsOverdue(item)} years ago</p>
                </div>
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
    <Preview></Preview>
  );
}

// Determine if expired items carousel should be displayed or not, and how
const getBottomRow = (expired, inventory, setExpired) => {
  console.log(expired.length);
  if(expired.length > 0) {
    return (
      <Fragment>
        <div className="col-md-6">
          {getCarousel(expired, setExpired)}
        </div>
        {<div className="col-md-6">
          {(inventory.length > 0) && getJumbotron()}
        </div>}
      </Fragment>
    );
  } 
  else if (inventory.length != null && inventory.length > 0) {
    // No expired items, only show suggested recipes
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
      expired: [],
      showModal: true,
      allData: null
    };

  }

  setInventory = (newInventory) => {
    this.setState({inventory: newInventory});
  }

  setExpired = (newExpired) => {
    this.setState({expired: newExpired});
  }

  setShowModal = (show) => {
    setTimeout(()=> {this.setState({showModal: show})}, 300);
  }


  componentDidMount() {
    this.getData();
  }
  getData = async() => {
    let token = getToken();
    // List items from API 
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/listAllItems',{token: token})
    .then (res => {
      if(res.data === null || res.data === undefined) {
        throw new Error("Unable to obtain data.items from fetch call");
      }
      const inventory = [];
      const expired = [];
      res.data.forEach((item) => {
        if(isExpired(item)) {
          expired.push(item);
        }else {
          inventory.push(item);
        }
      });
      if(this.state.allData === null) {
        this.setState({inventory: inventory, expired: expired, allData: res.data});
      }else {
        this.setState({inventory: inventory, expired: expired});
      }
    })
    .catch(err => {
      console.log(err);
      toast(err.response);
    });
  }

	render() {
    this.getData();
		return (
      <Fragment>
      {getButtonToolbar(this.state.inventory, this.setInventory, this.state.showModal, this.setShowModal)}
			<div className="container">
          <div className="row">
            <div className="col">
              {getSlider(this.state.inventory, this.setInventory)}
            </div>
          </div>
          <div className="row bottom-row">
            {getBottomRow(this.state.expired, this.state.inventory, this.setExpired)}
          </div>
			</div> 
      </Fragment>
		);
	};
}

export default MyKitchen;
