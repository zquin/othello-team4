import React from 'react';
import App from '../src/App';
import {shallow} from 'enzyme';
import fetchMock from 'fetch-mock';

let app, div;
beforeEach(() => {
  div = document.createElement('div');
  app = shallow(<App />, div);
});

describe('Full Application testing', ()=> {
    it('renders the main app page', () => {
        expect(app.find('.App')).toHaveLength(1);
    });

    it('registers a new user', () => {
        let user = {emailAddress: "zquinn@allstate.com", password: ""};
        fetchMock.post('/users', user);

        app.instance().sendUser(user).then((response) => {
            expect(response.status).toBe(200);
        })
        fetchMock.restore();
    });

    it('changeColor function gets called', () => {
        let state = app.instance().state;
        let value = state.gameBoard[0].row[0];
        expect(value).toBe('x');
        app.instance().changeColor(0, 0)
        let newValue = state.gameBoard[0].row[0]
        expect(newValue).toBe('B')
    });

})



// const expectedUser = { email: 'zquin@allstate.com', password: 'passw0rd' };
// const div = document.createElement('div');
// let fakeRegisterUser = sinon.stub();
//
// const regUser = shallow(<RegisterUser onRegister={fakeRegisterUser} />, div);
//
// regUser.find('#register-button').simulate('click');
// expect(fakeRegisterUser.calledOnce).toBe(true);