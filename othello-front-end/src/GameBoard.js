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
                  console.log("gameBoard x = " + x.row + " i = "+ i)
                  return (
                    <div>
                      <Row id={i} changeColor={this.props.changeColor} row={x.row}/>
                    </div>)
                })
              }
            </div>
        )
    }
}



// var rows = [];
//
// for (let i = 0; i < 8; i++) {
//     console.log(i);
//     rows.push(<Row id="row{i}"/>)
// }
// return (
//     <div className="square">
//         {rows}
//     </div>
// )
//
// return (
//     <div className="square">
//         {rows}
//     </div>
// )
