import React from 'react';
import axios from 'axios';
import SHA256 from 'crypto-js/sha256';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Validator from '../resources/Validator';

const Signup = class extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      name: '',
      lastname: '',
      password: '',
      repassword: '',
      address: '',
      email: '',
      toNextPage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitNewUser = this.submitNewUser.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    let { value } = target;
    if (name === 'password' || name === 'repassword') {
      value = SHA256(value).toString();
    }
    this.setState({
      [name]: value,
    });
  }

  submitNewUser() {
    const {
      name, lastname, password, email, address, repassword,
    } = this.state;
    if (Validator(email)) {
      if (password === repassword) {
        const newUser = {
          name, lastname, address, password, email, created_at: moment().format('YYYY/MM/DD'),
        };
        axios.post('http://54.173.19.52:3000/api/signup', newUser)
          .then((result) => {
            const { status } = result;
            if (status === 201) {
              this.setState({
                toNextPage: true,
              });
            }
            return null;
          });
      } else {
        alert('Password does not match');
      }
    } else {
      alert('Email with invalid format');
    }
  }

  render() {
    const { toNextPage } = this.state;
    if (toNextPage) {
      return <Redirect to="/" />;
    }
    return (
      <div className="signup-container">
        <div className="signup-body">
          <div className="signup-title">
            <span>Sign Up Here</span>
          </div>
          <div className="signup-name">
            <input className="input-name" onChange={this.handleChange} name="name" placeholder="Name" />
          </div>
          <div className="signup-lastname">
            <input className="input-lastname" onChange={this.handleChange} name="lastname" placeholder="Last Name" />
          </div>
          <div className="signup-address">
            <input className="input-address" onChange={this.handleChange} name="address" placeholder="Address" />
          </div>
          <div className="signup-mail">
            <input className="input-mail" onChange={this.handleChange} name="email" placeholder="Email" />
          </div>
          <div className="signup-password">
            <input className="input-password" onChange={this.handleChange} type="password" name="password" placeholder="Password" />
          </div>
          <div className="signup-repassword">
            <input className="input-repassword" onChange={this.handleChange} type="password" name="repassword" placeholder="Re-Password" />
          </div>
          <button type="submit" onClick={this.submitNewUser}>sign up</button>
        </div>
        <div className="log-in">
          <span>
            Have an account?
            <a href="login"> Click here</a>
          </span>
        </div>
      </div>
    );
  }
};

export default Signup;
