import React from 'react'
import {cleanup, render} from '@testing-library/react'
import DatePicker from './index.js'

afterEach(cleanup)

 test('Render DatePicker', () => {
   const container = render(										
    <DatePicker name="date" defaultDate={new Date()}/>);
 
   const input = container.getByTestId('datePicker');
   expect(input).toBeTruthy();
     expect(input.value).toBe('');
 });

test('should match the snapshot', () => {
  const { asFragment } = render(<DatePicker name="date" defaultDate={new Date()}/>)
  expect(asFragment).toMatchSnapshot()
 });


