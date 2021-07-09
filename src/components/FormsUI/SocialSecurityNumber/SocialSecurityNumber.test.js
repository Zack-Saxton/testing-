import React from 'react'
import {render, cleanup, fireEvent } from '@testing-library/react'
import SSNumber from './index.js'
import '@testing-library/jest-dom';

 afterEach(cleanup)

 test('Render SSN Field', () => {
   const container = render(										
	<SSNumber name="ssn" />);
 
   const input = container.getByTestId('ssn');
   expect(input).toBeTruthy();
   expect(input.value).toBe('');

 });

 test('Change input and check the value', () => {
  const container = render(										
 <SSNumber name="ssn" />);

  const input = container.getByTestId('ssn');

  fireEvent.change(input, { target: { value: "123456780" } });
  expect(input).toHaveAttribute('unmaskedval', '123456780');
});

test('Accept only 9 digits as social security Number', () => {
  const container = render(										
 <SSNumber name="ssn" />);

  const input = container.getByTestId('ssn');

  fireEvent.change(input, { target: { value: "1234567800124334234232" } });
  expect(input).toHaveAttribute('unmaskedval', '123456780');
});

test('should match the snapshot', () => {
  const { asFragment } = render(<SSNumber name="ssn" />)
  expect(asFragment).toMatchSnapshot()
 });

