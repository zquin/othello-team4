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
            userId: "-1",
            gameId: -1
        }
        this.changeColor = this.changeColor.bind(this)
        this.registerUser = this.registerUser.bind(this)
        this.loginUser = this.loginUser.bind(this)
        this.saveGame = this.saveGame.bind(this)
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
        // console.log("We are in logInUser" + this.state.userId);

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

    createGame() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log("user id in create game = " + this.state.userId)
        var request = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(this.state.gameBoard)
        };
        let url = '/users/' + this.state.userId + '/games/';
        return fetch(url, request)
            .then(res => res.json())
            .then((out) => {
                let state = this.state;
                state.gameId = out.id
                this.setState(state)
            })
    }

    saveGame() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var request = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(this.state.gameBoard)
        };
        let url = '/games/' + this.state.gameId + '/';
        return fetch(url, request)
            .then(res => res.json())
            .then((out) => {
                // let state = this.state;
                // // state.userId = out.userId
                // return this.setState(state)
            })
    }


    sendLoginUser(user) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var request = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(user)
        };
        return fetch('/users/login/', request)
            .then(res => res.json())
            .then((out) => {
                console.log("before state update" + this.state.userId)
                let state = this.state;
                state.userId = out.userId
                console.log("after state update" + state.userId)
                this.setState(state)
            }).then( () => {
                console.log("jfeiwoajfioweajfiowajfoi")
                this.createGame()
            })
    }

    render() {
        return (
            <div className="App">
                <RegisterUser onRegister={this.registerUser} onLogin={this.loginUser}/>
                <GameBoard changeColor={this.changeColor} gameBoard={this.state.gameBoard}/>
                <button onClick={this.saveGame}>Save Game</button>
            </div>
        );
    }

}
export default App;
