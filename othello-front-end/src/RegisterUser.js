import React, { Component } from 'react';
import {FormField, Form} from 'react-pattern-library';

class RegisterUser extends Component {

  registerUser(event) {
    return true
  }

  render() {
    return (
      <Form id='registration-form' onSubmit={ this.registerUser }>
        <FormField
          id="email-box"
          label="email"
          required />
        <FormField
          id="password-box"
          label="password"
          type="password"
          required />
        <button className="c-btn c-btn--secondary" type='submit' id="register-button">Submit</button>
      </Form>
    )
  }
}

export default RegisterUser
