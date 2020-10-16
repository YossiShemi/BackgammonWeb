import React, { Component } from 'react';
import './Panel.css';

export class panel extends Component {
    render() {
        return (
            <div className="panel-homepage">
            <img alt="" src={require('../../images/board.png')} className="img" />
            </div>
        )
    }
}

export default panel
