import React, { Component } from "react";
import { Link }  from 'react-router-dom';

class MyKitchen extends Component {

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
							suggested recipes</h5>
						<div className="card-body mb-3 p-3">
							<p> appple, apple, pear </p>
						</div>
					</div>

					<div className="card m-4 pl-5 pr-5 pt-3 pb-3 border-primary float-auto">
						<h5 className="card-title bg-green p-1 font-weight-light text-white text-center bg-blue">
							expiring soon</h5>
						<div className="card-body mb-3 p-3">
							<p> appple, apple, pear </p>
						</div>
					</div>

					<div className="card m-4 pl-5 pr-5 pt-3 pb-3 border-primary float-auto">
						<h5 className="card-title bg-green p-1 font-weight-light text-white text-center bg-blue">
							expiring soon</h5>
						<div className="card-body mb-3 p-3">
							<p> appple, apple, pear </p>
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