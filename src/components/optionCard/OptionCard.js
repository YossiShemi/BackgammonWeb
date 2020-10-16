import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './OptionCard.css';
 

export class OptionCard extends Component {
 
  button=()=>{
    if (this.props.title ==="React.js Frontend")
    return (<a href={this.props.link} className="button"> Click Here</a>)
    return (
      <a className="button"><Link to="/Game" style={{color: 'inherit', textDecoration: 'inherit'}}> Click Here</Link></a>
    )
  }
 
  render() {
        return (
          <div className="container">
            <div className="option">
              <div className="text">
                <h1>
                Play With <br/> {this.props.title}
                </h1>
              </div>
              <div>
                {this.button()}
              </div>
              <div className="button-div">
               <img src={require("../../images/"+this.props.img+".png")} alt="" className="dice-optinCard"></img>
               </div>
            </div>
          </div>
        )
    }
}

export default OptionCard
