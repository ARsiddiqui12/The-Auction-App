import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages,faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import gql from 'graphql-tag';
import { Mutation } from '@apollo/client/react/components';
import { connect } from "react-redux";
import {ShowAuctionForm} from '../redux/action';

const POST_AN_AUCTION = gql`
mutation PostAnAuction($userid:String!,$title:String!, $price:String!, $comments:String!, $postimage:String! ){
  PostAnAuction(userid:$userid, title:$title, price:$price, comments:$comments, postimage:$postimage){
    title
    price
    comments
    postimage
  }
}
`;

class Postanauction extends Component {

  constructor(props){
    super(props);
    
    this.state = {

      formData:{
        userid:'',
        title:'',
        price:'',
        comments:'',
        postimage:null
      },
      successmsg:''

    }
  }

  OnFormClose = () =>{

    this.props.ShowAuctionForm(false);

  }

  componentDidMount(){
    const auth = JSON.parse(localStorage.getItem('AuthInfo'));
    this.setState({
      formData:{userid:auth.UserId}
    })
  }

  // handleChange = (e)=>{
  //   const { name, value } = e.target;
  //   this.setState((prevState) => ({
  //     formData: {
  //       ...prevState.formData,
  //       [name]: value,
  //     },
  //   }));
  // }

  handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const reader = new FileReader();
      const file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState((prevState) => ({
          formData: {
            ...prevState.formData,
            [name]: reader.result, // Update with base64 representation
          },
        }));
      };
  
      reader.readAsDataURL(file);
    } else {
      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          [name]: value,
        },
      }));
    }
  };
  

  handleSubmit = async (e,PostAnAuctionMutation) =>
  {
    e.preventDefault();
    
    const { formData } = this.state;

    await PostAnAuctionMutation({ variables: formData });

    this.setState({successmsg:'Auction Posted Successfully!'});
   
    e.target.reset();
    

    

  }

  render() {
    
    return (
      <div>
       
        {this.state.successmsg ? (<div class="alert alert-success">{this.state.successmsg}</div>) : (<div></div>)}
      <Mutation mutation={POST_AN_AUCTION}>
        {(PostAnAuctionMutation,{loading: mutationLoading}) =>(
        <form onSubmit={(e)=>this.handleSubmit(e,PostAnAuctionMutation)} encType="multipart/form-data">
          <fieldset class="border p-2">
            <legend class="text-primary">
              Post an Auction{" "}
              <div class="form-show" onClick={this.OnFormClose}>
              <FontAwesomeIcon icon={faTimesCircle}  />
              </div>
            </legend>
            <div class="row">
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Title"
                  name="title"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div class="col-md-6">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Starting Price"
                  name="price"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div class="col-md-12">
                <textarea
                  class="form-control"
                  placeholder="Additional Information"
                  name="comments"
                  onChange={this.handleChange}
                ></textarea>
              </div>
              <div class="col-md-12">
                <div class="mb-3 custom-file">
                  <input
                    type="file"
                    class="form-control custom-file-input"
                    accept="image/*"
                    name="postimage"
                    onChange={this.handleChange}
                    required
                  />
                  <label class="custom-file-label">
                    <FontAwesomeIcon icon={faImages} /> Photos
                  </label>
                </div>
              </div>
              <div class="col-md-12">
                <button type="submit" class="btn-submit">
                  Post
                </button>
              </div>
            </div>
          </fieldset>
        </form>
        )}
      </Mutation>
      </div>
    );
  }
}

const mapDispatchToProps = {
  ShowAuctionForm
};

export default connect(null,mapDispatchToProps)(Postanauction);
