import React from "react";
import "./Footer.css";
import { Fade } from "react-reveal";
import Divider from '@material-ui/core/Divider';


export default function Footer() {
  return (

    <Fade bottom duration={1000} distance="5px">

    <div className="footer-div">
    <Divider  className="divider"/>
      <p className="footer-text"> &copy; Made By -Yossi Shemi-</p>
    </div>

    </Fade>
    
  );
}
