import React, {Component} from 'react';
import {FormField, Form} from 'react-pattern-library';
import './App.css';
import Row from './Row'
export default class GameBoard extends Component {

    constructor(props) {
        super(props);
    }


    get buildGameBoard() {
        return (
            <div className="square">
                {this.props.gameBoard.map((x, i) => {
                    console.log("gameBoard x = " + x.row + " i = "+ i)
                    return <Row id={i} changeColor={this.props.changeColor} row={x.row}/>
                })}
            </div>
        )
    }

    render() {
        return (
            <div id="gameBoardContainer">
                {this.buildGameBoard}
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
