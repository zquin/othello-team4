import React, { Component } from 'react';
import {FormField, Form} from 'react-pattern-library';

class RegisterUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <Form id='registration-form'>
                <FormField
                    onChange={ (e) => {this.state.email = e.target.value }}
                    id="email-box"
                    label="email"
                    required />
                <FormField
                    onChange={ (e) => {this.state.password = e.target.value }}
                    id="password-box"
                    label="password"
                    type="password"
                    required />
                <button className="c-btn c-btn--secondary" type='submit' id="register-button" onClick={ () => this.props.onRegister(this.state) }>Register</button>
                <button className="c-btn c-btn--secondary" type='submit' id="login-button" onClick={ () => this.props.onLogin(this.state) }>Login</button>
            </Form>
        )

    }
}

export default RegisterUser
