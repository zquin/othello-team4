import React, { Component } from 'react';
import logo from './logo.svg';
import {FormField, Form} from 'react-pattern-library';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Form>
          <FormField
            id="email-box"
            label="email"
            required />
          <FormField
            id="password-box"
            label="password"
            required />
          <button className="c-btn c-btn--secondary" id="register-button">Register</button>
        </Form>
      </div>
    );
  }
}

export default App;
