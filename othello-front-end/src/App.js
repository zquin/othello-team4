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
            blacksTurn: true
        }
        this.changeColor = this.changeColor.bind(this)
        this.registerUser = this.registerUser.bind(this)
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
        let rowAbove = this.state.gameBoard[rowId - 1].row
        let rowBelow = this.state.gameBoard[rowId + 1].row

        let spotToTheLeft = currentRow[cellId - 1]
        let spotToTheRight = currentRow[cellId + 1]

        let spotAbove = rowAbove[cellId]
        let spotBelow = rowBelow[cellId]
        // console.log('rowId', rowId);
        // console.log('cellId', cellId);
        // console.log('black players turn', this.state.blacksTurn);
        // console.log('state', this.state);
        // console.log('spotToTheLeft', spotToTheLeft);
        // console.log('spotToTheRight', spotToTheRight);
        // console.log('spotAbove', spotAbove);
        // console.log('spotBelow', spotBelow);
        // console.log('the place', currentRow[cellId]);
        // console.log('currentRow', currentRow);
        // console.log('first check', (spotToTheLeft === oppositePlayer[this.state.blacksTurn]));
        // console.log('second check', (spotToTheRight === oppositePlayer[this.state.blacksTurn]));
        // console.log('this.nextToOppenentHorizontally(spotToTheLeft, spotToTheRight)', this.nextToOppenentHorizontally(spotToTheLeft, spotToTheRight, oppositePlayer));

                // place to move has players piece in horizontal line


                // place to move has players piece in vertical line
                // place to move has players piece in diagonal line
        let validHorizontally = this.nextToOppenentHorizontally(spotToTheLeft, spotToTheRight, oppositePlayer)
        let validVertically = this.nextToOppenentVertically(spotBelow, spotAbove, oppositePlayer)
        console.log('validVertically', validVertically);
        if (validHorizontally || validVertically) {
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

    changeColor(rowId, cellId) { //has a test
        let newGameBoard = this.state.gameBoard
        let newRow = newGameBoard[rowId].row.split("")

        if(newRow[cellId] === ("x")) {
            this.state.blacksTurn ? newRow[cellId] = "B" : newRow[cellId] = "W"
            newGameBoard[rowId].row = newRow.join('')
            this.setState({blacksTurn: !this.state.blacksTurn})
            this.setState(newGameBoard)
        }
    }

    registerUser(userInfo) {
        this.sendUser(userInfo)
    }

    sendUser(user){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var request = { method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(user)};
        return fetch('/users', request)
            .then((response) => {
                return response;
            });
    }

    render() {
        return (
            <div className="App">
                <RegisterUser onRegister={this.registerUser} />
                <GameBoard playerTakeTurn={this.playerTakeTurn} gameBoard={this.state.gameBoard}/>
            </div>
        );
    }

}
export default App;
