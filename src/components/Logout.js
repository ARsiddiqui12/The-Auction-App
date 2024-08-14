import React, { Component } from 'react';

import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { SetSessionInfo } from '../redux/action';


 class Logout extends Component {
  render() {
    this.props.SetSessionInfo({
        UserId:'',
        UserName:'',
        UserEmail:'',
        UserMobile:''
    });
    localStorage.removeItem("SessionToken");
    localStorage.removeItem("AuthInfo");
    return <Navigate to="/login" replace={true} />;
  }
}

const mapDispatchToProps = {
    SetSessionInfo
};

export default connect(null,mapDispatchToProps)(Logout);