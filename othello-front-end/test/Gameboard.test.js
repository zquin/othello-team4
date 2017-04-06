import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import {shallow} from 'enzyme';
import GameBoard from '../src/GameBoard'
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';


describe('Game board testing', ()=> {
    it('renders the registration page', () => {
        const div = document.createElement('div');
        let gameBoard = [
            {row: "x,x,x,x,x,x,x,x"},
            {row: "x,x,x,x,x,x,x,x"},
            {row: "x,x,x,x,x,x,x,x"},
            {row: "x,x,x,W,B,x,x,x"},
            {row: "x,x,x,B,W,x,x,x"},
            {row: "x,x,x,x,x,x,x,x"},
            {row: "x,x,x,x,x,x,x,x"},
            {row: "x,x,x,x,x,x,x,x"}
        ]
        const gameBoardComponent = shallow(<GameBoard changeColor={() => true} gameBoard={gameBoard} />, div);
        expect(gameBoardComponent.find('#gameBoardContainer')).toHaveLength(1);
    });
});
