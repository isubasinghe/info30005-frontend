import React, { Component } from "react";
import 'react-toastify/dist/ReactToastify.css';

import {Button} from 'react-bootstrap';
import './preview.scss';

class Preview extends Component {

	render() {
		return (
			<div className="jumbotron-container">
                <div className="jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h3 className="d-flex justify-content-end">
                                recipe of the month
                                </h3>
                                <p>maple salmon</p>
                            </div>

                            <div className="col">
                                <Button className="previewButton" variant="primary" href="https://www.food2fork.com/view/Maple_Salmon/22317" >go to recipe</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
		)
	};
}

export default Preview;
