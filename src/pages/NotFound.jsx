import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { store } from '../redux/store';

class NotFound extends Component {

    componentDidMount() {
        setTimeout(function() {
            //window.location.pathname = '/'
            store.dispatch(push('/'))
        }, 2000);
    }

    render() {
        return (
            <div className="center animated bounceInUp"> 
        	<h1> Trang không tồn tại! </h1>
        	<br/>
        	<h3 className="center animated infinite flash"> Đang chuyển về trang chủ ... </h3>
        </div>
        );
    }
}

export default NotFound;
