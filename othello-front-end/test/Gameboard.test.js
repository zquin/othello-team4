import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import {shallow} from 'enzyme';
import GameBoard from '../src/GameBoard'
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';


let gameBoardComponent, div, gameBoard;
beforeEach(() => {
    div = document.createElement('div');
    gameBoard = [
        {row: "x,x,x,x,x,x,x,x"},
        {row: "x,x,x,x,x,x,x,x"},
        {row: "x,x,x,x,x,x,x,x"},
        {row: "x,x,x,W,B,x,x,x"},
        {row: "x,x,x,B,W,x,x,x"},
        {row: "x,x,x,x,x,x,x,x"},
        {row: "x,x,x,x,x,x,x,x"},
        {row: "x,x,x,x,x,x,x,x"}
    ]
    gameBoardComponent = shallow(<GameBoard changeColor={() => true} gameBoard={gameBoard} />, div);
});

describe('Game board testing', ()=> {
    it('renders the gameboard page', () => {
        expect(gameBoardComponent.find('#gameBoardContainer')).toHaveLength(1);
    });

    it('renders the gameboard page children', () => {
        expect(gameBoardComponent.instance().props.gameBoard).toHaveLength(8);
    });
});
