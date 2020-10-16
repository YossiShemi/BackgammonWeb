import React, { Component } from 'react';
import "./Homepage.css";
import {Fade} from "react-reveal";
import OptionCard from '../../components/optionCard/OptionCard';
import Panel from '../../components/panel/Panel';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
import { Env } from '../../Env';





  
  
  export class Homepage extends Component {

     constructor (){
      super();

      this.state={
        user: null,
        loggedIn: false}
        const token=document.cookie.split("=")[1] ;
        
        if (token){
        axios
        .get(Env.URL+"/users/getUser", {
          params: {
            token: token
          }
        } )
        .then(res => {
          if (res.data){
          this.setState({
            user: res.data,
            loggedIn: true
          });
        }
        })
        .catch((error) => console.log()); 
      }
     }



    message = () => {

      let message= "Welcome !"

      if (this.state.loggedIn) {
       message= "Good Luck ! :)  ";
      }
      if (!this.state.loggedIn){
         return (
          <Alert severity="warning" className="warning">Choose which platform to play with. Sign up to play online.</Alert>
         );}

         else{
           return(
            <Alert icon={false} severity="info">
              <span style= {{fontWeight:"bold", fontSize:"20 px"}}> Hi {this.state.user.nickname}, </span> 
               {message} 
               <i class="fas fa-dice-six" ></i> <i class="fas fa-dice-six"></i>
               </Alert>
           );}
        
    }



    render() {

      return (
       
          <div className="homepage">
        
          <Fade up duration={1000} distance="40px">
            <div className="alert">
            {this.message()}
            </div>
          </Fade>

          <div className="options">
            <Fade left duration={1000} distance="40px">
            <OptionCard title="React.js Frontend" img="gold" link="https://yossishemi.github.io/backgammonReactFront/" />
            </Fade>
            <Fade right duration={1000} distance="40px">
            <OptionCard title="React.js + Node.js" img="blue" component="/" />
            </Fade>
          </div>
          
          <Fade bottom duration={1000} distance="40px">
            <Panel/>
          </Fade>

        </div>

      )
    }
  }
  
  export default Homepage
  

