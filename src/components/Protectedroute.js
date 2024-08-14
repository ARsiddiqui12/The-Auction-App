import React from 'react';
import { Navigate } from 'react-router-dom';

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
   
  }

  componentDidMount() {
    // Check authentication on component mount (optional)
   
  }

  

  render() {
    const { children } = this.props;

    const SessionToken = localStorage.getItem("SessionToken");

    if (!SessionToken) {
      return <Navigate to="/login" replace />;
    }

    return children;
  }
}

export default ProtectedRoute;