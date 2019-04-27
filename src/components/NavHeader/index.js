import React, { Component } from "react";
import { Link }  from 'react-router-dom';



function loggedIn() {
    return false;
}


function conditionalRender() {
    if(loggedIn()) {
        return (
            <div/>
        );
    }else {
        return (
            <div/>
        );
    }
}
class NavHeader extends Component {

    render() {
        return (
            <div className="SimpleHeader">
                <div className="icon">

                </div>
                <h1>Foodspan</h1>
                {conditionalRender()}
            </div>
        );
    }
}