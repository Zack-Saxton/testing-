import '@testing-library/jest-dom';
import { fireEvent, logRoles, render } from '@testing-library/react';
import React from 'react';
import Password from './index.js';

const component = () => {
  return (
    <Password
      name="password"
      label="Password *"
      placeholder="Enter your password"
      id="password"
      type="password"
      materialProps={{ maxLength: "100" }}
    />
  );
}
test('Check TextField availability', () => {
  const container = render(component());
  const input = container.getByPlaceholderText('Enter your password');
  logRoles(input);
  expect(input).toBeTruthy();
  expect(input.type).toBe('password');
  expect(input.hasAttribute('name')).toBe(true);
});

test('Password Visibility test', () => {
  const container = render(component());
  const button = container.getByTestId('passButton');
  fireEvent.click(button);
  const input = container.getByPlaceholderText('Enter your password');
  expect(input.type).toBe('text');
  fireEvent.click(button);
  expect(input.type).toBe('password')
})

test('Password Input test', () => {
  const container = render(component());
  const input = container.getByPlaceholderText('Enter your password');
  fireEvent.change(input, { target: { value: "123" } });
  expect(input.value).toBe('123');
})

test('Password Length Test', () => {
  const container = render(component());
  const input = container.getByPlaceholderText('Enter your password');
  expect(input.maxLength).toBe(100);
})

test('Password Prevent Cut Test', () => {
  const container = render(component());
  const input = container.getByPlaceholderText('Enter your password');
  fireEvent.cut(input);
  expect(input.value).toBe('');
})

test('Password Prevent Copy Test', () => {
  const container = render(component());
  const input = container.getByPlaceholderText('Enter your password');
  fireEvent.copy(input);
  expect(input.value).toBe('');
})

test('Password Prevent Paste Test', () => {
  const container = render(component());
  const input = container.getByPlaceholderText('Enter your password');
  fireEvent.paste(input);
  expect(input.value).toBe('');
})

test('should match the snapshot Test', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
})
