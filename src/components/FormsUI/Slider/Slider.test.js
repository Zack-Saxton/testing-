import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Slider from './index.js';

afterEach(cleanup);

test('Slider availability', () => {
  const container = render(
    <Slider name="slider1" label="Select Loan Amount" />);

  const input = container.getByRole('slider');
  expect(input).toBeTruthy();

});

test('should match the snapshot', () => {
  const { asFragment } = render(<Slider name="slider2" label="Select Loan Amount" />);
  expect(asFragment).toMatchSnapshot();
});
