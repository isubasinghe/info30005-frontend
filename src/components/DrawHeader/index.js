import React, { Component } from 'react';
import withAuth from '../../helpers/withAuth';
import Drawer from 'react-motion-drawer';

import './drawer.scss';

class DrawerHeader extends Component {

    closeButton() {
        document.getElementById("mySidenav").style.width="0";
    }

    onChange() {

    }

    render() {
        return (
        <Drawer style={{marginTop: '20px'}} right={true} open={false} width={'25%'} onChange={this.onChange}>

        </Drawer>
        );
    }
}

export default DrawerHeader;