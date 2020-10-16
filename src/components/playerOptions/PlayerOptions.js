import React, { Component } from 'react';
import './PlayerOptions.css';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

export class PlayerOptions extends Component {
   
    logout=()=>{
        document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        window.location.reload(false);
    }

    
    menu=()=>{
            if (!document.cookie){
            return(
                <div className="buttons">
                <Button color="primary"><Link to="/Register" style={{ color: 'inherit', textDecoration: 'inherit', fontWeight: 'bold'}}> Register</Link></Button>
                |
                <Button color="secondary"><Link to="/Login" style={{ color: 'inherit', textDecoration: 'inherit', fontWeight: 'bold'}}> Login</Link></Button>
                </div>
            );
        }
        else
        return (
            <div className="buttons">
            <Button color="secondary" style={{ textDecoration: 'inherit', fontWeight: 'bold'}} onClick={() => this.logout() }  > Logout</Button>
            </div>
        );
    }


    render() {
        return (
           this.menu()
        )
    }
}

export default PlayerOptions
