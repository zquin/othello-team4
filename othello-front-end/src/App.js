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
            blacksTurn: true,
            userId: "-1"
        }
        this.changeColor = this.changeColor.bind(this)
        this.registerUser = this.registerUser.bind(this)
        this.loginUser = this.loginUser.bind(this)
    }

    changeColor(rowId, cellId) {
        let state = this.state
        let newGameBoard = this.state.gameBoard

        let rowArr = newGameBoard[rowId].row.split(",")
        if (rowArr[cellId] === ("x")) {
            this.state.blacksTurn ? rowArr[cellId] = "B" : rowArr[cellId] = "W"
            newGameBoard[rowId].row = rowArr.toString()
            state.gameBoard = newGameBoard
            state.blacksTurn = !this.state.blacksTurn
        }
        this.setState(state)
    }

    registerUser(userInfo) {
        this.sendUser(userInfo)
    }

    loginUser(userInfo) {
        this.sendLoginUser(userInfo)
    }

    sendUser(user) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var request = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(user)
        };
        return fetch('/users', request)
            .then((response) => {
                return response;
            });
    }

    sendLoginUser(user) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log(user)
        var request = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(user)
        };
        return fetch('/users/login/', request)
            .then(res => res.json())
            .then((out) => {
                console.log('Checkout this JSON! ', out);
                    let state = this.state;
                    console.log("response out user id = "  + out.userId)
                    state.userId = out.userId
                    console.log("state id = " +state.userId)
                    return this.setState(state)
            })
    }

    render() {
        return (
            <div className="App">
                <RegisterUser onRegister={this.registerUser} onLogin={this.loginUser}/>
                <GameBoard changeColor={this.changeColor} gameBoard={this.state.gameBoard}/>
            </div>
        );
    }

}
export default App;
