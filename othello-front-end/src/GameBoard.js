import React, {Component} from 'react';
import {FormField, Form} from 'react-pattern-library';
import './App.css';
import Row from './Row'
export default  class GameBoard extends Component {

    constructor(props) {
        super(props);
        //1 = black
        //2 = white
        this.state = {
            playerOneTurn: true,
            playerText: ""
        }

        this.switchTurns = this.switchTurns.bind(this)
    }

    switchTurns() {
        let playerOnesTurn = this.state.playerOneTurn
        playerOnesTurn != playerOnesTurn;
        console.log("Is Player 1's Turn: ", playerOnesTurn);
        this.setState({playerOneTurn: playerOnesTurn});
        return playerOnesTurn;
    }

    // buildGameBoard() {
    //     var rows = [];
    //
    //     for (let i = 0; i < 8; i++) {
    //
    //         rows.push(<Row id="row{i}"/>)
    //     }
    //     return (
    //         <div className="square">
    //             {rows}
    //         </div>
    //     )
    //
    // }
    //
    // flipFunc(circle, index) {
    //     circle.
    // }

    getPlayerText() {
        return (this.state.playerOneTurn ? "Player 1's Turn" : "Player 2's Turn");
    }

    render() {
        return (
            <div>
                <div id="gameBoardContainer" >
                    <Row flipPlayer={this.switchTurns}/>
                </div>
                <div id="playerTurnDiv">
                    <span>{this.getPlayerText}</span>
                </div>
            </div>
        )
    }
}

