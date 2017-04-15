import React, {Component} from 'react';
import './App.css';
import Row from './Row'
export default class GameBoard extends Component {

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
