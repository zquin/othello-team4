import React, {Component} from 'react';
import logo from './logo.svg';
import {FormField, Form} from 'react-pattern-library';
import './App.css';
import RegisterUser from "./RegisterUser";
import GameBoard from "./GameBoard";
//import BusinessLogic from "./BusinessLogic";


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gameBoard: [
                {row: "x,x,x,B,x,x,x,x"},
                {row: "x,x,x,B,x,x,x,x"},
                {row: "x,x,x,B,x,x,W,x"},
                {row: "x,x,x,B,x,x,x,x"},
                {row: "x,x,x,B,x,x,W,x"},
                {row: "x,x,x,B,x,x,x,x"},
                {row: "x,x,x,B,x,W,x,x"},
                {row: "x,x,x,B,x,x,x,x"}
            ],

            color: ""

        }


    }

    changeColor (rowId, cellId) {
        //console.log("rowId = " + rowId+ " cellId " + cellId)
       //  let state = this.state
       // // console.log(state.color);
       //  if (this.state.blacksTurn) {
       //      state.color="circleBlack"
       //  } else {
       //      state.color="circleGrey"
       //  }
       //
       //  state.blacksTurn = !this.state.blacksTurn
       //
       //  this.setState(state)
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
