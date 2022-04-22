import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import BRNumber from './index.js';

afterEach(cleanup);

test('Availability test', () => {
  const container = render(
    <BRNumber
      type="text"
      name="BRN"
      label="BRN"
      materialProps={ { "data-testid": "BRN" } }
    />);

  const input = container.getByTestId('BRN');
  expect(input).toBeTruthy();
  expect(input.value).toBe('');
  expect(input.hasAttribute('name')).toBe(true);

});

test('IRender Bank routing Number', () => {
  const container = render(
    <BRNumber
      type="text"
      name="BRN"
      label="BRN"
      materialProps={ { "data-testid": "BRN" } }
    />);

  const input = container.getByTestId('BRN');
  fireEvent.change(input, { target: { value: "123" } });
  expect(input.value).toBe('123');
});

test('Get only numeric value', () => {
  const container = render(
    <BRNumber
      type="text"
      name="BRN"
      label="BRN"
      materialProps={ { "data-testid": "BRN", maxLength: 10 } }
    />);

  const input = container.getByTestId('BRN');
  fireEvent.change(input, { target: { value: "abc" } });
  expect(input.value).toBe('');
  fireEvent.change(input, { target: { value: "123" } });
  expect(input.value).toBe('123');
});

it('should be between 6 to 17 characters', () => {
  const wrapper = render(<BRNumber
    type="text"
    name="BRN"
    label="BRN"
    materialProps={ { "data-testid": "BRN" } }
  />);
  const input = wrapper.getByTestId('BRN');
  expect(input.maxLength).toBe(9);
});

test('should match the snapshot', () => {
  const { asFragment } = render(<BRNumber
    type="text"
    name="BRN"
    label="BRN"
    materialProps={ { "data-testid": "BRN" } }
  />);
  expect(asFragment).toMatchSnapshot();
});