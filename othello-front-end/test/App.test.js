import React from 'react';
import App from '../src/App';
import {shallow} from 'enzyme';
import fetchMock from 'fetch-mock';

let app, div, state;
beforeEach(() => {
  div = document.createElement('div');
  app = shallow(<App />, div);
  state = app.instance().state;
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

    xit('playerTakeTurn allows a player to place piece for a valid move', () => {
      let startValue = state.gameBoard[3].row[3];
      expect(startValue).toBe('W');
      let nextPlace = state.gameBoard[2].row[3]
      expect(nextPlace).toBe('x')
      app.instance().playerTakeTurn(2, 3)
      expect(state.gameBoard[2].row[3]).toBe('B')
    })

    it('changeColor function gets called', () => {
      let value = state.gameBoard[0].row[0];
      expect(value).toBe('x');
      app.instance().changeColor(0, 0)
      let newValue = state.gameBoard[0].row[0]
      expect(newValue).toBe('B')
    });

    xit('playerTakeTurn disallows a player to place piece for an illegal move', () => {
      let startValue = state.gameBoard[4].row[6];
      expect(startValue).toBe('B');
      let nextPlace = state.gameBoard[5].row[6]
      expect(nextPlace).toBe('x')
      app.instance().playerTakeTurn(5, 3)
      expect(state.gameBoard[5].row[6]).toBe('x')
    })

    it('isLegal function checks the players move is legal and returns true of false', () => {
      let startValue = state.gameBoard[3].row[3];
      expect(startValue).toBe('W');
      let nextPlace = state.gameBoard[4].row[5]
      expect(nextPlace).toBe('x')
      expect(app.instance().isLegal(4,5)).toBe(true)
    })

    it('isOpen check to see if a space is open and returns true or false', () => {
      let startValue = state.gameBoard[3].row[3];
      expect(startValue).toBe('W');
      let nextPlace = state.gameBoard[4].row[5]
      expect(nextPlace).toBe('x')
      expect(app.instance().isOpen(4,5)).toBe(true)
      expect(app.instance().isOpen(4,4)).toBe(false)
    })

    it('isNextToOppenent checks to see if a current attempted move is next to an opponents piece', () => {
      let startValue = state.gameBoard[3].row[3];
      expect(startValue).toBe('W');
      let nextPlace = state.gameBoard[4].row[5]
      expect(nextPlace).toBe('x')
      expect(app.instance().isNextToOppenent(4,5)).toBe(true)
      expect(app.instance().isNextToOppenent(4,6)).toBe(false)
    })

    it('isNextToOppenentHorizontally checks to see if a current attempted move is next to an opponents piece', () => {
      let startValue = state.gameBoard[3].row[3];
      expect(startValue).toBe('W');
      let nextPlace = state.gameBoard[4].row[5]
      expect(nextPlace).toBe('x')
      let oppositePlayer = {
          false: "B",
          true: "W"
      }
      expect(app.instance().nextToOppenentHorizontally('W','x', oppositePlayer)).toBe(true)
      expect(app.instance().nextToOppenentHorizontally('x','W', oppositePlayer)).toBe(true)
      expect(app.instance().nextToOppenentHorizontally('x','x', oppositePlayer)).toBe(false)
    })
})
