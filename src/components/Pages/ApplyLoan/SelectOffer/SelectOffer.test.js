import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import NavContext from "../../../../contexts/NavContext";
import ApplyLoan from "./SelectOffer";
import { FetchOfferWithLoading, FetchOfferWithoutLoading } from "./../../../../__mock__/SelectOffer.mock";

const theme = createTheme();
window.scrollTo = jest.fn();

jest.mock("../ApplyForLoanHook/useFetchOffer", () => ({
  useFetchOffer: jest.fn(),
}))


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

const MockActiveloans = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <NavContext>
              <ApplyLoan />
            </NavContext>
          </BrowserRouter>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

describe("while loading", () => {
  it("renders a loader", () => {
    FetchOfferWithLoading();
    render(MockActiveloans());
    const selectOffer = screen.getByText("1. Select Offer");
    expect(selectOffer).toBeTruthy();
  });

  it("renders the Stepper Bar with all the steps", () => {
    FetchOfferWithLoading();
    render(MockActiveloans());
    const selectOffer = screen.getByText("1. Select Offer");
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

  it("Renders Offer Table Page", () => {
    FetchOfferWithoutLoading();
    const container = render(MockActiveloans());
    const offerTableBlock = container.getByTestId("offer_Table");
    expect(offerTableBlock).toBeTruthy();
    const termGrid = container.getByTestId("termGrid");
    expect(termGrid).toBeTruthy();
  });
});

it("Check number of rows in Offer Table", () => {
  FetchOfferWithoutLoading();
  const container = render(MockActiveloans());
  expect(container.getAllByRole('row')).toHaveLength(4);
});

it("Check the Button is disabled Initially", () => {
  FetchOfferWithoutLoading();
  const container = render(MockActiveloans());
  const offerTableBlock = container.getByTestId("Continue_Button");
  expect(offerTableBlock.getAttribute("disabled")).toBe("");
});

it("Continue Button Enable Test", () => {
  FetchOfferWithoutLoading();
  const container = render(MockActiveloans());
  const radioButtonDetect = container.getByTestId("offer_Table_Radio_1")
  expect(radioButtonDetect).toBeTruthy();
  fireEvent.click(radioButtonDetect);
  const offerTableBlock = container.getByTestId("Continue_Button");
  expect(offerTableBlock.getAttribute("disabled")).toBe("");
});
