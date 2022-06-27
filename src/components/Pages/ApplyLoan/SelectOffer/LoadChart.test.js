import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import NavContext from "../../../../contexts/NavContext";
import ApplyLoan from "./SelectOffer";
import LoadChart from './loadChart';
import { FetchOfferWithLoading, FetchOfferWithoutLoading } from "./../../../../__mock__/SelectOffer.mock";
const handleClickMock = jest.fn();

const theme = createTheme();
window.scrollTo = jest.fn();
const classes = {
	"resetContainer": "makeStyles-resetContainer-83",
}

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
							<LoadChart>
							reset={handleClickMock}

							</LoadChart>
            </NavContext>	
          </BrowserRouter>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

describe("while loading", () => {
  it("Compare Add FUnctionality works", () => {
    FetchOfferWithLoading();
    const container = render(MockActiveloans());
  });

  it("renders a loader", () => {
    FetchOfferWithLoading();
    render(MockActiveloans());
    const selectOffer = screen.getByText("1. Select Offer");
    expect(selectOffer).toBeTruthy();
  });

  it("render Offer Table ", () => {
    FetchOfferWithLoading();
    render(MockActiveloans());
    const offerTableBlock = screen.getByTestId("offerTableBlock");
    expect(offerTableBlock).toBeTruthy();
  })});