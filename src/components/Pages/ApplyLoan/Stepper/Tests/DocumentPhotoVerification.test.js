import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import DocumentPhoto from "../DocumentPhoto";

const handleClickMock = jest.fn();
const handleNext = jest.fn();

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
  let stepsMock = [
    "Email Verification",
    "Phone Verification",
    "Financial Information",
    "ID Document & Photo",
    "ID Verification Questions",
    "Bank Account Verification",
    "Income Verification"
  ]

  const classes = {
    "root": "makeStyles-root-76",
    "button_div": "makeStyles-button_div-77",
    "steplabel": "makeStyles-steplabel-78",
    "actionsContainer": "makeStyles-actionsContainer-79",
    "loadingOn": "makeStyles-loadingOn-80",
    "loadingOff": "makeStyles-loadingOff-81",
    "linkStyle": "makeStyles-linkStyle-82",
    "resetContainer": "makeStyles-resetContainer-83",
    "padTop": "makeStyles-padTop-84",
    "textDecoreNone": "makeStyles-textDecoreNone-85"
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <DocumentPhoto
              next={handleNext}
              prev={handleClickMock}
              reset={handleClickMock}
              steps={stepsMock}
              activeStep={3}
              classes={classes}
              setLoadingFlag={handleClickMock}
            />
          </BrowserRouter>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}


test("Availability test: Description on top", () => {
  render(component());
  const descriptionOnTop = screen.getByTestId("documentPhotoTextTop");
  expect(descriptionOnTop).toBeTruthy();
});

test("Availability test: Description on top", () => {
  render(component());
  const descriptionOnBottom = screen.getByTestId("documentPhotoTextBottom");
  expect(descriptionOnBottom).toBeTruthy();
});

test("Availability test: Description on top", () => {
  render(component());
  const iframeDiv = screen.getByTestId("iframe");
  expect(iframeDiv).toBeTruthy();
});

test("Availability test: Next Button", () => {
  render(component());
  const nextButton = screen.getByText("Next");
  expect(nextButton).toBeTruthy();
});

test("Next button on click", () => {
  render(component());
  const nextButton = screen.getByText("Next");
  fireEvent.click(nextButton);
});
