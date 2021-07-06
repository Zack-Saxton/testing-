import React from 'react'
import {render, cleanup} from '@testing-library/react'
import DatePicker from './index.js'
import { format } from "date-fns";

 afterEach(cleanup)

 test('Render DatePicker', () => {
   const container = render(										
    <DatePicker name="date" defaultDate={new Date()}/>);
 
   const input = container.getByTestId('datePicker');
   expect(input).toBeTruthy();
   var date = new Date();
   var formattedDate = format(date, "MM/dd/yyyy");
   expect(input.value).toBe(formattedDate);
 });


 test('Check Change input', () => {
  const container = render(										
   <DatePicker name="date" defaultDate={new Date()}/>);

  const input = container.getByTestId('datePicker');
  var date = new Date();
  var formattedDate = format(date, "MM/dd/yyyy");
  expect(input.value).toBe(formattedDate);
});

test('should match the snapshot', () => {
  const { asFragment } = render(<DatePicker name="date" defaultDate={new Date()}/>)
  expect(asFragment).toMatchSnapshot()
 });


