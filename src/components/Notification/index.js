import React, {Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Notification extends Component {
    notify = () => {toast(this.props.msg)}

    render() {
        return (
            <ToastContainer />
        )
    }
}



export default Notification;