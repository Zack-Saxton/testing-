import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
//import {jest} from "jest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import VantageScore from "./VantageScore";

const theme = createTheme();
window.scrollTo = jest.fn();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

it("Key Factors Component is loading in vantage Score", () => {
  render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <VantageScore>
            <keyFactors />
          </VantageScore>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
  expect(screen.getByTestId('keyfactors')).toBeInTheDocument();
})

it("Key Factors Component is loading in Grid", () => {
  render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <VantageScore>
            <keyFactors />
          </VantageScore>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
  expect(screen.getByTestId('keyfactors-loading')).toBeInTheDocument();
})