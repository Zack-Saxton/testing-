import "@testing-library/jest-dom";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
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

it("Loan Documents grid are loading", () => {
  render(component());

  const documentName = screen.getByTestId("documentName");
  expect(documentName).toBeInTheDocument();

  const dateUploaded = screen.getByTestId("dateUploaded");
  expect(dateUploaded).toBeInTheDocument();

  const actions = screen.getByTestId("actions");
  expect(actions).toBeInTheDocument();
});


test("Select Document Type ", () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="selectDocument"]`);
  fireEvent.change(input, { target: { value: "income_doc" } });
  expect(input).toBeTruthy();
  expect(input.value).toBe("income_doc");
});


test("Upload button renders and functions ", () => {
  render(component());
  const uploadBtn = screen.getByTestId("uploadButton");
});


