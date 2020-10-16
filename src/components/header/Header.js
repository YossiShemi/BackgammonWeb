import React, { Component } from 'react';
import './Header.css';
import Appbar from '../appbar/Appbar';
import Menu from '../Menu';
import PlayerOptions from '../playerOptions/PlayerOptions';


export class Main extends Component {
    render() {
        return (
            <div className="header">

                <PlayerOptions/>
                <Appbar/>
                <Menu/>


            </div>
        )
    }
}

export default Main
