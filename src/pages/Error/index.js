import React, { Component } from "react";

class Error extends Component {

	render() {
		return(
			<div class="jumbotron">
            <h1 class="display-4">Ooops, looks like something went wrong!</h1>
            <p class="lead">Make sure what you tried to do is an authorised action</p>
            <hr class="my-4"></hr>
            <p>Head back over to My Kitchen.</p>
            <p class="lead">
                <a class="btn btn-primary btn-lg" href="/" role="button">My Kitchen</a>
            </p>
            </div>
		);
	}
}

export default Error;
