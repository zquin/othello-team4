import React, {Component} from 'react';
import './App.css';
export default class Row extends Component {
    render() {
        return (
            <div id="rowComponent">
                {this.props.row.split(",").map((cell, i) => {
                    return (
                        <span className="cell-block" onClick={() => this.props.changeColor(this.props.id, i)}>
                            <div className={cell}></div>
                        </span>
                    )
                })}
            </div>
        )
    }
}
