import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import VantageScore from "./VantageScore";

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
          <VantageScore />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

test("Checks the component is rendered", () => {
  render(component());
  const element = screen.getByTestId("vantageScoreComponent");
  expect(element).toBeTruthy();
});

test("Credit Monitoring Link availability test", () => {
  render(component());
  const element = screen.getByTestId("creditMonitoringButton");
  expect(element).toHaveAttribute("href", "/customers/accountOverview");
  expect(element).toBeTruthy();
});

test("No Credit Score Component", () => {
  render(component());
  const element = screen.getByTestId("creditFiles");
  expect(element).toBeTruthy();
});

test("Historical Data Component", () => {
  render(component());
  const element = screen.getByTestId("HistoricalData");
  expect(element).toBeTruthy();
});

test("Keyfactors Component", () => {
  render(component());
  const element = screen.getByTestId("keyfactors-loading");
  expect(element).toBeTruthy();
});
