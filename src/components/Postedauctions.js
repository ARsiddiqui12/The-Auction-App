import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {ShowAuctionForm} from '../redux/action';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

const GET_POSTS = gql`
  query getUserAuctions {
    getUserAuctions {
      userid
      title
    }
  }
`;

class Postedauctions extends Component {

 constructor(props){
  super(props);
  this.state = {
    formshowstatus:false
  }
 }

 ShowPostForm = ()=>{
    const Status = !this.state.formshowstatus;

    this.setState({
      formshowstatus:Status
    });
    
    this.props.ShowAuctionForm(Status);
 }

  render() {

   

    return (
      <div>
        <div className="text-primary">My Posts <span class="form-show" onClick={this.ShowPostForm}>
          {
            this.state.formshowstatus ?  (<FontAwesomeIcon icon={faPlusCircle} />) : (<FontAwesomeIcon icon={faPlusCircle} />) 
          }  
        </span></div>
        <Query query={GET_POSTS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          console.log(error);
          return (
            <div>
              <h2>Posts</h2>
              <ul>
                {
                data.getUserAuctions.map(post => (
                  <li key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.title}</p>
                    <p><strong>Author:</strong> {post.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
      </div>
    );
  }
}

const mapDispatchToProps = {
  ShowAuctionForm
};

export default connect(null,mapDispatchToProps)(Postedauctions);
