import React, { Component } from "react";
import Postanauction from "./Postanauction";
import Postedauctions from "./Postedauctions";
import Timeline from "./Timeline";
import { connect } from "react-redux";


import "../App.css";

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {

      AddAuctionFormVisibility:this.props.AddAuctionFormVisibility || false

    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.AddAuctionFormVisibility !== this.props.AddAuctionFormVisibility) {
      this.setState({
        AddAuctionFormVisibility: this.props.AddAuctionFormVisibility
      });
    }
  }
  render() {
   
    return (
      <>
        <br />
        <div class="row d-flex justify-content-center">
          <div class="col-md-4 col-lg-3">
            <div class="card shadow-0 border one">
              <div class="card-body p-4">
                <Postedauctions />
                
              </div>
            </div>
          </div>
          <div class="col-md-8 col-lg-8">
            <div class="card shadow-0 border one">
              <div class="card-body p-4">
                <div data-mdb-input-init class="form-outline mb-4">
                {this.state.AddAuctionFormVisibility && this.state.AddAuctionFormVisibility===true ? (
                  <Postanauction />
                ) : ''}
                </div>

                <Timeline />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AddAuctionFormVisibility: state.AddAuctionFormVisibility
  };
};

export default connect(mapStateToProps)(Dashboard);
