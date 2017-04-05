import React, {Component} from 'react';
import './App.css';
import Circle from "./Circle";
export default  class Row extends Component {

    // constructor(props) {
    //     super(props);
    //
    //     this.circle = this.circle.bind(this);
    // }

    // getRowMarkup() {
    //     return this.props.circles.map( (circle, i) => {
    //         return (
    //             <li key={i}>
    //                 {person.firstName} {person.lastName}
    //                 &nbsp; <a href="#" >edit</a>
    //             </li>
    //             <svg height="100" width="100" onClick={() => {
    //
    //                 return (this.props.flipFunc(circle, i))}}>
    //                 <circle cx="50" cy="50" r="40" fill={this.getColor}/>
    //             </svg>
    //         );
    //         )
    //     })
    // }

    render() {
        return (
            <div id="rowComponent">

                <Circle playerInput={this.props.flipPlayer}/>

            </div>
        )
    }
}
