import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import ButtonSecondary from "./index";

const handleClick = jest.fn();
const component = (enableFlag = false) => {
  return (<ButtonSecondary
    onClick={handleClick}
    data-testid="submit"
    disabled={enableFlag}
    stylebutton='{"background": "","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
  >
    Continue
  </ButtonSecondary>);
};
test("Check Primary Button Availability", () => {
  const container = render(component());
  const input = container.getByText('Continue');
  expect(input).toBeTruthy();
})

test("Check Click Event", () => {
  const container = render(component());
  const input = container.getByText('Continue');
  fireEvent.click(input);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("Check button is enabled", () => {
  const container = render(component());
  const input = container.getByText("Continue")
  expect(input).not.toHaveAttribute("disabled");
});

test("Check button is disabled", () => {
  const container = render(component(true));
  const input = container.getByText("Continue")
  expect(input).toHaveAttribute("disabled");
});

test("Check button secondary color", () => {
  const container = render(component(true));
  const input = container.getByText("Continue")
  expect(input).toHaveStyle(`background: #fff`);
});

test("Should match the snapshot", () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});