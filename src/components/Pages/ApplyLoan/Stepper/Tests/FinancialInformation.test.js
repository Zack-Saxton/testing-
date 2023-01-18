import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import FinancialInformation from "../FinancialInformation";
import { ThemeProvider } from "@mui/styles";
import { createTheme, StyledEngineProvider } from "@mui/material/styles";

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
  window.scrollTo = jest.fn();
  let stepsMock = [
    "Email Verification",
    "Phone Verification",
    "Financial Information",
    "ID Document & Photo",
    "ID Verification Questions",
    "Bank Account Verification",
    "Income Verification",
  ];

  const classes = {
    root: "makeStyles-root-76",
    button_div: "makeStyles-button_div-77",
    steplabel: "makeStyles-steplabel-78",
    actionsContainer: "makeStyles-actionsContainer-79",
    loadingOn: "makeStyles-loadingOn-80",
    loadingOff: "makeStyles-loadingOff-81",
    linkStyle: "makeStyles-linkStyle-82",
    resetContainer: "makeStyles-resetContainer-83",
    padTop: "makeStyles-padTop-84",
    textDecoreNone: "makeStyles-textDecoreNone-85",
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <FinancialInformation
              next={handleClickMock}
              prev={handleClickMock}
              reset={handleClickMock}
              steps={stepsMock}
              activeStep={2}
              classes={classes}
              setLoadingFlag={handleClickMock}
            />
          </BrowserRouter>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

test("Availability test: Employer Name Field", () => {
  render(component());
  const employerName = screen.getByText("Employer Name *");
  expect(employerName).toBeTruthy();
});

test("Availability test: Current Job Title Field", () => {
  render(component());
  const jobTitle = screen.getByText("Current Job Title *");
  expect(jobTitle).toBeTruthy();
});

test("Availability test: Years at current address Field", () => {
  render(component());
  const yearsAtAddress = screen.getByText("Years at current address *");
  expect(yearsAtAddress).toBeTruthy();
});

test("Availability test: How did you hear about us Field", () => {
  render(component());
  const howHearAboutUs = screen.getByText("How did you hear about us? *");
  expect(howHearAboutUs).toBeTruthy();
});

test("Availability test: Reset button", () => {
  render(component());
  const resetButton = screen.getByText("Reset");
  expect(resetButton).toBeTruthy();
});
test("Availability test: Next button", () => {
  render(component());
  const nextButton = screen.getByText("Next");
  expect(nextButton).toBeTruthy();
});
test("Enter employer name", () => {
  const { container } = render(component());
  const name = container.querySelector(`input[name="employerName"]`);
  fireEvent.change(name, { target: { value: "Mariner" } });
  fireEvent.blur(name);
  expect(name).toBeTruthy();
});
test("Enter job tiltle", () => {
  const { container } = render(component());
  const jobTitle = container.querySelector(`input[name="jobTitle"]`);
  fireEvent.change(jobTitle, { target: { value: "Software Engineer" } });
  fireEvent.blur(jobTitle);
  expect(jobTitle).toBeTruthy();
});
test("Enter phone number", () => {
  const { container } = render(component());
  const phone = container.querySelector(`input[name="phone"]`);
  fireEvent.keyDown(phone, { key: "space", keyCode: 32 });
  fireEvent.change(phone, { target: { value: "53773637543" } });
  fireEvent.blur(phone);
  expect(phone).toBeTruthy();
});
test("click reset button", () => {
  render(component());
  const reset = screen.getByText("Reset");
  fireEvent.click(reset);
});
test("click next button", () => {
  render(component());
  const next = screen.getByText("Next");
  fireEvent.click(next);
  expect(next).toBeTruthy();
});
