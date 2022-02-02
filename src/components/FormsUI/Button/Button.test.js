import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from "react";
import Button from './index';

test('button Availability', () => {
  const container = render(<Button
    stylebutton='{"background": "", "color":"" }'
    background="0F4EB3"
    title="submit"
    data-test-id="submit"
  >
    submit
  </Button>);
  const input = container.getByText('submit');
  expect(input).toBeTruthy();
});

test('Checking Onclick', () => {
  const handleClick = jest.fn();
  const container = render(<Button
    onClick={ handleClick }
    stylebutton='{"background": "", "color":"" }'
    background="0F4EB3"
    title="submit"
    data-test-id="submit"
  >
    submit
  </Button>);
  const input = container.getByText('submit');
  fireEvent.click(input);
  expect(handleClick).toHaveBeenCalledTimes(1);

});

test('Button Enabled', () => {
  const handleClick = jest.fn();
  const container = render(<Button
    onClick={ handleClick }
    stylebutton='{"background": "", "color":"" }'
    background="0F4EB3"
    title="submit"
    data-test-id="submit"
  >
    submit
  </Button>);
  const input = container.getByText('submit');

  expect(input).not.toHaveAttribute('disabled');

});

test('should match the snapshot', () => {
  const handleClick = jest.fn();
  const { asFragment } = render(<Button
    onClick={ handleClick }
    stylebutton='{"background": "", "color":"" }'
    background="0F4EB3"
    title="submit"
    data-test-id="submit"
  >
    submit
  </Button>);
  expect(asFragment).toMatchSnapshot();
});
