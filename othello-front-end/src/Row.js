import React, {Component} from 'react';
import './App.css';
import Circle from "./Circle";
export default  class Row extends Component {

    constructor(props) {
        super(props);

        this.circle = this.circle.bind(this);
    }

    circle ()
    {
        console.log ("We are here")

        // we need to change the state (color) here I think

        return (<Circle color="black"/>)

    }
    render() {
        return (
            <div id="rowComponent">
                <div id="cell0" onClick={this.circle}><Circle/></div>
                <div id="cell1" onClick={this.circle}><Circle/></div>
                <div id="cell2" onClick={this.circle}><Circle/></div>
                <div id="cell3" onClick={this.circle}><Circle/></div>
                <div id="cell4" onClick={this.circle}><Circle/></div>
                <div id="cell5" onClick={this.circle}><Circle/></div>
                <div id="cell6" onClick={this.circle}><Circle/></div>
                <div id="cell7" onClick={this.circle}><Circle/></div>
            </div>
        )
    }
}
