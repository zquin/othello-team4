import React, {Component} from 'react';
import {FormField, Form} from 'react-pattern-library';
import './App.css';
import RegisterUser from "./RegisterUser";
import GameBoard from "./GameBoard";


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gameBoard: [
                {row: "x,x,x,x,x,x,x,x"},
                {row: "x,x,x,x,x,x,x,x"},
                {row: "x,x,x,x,x,x,x,x"},
                {row: "x,x,x,W,B,x,x,x"},
                {row: "x,x,x,B,W,x,x,x"},
                {row: "x,x,x,x,x,x,x,x"},
                {row: "x,x,x,x,x,x,x,x"},
                {row: "x,x,x,x,x,x,x,x"}
            ],
            blacksTurn: true
        }
        this.changeColor = this.changeColor.bind(this)
    }

    changeColor(rowId, cellId) {
        let state = this.state
        let newGameBoard = this.state.gameBoard

        let rowArr = newGameBoard[rowId].row.split(",")

        this.state.blacksTurn ? rowArr[cellId] = "B" : rowArr[cellId] = "W"

        newGameBoard[rowId].row = rowArr.toString()
        state.gameBoard = newGameBoard
        state.blacksTurn = !this.state.blacksTurn

        this.setState(state)
    }


    render() {
        return (
            <div className="App">

                <RegisterUser />
                <GameBoard changeColor={this.changeColor} gameBoard={this.state.gameBoard}/>
            </div>
        );
    }
}
export default App;
