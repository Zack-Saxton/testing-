import "@testing-library/jest-dom";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import LoanDocument from "./LoanDocument";
import { QueryClient, QueryClientProvider } from "react-query";

afterEach(cleanup);
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
const theme = createTheme();
const component = () => {
  return (
    <ThemeProvider theme={theme}>
      
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LoanDocument />
          </BrowserRouter>
        </QueryClientProvider>
 
    </ThemeProvider>
  );
};
it("Document Table Grid is Rendered in Loan Document Component", () => {
    render(component());
const documentName = screen.getByTestId("loandocs");
expect(documentName).toBeInTheDocument();
})
