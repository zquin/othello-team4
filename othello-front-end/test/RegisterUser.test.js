import React from 'react';
import {shallow} from 'enzyme';
import RegisterUser from '../src/RegisterUser'
import sinon from 'sinon';

describe('User Registration testing', ()=> {
    it('renders the registration page', () => {

        const expectedUser = { email: 'zquin@allstate.com', password: 'passw0rd' };
        const div = document.createElement('div');
        const regUser = shallow(<RegisterUser />, div);

        expect(regUser.find('#email-box')).toHaveLength(1);
        expect(regUser.find('#password-box')).toHaveLength(1);
        expect(regUser.find('#register-button')).toHaveLength(1);
    });

    it('registerUser function is called', () => {
        const expectedUser = { email: 'zquin@allstate.com', password: 'passw0rd' };
        const div = document.createElement('div');
        let fakeRegisterUser = sinon.stub();

        const regUser = shallow(<RegisterUser onRegister={fakeRegisterUser} />, div);

        regUser.find('#register-button').simulate('click');
        expect(fakeRegisterUser.calledOnce).toBe(true);
    });

});

