import React, {Component} from 'react';
import './App.css';

export default class Circle extends Component
{
    // constructor(props) {
    //     super(props)
    //
    //     this.state = {
    //         color: this.props.color
    //     }
    // }

    render() {
        return (
            <div className={this.props.color}>
            </div>
        );
    }

}