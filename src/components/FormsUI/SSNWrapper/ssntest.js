import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import PasswordField from './index.js';
import '@testing-library/jest-dom';

afterEach(cleanup)

 test('render password', () => {
   const container = render(										
                  <PasswordField
										name="password"
										label="password"
										type="password"
                    data-test-id= "pass"
                    id="password"
									/>);
 
  //  const input = container.getByTestId('passProps');
   const input = document.querySelector('#password')
   expect(input).toBeTruthy();
   /* Assertion */
   expect(input).toHaveAttribute('type', 'password');
 });

 test('Toggle password visibility', () => {
  const container = render(										
    <PasswordField
      name="password"
      label="password"
      type="password"
      data-test-id= "pass"
      id="password"
    />);
    const input = document.querySelector('#password')
    const button = container.getByTestId('passButton');
  /* Expects password to be hidden */
  expect(input).toHaveAttribute('type', 'password');

  /* Trigger click event */
  fireEvent.click(button);

  /* Expects password to be shown */
  expect(input).toHaveAttribute('type', 'text');
});

test('should match the snapshot', () => {
  const { asFragment } = render(<PasswordField
    name="password"
    label="password"
    type="password"
    data-test-id= "pass"
  />)
  expect(asFragment).toMatchSnapshot()
 });