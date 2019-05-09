import React, { Component } from "react";
import MyKitchen from '../MyKitchen';
import { isLoggedIn } from '../../helpers/jwtHelper';
import './homepage.scss';
import hpimage from '../../photos/Homepage.svg';
import './homepage.scss';

const renderHomepage = () => {
	if(isLoggedIn()) {
		return <MyKitchen />
	}else {
		return (
			<div className='row'>
						<div className="homepage-container">
							<div className="media">
								<img className="fluid-img" src={hpimage} alt="hompageimg"/>
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
