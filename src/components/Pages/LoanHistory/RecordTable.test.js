import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import RecordTable from './RecordTable';
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import { mockData } from './RecordTableMockData';
import { useAccountOverview } from '../AccountOverview/AccountOverviewHook/useAccountOverview';

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
          <RecordTable />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

it("While Loading", () => {
    useAccountOverview.mockImplementation(() => ({
    isLoading: true,
  }));
  const container = render(MockRecentApplications());
  const headingElement = container.getByTestId("while_Loading");
  expect(headingElement).toBeTruthy();
});
// it("While Error", () => {
//     useAccountOverview.mockImplementation(() => ({
//         isError: true,
//         isLoading: false,
//     }));
//     render(MockRecentApplications());
//     const headingElement = screen.getByTestId("while_Error");
//     expect(headingElement).toBeTruthy();
//   });
it("Fetching data and rendering the content Test", () => {
    useAccountOverview.mockImplementation(() => ({
    isLoading: true,
    accountDetails: mockData,
  }));
  const container = render(MockRecentApplications());
  const headingElement = container.getAllByTestId("with_Data");
  expect(headingElement).toBeTruthy();
});
it("Check number of Recent Applications", () => {
    useAccountOverview.mockImplementation(() => ({
    isLoading: true,
    accountDetails: mockData,
  }));

  render(MockRecentApplications());
  expect(screen.getAllByTestId('with_Data')).toHaveLength(1);
});
