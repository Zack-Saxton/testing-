
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent,screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import NavContext from "../../../../contexts/NavContext";
import VerificationQuestion from "./VerificationQuestion";


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

const component = () => {
  return (
    <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <NavContext>
              <VerificationQuestion
              steps={stepsMock}
              activeStep={4}
              classes={classes}
               />
            </NavContext>
          </BrowserRouter>
        </QueryClientProvider>
    </ThemeProvider>
  )
}


test("render verification Question", () => {
	render(component());
	const input = screen.getByTestId("verificationQuestion_testid");
	expect(input).toBeTruthy();
});



test("Availability test: Continue button", () => {
  render(component());
  const nextButton = screen.getByText("Continue");
  expect(nextButton).toBeTruthy();
});


test("Continue Onclick", () => {
	render(component());
  const button = screen.getByText("Continue");
	fireEvent.click(button);
});
