import React from 'react'
import { cleanup, render } from '@testing-library/react'
import DatePicker from './index.js'
import format from 'date-fns/format'
import { format } from 'date-fns';
import { date } from 'yup';

afterEach(cleanup)

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
  const { asFragment } = render(<DatePicker name="date" defaultDate={new Date()} />)
  expect(asFragment).toMatchSnapshot()
});
