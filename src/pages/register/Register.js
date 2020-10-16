import React, { Component } from 'react';
import axios from "axios";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import './Register.css'
import { Env } from '../../Env';

export class Register extends Component {
 
  state = {
    email: "",
    password: "",
    nickname: "",
    submitted: false
  };


  updateState = (key, value) => {
    this.setState({
      [key]: value
    });
  }


  validateField(fieldName, value) {
    switch (fieldName) {
      case 'email': {
        let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        return emailValid;
      }
      case 'password': {
        let validPass = value.length < 6 ? false : true;
        return validPass;
      }
      default:
        return true;
    }
  }


   submitted = () => {

    const user = {
      email: this.state.email,
      password: this.state.password,
      nickname: this.state.nickname,
    }

    // Validation
    if (!this.validateField("email", user.email)) {
      alert("Invalid Email");
      return;
    }
    if (!this.validateField("password", user.password)) {
      alert("Password must contain minimum 6 digits");
      return;
    }
    if (user.nickname.length < 3) {
      alert("Nickname must contain minimum 3 digits");
      return;
    }

    //HTTP Post Request to add user
    axios.post(Env.URL+'/users/add', user)
      .then(res => {
        if (res.data === "email") {
          alert("Email already exists");
        } else if (res.data === "nickname") {
          alert("Nickname already exist")
        } else {
          this.setState({
            submitted: true
          });
        }
      })
      .catch((error) => console.log(error.response))
  }



  render() {
   if(this.state.submitted ===false)
    return (
      <React.Fragment>

        <div className="register-txt">
          <h1> Thank you for your time.</h1>
          <h2> Plese end this stage to play with other players online !</h2>
        </div>


        <div className="register-container">
            
        <img alt="" src={require('../../images/welcome2.gif')} className="gifstyle"  />

        <div className="register">
            <MuiThemeProvider>

              <p style={{  color: 'black' }}> <i class="fas fa-user-shield"></i>  Enter Your Details :</p>
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



              <TextField
              color="primary"
                placeholder="Enter Your Nickname"
                label="Nickname"
                margin="normal"
                fullWidth
                onChange={e => {
                  this.updateState("nickname", e.target.value);
                }}
              />
        
            <div className="submit">
            <Button
                fullWidth
                  color="secondary"
                  variant="contained"
                  onClick={this.submitted}
                >Submit</Button>
            </div>
            </>
          </MuiThemeProvider>
        </div>

      <img alt="" src={require('../../images/welcome1.gif')} className="gifstyle"  />
       </div>
    
       <div className="register-rules">
              <p className="note-title"> Requirments: </p>
              <p className="note"> * Password &gt;&gt;&gt; min 6 digits</p>
              <p className="note"> * Nickname &gt;&gt;&gt; min 3 digits</p>
       </div>
       
   </React.Fragment>
    );

    
    else
    return(
    <div className="register-container-done">
      <div className="register-done"> 
        <h2>You have registred successfuly <i class="far fa-thumbs-up"></i></h2>
        <h3><Link to="/Login" style={{  textDecoration: 'none', }}> Sign in here</Link></h3>
        <img src={require('../../images/clap.webp')} alt="" className="clap"/>
      </div>
      </div>
    );
  }
}

export default Register;