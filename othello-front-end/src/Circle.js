import React, {Component} from 'react';
import './App.css';

export default class Circle extends Component
{
    constructor(props) {
        super(props)
        this.mode = 2
        // >=2 = empty
        // 1 = black
        // 0 = white
        this.state = {
            color: 'rgba(0, 0, 0, 0)'
        }
        this.changeColor = this.changeColor.bind(this);
        this.changeMode = this.changeMode.bind(this);
    }

    changeMode(playerNum) {
        this.mode = ((this.mode + playerNum) % 2);
    }

    changeColor () {
        let isPlayerOne = this.props.playerInput;
        if (isPlayerOne) {
            // this.setState({color: 'white'})
            this.changeMode(1)
        } else if (this.state.color === 'grey' || this.state.color === 'white') {
            // this.setState({color: 'black'})
            this.changeMode(2)
        }
        // switch (this.mode) {
        //     case 1:
        //         this.setState({color: 'black'})
        //         break;
        //     case 0:
        //         this.setState({color: 'black'})
        //         break;
        //     default:
        //         this.setState({color: 'rgba(0, 0, 0, 0)'})
        // }
        if(this.mode) {
            this.setState({color: 'black'})
        } else {
            this.setState({color: 'white'})
        }
    }

    render() {
        return (
            <div>
                <svg height="100" width="100" onClick={this.changeColor}>
                    <circle cx="50" cy="50" r="40" fill={this.state.color}/>
                </svg>
            </div>);
    }

}