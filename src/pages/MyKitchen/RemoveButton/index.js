import React, { Component, Fragment } from "react";
import axios from 'axios';
import { getToken } from '../../../helpers/jwtHelper';
import {Button} from 'react-bootstrap';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from "react-bootstrap-sweetalert";
class Remove extends Component {

    constructor (props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            showConfirm: false,
        }

    }
    

    handleSubmit = e => {
    
    let token = getToken();
    axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/removeItem',{token: token, id: this.props.item._id})
    .then (res => {
        let item = this.props.item;
        item.quantity = 0;
        let expired = this.props.expiry;
        expired.splice(this.props.index, 1);
        this.props.setExpired(expired);
        toast("Removed item " + item.name);
    })
    .catch(err => {
        toast(err.response.data.msg);
    });
    }

    render() {
        return (
            <Fragment>
            <button type="button" className="btn btn-danger" style={{backgroundColor: 'transparent',color: 'red'}} onClick={this.handleSubmit}>
            ✖
            </button>
            </Fragment>
            
        )
    };
}

export default Remove;