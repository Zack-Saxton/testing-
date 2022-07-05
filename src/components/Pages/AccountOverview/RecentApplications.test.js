import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import LoanAccount from '../../../contexts/LoanAccount';
import { useAccountOverview } from './AccountOverviewHook/useAccountOverview';
import RecentApplications from './RecentApplications';
import { RecentApplicationsDataMock } from '../../../__mock__/AccountOverview.mock'
import ViewAccountDetails from './ViewAccountDetails';
import  NavContext  from "../../../contexts/NavContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

jest.mock("./AccountOverviewHook/useAccountOverview", () => ({
  useAccountOverview: jest.fn(),
}))

const theme = createTheme();
window.scrollTo = jest.fn();
const MockRecentApplications = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LoanAccount>
            <NavContext>
            <RecentApplications />
            <ViewAccountDetails />
            </NavContext>
          </LoanAccount>
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

it("While Error", () => {
  useAccountOverview.mockImplementation(() => ({
    isError: true,
  }));
  const container = render(<MockRecentApplications />);
  const headingElement = container.getByTestId("while_Error");
  expect(headingElement).toBeTruthy();
});

it("Fetching data and rendering the content Test", () => {
  RecentApplicationsDataMock()
  const container = render(MockRecentApplications());
  const headingElement = container.getAllByTestId("with_Data");
  expect(headingElement).toBeTruthy();
});

it("Check number of Recent Applications", () => {
  RecentApplicationsDataMock()
  render(MockRecentApplications());
  expect(screen.getAllByTestId('with_Data')).toHaveLength(15);
});

it("Navigate to View Account Page", async () => {
  RecentApplicationsDataMock()
  const container = render(MockRecentApplications());
  const input = container.getByTestId("navigate_View_Account_1");
  expect(input).toBeTruthy();
  fireEvent.click(input);
  const page = container.getByTestId("view_Account")
  await waitFor(() => expect(page).toBeInTheDocument());
});