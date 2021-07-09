import React from 'react';
import {render, cleanup, fireEvent } from '@testing-library/react';
import PasswordField from './index.js';
import '@testing-library/jest-dom';
 afterEach(cleanup)

 test('render Password', () => {
   const container = render(										
                  <PasswordField
										name="password"
										label="password"
										type="password"
                    data-testid= "pass"
									/>);
 
   const input = container.getByTestId('pass');
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
      data-testid= "pass"
    />);
  const input = container.getByTestId('pass');
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
    data-testid= "pass"
  />)
  expect(asFragment).toMatchSnapshot()
 });