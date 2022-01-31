import '@testing-library/jest-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import PasswordField from './index.js';

afterEach(cleanup);

test('render password', () => {
  const container = render(
    <PasswordField
      name="password"
      label="password"
      type="password"
      data-test-id="pass"
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
      data-test-id="pass"
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
    data-test-id="pass"
  />);
  expect(asFragment).toMatchSnapshot();
});