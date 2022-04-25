import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import EmailWrapper from './index.js';

afterEach(cleanup);

test('Render DEmail field', () => {
  const container = render(
    <EmailWrapper
      name="Email"
      form={true}
      label="Enter your email id"
      required={true}
      type="email"
      materialProps={{ "data-testid": "test" }}
    />);

  const input = container.getByTestId('test');
  expect(input).toBeTruthy();
  expect(input.value).toBe('');
  expect(input.hasAttribute('name')).toBe(true);
});

test('Check email input field', () => {
  const container = render(
    <EmailWrapper
      name="firstName"
      form={true}
      label="Enter your first name"
      required={true}
      type="email"
      materialProps={{ "data-testid": "test" }}
    />);

  const input = container.getByTestId('test');
  fireEvent.change(input, { target: { value: "test@mail.com" } });
  expect(input.value).toBe("test@mail.com");
  expect(screen.queryByLabelText("error-msg")).not.toBeInTheDocument();
});
