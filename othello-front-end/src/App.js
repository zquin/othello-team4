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
                //     0 1 2 3 4 5 6 7
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
        this.registerUser = this.registerUser.bind(this)
        this.playerTakeTurn = this.playerTakeTurn.bind(this)
        this.isOpen = this.isOpen.bind(this)
        this.isLegal = this.isLegal.bind(this)
        this.isNextToOppenent = this.isNextToOppenent.bind(this)
    }

    playerTakeTurn (rowId, cellId) {
        let player = this.state.blacksTurn ? 'B' : 'W';
        if (this.isLegal(rowId, cellId, player)) {
            this.changeColor(rowId, cellId)
        }
    }

    isLegal (rowId, cellId, player) {
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
        let cell = (cellId * 2)
        if (this.state.gameBoard[rowId].row[cell] === 'x') {
            return true
        }
    }



    numericValueOfCell(cellChar) {
        if(cellChar === 'W') return 0
        else if (cellChar === 'B') return 1
        else return Math.NaN
    }

    isNextToOppenent(rowId, cellId) {
        // horizontal check
        // this.state.blacksTurn
        let row = this.state.gameBoard[rowId].row.replace(/,/gi, '').split('')
        let playerNum = (this.state.blacksTurn ? 1 : 0);


                       //1       +  0  == 1
        // let trutyVal = (playerNum + cellVal)
        //                //0        +1      == 1
        // //isNextToOppenent(rowId, cellId)
        // let trutyVal = playerNum + row[cellId - 1]
        let oneBefore = numericValueOfCell(row[cellId - 1])
        let oneAfter = numericValueOfCell(row[cellId - 1])
        if ((playerNum + oneBefore) || playerNum + oneAfter) {
            return true
        }
    }


    let a = {
        false: "B",
        true: "W"
    }

a[this.state.blacksTurn]


    if (oneBefore === a[!this.state.blacksTurn] || "x") || (oneAfter = a[!this.state.blacksTurn] || "x") {
        return true
}








    changeColor(rowId, cellId) {
        let state = this.state
        let newGameBoard = this.state.gameBoard

        let rowArr = newGameBoard[rowId].row.split(",")
        if(rowArr[cellId] === ("x")) {
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
