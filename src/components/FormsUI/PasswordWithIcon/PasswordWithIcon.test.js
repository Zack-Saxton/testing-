import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import PasswordWithIcon from './index.js';

afterEach(cleanup);
const component = () => {
  return (
    <PasswordWithIcon
      name="userName"
      label="Enter Username"
      icon="lock"
      iconColor="#595E6E"
      iconPosition="right"
      materialProps={{ "data-testid": "test" }}
      required={true}
    />
  )
}

test("Check the Password Field is rendering", () => {
  const container = render(component());
  const input = container.getByTestId('test');
  expect(input).toBeTruthy();
});

test("Check the Password Field is rendered with Icon", () => {
  const container = render(component());
  const input = container.getByTestId('icon');
  expect(input).toBeTruthy();
});

test("Check can able to enter value", () => {
  const container = render(component());
  const input = container.getByTestId('test');
  fireEvent.change(input, { target: { value: "Mariner" } });
  expect(input.value).toBe('Mariner');
});


test('should match the snapshot', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});
