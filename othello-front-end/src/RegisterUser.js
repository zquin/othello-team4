import React, { Component } from 'react';
import {FormField, Form} from 'react-pattern-library';

class RegisterUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailAddress: '',
            password: ''
        }
    }

    render() {
        return (
            <Form id='registration-form'>
              <FormField
                  onChange={ (e) => {this.state.emailAddress = e.target.value }}
                  id="email-box"
                  label="email"
                  required />
              <FormField
                  onChange={ (e) => {this.state.password = e.target.value }}
                  id="password-box"
                  label="password"
                  type="password"
                  required />
              <div>
                <button className="c-btn c-btn--secondary reg-log-buttons-div" type='submit' id="register-button" onClick={ () => this.props.onRegister(this.state) }>Register</button>
                <button className="c-btn c-btn--secondary reg-log-buttons-div" type='submit' id="login-button" onClick={ () => this.props.onLogin(this.state) }>Login</button>
              </div>
            </Form>
        )
    }
}

export default RegisterUser
