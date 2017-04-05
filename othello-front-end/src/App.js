import React, { Component } from 'react';
import logo from './logo.svg';
import {FormField, Form} from 'react-pattern-library';
import './App.css';
import RegisterUser from "./RegisterUser";
//import BusinessLogic from "./BusinessLogic";


class App extends Component {

  constructor(props) {
    super(props);

  this.registerUser = this.registerUser.bind(this)
  }

  registerUser(userInfo) {
    this.sendUser(userInfo)
  }

    sendUser(user){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var request = { method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(user)};
        return fetch('/users', request)
            .then((response) => {
            console.log('-----------------',response)
                return response;
            });
    }

  render() {
    return (
      <div className="App">
        <RegisterUser onRegister={this.registerUser} />
      </div>
    );
  }
}
export default App;
