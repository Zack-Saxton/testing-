import { cleanup, render } from '@testing-library/react';
import format from 'date-fns/format';
import React from 'react';
import DatePicker from './index.js';

afterEach(cleanup);

test('Render DatePicker', () => {
  const container = render(
    <DatePicker name="date" defaultDate={new Date()} />);

  const input = container.getByTestId('datePicker');
  expect(input).toBeTruthy();
  const date = new date();
  const formattedDate = format(date, "dd-MMYYYY");
  expect(input.value).toBe('');
});

test('should match the snapshot', () => {
  const { asFragment } = render(<DatePicker name="date" defaultDate={new Date()} />);
  expect(asFragment).toMatchSnapshot();
});
