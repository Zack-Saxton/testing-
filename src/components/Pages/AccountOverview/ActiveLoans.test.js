import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import LoanAccount from '../../../contexts/LoanAccount';
import MakePayment from '../MakePayment/MakePayment';
import { useAccountOverview } from './AccountOverviewHook/useAccountOverview';
import ActiveLoans from './ActiveLoans';
import { mockDataOne, mockDataTwo } from './ActiveLoansMockData';

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
const MockActiveloans = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LoanAccount>
            <ActiveLoans />
            <MakePayment />
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
  const container = render(MockActiveloans());
  const headingElement = container.getByTestId("loanGridWithoutData");
  expect(headingElement).toBeTruthy();
});


it("While Error", () => {
  useAccountOverview.mockImplementation(() => ({
    isError: true,
  }));
  render(<MockActiveloans />);
  const headingElement = screen.queryByText("Active Loans")
  expect(headingElement).not.toBeInTheDocument();
});

it("Fetching data and rendering the content Test", async () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataOne(0),
  }));
  const container = render(MockActiveloans());
  const headingElement = container.getByTestId("loanGridWithData");
  expect(headingElement).toBeTruthy();
});

it("Make a Payment Button is navigating to Make a payment page", async () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataOne(0),
  }));
  const container = render(MockActiveloans());
  const input = container.getByTestId('make_A_Payment');
  expect(input).toBeTruthy();
  fireEvent.click(input);
  const page = container.getByTestId("heading")
  await waitFor(() => expect(page).toBeInTheDocument());
});

it("Make a Payment Button - Past Due Date", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataOne(-2),
  }));
  const container = render(MockActiveloans());
  const dueDateElement = container.getByTestId("make_A_Payment");
  expect(dueDateElement).toHaveStyle(`background: #f15d48`);
  expect(dueDateElement).toHaveClass('pulse');
});

it("Make a Payment Button - Due Date greater than 10 days", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataOne(11),
  }));
  const container = render(MockActiveloans());
  const dueDateElement = container.getByTestId("make_A_Payment");
  expect(dueDateElement).toHaveStyle(`background: #ffbc23`);
  expect(dueDateElement).not.toHaveClass('pulse');
});

it("Make a Payment Button - Due Date less than or equal to 10 days", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataOne(10),
  }));
  const container = render(MockActiveloans());
  const dueDateElement = container.getByTestId("make_A_Payment");
  expect(dueDateElement).toHaveStyle(`background: #ffbc23`);
  expect(dueDateElement).toHaveClass('pulse');
});

it("To Enable AutoPay Test", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataOne(10, null),
  }));
  const container = render(MockActiveloans());
  const autoPayElement = container.getByTestId("enableAutoPay")
  expect(autoPayElement).toBeTruthy();
});


it("Enable AutoPay should navigate to Make a Payment Page Test", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataOne(10, null),
  }));
  const container = render(MockActiveloans());
  const autoPayElement = container.getByTestId("enableAutoPayLink")
  expect(autoPayElement).toBeTruthy();
});

it("Check number of Loan Accounts", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataTwo(),
  }));
  render(MockActiveloans());
  expect(screen.getAllByTestId('loanGridWithData')).toHaveLength(2);
});

it("AutoPay Enabled Test", async () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataOne(10, true),
  }));
  const container = render(MockActiveloans());
  const autoPayElement = container.getByTestId("autoPayEnabled")
  expect(autoPayElement).toBeTruthy();
  fireEvent.click(autoPayElement);
  const page = container.getByTestId("heading")
  await waitFor(() => expect(page).toBeInTheDocument());
});

it("Has Scheduled Payment Test", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataOne(15, true, true),
  }));
  const container = render(MockActiveloans());
  const scheduledPayElement = container.getByTestId("hasScheduledPayment")
  expect(scheduledPayElement).toBeTruthy();
});

it("Has No Scheduled Payment Test", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataOne(15, true, false),
  }));
  const container = render(MockActiveloans());
  const scheduledPayElement = container.getByTestId("noScheduledPayment")
  expect(scheduledPayElement).toBeTruthy();
});
