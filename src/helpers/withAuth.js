import React, { Component } from 'react';
import Signin from '../pages/Signin';

import { isLoggedIn, timeToLive, removeToken } from './jwtHelper';

function withAuth(WrappedComponent, showSignIn=true) {
    return class extends Component {

        constructor(props) {
            super(props);
            this.state = {loggedIn: isLoggedIn()};
            if(this.state.loggedIn) {
                // Extra 1000ms to ensure we always logout after token expires
                setTimeout(() => {this.setState({loggedIn: isLoggedIn()})}, (timeToLive()*1000)+1000);
            }
            this.state.handleLogOut = this.handleLogOut.bind(this);
        }

        handleLogOut() {
            this.setState({loggedIn: false});
            removeToken();
        }

        render() {
            if(!this.state.loggedIn && showSignIn) {
                return (
                    <Signin />
                );
            }else {
                return (
                    <WrappedComponent {...this.state} />
                );
            }
        }


    };
}

export default withAuth;