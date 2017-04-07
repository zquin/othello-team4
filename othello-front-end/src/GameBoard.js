import React, {Component} from 'react';
import {FormField, Form} from 'react-pattern-library';
import './App.css';
import Row from './Row'
export default class GameBoard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="square" id="gameBoardContainer">
              {
                this.props.gameBoard.map((x, i) => {
                  return (
                    <div key={i}>
                      <Row id={i} playerTakeTurn={this.props.playerTakeTurn} row={x.row}/>
                    </div>)
                })
              }
              <button onClick={this.props.saveGame} className='save-game-button c-btn c-btn--primary c-btn--lg'>Save Game</button>
            </div>
        )
    }
}
