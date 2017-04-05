import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import {shallow} from 'enzyme';
import RegisterUser from '../src/RegisterUser'
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

// import fetchMock from 'fetch-mock';

// let registerUser, div, regUser;
// beforeEach(() => {
//   div = document.createElement('div');
//   registerUser = jest.fn()
//
//   regUser = shallow(<RegisterUser />, div);
//
// });

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
    const regUser = shallow(<RegisterUser user={expectedUser} />, div);

    let fakeRegisterUser = jest.fn();
    let bound = fakeRegisterUser.bind(regUser);
    bound();

    regUser.props.registerUser = fakeRegisterUser;
    regUser.find('#registration-form').simulate('submit');
    expect(fakeRegisterUser).toHaveBeenCalledTimes(1);
});

xit('testing shallow with register user on app', () => {
  // const div = document.createElement('div');
  // const app = shallow(<App />, div);
  // const registerUser = app.find(RegisterUser.name);
  // expect(registerUser).toHaveLength(1);

  const div = document.createElement('div');
  const registerUser = shallow(<RegisterUser />, div);
console.log('------------', registerUser.node._self.registerUser())
  expect(registerUser.find('#c-btn--secondary'))
  let button = registerUser.find('#c-btn--secondary')
  // ReactTestUtils.Simulate.click(buttton);
  //button.simulate('click')
})


// let submitFeedback = jest.fn()
// sinon.stub(FeedbackModal.prototype, 'submitFeedback',  submitFeedback);
// var feedbackModal = ReactTestUtils.renderIntoDocument(
//   <FeedbackModal />
// )
//
// let submitButtton = ReactTestUtils.findRenderedDOMComponentWithClass(feedbackModal, 'feedback-submit-button')
// ReactTestUtils.Simulate.click(submitButtton);
//
// expect(submitFeedback).toBeCalled()
