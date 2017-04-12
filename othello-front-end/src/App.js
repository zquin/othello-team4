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
            gameId: -1,
            locationAround: [],
            isHidden: false
        }
        this.changeColor = this.changeColor.bind(this)
        this.registerUser = this.registerUser.bind(this)
        this.loginUser = this.loginUser.bind(this)
        this.saveGame = this.saveGame.bind(this)
        this.playerTakeTurn = this.playerTakeTurn.bind(this)
        this.isOpen = this.isOpen.bind(this)
        this.isLegal = this.isLegal.bind(this)
        this.isNextToOppenent = this.isNextToOppenent.bind(this)
        this.changeColorForFlipping = this.changeColorForFlipping.bind(this)
    }

    playerTakeTurn (rowId, cellId) {
        let player = this.state.blacksTurn ? 'B' : 'W';
        if (this.isLegal(rowId, cellId, player)) {
            // update the game board to updatedGameBoard which will
            // flip the pieces that have been taken
            // let state = this.state
            // state.gameBoard = state.updatedGameBoard
            // this.setState(state)
            let state = this.state
            console.log(this.state.newThing)
            for (let element in this.state.newThing) {
                console.log("new thing stuff = " + this.state.newThing[element].toString().split(',').join(''))
                console.log(state.gameBoard[element].row)
                state.gameBoard[element].row = this.state.newThing[element].toString().split(',').join('')
            }

            this.changeColor(rowId, cellId)

        }
    }

    isLegal (rowId, cellId, player) { //being tested
        let isOpen = this.isOpen(rowId, cellId);
        let nextToOppenent = this.isNextToOppenent(rowId, cellId)
        if (isOpen && nextToOppenent) {
            if(this.hasAnAnchor(rowId, cellId)) {
              return true
            }
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

        let validHorizontally = this.checkNextCell(spotToTheLeft, spotToTheRight, oppositePlayer)
        let validVertically = this.checkNextCell(spotBelow, spotAbove, oppositePlayer)
        let validDiagonallyUpper = this.checkNextCell(upperLeft, upperRight ,oppositePlayer)
        let validDiagonallyLower = this.checkNextCell(lowerLeft, lowerRight ,oppositePlayer)

        let validupperLeft = this.checkCell(upperLeft, oppositePlayer)
        let validAbove = this.checkCell(spotAbove, oppositePlayer)
        let validRight = this.checkCell(spotToTheRight, oppositePlayer)
        let validupperRight = this.checkCell(upperRight, oppositePlayer)
        let validlowerRight = this.checkCell(lowerRight, oppositePlayer)
        let validBelow = this.checkCell(spotBelow, oppositePlayer)
        let validlowerLeft = this.checkCell(lowerLeft, oppositePlayer)
        let validLeft = this.checkCell(spotToTheLeft, oppositePlayer)


        let locationAround = [
            validupperLeft ? [-1,1] : []
            ,validAbove ? [0,1] : []
            ,validRight ? [1,0] : []
            ,validupperRight ? [1,1] : []
            ,validlowerRight ? [1,-1] : []
            ,validBelow ? [0,-1] : []
            ,validlowerLeft ? [-1,-1] : []
            ,validLeft ? [-1,0] : []
          ]

        let state=this.state
        state.locationAround = locationAround
        this.setState(state)
        // place to move has players piece in diagonal line

        if (validHorizontally || validVertically || validDiagonallyUpper || validDiagonallyLower) {
          return true
        }
        return false
    }

    checkCell(spot, oppositePlayer) {
      if (spot === oppositePlayer[this.state.blacksTurn]) {
        return true
      }
      return false
    }

    checkNextCell (spot1, spot2, oppositePlayer) {
      if ((spot1 === oppositePlayer[this.state.blacksTurn]) || (spot2 === oppositePlayer[this.state.blacksTurn])) {
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

    changeColorForFlipping(rowId, cellId, tmp) { //has a test
        let tempGameBoard = tmp
        let newRow = tempGameBoard[rowId].row.split("")
        this.state.blacksTurn ? newRow[cellId] = "B" : newRow[cellId] = "W"
        tempGameBoard[rowId].row = newRow.join('')
        return tempGameBoard
    }

    hasAnAnchor(rowId, cellId) {
        let state = this.state

        let currentPlayer = {
          false: "W",
          true: "B"
        }
        console.log(this.state.locationAround.length)

        // check the locationAround to see which are true, meaning
        // there is an oppositePlayer piece there, then check to see
        // if there is an anchor in that direction
        let currentRow = this.state.gameBoard[rowId].row

        let rowAbove = this.state.gameBoard[(rowId - 1) >= 0 ? (rowId - 1) : 0].row
        let rowBelow = this.state.gameBoard[(rowId + 1) % this.state.gameBoard.length].row

        // [ x x x ]
        // [ x 0 x ]
        // [ x x x ]
        // let state = this.state
        // //

        let updatedGameBoard = []
        for (let element in this.state.gameBoard) {
          updatedGameBoard[element] = (this.state.gameBoard[element].row.split(''))
        }
        // let newRow = updatedGameBoard[rowId]
        // this.state.blacksTurn ? newRow[cellId] = "Zach" : newRow[cellId] = "Mike"
        // updatedGameBoard[rowId] = newRow

        // this.setState(state)
        for(let element=0;element<this.state.locationAround.length; element++) {
            if (this.state.locationAround[element].length>0) {
              // a coordinate is found
              let xCoordinate = this.state.locationAround[element][0]
              let yCoordinate = this.state.locationAround[element][1]



              if ((xCoordinate !== 0) && yCoordinate === 0) {
                // traverse the currentRow
                for(let i=cellId+1;i<currentRow.length;i++) {
                  if(currentRow[i] === currentPlayer[this.state.blacksTurn]) {
                    return true;
                  }
                }



                for(let i=cellId-1;i>=0;i--) {
                    let newRow = updatedGameBoard[rowId]
                    this.state.blacksTurn ? newRow[i] = "B" : newRow[i] = "W"
                    this.state.blacksTurn ? newRow[cellId] = "B" : newRow[cellId] = "W"
                    updatedGameBoard[rowId] = newRow
                  if(currentRow[i] === currentPlayer[this.state.blacksTurn]) {
                      let state = this.state
                      state.newThing = updatedGameBoard
                      this.setState(state)
                    return true;
                  }
                }
              }




              if ((yCoordinate === 1) && xCoordinate === 0) {
                // traverse Vertically up
                for(let i=(rowId-1);i>=0;i--) {
                  if (this.state.gameBoard[(i)].row[cellId] === currentPlayer[this.state.blacksTurn]) {
                    return true;
                  }
                }
              }

              if ((yCoordinate === -1) && xCoordinate === 0) {
                // trverse vertically down
                for(let i=(rowId+1);i<this.state.gameBoard.length;i++) {
                  if (this.state.gameBoard[(i)].row[cellId] === currentPlayer[this.state.blacksTurn]) {

                    return true;
                  }
                }
              }
              if ((yCoordinate === 1) && xCoordinate === -1) {
                // traverse top left diag
                for(let i=(rowId-1);i>=0;i--) {
                  if (this.state.gameBoard[(i)].row[cellId+i] === currentPlayer[this.state.blacksTurn]) {
                    return true;
                  }
                }
              }
              if ((yCoordinate === 1) && xCoordinate === 1) {
                // traverse top right diag
                for(let i=(rowId-1);i>=0;i--) {
                  if (this.state.gameBoard[(i)].row[cellId-i] === currentPlayer[this.state.blacksTurn]) {
                    return true;
                  }
                }
              }
              if ((yCoordinate === -1) && xCoordinate === -1) {
                // traverse bottom left diag
                for(let i=(rowId+1);i<this.state.gameBoard.length;i++) {
                  if (this.state.gameBoard[(i)].row[cellId-i] === currentPlayer[this.state.blacksTurn]) {
                    return true;
                  }
                }
              }
              if ((yCoordinate === -1) && xCoordinate === 1) {
                // traverse bottom right diag
                for(let i=(rowId+1);i<this.state.gameBoard.length;i++) {
                  if (this.state.gameBoard[(i)].row[cellId+i] === currentPlayer[this.state.blacksTurn]) {
                    return true;
                  }
                }
              }
            }
        }
    }

    // takesVertically (rowId, cellId) {
    //   return false
    // }

    registerUser(userInfo) {
        this.sendUser(userInfo)
    }

    loginUser(userInfo) {
        this.sendLoginUser(userInfo)
        this.setState({isHidden: !this.state.isHidden})
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
        let css = {true: 'isHidden', false: ''}
        return (
          <div className="App">
            <div className="l-grid">
              <div className="l-grid__col">
                <div id='register-div' className={css[this.state.isHidden]}>
                  <h1>Welcome to Othello</h1>
                  <p>Please register or login</p>
                  <RegisterUser onRegister={this.registerUser} onLogin={this.loginUser} />
                </div>
                <div className={css[!this.state.isHidden]}>
                  <GameBoard saveGame={this.saveGame} playerTakeTurn={this.playerTakeTurn} gameBoard={this.state.gameBoard} />
                </div>
              </div>
            </div>
          </div>
        );
    }

}
export default App;
