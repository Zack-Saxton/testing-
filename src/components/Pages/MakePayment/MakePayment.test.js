import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import MakePayment from "./MakePayment";

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

const component = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MakePayment />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

test("Checks the component is rendered", () => {
  render(component());
  const element = screen.getByTestId("makePaymentComponent");
  expect(element).toBeTruthy();
});

test("Payment Overview rendered ", () => {
  render(component());
  const element = screen.getByTestId("paymentOverviewTable");
  expect(element).toBeTruthy();
});

test("Please Contact Text Availability test", () => {
  render(component());
  const element = screen.getByTestId("pleaseContact");
  expect(element).toBeTruthy();
});