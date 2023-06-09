import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import LoanAccount from '../../../contexts/LoanAccount';
import PaymentHistory from '../PaymentHistory/PaymentHistory';
import { useAccountOverview } from "../../../hooks/useAccountOverview";
import RecentPayments from './RecentPayments';
import { RecentPaymentsDataMock, RecentPaymentsDataMockTwo, RecentPaymentsNoData } from '../../../__mock__/AccountOverview.mock'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

jest.mock("../../../hooks/useAccountOverview", () => ({ 
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
            <RecentPayments />
            <PaymentHistory />
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
    isError: true,
  }));
  render(MockRecentPayments());
  const headingElement = screen.queryByText("Recent Payments")
  expect(headingElement).not.toBeInTheDocument();
});

it("Fetching data and rendering the content Test", () => {
  RecentPaymentsDataMockTwo();
  const container = render(MockRecentPayments());
  const headingElement = container.getByTestId("test-table-body");
  expect(headingElement).toBeTruthy();
});

it("Payment history Button is navigating to Payment History page", async () => {
  RecentPaymentsDataMockTwo();
  const container = render(MockRecentPayments());
  const input = container.getByTestId('payment_history_button');
  expect(input).toBeTruthy();
  fireEvent.click(input);
  const page = container.getByTestId("payment_History")
  await waitFor(() => expect(page).toBeInTheDocument());
});

it("Check number of rows for Recent Payments - With Payment History", () => {
  RecentPaymentsDataMockTwo();
  const container = render(MockRecentPayments());
  const page = container.getByTestId("recent payments");
  expect(page).toBeInTheDocument();
});

it("Check number of rows for Recent Payments - Without Payment History", () => {
  RecentPaymentsNoData();
  render(MockRecentPayments());
  const headingElement = screen.queryByText("Recent Payments")
  expect(headingElement).not.toBeInTheDocument();
});

it("Default Account Number with Payment History", () => {
  RecentPaymentsDataMockTwo();
  const container = render(MockRecentPayments());
  const headingElement = container.getByTestId('selectInput');
  expect(headingElement.value).toBe("3506-005079-19");
});
