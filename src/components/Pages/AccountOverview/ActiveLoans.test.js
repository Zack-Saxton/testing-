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
import { AccountOverviewDataMock, AccountOverviewDataMockIsLoading, AccountOverviewDataMockIsError } from '../../../__mock__/AccountOverview.mock'
import ActiveLoans from './ActiveLoans';

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
  AccountOverviewDataMockIsLoading()
  const container = render(MockActiveloans());
  const headingElement = container.getByTestId("loanGridWithoutData");
  expect(headingElement).toBeTruthy();
});


it("While Error", () => {
  AccountOverviewDataMockIsError();
  render(<MockActiveloans />);
  const headingElement = screen.queryByText("Active Loans")
  expect(headingElement).not.toBeInTheDocument();
});

it("Fetching data and rendering the content Test", async () => {
  AccountOverviewDataMock();
  const container = render(MockActiveloans());
  const headingElement = container.getByTestId("loanGridWithData_0");
  expect(headingElement).toBeTruthy();
});

it("Make a Payment Button is navigating to Make a payment page", async () => {
  AccountOverviewDataMock();
  const container = render(MockActiveloans());
  const input = container.getByTestId('make_A_Payment_Button_1');
  expect(input).toBeTruthy();
  fireEvent.click(input);  
  const page = container.getByTestId("heading")
  await waitFor(() => expect(page).toBeInTheDocument());
});


it("Make a Payment Button - Past Due Date", () => {
  AccountOverviewDataMock();
  const container = render(MockActiveloans());
  const dueDateElement = container.getByTestId("make_A_Payment_Button_0");
  expect(dueDateElement).toHaveStyle(`background: #f15d48`);
  expect(dueDateElement).toHaveClass('pulse');
});

it("Make a Payment Button - Due Date greater than 10 days", () => {
  AccountOverviewDataMock();
  const container = render(MockActiveloans());
  const dueDateElement = container.getByTestId("make_A_Payment_Button_1");
  expect(dueDateElement).toHaveStyle(`background: #ffbc23`);
  expect(dueDateElement).not.toHaveClass('pulse');
});

it("Make a Payment Button - Due Date less than or equal to 10 days", () => {
  AccountOverviewDataMock();
  const container = render(MockActiveloans());
  const dueDateElement = container.getByTestId("make_A_Payment_Button_0");
  expect(dueDateElement).toHaveClass('pulse');
});

it("To Enable AutoPay Test", () => {
  AccountOverviewDataMock();
  const container = render(MockActiveloans());
  const autoPayElement = container.getByTestId("enableAutoPay_1")
  expect(autoPayElement).toBeTruthy();
});


it("Enable AutoPay should navigate to Make a Payment Page Test", () => {
  AccountOverviewDataMock();
  const container = render(MockActiveloans());
  const autoPayElement = container.getByTestId("enableAutoPay_1")
  expect(autoPayElement).toBeTruthy();
});

it("Check number of Loan Accounts", () => {
  AccountOverviewDataMock();
  render(MockActiveloans());
  expect(screen.getAllByTestId('loanGridWithData_0')).toHaveLength(1);
});

it("AutoPay Enabled Test", async () => {
  AccountOverviewDataMock();
  const container = render(MockActiveloans());
  const autoPayElement = container.getByTestId("enableAutoPay_1")
  expect(autoPayElement).toBeTruthy();
  fireEvent.click(autoPayElement);
  const page = container.getByTestId("heading")
  await waitFor(() => expect(page).toBeInTheDocument());
});

it("Has Scheduled Payment Test", () => {
  AccountOverviewDataMock();
  const container = render(MockActiveloans());
  const scheduledPayElement = container.getByTestId("hasScheduledPayment")
  expect(scheduledPayElement).toBeTruthy();
});

