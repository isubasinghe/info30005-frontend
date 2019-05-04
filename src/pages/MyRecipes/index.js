import React, { Component } from "react";
import { NavLink }  from 'react-router-dom';
import RecipeList from '../../components/RecipeList';
//import axios from 'axios';

import withAuth from '../../helpers/withAuth';

class MyRecipes extends Component {

	render() {
		return (
			<>
			<div className="row">
				<div className="col-sm">
				</div>

				<div className="col-lg">
					<h2 className="card-title bg-green p-1 font-weight-light mt-5 font-weight-light text-blue text-center">
						feeling hungry?</h2>

					<div className="card m-4 pl-5 pr-5 pt-3 pb-3 border-primary float-auto">
						<h2 className="card-title bg-green p-1 font-weight-light text-white text-center bg-blue">
							my recipes</h2>
						<div className="card-body mb-3 p-3">
							<RecipeList/>
						</div>
					</div>
				</div>


				<div className="col-sm">
				</div>

			</div>

			<div className ="row">
				<div className="col-sm">
				</div>

				<div className="col-4 mt-5 pl-5">
					<div className="card-body mb-3 p-3">
						<NavLink to="/" type="button" className="btn text-center text-white btn-white font-weight-light border-white
							bg-bground m-4" activeClassName="btn btn-active">back to my kitchen</NavLink>
					</div>
				</div>

				<div className="col-sm">
				</div>

			</div>
			</>
		)
	};
}

export default withAuth(MyRecipes);