import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

 class Nav extends Component {

  

  render() {
    const { AuthInfo } = this.props;
    
    return (
      <div>
     <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">AuctionPro </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/auction">Auction</Link>
        </li>
        
      </ul>
      
    </div>
    <ul class="navbar-nav ms-auto">
      {AuthInfo && AuthInfo.UserName!='' ? 
      (<li class="nav-item dropdown">
      <Link class="nav-link dropdown-toggle" to="/dashboard" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {AuthInfo.UserName}
      </Link>
      
      <ul class="dropdown-menu">
        <li><Link class="dropdown-item" to="/dashboard">My Account</Link></li>
        <li><Link class="dropdown-item" to="/logout">Logout</Link></li>
      </ul>
    </li>)
      :
      (<>
      <li class="nav-item">
          <Link class="nav-link" to="/reg">Register</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/login">Login</Link>
        </li>
        </>)
      }
        
      
        
    </ul>
  </div>
</nav>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    AuthInfo: state.AuthInfo
  };
};

export default connect(mapStateToProps)(Nav);