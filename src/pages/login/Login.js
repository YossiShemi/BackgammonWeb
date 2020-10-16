import React, { Component } from 'react';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import './Login.css';
import { Env } from '../../Env';

export class Login extends Component {

  state = {
    email: "",
    password: "",
  };


  updateState = (key, value) => {
    this.setState({
      [key]: value
    });
  }


  async login() {

    const loginInfo = {
      email: this.state.email.slice(),
      password: this.state.password
    };

    //HTTP Post Request
    await axios
      .post(Env.URL+"/users/login", loginInfo)
      .then(res => {
        if (res.data !== "0") {
          document.cookie = "token="+ res.data.token;
          this.props.history.push("/");
          window.location.reload(false);
        }else {
          alert("Email and/or Password incorect");
        }
      })
      .catch((error) => console.log(error.response));

 

  }

  render() {
    return (

      <div className="login-container">

        <div className="login">
          <h2>Enter Email & Password :</h2>
          <img alt="" src={require('../../images/login.png')} className="loginimg" />
          <>
            <TextField
              id="filled-multiline-flexible"
              color="primary"
              placeholder="Enter Your Email"
              label="Email"
              margin="normal"
              fullWidth
              onChange={e => {
                this.updateState("email", e.target.value);
              }}
            />
            <br />
            <TextField
              color="primary"
              placeholder="Enter Your Password"
              label="Password"
              type="password"
              margin="normal"
              fullWidth
              onChange={e => {
                this.updateState("password", e.target.value);
              }}
            />
            <br />
            <div className="submit">

              <Button
                fullWidth
                color="secondary"
                variant="contained"
                onClick={() => {
                  this.login();
                }}
              >
                Login
                </Button>

            </div>
          </>
        </div>

        <div className="notmember">
          <h5>not a member? Sign up <Link to="/Register" style={{ color: 'red', textDecoration: 'inherit' }}> HERE</Link></h5>
        </div>

      </div>

    )
  }
}

export default Login
