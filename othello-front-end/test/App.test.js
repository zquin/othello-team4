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

    xit('allows a player to place piece ', () => {
        let state = app.instance().state;
        let startValue = state.gameBoard[3].row[6];
        expect(startValue).toBe('W');
        let nextPlace = state.gameBoard[2].row[6]
        expect(nextPlace).toBe('x')
        app.instance().playerTakeTurn(2, 3)
        expect(state.gameBoard[2].row[6]).toBe('B')
    })

    xit('changeColor function gets called', () => {
        let state = app.instance().state;
        let value = state.gameBoard[0].row[0];
        expect(value).toBe('x');
        app.instance().changeColor(0, 0)
        let newValue = state.gameBoard[0].row[0]
        expect(newValue).toBe('B')
    });

    xit('disallows a player to place piece ', () => {
        let state = app.instance().state;
        let startValue = state.gameBoard[4].row[6];
        expect(startValue).toBe('B');
        let nextPlace = state.gameBoard[5].row[6]
        expect(nextPlace).toBe('x')
        app.instance().playerTakeTurn(5, 3)
        expect(state.gameBoard[5].row[6]).toBe('x')
    })

    it('isLegal function checks the players move is legal and returns true of false', () => {
        let state = app.instance().state;
        let startValue = state.gameBoard[3].row[6];
        expect(startValue).toBe('W');
        let nextPlace = state.gameBoard[2].row[6]
        expect(nextPlace).toBe('x')

        expect(app.instance().isLegal(2,3)).toBe(true)
    })

})