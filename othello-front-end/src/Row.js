import React, {Component} from 'react';
import './App.css';
import Circle from "./Circle";
export default class Row extends Component {

    constructor(props) {
        super(props);

        // this.changeColor = this.changeColor.bind(this);
        this.state = {
            color: "",
            blacksTurn: true
        }
    }

    // changeColor () {
    //     let state = this.state
    //     console.log(state.color);
    //     if (this.state.blacksTurn) {
    //         state.color="circleBlack"
    //     } else {
    //         state.color="circleGrey"
    //     }
    //
    //     state.blacksTurn = !this.state.blacksTurn
    //
    //     this.setState(state)
    // }

    //
    // flipBlack () {
    //     this.setState(tempstate.color="rgba(0,0,0,1)")
    // }
    //
    // flipWhite () {
    //     this.setState(tempstate.color="rgba(255,255,255, 0.9)")
    // }

    render() {
        return (
            <div id="rowComponent">
                {this.props.row.split(",").map((cell, i) => {
                    return (<span className="cell-block" onClick={() => this.props.changeColor(this.props.id, i)}>
                                <div className={cell}></div>
                            </span>)
                })}
            </div>
        )
    }
}


//
// <div id="cell0" onClick={this.changeColor}><div className={this.state.color}>
// </div></div>
// <div id="cell1" onClick={this.changeColor}><div className={this.state.color}>
// </div></div>
// <div id="cell2" onClick={this.changeColor}><Circle/></div>
// <div id="cell3" onClick={this.changeColor}><Circle/></div>
// <div id="cell4" onClick={this.changeColor}><Circle/></div>
// <div id="cell5" onClick={this.changeColor}><Circle/></div>
// <div id="cell6" onClick={this.changeColor}><Circle/></div>
// <div id="cell7" onClick={this.changeColor}><Circle/></div>
