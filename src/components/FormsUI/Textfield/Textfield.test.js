import { cleanup, fireEvent, render, act } from '@testing-library/react';
import React from 'react';
import TextField from './index.js';

afterEach(cleanup);

test('Render DatePicker', () => {
  const container = render(
    <TextField
      name="firstName"
      label="Enter your first name"
      required={true}
      materialProps={{ "data-testid": "test" }}
    />)

  const input = container.getByTestId('test');
  expect(input).toBeTruthy();
  expect(input.value).toBe('');
  expect(input.hasAttribute('name')).toBe(true);
});

test('Initially empty', () => {
  const container = render(
    <TextField
      name="firstName"
      label="Enter your first name"
      required={true}
      materialProps={{ "data-testid": "test" }}
    />);

  const input = container.getByTestId('test');
  expect(input.value).toBe('');
});

test('Changing value', async() => {
  const container = render(
    <TextField
      name="firstName"
      label="Enter your first name"
      required={true}
      materialProps={{ "data-testid": "test" }}
    />);

  const input = container.getByTestId('test');
  expect(input.value).toBe('');
  expect(input.hasAttribute('name')).toBe(true);
  await act(() => {
    fireEvent.change(input, { target: { value: "123" } });
  });
  expect(input.value).toBe('123');
});

