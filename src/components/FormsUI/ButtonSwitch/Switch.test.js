import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import Switch from './index.js';

afterEach(cleanup);

test('Render Button Switch', () => {
  const container = render(
    <Switch
      label="Switch is"
      labelPlacement="end"
    />);

  const input = container.getByTestId('switch');
  expect(input).toBeTruthy();
});


test('Change switch value', () => {
  const container = render(
    <Switch
      label="Switch is"
      labelPlacement="end"
    />);

  const input = container.getByTestId('switch');
  fireEvent.click(input);
  expect(input.value).toBe("false");
  expect(input).toBeTruthy();
});

test('should match the snapshot', () => {
  const { asFragment } = render(<Switch
    label="Switch is"
    labelPlacement="end"
  />);
  expect(asFragment).toMatchSnapshot();
});
