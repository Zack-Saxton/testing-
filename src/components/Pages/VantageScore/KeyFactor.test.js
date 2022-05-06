import "@testing-library/jest-dom/extend-expect";
//import {jest} from "jest";
import { cleanup,fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import KeyFactors from "./KeyFactors";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/styles';
import { createTheme, StyledEngineProvider } from '@mui/material/styles'
import HistoricalData from "./HistoricalData";
import VantageScore from "./VantageScore";

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

it("Key Factors Component is loading in vantage Score", () => {
render(
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
		<BrowserRouter>
        <VantageScore>
        <keyFactors/>
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
          <keyFactors/>
        </VantageScore>
        </BrowserRouter>
    </QueryClientProvider> 
    </ThemeProvider> 
      )
      expect(screen.getByTestId('keyfactors-loading')).toBeInTheDocument();
  })
