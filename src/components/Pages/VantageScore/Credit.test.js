import "@testing-library/jest-dom/extend-expect";
import {jest} from "jest";
import { cleanup,fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/styles';
import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import VantageScore from "./VantageScore";
import Credit from  "./Credit";
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
it("Credit is Loading in the Vantage Score", () => {
  render(
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
				<BrowserRouter>
      <VantageScore>
          <Credit/>
      </VantageScore>
    </BrowserRouter>
		</QueryClientProvider>
    </ThemeProvider>
    )
    expect(screen.getByTestId('creditFiles')).toBeInTheDocument();
})



