import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faEnvelope, faSave, faMobile } from "@fortawesome/free-solid-svg-icons";
import gql from 'graphql-tag';
import { Mutation } from '@apollo/client/react/components';

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!, $mobile: String!) {
    createUser(username: $username, password: $password, email: $email, mobile:$mobile) {
      id
      username
      email
      mobile
    }
  }
`;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: "",
        email: "",
        password: "",
        mobile:""
      },
      errors: {},
      loading: false,
      successmsg:''
    };
  }

  validateForm = (data) => {
    let errors = {};
    if (!data.username.trim()) {
      errors.username = "Username is required";
    }
    if (!data.username.trim()) {
      errors.mobile = "Mobile Number is required";
    }
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
  };

  SubmitHandle = async (e, createUserMutation) => {
    e.preventDefault();
    const { formData } = this.state;
    const validationErrors = this.validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        this.setState({ loading: true });
        const { username, email, mobile, password } = formData;
        
        await createUserMutation({ variables: { username, email, mobile, password  } });
        e.target.reset();
        this.setState({
          errors:{},
          loading:false,
          successmsg:'User registered successfully!'
        });
       
      } catch (err) {
        console.error("Registration failed:", err);
        
        this.setState({ errors: { error: err.message },successmsg:'' });
      } finally {
        this.setState({ loading: false });
      }
    } else {
      this.setState({ errors: validationErrors });
    }
  };

  ChangeHandle = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  render() {
    const { formData, errors, loading } = this.state;
    return (
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mb-4 mx-4">
                <div className="card-body p-4">
                  <Mutation mutation={CREATE_USER}>
                    {(createUserMutation, { loading: mutationLoading }) => (
                      <form onSubmit={(e) => this.SubmitHandle(e, createUserMutation)}>
                        <h1>Register</h1>
                        <p className="text-body-secondary">Create your account</p>
                        {(loading || mutationLoading) && <p>Loading...</p>}
                        {(errors.error) && <div><br /><p className="alert alert-danger">Error: {errors.error}</p></div>}
                        {(this.state.successmsg) && <div><br /><p className="alert alert-success">{this.state.successmsg}</p></div>}
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <FontAwesomeIcon icon={faUser} />
                          </span>
                          <input
                            className="form-control"
                            onChange={this.ChangeHandle}
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                          />
                        </div>
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
                            <FontAwesomeIcon icon={faMobile} />
                          </span>
                          <input
                            className="form-control"
                            onChange={this.ChangeHandle}
                            name="mobile"
                            type="tel"
                            placeholder="Mobile No."
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
                          <FontAwesomeIcon icon={faSave} /> Create Account
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
    );
  }
}

export default Register;
