import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import BankAccountVerification from "../BankAccountVerification";

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
            <BankAccountVerification
              next={handleClickMock}
              prev={handleClickMock}
              reset={handleClickMock}
              steps={stepsMock}
              activeStep={5}
              classes={classes}
              setLoadingFlag={handleClickMock}
            />
          </BrowserRouter>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}


test("Availability test: Account Holder ", () => {
  render(component());
  const accountHolder = screen.getByText("Account Holder *");
  expect(accountHolder).toBeTruthy();
});

test("Availability test: Account Type ", () => {
  render(component());
  const accountType = screen.getByText("Account Type");
  expect(accountType).toBeTruthy();
  expect(screen.getByText("Savings")).toBeTruthy();
  expect(screen.getByText("Checking")).toBeTruthy();
});

test("Availability test: Bank Routing number", () => {
  render(component());
  const bankRouting = screen.getByText("Bank Routing number *");
  expect(bankRouting).toBeTruthy();
});

test("Availability test: Bank Routing number test on change", async () => {
  render(component());
  const bankRouting = screen.getByTestId("bankRoutingNumber");
  const bankInfo = screen.getByTestId("bankInformation");
  await act(() => {
    fireEvent.change(bankRouting, { target: { value: "052001633" } });
  });  
  expect(bankRouting).toBeTruthy();
  jest.useFakeTimers();
  setTimeout(() => {
    expect(bankInfo.value).toBe('BANK OF AMERICA, N.A.')    
  }, 10000);
});

test("Availability test: Bank Information", () => {
  render(component());
  const bankInformation = screen.getByTestId("bankInformation");
  expect(bankInformation).toBeTruthy();
  expect(bankInformation).toHaveAttribute("disabled");

});

test("Availability test: Bank Account Number", () => {
  render(component());
  const acctNumber = screen.getByText("Bank Account Number *");
  expect(acctNumber).toBeTruthy();
});

test("Availability test: Bank Account Number", () => {
  render(component());
  const acctNumber = screen.getByText("Confirm Account Number *");
  expect(acctNumber).toBeTruthy();
});

test("Availability test: Bank Account Number", () => {
  render(component());
  const autoPayment = screen.getByText("Automatic Payment:");
  const payByCheck = screen.getByText("Payment by Check:");
  expect(autoPayment).toBeTruthy();
  expect(payByCheck).toBeTruthy();
});

test("Availability test: upload button", () => {
  render(component());
  const uploadButton = screen.getByText("Upload");
  expect(uploadButton).toBeTruthy();
});

test("Availability test: Bank Account Number", () => {
  render(component());
  const uploadButton = screen.getByText("Upload");
  expect(uploadButton).toBeTruthy();
});