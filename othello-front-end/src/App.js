import React, { Component } from 'react';
import logo from './logo.svg';
import {FormField, Form} from 'react-pattern-library';
import './App.css';
import RegisterUser from "./RegisterUser";
import GameBoard from "./GameBoard";
//import BusinessLogic from "./BusinessLogic";


class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">

        <RegisterUser />
          <GameBoard />
      </div>
    );
  }
}
export default App;
