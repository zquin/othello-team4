import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import {shallow} from 'enzyme';
// import fetchMock from 'fetch-mock';

let app, div;
beforeEach(() => {
  div = document.createElement('div');
  app = shallow(<App />, div);
});

it('renders the main app page', () => {
  expect(app.find('.App')).toHaveLength(1);
});

