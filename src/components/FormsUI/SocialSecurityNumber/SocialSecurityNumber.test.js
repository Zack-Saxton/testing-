import '@testing-library/jest-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import SSNumber from './index.js';

const component = () => {
  return (
    <SSNumber name="ssn" />
  );
};

afterEach(cleanup);

test('Render SSN Field', () => {
  const container = render(component());

  const input = container.getByTestId('ssn');
  expect(input).toBeTruthy();
  expect(input.value).toBe('');

});

test('Change input and check the value', () => {
  const container = render(component());
  const input = container.getByTestId('ssn');

  fireEvent.change(input, { target: { value: "123456780" } });
  expect(input).toHaveAttribute('unmaskedval', '123456780');
});

test('Accept only 9 digits as social security Number', () => {
  const container = render(component());
  const input = container.getByTestId('ssn');

  fireEvent.change(input, { target: { value: "1234567800124334234232" } });
  expect(input).toHaveAttribute('unmaskedval', '123456780');
});

test('should match the snapshot', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});
