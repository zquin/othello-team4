import React, { Component } from 'react';
import {FormField, Form} from 'react-pattern-library';

class RegisterUser extends Component {

  constructor(props) {
    super(props)
    this.state = {hello:"world"};
    this.registerUser = this.registerUser.bind(this)
  }

  registerUser() {
    console.log('did I hit')
    return true
  }
  render() {
    return (
      <Form>
        <FormField
          id="email-box"
          label="email"
          required />
        <FormField
          id="password-box"
          label="password"
          type="password"
          required />
        <button className="c-btn c-btn--secondary" type='submit' id="register-button" onClick={this.registerUser}>Submit</button>
      </Form>
    )
  }
}

export default RegisterUser
