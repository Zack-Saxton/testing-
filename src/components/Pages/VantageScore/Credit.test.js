import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import Credit from "./Credit";
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
it("Credit is Loading in the Vantage Score", () => {
  render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <VantageScore>
            <Credit />
          </VantageScore>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
  expect(screen.getByTestId('creditFiles')).toBeInTheDocument();
})
