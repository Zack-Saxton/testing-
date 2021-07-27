import React from 'react'
import {render, cleanup, fireEvent } from '@testing-library/react'
import PhoneNumber from './index.js'
import '@testing-library/jest-dom';

 afterEach(cleanup)

 test('Render Phone', () => {
   const container = render(										
	<PhoneNumber name="mobile" />);
 
   const input = container.getByTestId('phone');
   expect(input).toBeTruthy();
   expect(input.value).toBe('');

 });

 test('Change input and check the value', () => {
  const container = render(										
 <PhoneNumber name="mobile" />);

  const input = container.getByTestId('phone');

  fireEvent.change(input, { target: { value: "1234567800" } });
  expect(input).toHaveAttribute('unmaskedval', '1234567800');
});

test('Accept only 10 digits as phone number', () => {
  const container = render(										
 <PhoneNumber name="mobile" />);

 const input = container.getByTestId('phone');

 fireEvent.change(input, { target: { value: "1234567800111" } });
 expect(input).toHaveAttribute('unmaskedval', '12345678001');
});

test('should match the snapshot', () => {
  const { asFragment } = render(<PhoneNumber name="mobile" />)
  expect(asFragment).toMatchSnapshot()
 });