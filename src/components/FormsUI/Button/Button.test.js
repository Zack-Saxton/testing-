import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from "react";
import Button from './index';

const handleClick = jest.fn();
const component = (enableFlag = false) => {
  return (<Button
    onClick={handleClick}
    data-testid="submit"
    disabled={enableFlag}
    stylebutton='{"background": "","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
  >
    submit
  </Button>);
};

test('button Availability', () => {
  const container = render(component());
  const input = container.getByText('submit');
  expect(input).toBeTruthy();
});

test('Checking Onclick', () => {
  const container = render(component());
  const input = container.getByText('submit');
  fireEvent.click(input);
  expect(handleClick).toHaveBeenCalledTimes(1);

});

test('Button Enabled', () => {
  const container = render(component());
  const input = container.getByText('submit');
  expect(input).not.toHaveAttribute('disabled');

});

test('should match the snapshot', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});
