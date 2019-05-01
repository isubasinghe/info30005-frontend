import React, { Component } from "react";
import MyKitchen from '../MyKitchen';
import { isLoggedIn } from '../../helpers/jwtHelper';
import './homepage.scss';


const renderHomepage = () => {
	if(isLoggedIn()) {
		return <MyKitchen />
	}else {
		return <div />
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