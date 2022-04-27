import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import ApplyLoan from "./SelectOffer";
import { ThemeProvider } from '@mui/styles';
import { createTheme, StyledEngineProvider } from '@mui/material/styles'


const theme = createTheme();

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 500000,
		},
	},
});

const component = () => {
  window.scrollTo = jest.fn()
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ApplyLoan />
          </BrowserRouter>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

test("Checks the title of the page", () => {
	const container = render(component());
  // console.log(container);
	const selectOffer = screen.getByText("1. Select Offer");
  // screen.debug(undefined, 30000);
	expect(selectOffer).toBeTruthy();
  expect(selectOffer.hasAttribute('disabled')).not.toBe(true);
	const reviewAndSignTab = screen.getByText("2. Review & Sign");
  expect(reviewAndSignTab.hasAttribute('disabled')).toBe(true);
  const finalVerifyTab = screen.getByText("3. Final Verification");
  expect(finalVerifyTab.hasAttribute('disabled')).toBe(true);
  const reciveMoney = screen.getByText("4. Receive your money");
  const reciveMoney123 = screen.getByTestId("offerTableBlock");
  expect(reciveMoney123).toBeTruthy();
  expect(reciveMoney.hasAttribute('disabled')).toBe(true);
});

test("Rendered Terms and offers blocks", () => {
	render(component());
  const offerTableBlock = screen.getByTestId("offerTableBlock");
  expect(offerTableBlock).toBeTruthy();
  const termGrid = screen.getByTestId("termGrid");
  expect(termGrid).toBeTruthy();
});
