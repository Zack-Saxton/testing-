import "@testing-library/jest-dom";
import { cleanup, render, screen} from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import DocumentTable from "./DocumentTable";
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

const loantestData = [{displayname:"Note",date_uploaded:"05/04/2022"},{displayname:"Note",date_uploaded:"05/04/2022"}];

const theme = createTheme();
const component = () => {
  return (
    <ThemeProvider theme={theme}>
      
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <DocumentTable userLoanDocumentData={loantestData}/>
          </BrowserRouter>
        </QueryClientProvider>
 
    </ThemeProvider>
  );
};
it("Document Table is Loaded", () => {
render(component());
const documentName = screen.getByTestId("loandocs");
expect(documentName).toBeInTheDocument();
})

it("Table Header is Loaded", () => {
  render(component());
  const documentName = screen.getByTestId("table-head");
  expect(documentName).toBeInTheDocument();
  })
  it("Table Body is Loaded", () => {
    render(component());
    const documentName = screen.getByTestId("table-body");
    expect(documentName).toBeInTheDocument();
})