

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render,fireEvent, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import NavContext from "../../../../contexts/NavContext";
import ReviewAndSign from "./ReviewAndSign";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

const theme = createTheme();
window.scrollTo = jest.fn();
const component = () => {
  return (
    <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <NavContext>
              <ReviewAndSign />
            </NavContext>
          </BrowserRouter>
        </QueryClientProvider>
    </ThemeProvider>
  )
}


test("render page", () => {
	render(component());
	const input = screen.getByTestId("reviewAndSign_testid");
	expect(input).toBeTruthy();
});

test("Check disable and enable", () => {
  render(component());
  const selectOffer = screen.getByText("1. Select Offer");
  expect(selectOffer).toBeTruthy();
  expect(selectOffer.hasAttribute('disabled')).toBe(true);
  const reviewAndSignTab = screen.getByText("2. Review & Sign");
  expect(reviewAndSignTab.hasAttribute('disabled')).not.toBe(true);
  const finalVerifyTab = screen.getByText("3. Final Verification");
  expect(finalVerifyTab.hasAttribute('disabled')).toBe(true);
  const reciveMoney = screen.getByText("4. Receive your money");
  expect(reciveMoney.hasAttribute('disabled')).toBe(true);
});


test("Check Reset-Button", () => {
  render(component());
  const input = screen.getByTestId("reselect_button");
  expect(input).toBeTruthy();
});

test("Re-Button Onclick", () => {
	render(component());
	const button = screen.getByTestId("reselect_button");
	fireEvent.click(button);
});

test("Render iFrame", () => {
  render(component());
  const input = screen.getByTestId("iframe");
  expect(input).toBeTruthy();
});

test("Render checkbox", () => {
  render(component());
  const input = screen.getByTestId("confirm_checkbox");
  expect(input).toBeTruthy();
});

test("test checkbox is able to select", () => {
	const { container } = render(component());
	const element = container.querySelector(`input[id="confirm_checkbox"]`);
	fireEvent.click(element);
	expect(element).toBeChecked();
});

test("Check Submit-Button", () => {
  render(component());
  const input = screen.getByTestId("review-submit-button");
  expect(input).toBeTruthy();
});

test("Submit Onclick", () => {
	render(component());
	const button = screen.getByTestId("review-submit-button");
	fireEvent.click(button);
});
