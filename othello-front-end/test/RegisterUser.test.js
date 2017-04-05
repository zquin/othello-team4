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
//   // div = document.createElement('div');
//   registerUser = jest.fn()
//   sinon.stub(RegisterUser.prototype, 'registerUser',  registerUser);
//   // regUser = shallow(<RegisterUser />, div);
//   regUser = ReactTestUtils.renderIntoDocument(<RegisterUser />)
//   // regUser.registerUser = registerUser
// });

xit('renders the registration page', () => {
  expect(regUser.find('#email-box')).toHaveLength(1);
  expect(regUser.find('#password-box')).toHaveLength(1);
  expect(regUser.find('#register-button')).toHaveLength(1);
});

xit('registerUser function is called', () => {
  let buttton = ReactTestUtils.findRenderedDOMComponentWithClass(regUser, 'c-btn--secondary')
  ReactTestUtils.Simulate.click(buttton);
console.log('[[[[[[[[[[[[[[[[[[', regUser)
 // expect(registerUser.resgisterMethod).toHaveBeenCalledTimes(1)
  expect(registerUser).toBeCalled()
});

xit('registerUser function is called', () => {
  let registerUser = jest.fn()
  sinon.stub(regUser.prototype, 'registerUser',  registerUser);
})

it('testing shallow with register user on app', () => {
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
