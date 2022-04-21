import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import PhoneNumber from './index.js';

const component = () => {
  return(
    <PhoneNumber
        name="text"
        placeholder="Enter your phone number"
        data-testid= "phone"
        type="text"
        materialProps={ { maxLength: "14" } }
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

test('PhoneNumber Visibility test', () =>{
  const container = render(component());
  const input = container.getByTestId('phone');
  fireEvent.change(input, { target: { value: "1234567890" } });
  expect(input.value).toBe('(123) 456-7890');
})

test('PhoneNumber prevent alphabet Test', () =>{
  const container = render(component());
  const input = container.getByTestId('phone');
  fireEvent.change(input, { target: { value: "abcde" } });
  expect(input.value).toBe('');
})


test('should match the snapshot', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});
