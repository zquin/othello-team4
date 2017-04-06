import React, {Component} from 'react';
import {FormField, Form} from 'react-pattern-library';
import './App.css';
import Row from './Row'
export default  class GameBoard extends Component {

    constructor(props) {
        super(props);
    }


    get buildGameBoard() {

        var rows = [];

        for (let i = 0; i < 8; i++) {
            console.log(i);
            rows.push(<Row id="row{i}"/>)
        }
        return (
            <div className="square">
                {rows}
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

