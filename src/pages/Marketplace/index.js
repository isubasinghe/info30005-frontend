import React, { Component } from "react";
import axios from 'axios';
import { getToken } from '../../helpers/jwtHelper';
import { Button, Card} from 'react-bootstrap';
import SweetAlert from "react-bootstrap-sweetalert";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './marketplace.scss';
class Marketplace extends Component {

    constructor (props) {
        super(props);
        this.state = {
            itemName: '',
            users: [],
            items: [],
            showConfirmation: false
        };
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTradeCommunication = this.handleTradeCommunication.bind(this);
        this.showAll();
    }
    handleNameChange = e => {
        this.setState({itemName: e.target.value});
    }
    handleTradeCommunication(email){
        let token = getToken();
        axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/marketplace/contact',{seller_email: email, token: token})
        .then (res => {
            this.setState({showConfirmation: true});
        })
        .catch(err => {
            toast(err.response.data.msg);
        });
    }
    handleConfirmation = () => {
        this.setState({showConfirmation: false});
    }
    addRetrievedItems(users, items){
        this.setState({users: users, items: items});
    }
    showAll = e => {
    
        let token = getToken();
        axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/search',{token: token})
        .then (res => {
            let users = res.data.users;
            let items = res.data.items;
            this.addRetrievedItems(users, items);
        })
        .catch(err => {
            toast(err.response.data.msg);
        });
    }
    handleSubmit = e => {
    
        let token = getToken();
        axios.post('http://foodspan.ap-southeast-1.elasticbeanstalk.com/api/v1/inventory/search',{token: token, name: this.state.itemName})
        .then (res => {
            let users = res.data.users;
            let items = res.data.items;
            this.addRetrievedItems(users, items);
        })
        .catch(err => {
            toast(err.response.data.msg);
        });
    }
    

    render() {
        return (
            <div className="container">

                <div className="marketplace-search search form-inline">
                    <input className="input" type="text" onChange={this.handleNameChange} placeholder="Enter items"></input>
                    <Button className="button" onClick={this.handleSubmit}>search</Button>

                </div>
                <div className="cards">
                    {this.state.users.map((users, index) => {
                    return (
                        <Card key={index}>
                            <Card.Body>
                            <Card.Title>{users.name}</Card.Title>
                            <Card.Text>Hi there, I have {this.state.items[index].quantity} {this.state.items[index].name}(s) </Card.Text>
                            <Button onClick={() => this.handleTradeCommunication(users.email)} value={users.email}>Contact Me</Button>
                            
                            </Card.Body>
                        </Card>
                    );
                })}
                </div>
                {this.state.showConfirmation && <SweetAlert success title="Email sent!" onConfirm={this.handleConfirmation}>
                The requested user should be in contact soon!
                </SweetAlert>}
            </div>
            
        )
    };
}

export default Marketplace;
