import React from 'react';
import axios from 'axios';
import SHA256 from 'crypto-js/sha256';
import { Redirect } from 'react-router-dom';

const Login = class extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      toNextPage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.userLogin = this.userLogin.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    let { value } = target;
    if (name === 'password') {
      value = SHA256(value).toString();
    }
    this.setState({
      [name]: value,
    });
  }

  userLogin() {
    const { email, password } = this.state;
    const login = { email, password };
    axios.post('http://54.173.19.52:3000/api/login', login)
      .then((result) => {
        const { status } = result;
        if (status === 200) {
          this.setState({
            toNextPage: true,
          });
        }
      }, (rejected) => {
        const { response } = rejected;
        const { status } = response;
        if (status === 401) {
          alert('wrong password');
        }
        if (status === 404) {
          alert('user not found');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { toNextPage } = this.state;
    if (toNextPage) {
      return <Redirect to="/main" />;
    }
    return (
      <div className="login-container">
        <div className="login-body">
          <div className="login-title">
            <span>Login Here</span>
          </div>
          <div className="login-email">
            <input className="input-email" type="email" onChange={this.handleChange} name="email" placeholder="email" />
          </div>
          <div className="login-password">
            <input className="input-password" onChange={this.handleChange} type="password" name="password" placeholder="password" />
          </div>
          <button type="submit" onClick={this.userLogin}>login</button>
        </div>
        <div className="sign-up">
          <span>
            Don&apos;t have an account?
            <a href="sign-up"> Click here</a>
          </span>
        </div>
      </div>
    );
  }
};

export default Login;
