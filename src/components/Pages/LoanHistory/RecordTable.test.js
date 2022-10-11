import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from '@testing-library/react';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import LoanHistoryTable from './LoanHistoryTable';
import { LoanDataMock, LoanDataMockWithIsLoading } from "./../../../__mock__/LoanData.mock";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

jest.mock("../AccountOverview/AccountOverviewHook/useAccountOverview", () => ({
    useAccountOverview: jest.fn(),
}))

const theme = createTheme();
window.scrollTo = jest.fn();
const MockRecentApplications = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LoanHistoryTable />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

it("While Loading", () => {
  LoanDataMockWithIsLoading();
  const container = render(MockRecentApplications());
  const headingElement = container.getByTestId("while_Loading");
  expect(headingElement).toBeTruthy();
});
it("Fetching data and rendering the content Test", () => {
  LoanDataMock();
  const container = render(MockRecentApplications());
  const headingElement = container.getAllByTestId("with_Data");
  expect(headingElement).toBeTruthy();
});
it("Check number of Recent Applications", () => {
  LoanDataMock();
  render(MockRecentApplications());
  expect(screen.getAllByTestId('with_Data')).toHaveLength(1);
});
