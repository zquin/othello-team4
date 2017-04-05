import React, { Component } from 'react';
import logo from './logo.svg';
import {FormField, Form} from 'react-pattern-library';
import './App.css';
import RegisterUser from "./RegisterUser";
//import BusinessLogic from "./BusinessLogic";


class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        Wired

        <RegisterUser />
      </div>
    );
  }
}
export default App;
