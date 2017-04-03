import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import {shallow} from 'enzyme';
// import fetchMock from 'fetch-mock';

let app, div;
beforeEach(() => {
  // fetchMock.mock('/spaces', mockJson);
  div = document.createElement('div');
  app = shallow(<App />, div);
});

it('renders the registration page', () => {
  expect(app.find('#email-box')).toHaveLength(1);
  expect(app.find('#password-box')).toHaveLength(1);
  expect(app.find('#register-button')).toHaveLength(1);
});

it('onRegister function is called', () => {
  let myDiv = document.createElement('div');
  const registerUser = shallow(<RegisterUser />, myDiv);

  fakeOnRegister = jest.fn();
  app.find('#register-button').simulate('click');

  // let register = new Register()

  registerUser.onRegister = fakeOnRegister;
  registerUser.find('#register-form').simulate('submit', { preventDefault() {} })

  expect(fakeOnRegister).toHaveBeenCalledTimes(1);
});