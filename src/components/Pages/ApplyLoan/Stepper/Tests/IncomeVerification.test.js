import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import IncomeVerification from "../IncomeVerification";

const handleClickMock = jest.fn();

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
            <IncomeVerification
              next={handleClickMock}
              prev={handleClickMock}
              reset={handleClickMock}
              steps={stepsMock}
              activeStep={6}
              classes={classes}
              setLoadingFlag={handleClickMock}
            />
          </BrowserRouter>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}


test("Availability test: document upload component ", () => {
  render(component());
  const employerName = screen.getByTestId("documentUpload");
  expect(employerName).toBeTruthy();
});

test("Upload document button", () => {
  render(component());
  const uploadButtom = screen.getByText("Upload");
  expect(uploadButtom).toBeTruthy();
});

test("Finish button", () => {
  render(component());
  const finishButton = screen.getByText("Finish");
  expect(finishButton).toBeTruthy();
});

test("Text about income verification rendered", () => {
  render(component());
  const textDetails = screen.getByTestId("incomeVerificationText");
  expect(textDetails).toBeTruthy();
});

test("checking toast: please select a file to upload", async () => {
  render(component());
  const finishButton = screen.getByText("Finish");
  expect(finishButton).toBeTruthy();
  fireEvent.click(finishButton)
  await waitFor(() => expect(screen.findByText('please select a file to upload')).toBeTruthy())
});
