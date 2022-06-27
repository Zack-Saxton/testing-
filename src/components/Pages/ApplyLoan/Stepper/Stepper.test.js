import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import Stepper from "./Stepper";

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
          <Stepper />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

test("Render Stepper Component", () => {
  render(component());
  const input = screen.getByTestId("stepperComponent");
  expect(input).toBeTruthy();
});

test("Render EmailVerification Component", () => {
  render(component());
  const input = screen.getByText("Email Verification");
  expect(input).toBeTruthy();
});

test("Render Phone Verification Component", () => {
  render(component());
  const input = screen.getByText("Phone Verification");
  expect(input).toBeTruthy();
});

test("Render Financial Information Component", () => {
  render(component());
  const input = screen.getByText("Financial Information");
  expect(input).toBeTruthy();
});

test("Render ID Document & Photo Component", () => {
  render(component());
  const input = screen.getByText("ID Document & Photo");
  expect(input).toBeTruthy();
});

test("Render ID Verification Questions Component", () => {
  render(component());
  const input = screen.getByText("ID Verification Questions");
  expect(input).toBeTruthy();
});

test("Render Bank Account Verification Component", () => {
  render(component());
  const input = screen.getByText("Bank Account Verification");
  expect(input).toBeTruthy();
});

test("Render Income Verification Component", () => {
  render(component());
  const input = screen.getByText("Income Verification");
  expect(input).toBeTruthy();
});