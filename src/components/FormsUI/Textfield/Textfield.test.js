import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import TextField from './index.js';

afterEach(cleanup);

test('Render DatePicker', () => {
  const container = render(
    <TextField
      name="firstName"
      form={ true }
      label="Enter your first name"
      required={ true }
      type="email"
      materialProps={ { "data-testid": "test" } }
    />);

  const input = container.getByTestId('test');
  expect(input).toBeTruthy();
  expect(input.value).toBe('');
  expect(input.hasAttribute('name')).toBe(true);
});

test('Initially empty', () => {
  const container = render(
    <TextField
      name="firstName"
      form={ true }
      label="Enter your first name"
      required={ true }
      type="email"
      materialProps={ { "data-testid": "test" } }
    />);

  const input = container.getByTestId('test');
  expect(input.value).toBe('');
});

test('Changing value', () => {
  const container = render(
    <TextField
      name="firstName"
      form={ true }
      label="Enter your first name"
      required={ true }
      type="email"
      materialProps={ { "data-testid": "test" } }
    />);

  const input = container.getByTestId('test');
  expect(input.value).toBe('');
  expect(input.hasAttribute('name')).toBe(true);
  fireEvent.change(input, { target: { value: "123" } });
  expect(input.value).toBe('123');
});

it('should match  snapshot', () => {
  const { asFragment } = render(<TextField
    name="firstName"
    form={ true }
    label="Enter your first name"
    required={ true }
    type="email"
    materialProps={ { "data-testid": "test" } }
  />);

  expect(asFragment(<TextField
    name="firstName"
    form={ true }
    label="Enter your first name"
    required={ true }
    type="email"
    materialProps={ { "data-testid": "test" } }
  />)).toMatchSnapshot();
});