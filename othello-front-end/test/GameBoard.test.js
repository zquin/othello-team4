import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import {shallow} from 'enzyme';
import RegisterUser from '../src/RegisterUser'
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import GameBoard from "../src/GameBoard";

describe('Game Board testing Suite', () => {
    it('renders the game board', () => {

        // const expectedUser = { email: 'zquin@allstate.com', password: 'passw0rd' };

        // const regUser = shallow(<RegisterUser />, div);
        //
        // expect(regUser.find('#email-box')).toHaveLength(1);
        // expect(regUser.find('#password-box')).toHaveLength(1);
        // expect(regUser.find('#register-button')).toHaveLength(1);

        const div = document.createElement('div');
        const gameBoard = shallow(<GameBoard />,div);
        const actual = gameBoard.find("#gameBoardContainer");
        expect(actual).toHaveLength(1);


    });

    it('contains an array of Row components', () => {
        const div = document.createElement('div');


    })
});
