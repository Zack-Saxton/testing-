import '@testing-library/jest-dom';
import { fireEvent, render, act } from '@testing-library/react';
import React from 'react';
import PhoneNumber from './index.js';

const component = () => {
  return (
    <PhoneNumber
      name="text"
      placeholder="Enter your phone number"
      data-testid="phone"
      type="text"
      value="1231231234"
      materialProps={{ maxLength: "14" }}
    />
  );
}

test('Check PhoneField availability', () => {
  const container = render(component());
  const input = container.getByTestId('phone');
  expect(input).toBeTruthy();
  expect(input.type).toBe('text');
  expect(input.hasAttribute('name')).toBe(true);
});

test('PhoneNumber Visibility test', async () => {
  const container = render(component());
  const input = container.getByTestId('phone');
  await act(() => {
		fireEvent.change(input, { target: { value: "1234567890" } });
		fireEvent.blur(input);
	});
  expect(input.value).toBe('(***) ***-7890');
})

test('PhoneNumber prevent alphabet Test', async () => {
  const container = render(component());
  const input = container.getByTestId('phone');  
  await act(() => {
		fireEvent.change(input, { target: { value: "abcde" } });
		fireEvent.blur(input);
	});
  expect(input.value).toBe('');
})


test('should match the snapshot', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});
