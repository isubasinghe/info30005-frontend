import React, { Component } from "react";
import MyKitchen from '../MyKitchen';
import { isLoggedIn } from '../../helpers/jwtHelper';
import './homepage.scss';
import hpimage from '../../photos/Homepage.png';
import './homepage.scss';

const renderHomepage = () => {
	if(isLoggedIn()) {
		return <MyKitchen />
	}else {
		return (
				 <div className="d-flex justify-content-center bg">
					<div className='row'>
								<div className="homepage-container">
										<img className="img-fluid" src={hpimage} alt="hompageimg"/>
								</div>
					</div>
				</div>
		);
	}
}
class Homepage extends Component {

	render() {
		return(
			<div className="Homepage">
				{renderHomepage()}
			</div>
		);
	}
}

export default Homepage;
