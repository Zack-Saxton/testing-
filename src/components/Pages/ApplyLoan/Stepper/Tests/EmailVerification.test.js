import "@testing-library/jest-dom/extend-expect";
import '@testing-library/jest-dom';
import {  render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import EmailVerification from "../EmailVerification";
import { ThemeProvider } from '@mui/styles';
import { createTheme, StyledEngineProvider } from '@mui/material/styles'

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
            <EmailVerification
              next={handleClickMock}
              prev={handleClickMock}
              reset={handleClickMock}
              steps={stepsMock}
              activeStep={0}
              classes={classes}
              setLoadingFlag={handleClickMock}
            />
          </BrowserRouter>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}


test("Availability test", () => {
  render(component());
  const emailVerificationText = screen.getByTestId("emailVerificationText");
  expect(emailVerificationText).toBeTruthy();
  expect(screen.getByText("In Progress: Your email address has not been verified. Please check your inbox for our email verification message. Alternatively, please click on the button to be resent the verification email. If you have completed email verification. please refresh this page.")).toBeTruthy();
});

test("Resend the verification link button", () => {
  render(component());
  const resendButton = screen.getByText("Resend the verification link");
  expect(resendButton).toBeTruthy();
});
