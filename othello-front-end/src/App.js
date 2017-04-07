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
                //     01234567
                {row: "xxxxxxxx"},
                {row: "xxxxxxxx"},
                {row: "xxxxxxxx"},
                {row: "xxxWBxxx"},
                {row: "xxxBWxxx"},
                {row: "xxxxxxxx"},
                {row: "xxxxxxxx"},
                {row: "xxxxxxxx"}
            ],
            blacksTurn: true,
            userId: "-1",
            gameId: -1
        }
        this.changeColor = this.changeColor.bind(this)
        this.registerUser = this.registerUser.bind(this)
        this.loginUser = this.loginUser.bind(this)
        this.saveGame = this.saveGame.bind(this)
        this.playerTakeTurn = this.playerTakeTurn.bind(this)
        this.isOpen = this.isOpen.bind(this)
        this.isLegal = this.isLegal.bind(this)
        this.isNextToOppenent = this.isNextToOppenent.bind(this)
        this.nextToOppenentHorizontally = this.nextToOppenentHorizontally.bind(this)
        this.nextToOppenentVertically = this.nextToOppenentVertically.bind(this)
    }

    playerTakeTurn (rowId, cellId) {
        let player = this.state.blacksTurn ? 'B' : 'W';
        if (this.isLegal(rowId, cellId, player)) {
            this.changeColor(rowId, cellId)
        }
    }

    isLegal (rowId, cellId, player) { //being tested
        let isOpen = this.isOpen(rowId, cellId);
        let nextToOppenent = this.isNextToOppenent(rowId, cellId)
        if (isOpen && nextToOppenent) {
            return true
        }
        return false
    }

    isOpen (rowId, cellId) {
        if (this.state.gameBoard[rowId].row[cellId] === 'x') {
            return true
        }
        return false
    }

    isNextToOppenent(rowId, cellId) {
      let oppositePlayer = {
        false: "B",
        true: "W"
      }

        let currentRow = this.state.gameBoard[rowId].row
        let rowAbove = this.state.gameBoard[(rowId - 1) >= 0 ? (rowId - 1) : 0].row
        let rowBelow = this.state.gameBoard[(rowId + 1) % this.state.gameBoard.length].row

        let spotToTheLeft = currentRow[cellId - 1]
        let spotToTheRight = currentRow[cellId + 1]

        let spotAbove = rowAbove[cellId]
        let spotBelow = rowBelow[cellId]

        let upperLeft = rowAbove[cellId - 1]
        let upperRight = rowAbove[cellId + 1]

        let lowerLeft = rowBelow[cellId - 1]
        let lowerRight = rowBelow[cellId + 1]

        let validHorizontally = this.nextToOppenentHorizontally(spotToTheLeft, spotToTheRight, oppositePlayer)
        let validVertically = this.nextToOppenentVertically(spotBelow, spotAbove, oppositePlayer)
        let validDiagonallyUpper = this.nextToOppenentDiagonallyUpper(upperLeft, upperRight ,oppositePlayer)
        let validDiagonallyLower = this.nextToOppenentDiagonallyLower(lowerLeft, lowerRight ,oppositePlayer)
        // place to move has players piece in diagonal line

        if (validHorizontally || validVertically || validDiagonallyUpper || validDiagonallyLower) {
          return true
        }
        return false
    }

    nextToOppenentHorizontally (spotToTheLeft, spotToTheRight, oppositePlayer) {
      if ((spotToTheLeft === oppositePlayer[this.state.blacksTurn]) || (spotToTheRight === oppositePlayer[this.state.blacksTurn])) {
        return true
      }
      return false
    }

    nextToOppenentVertically (spotBelow, spotAbove, oppositePlayer) {
      if ((spotBelow === oppositePlayer[this.state.blacksTurn]) || (spotAbove === oppositePlayer[this.state.blacksTurn])) {
        return true
      }
      return false
    }

    nextToOppenentDiagonallyUpper (upperLeft, upperRight, oppositePlayer) {
      if ((upperLeft === oppositePlayer[this.state.blacksTurn]) || (upperRight === oppositePlayer[this.state.blacksTurn])) {
        return true
      }
      return false
    }

    nextToOppenentDiagonallyLower (lowerLeft, lowerRight ,oppositePlayer) {
      if ((lowerLeft === oppositePlayer[this.state.blacksTurn]) || (lowerRight === oppositePlayer[this.state.blacksTurn])) {
        return true
      }
      return false
    }

    changeColor(rowId, cellId) { //has a test
        let newGameBoard = this.state.gameBoard
        let newRow = newGameBoard[rowId].row.split("")

        if(newRow[cellId] === ("x")) {
            this.state.blacksTurn ? newRow[cellId] = "B" : newRow[cellId] = "W"
            newGameBoard[rowId].row = newRow.join('')
            this.setState({blacksTurn: !this.state.blacksTurn})
            this.setState({gameBoard: newGameBoard})
        }
    }


    takesVertically (rowId, cellId) {
      return false
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

    createGame() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
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
        console.log("in save game game id = " + this.state.gameId)
        console.log("gameboard  = " + JSON.stringify(this.state.gameBoard))
        var request = {
            method: 'PUT',
            headers: myHeaders,
            body: "{ \"rows\": "+JSON.stringify(this.state.gameBoard) + "}"
        };
        console.log(request)
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
                let state = this.state;
                state.userId = out.userId
                this.setState(state)
            }).then( () => {
                this.createGame()
            })
    }

    render() {
        return (
            <div className="App">
                <RegisterUser onRegister={this.registerUser} onLogin={this.loginUser}/>
                <GameBoard playerTakeTurn={this.playerTakeTurn} gameBoard={this.state.gameBoard}/>
                <button onClick={this.saveGame}>Save Game</button>
            </div>
        );
    }

}
export default App;
