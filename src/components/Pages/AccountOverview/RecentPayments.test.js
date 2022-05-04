import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RecentPayments from './RecentPayments';
import PaymentHistory from '../PaymentHistory/PaymentHistory';
import { BrowserRouter } from "react-router-dom"
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from '@mui/styles';
import { createTheme} from '@mui/material/styles'
import LoanAccount  from '../../../contexts/LoanAccount';
import  {useAccountOverview}  from './AccountOverviewHook/useAccountOverview';
import { mockData, mockDataOne } from './RecentPaymentsMockData';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 500000,
		},
	},
});

jest.mock("./AccountOverviewHook/useAccountOverview", ()=>({
  useAccountOverview: jest.fn(),
}))

const theme = createTheme();
window.scrollTo = jest.fn();
const MockRecentPayments = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>    
        <BrowserRouter>
          <LoanAccount>
              <RecentPayments/>
              <PaymentHistory/>
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
  const container = render(MockRecentPayments());
  const headingElement = container.getByTestId("loading_Recent_Payments");
  expect(headingElement).toBeTruthy();
});

it("While Error", () => {
  useAccountOverview.mockImplementation(() => ({
    isError:true,
  }));
  const container = render(MockRecentPayments());
  const headingElement = container.getByTestId("error_Recent_Payments");
  expect(headingElement).toBeTruthy();
});

it("Fetching data and rendering the content Test",() => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockData,
  }));
  const container = render(MockRecentPayments());
  const headingElement = container.getByTestId("test-table-body");
  expect(headingElement).toBeTruthy();
});

it("Payment history Button is navigating to Payment History page", async() => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockData,
  }));
  const container = render(MockRecentPayments());
  const input = container.getByTestId('payment_history_button');
  expect(input).toBeTruthy();
  fireEvent.click(input);
  const page = container.getByTestId("payment_History")
  await waitFor(() => expect(page).toBeInTheDocument());
});

it("No Recent Payment Test",() => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataOne,
  }));
  const container = render(MockRecentPayments());
  const headingElement = container.getByTestId("error_Recent_Payments");
  expect(headingElement).toBeTruthy();
});

it("Check number of rows for Recent Payments - With Payment History", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockData,
  }));
  render(MockRecentPayments());
  expect(screen.getAllByRole('row')).toHaveLength(6);
});

it("Check number of rows for Recent Payments - Without Payment History", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataOne,
  }));
  render(MockRecentPayments());
  expect(screen.getAllByRole('row')).toHaveLength(4);
});

it("Default Account Number with Payment History", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockData,
  }));
  const container = render(MockRecentPayments());
  const headingElement = container.getByTestId('selectInput');
  expect(headingElement.value).toBe("3506-005079-19");
});