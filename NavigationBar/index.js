import React, { Component } from "react";
import {NavLink} from 'react-router-dom';

class NavigationBar extends Component {

	render() {
		return (
			<div className="col-">
				<div className="btn-group" role="group" aria-label="Navigation bar">
					<NavLink to="/sign-in" type="button" className="btn btn-secondary text-white"
					         activeClassName="btn btn-active">Sign In</NavLink>
					<NavLink to="/sign-up" type="button" className="btn btn-secondary text-white"
					         activeClassName="btn btn-active">Sign Up</NavLink>
				</div>
			</div>
		)
	};
}

export default NavigationBar;