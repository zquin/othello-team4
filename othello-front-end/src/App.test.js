import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders the registration page', () => {
  const div = document.createElement('div');
  const app = shallow(<App />, div);

  expect(app.find('#email-box')).toHaveLength(1);
  expect(app.find('#password-box')).toHaveLength(1);
  expect(app.find('#register-button')).toHaveLength(1);
});
