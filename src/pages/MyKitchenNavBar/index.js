import React, { Component } from "react";
import {NavLink} from 'react-router-dom';

class MyKitchenNavBar extends Component {

	render() {
		return (
			<div className="col-">
				<div className="btn-group" role="group" >
					<NavLink to="/recipes" type="button" className="btn btn-secondary text-white"
					         activeClassName="btn btn-active">recipes</NavLink>
					<NavLink to="/my-kitchen" type="button" className="btn btn-secondary text-white"
					         activeClassName="btn btn-active">mykitchen</NavLink>
					<NavLink to="/my-account" type="button" className="btn btn-secondary text-white"
					         activeClassName="btn btn-active">myaccount</NavLink>
				</div>
			</div>
		)
	};
}

export default MyKitchenNavBar;