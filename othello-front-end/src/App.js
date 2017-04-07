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
    }

    playerTakeTurn (rowId, cellId) {
        let player = this.state.blacksTurn ? 'B' : 'W';
        if (this.isLegal(rowId, cellId, player)) {
            this.changeColor(rowId, cellId)
        }
    }

    isLegal (rowId, cellId, player) { //being tested
        // place to move is open
        let isOpen = this.isOpen(rowId, cellId);
        // check oppent piece is next to it
        let nextToOppenent = this.isNextToOppenent(rowId, cellId)

        // place to move has players piece in horizontal line


        // place to move has players piece in vertical line
        // place to move has players piece in diagonal line

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
        let row = this.state.gameBoard[rowId].row
        let oppositePlayer = {
            false: "B",
            true: "W"
        }

        let oneBefore = row[cellId - 1]
        let oneAfter = row[cellId + 1]

        // console.log('rowId', rowId);
        // console.log('cellId', cellId);
        // console.log('black players turn', this.state.blacksTurn);
        // console.log('state', this.state);
        // console.log('oneBefore', oneBefore);
        // console.log('oneAfter', oneAfter);
        // console.log('the place', row[cellId]);
        // console.log('row', row);
        // console.log('first check', (oneBefore === oppositePlayer[this.state.blacksTurn]));
        // console.log('second check', (oneAfter === oppositePlayer[this.state.blacksTurn]));
        // console.log('this.nextToOppenentHorizontally(oneBefore, oneAfter)', this.nextToOppenentHorizontally(oneBefore, oneAfter, oppositePlayer));
        if (this.nextToOppenentHorizontally(oneBefore, oneAfter, oppositePlayer)) {
          return true
        }
        return false
    }

    nextToOppenentHorizontally (oneBefore, oneAfter, oppositePlayer) {
      if ((oneBefore === oppositePlayer[this.state.blacksTurn]) || (oneAfter === oppositePlayer[this.state.blacksTurn])) {
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
