import React,{Component} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {   faEnvelope, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import gql from 'graphql-tag';
import { Mutation } from '@apollo/client/react/components';
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { SetSessionInfo } from "../redux/action";


const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      username
      mobile
      token
    }
  }
`;



class Login extends Component{
  
   
  
    constructor(props){
        super(props);
        
        this.state = {

            formData:{
                email:'',
                password:''
            },
            errors:{},
            loading: false,
            successmsg:'',
            token:'',
            isLoggedIn:false,
            AuthInfo:{}

        };

        
        
       
    }

    

   


    ChangeHandle = (e)=>{
        const { name, value } = e.target;
        this.setState((prevState) => ({
          formData: {
            ...prevState.formData,
            [name]: value,
          },
        }));

        
    }
    ValidateLoginForm = (data) =>{

        let errors = {};

        if (!data.email.trim()) {
            errors.email = "Email is required";
          } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email address is invalid";
          }
          if (!data.password.trim()) {
            errors.password = "Password is required";
          } else if (data.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
          }
          
          return errors;

    }
    
    
    onSubmitHandle = async (e,loginUserMutation) =>{

        e.preventDefault();

       
        
        const {formData} = this.state;

        const validationErrors = this.ValidateLoginForm(formData);

        if (Object.keys(validationErrors).length === 0) {
            try {
              this.setState({ loading: true });

              
              
              const {  email, password } = formData;
              
              const resp =  await loginUserMutation({ variables: {  email, password  } });
              
              const SessionToken = resp.data.loginUser.token;

              this.setState({
                errors:{},
                loading:false,
                successmsg:'User Logged In successfully!',
                token: SessionToken,
                isLoggedIn:true,
                AuthInfo:{
                  UserId:resp.data.loginUser.id,
                  UserName:resp.data.loginUser.username,
                  UserEmail:resp.data.loginUser.email,
                  UserMobile:resp.data.loginUser.mobile
                }
              });

              localStorage.setItem('SessionToken',SessionToken);

              this.props.SetSessionInfo({
                UserId:resp.data.loginUser.id,
                UserName:resp.data.loginUser.username,
                UserEmail:resp.data.loginUser.email,
                UserMobile:resp.data.loginUser.mobile
              });
             
            } catch (err) {
              
              
              this.setState({ errors: { error: err.message },successmsg:'' });

              console.log("Login failed:", err);

            }
          } else {

            this.setState({ errors: validationErrors });

            console.log(validationErrors);

          }
          

    };

    render(){
      

        const {  errors, loading } = this.state;

          if(this.state.isLoggedIn === true)
          {
              
              return <Navigate to="/dashboard" />;
          }

        return(
            <div>

<div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mb-4 mx-4">
                <div className="card-body p-4">
                    <Mutation mutation={LOGIN_USER}>
                        {(loginUserMutation,{loading: mutationLoading})=>(

                        
                    <form onSubmit={(e)=>this.onSubmitHandle(e,loginUserMutation)}>
                         {(loading || mutationLoading) && <p>Loading...</p>}

                         {errors && Object.entries(errors).length > 0 && (
  <div className="alert alert-danger">
    {Object.entries(errors).map(([key, value], index) => (
      <p key={index}>
        {value}
      </p>
    ))}
  </div>
)}


                        {(this.state.successmsg) && <div><br /><p className="alert alert-success">{this.state.successmsg}</p></div>}
                    <h1>Sign In</h1>
                        <p className="text-body-secondary">Access Your Account</p>
                        
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </span>
                          <input
                            className="form-control"
                            onChange={this.ChangeHandle}
                            name="email"
                            type="text"
                            placeholder="Email"
                            required
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <FontAwesomeIcon icon={faLock} />
                          </span>
                          <input
                            className="form-control"
                            onChange={this.ChangeHandle}
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                          />
                        </div>
                        <button className="btn btn-block btn-success" type="submit">
                          <FontAwesomeIcon icon={faLockOpen} /> Sign In
                        </button>
                    </form>
                    )}
                    </Mutation>
                </div>
            </div>
          </div>
        </div>    
</div>
</div>


            </div>
        )
    }

}



const mapDispatchToProps = {
  SetSessionInfo
};


export default connect(null,mapDispatchToProps)(Login);