import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import {shallow} from 'enzyme';
import fetchMock from 'fetch-mock';

let app, div;
beforeEach(() => {
  div = document.createElement('div');
  app = shallow(<App />, div);
});

it('renders the main app page', () => {
  expect(app.find('.App')).toHaveLength(1);
});

it('registers a new user', () => {
    let user = {emailAddress: "zquinn@allstate.com", password: ""};
    fetchMock.post('/users', user);

    app.instance().sendUser(user).then((response) => {
        expect(response.status).toBe(200);
    })
    // Unmock.
    fetchMock.restore();
})

it('login a new user', () => {
    let user = {emailAddress: "zquinn@allstate.com", password: ""};
    fetchMock.post('/users/login/', user);

    app.instance().sendLoginUser(user).then((response) => {
        expect(response.status).toBe(200);
    })
    // Unmock.
    fetchMock.restore();
})