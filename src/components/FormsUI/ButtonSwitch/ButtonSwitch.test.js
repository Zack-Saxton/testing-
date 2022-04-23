import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import ButtonSwitch from "./index";

const handleChange = jest.fn();
const component = (enableFlag = false) => {
  return (<ButtonSwitch
    onChange={handleChange}
    disabled={enableFlag}
    data-testid="switch"
  >
    Continue
  </ButtonSwitch>);
};

test("Check the Switch Button Availability", () => {
  let container = render(component());
  const element = container.getByTestId('switch');
  expect(element).toBeTruthy();
});

test("Check the Switch is not disabled", () => {
  let container = render(component());
  const input = container.getByTestId('switch');
  expect(input).not.toHaveAttribute('disabled');
});

test("Check the Switch is disabled", () => {
  let container = render(component(true));
  const input = container.getByTestId('switch');
  expect(input).not.toHaveAttribute('disabled');
});

test("By default the switch to be ON", () => {
  let container = render(component());
  const input = container.getByTestId('switch');
  expect(input).toBeChecked();
});

test("The switch to be OFF in click event", () => {
  let container = render(component());
  const input = container.getByTestId('switch');
  fireEvent.click(input);
  expect(input).not.toBeChecked();
});

test("The switch to be OFF and ON when click two time", () => {
  let container = render(component());
  const input = container.getByTestId('switch');
  fireEvent.click(input);
  fireEvent.click(input);
  expect(input).toBeChecked();
});

test('should match the snapshot', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});