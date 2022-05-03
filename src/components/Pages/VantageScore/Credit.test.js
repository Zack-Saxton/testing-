import "@testing-library/jest-dom/extend-expect";
import {jest} from "jest";
import { cleanup,fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/styles';
import { createTheme, StyledEngineProvider } from '@mui/material/styles'
import Credit from Credit;
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
it("All the text Messages are loaded", () => {
  render(
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
				<BrowserRouter>
          <HistoricalData/>
        </BrowserRouter>
		</QueryClientProvider>
    </ThemeProvider> 
    )
    expect(screen.getByTestId('creditFiles')).toBeInTheDocument(); 
})