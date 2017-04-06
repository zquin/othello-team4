import React, {Component} from 'react';
import './App.css';

export default class Circle extends Component
{
    constructor(props) {
        super(props)

        this.state = {
            color: "rgba(0,0,0,0.1)"
        }
    }

    get flipBlack() {
        let tempstate = this.state;
        this.setState(tempstate.color="rgba(0,0,0,1)")
    }

    get flipWhite() {
        let tempstate = this.state;
        this.setState(tempstate.color="rgba(255,255,255, 0.9)")
    }

    render() {
        return (
        <svg height="100" width="100">
            <circle cx="50" cy="50" r="40" fill={this.state.color}/>
        </svg>);
    }

}