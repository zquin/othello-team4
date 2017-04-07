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

    it('playerTakeTurn allows a player to place piece for a valid move', () => {
      //the places Im tryign to place a piece may not be valid in this test
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

    it('playerTakeTurn disallows a player to place piece for an illegal horizontal move', () => {
      let startValue = state.gameBoard[4].row[3];
      expect(startValue).toBe('B');
      let nextPlace = state.gameBoard[5].row[3]
      expect(nextPlace).toBe('x')

      app.instance().playerTakeTurn(4, 5)
      expect(state.gameBoard[4].row[5]).toBe('B')

      app.instance().playerTakeTurn(1, 3)
      expect(state.gameBoard[1].row[3]).toBe('x')
    })

    it('playerTakeTurn disallows a player to place piece for an illegal vertical move', () => {
      let startValue = state.gameBoard[3].row[3];
      expect(startValue).toBe('W');
      let nextPlace = state.gameBoard[2].row[3]
      expect(nextPlace).toBe('x')

      app.instance().playerTakeTurn(2, 3)// this is a valid move
      expect(state.gameBoard[2].row[3]).toBe('B')

      app.instance().playerTakeTurn(6, 3)//this is not a valid move
      expect(state.gameBoard[6].row[3]).toBe('x')
    })

    xit('isTaking returns ?????? if a potential move will take pieces', () => {
    })

    xit('takesVertically reutrns false if it cant take peieces', () => {
      let startValue = state.gameBoard[3].row[3];
      expect(startValue).toBe('W');
      let nextPlace = state.gameBoard[2].row[3]
      expect(nextPlace).toBe('x')
      expect(app.instance().takesVertically(2, 3)).toBe(false)
    })

    xit('takesVertically changes the colors of pieces being taken and reutrns false if it cant take peieces', () => {
      let startValue = state.gameBoard[3].row[3];
      expect(startValue).toBe('W');
      let nextPlace = state.gameBoard[2].row[3]
      expect(nextPlace).toBe('x')
      expect(app.instance().isTaking(2, 3)).toBe(true)// this is a valid move
    })

})
