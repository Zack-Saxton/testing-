import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import DatePicker from './index.js';

const component = () => {
  return (
    <DatePicker
      name="date"
      inputFormat={'MM/dd/yyyy'}
      value="01/01/2000"
      minDate="01/01/2000"
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
  fireEvent.click(input);
  await waitFor(() => expect(input.getAttribute("value")).toBe("01/01/2000"))
});


test('should match the snapshot', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});
