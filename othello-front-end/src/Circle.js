import React, {Component} from 'react';
import './App.css';

export default class Circle extends Component
{

    render() {
        return (
            <div className={this.props.color}>
            </div>
        );
    }

}