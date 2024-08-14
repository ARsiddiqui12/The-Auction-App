import React,{Component} from "react";

import { connect } from 'react-redux';


class Home extends Component{

    constructor(props){

        super(props);

        this.state = {
            numberOfUsers:0
        };

    }

    componentDidMount() {
        window.addEventListener('storage', this.handleStorageChange);
      }
    
      componentWillUnmount() {
        window.removeEventListener('storage', this.handleStorageChange);
      }
    
      handleStorageChange = () => {
        const updatedCounter = parseInt(localStorage.getItem('registerCounter')) || 0;
        this.props.updateRegisterCounter(updatedCounter);
      };

    render(){
        return (

            <div>
                <h1>Home Page! {this.props.registerCounter}</h1>
            </div>

        )
    }

}

const mapStateToProps = (state) => ({
    registerCounter: state.registerCounter,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    updateRegisterCounter: (counter) => dispatch({ type: 'UPDATE_REGISTER_COUNTER', counter }),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);