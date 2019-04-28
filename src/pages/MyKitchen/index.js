import React, { Component } from "react";
import { Link }  from 'react-router-dom';
import { Redirect } from 'react-router';
import InventoryList from '../../components/InventoryList';

class MyKitchen extends Component {

	handleSubmit(e) {
		console.log("Going to recipe");
		this.props.history.push('/my-kitchen/my-recipes');
	}

	render() {

		return (
			<div className="row">

				<div className="col-md">

				</div>

				<div className="col-lg">
					<h2 className="card-title bg-green p-1 font-weight-light mt-5 font-weight-light text-blue text-center">
						my kitchen</h2>

					<div className="card m-4 pl-5 pr-5 pt-3 pb-3 border-primary float-auto">
						<h5 className="card-title bg-green p-1 font-weight-light text-white text-center bg-blue">
							expiring soon</h5>
						<InventoryList/>
					</div>

					<div className="card m-4 pl-5 pr-5 pt-3 pb-3 border-primary float-auto">
						<h5 className="card-title bg-green p-1 font-weight-light text-white text-center bg-blue">
							my inventory</h5>
						<div className="card-body mb-3 p-3">
							<InventoryList/>
						</div>
					</div>

					<div className="card m-4 pl-5 pr-5 pt-3 pb-3 border-primary float-auto">
						<h5 className="card-title bg-green p-1 font-weight-light text-white text-center bg-blue">
							suggested recipes</h5>
						<div className="card-body mb-3 p-3">
							<form onSubmit={this.handleSubmit}>
								<div className="form-group text-center">
									<button type="submit" className="btn text-center btn-white font-weight-light border-white
									         bg-bground m-4">Generate recipe</button>
								</div>
							</form>
						</div>
					</div>

				</div>

				<div className="col-md">
				</div>
			</div>
		)
	};
}

export default MyKitchen;