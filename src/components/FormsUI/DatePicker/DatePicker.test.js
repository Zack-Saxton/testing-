import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, waitFor, act } from '@testing-library/react';
import React from 'react';
import DatePicker from './index.js';

const SampleDate = "Tue Jan 01 2000 12:03:00 GMT+0530 (India Standard Time)"

const component = () => {
  return (
    <DatePicker
      name="date"
      inputformat={'MM/dd/yyyy'}
      value={SampleDate}
      
    />
  );
};

afterEach(cleanup);

test('Render DatePicker', () => {
  const container = render(component());
  const input = container.getByTestId('datePicker');
  expect(input).toBeTruthy();
});


test('Select Date', async () => {
  const { container } = render(component());
  const input = container.querySelector('input[name=date]');
  await act(() => {
		fireEvent.click(input);
	});  
  expect(input.getAttribute("value")).toBe("01/01/2000");
});


test('should match the snapshot', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});
