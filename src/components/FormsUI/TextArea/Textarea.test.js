import { cleanup, render, fireEvent } from '@testing-library/react';
import React from 'react';
import TextArea from './index.js';

afterEach(cleanup);
const component = () => {
  return(
    <TextArea
      placeholder="Enter here..."
      row="4"
      label="TextArea"
      variant="outlined"
      required={ true }
      character_limit="20"
      name="TextArea"
      value="TextArea"
    />
  );
}
test('Check the textArea availability', () => {
  const container = render(component());
  const input = container.getByTestId('textarea');
  expect(input).toBeTruthy();
});

test('Initially the value should be empty', () => {
  const container = render(component());
  const input = container.getByTestId('textarea');
  expect(input.value).toBe('');
});
test("Check can able to enter value", () => {
  const container = render(component());
  const input = container.getByTestId('textarea');
  fireEvent.change(input, { target: { value: "Mariner" } });
  expect(input.value).toBe('Mariner');
});

test('should match the snapshot', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});