import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import LoanAccount from '../../../contexts/LoanAccount';
import PaymentHistory from '../PaymentHistory/PaymentHistory';
import RecentPayments from './RecentPayments';
import RecentApplications from './RecentApplications';
import ViewAccountDetails from './ViewAccountDetails';
import NavContext from '../../../contexts/NavContext';
import ActiveLoans from './ActiveLoans';
import LimitedOffer from './LimitedOffer';
import MakePayment from '../MakePayment/MakePayment';
import { AccountOverviewDataMock, RecentPaymentsDataMock, RecentApplicationsDataMock } from '../../../__mock__/AccountOverview.mock'
import ApplyForLoanRedirect from '../ApplyLoan/ApplyForLoanRedirect';

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


const MockAccountOverview = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LoanAccount>
          <NavContext>
            <LimitedOffer/>
            <ActiveLoans />
            <RecentPayments />
            <PaymentHistory />
            <RecentApplications />
            <ViewAccountDetails />
            <MakePayment />
            <ApplyForLoanRedirect />
          </NavContext>
          </LoanAccount>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

it("Clicking Apply for Loan button in Limited offers component should redirect to Apply for Loan page", async() => {
   AccountOverviewDataMock();
	const container = render(MockAccountOverview())
	const element = container.getByTestId("applyForLoanButton");
	expect(element).toBeTruthy();
   fireEvent.click(element);
   const page = container.getByTestId("apply_for_loan")
   await waitFor(() => expect(page).toBeInTheDocument());
});


it("Payment history Button is navigating to Payment History page", async () => {
  RecentPaymentsDataMock()
  const container = render(MockAccountOverview());
  const input = container.getByTestId('payment_history_button');
  expect(input).toBeTruthy();
  fireEvent.click(input);
  const page = container.getByTestId("payment_History")
  await waitFor(() => expect(page).toBeInTheDocument());
});

it("Navigate to View Account Page", async () => {
   RecentApplicationsDataMock()
  const container = render(MockAccountOverview());
  const input = container.getByTestId("navigate_View_Account_1");
  expect(input).toBeTruthy();
  fireEvent.click(input);
  const page = container.getByTestId("view_Account")
  await waitFor(() => expect(page).toBeInTheDocument());
});

it("Default Account Number with Payment History", () => {
  RecentPaymentsDataMock()
  const container = render(MockAccountOverview());
  const headingElement = container.getByTestId('selectInput');
  expect(headingElement.value).toBe("4103-001995-21");
});

it("Select one loan account from Select Dropdown - Display the Data accordingly", async() => {
   RecentPaymentsDataMock()
  const {container} = render(MockAccountOverview());
  const headingElement = container.querySelector(`input[name="loans"]`);
  await act(() => {
		fireEvent.change(headingElement, { target: { value: "1001-017915-16" } });
	});
	expect(headingElement).toBeTruthy();
  expect(headingElement.value).toBe("1001-017915-16");
});

it("Make a Payment Button is navigating to Make a payment page", async () => {
  AccountOverviewDataMock()
  const container = render(MockAccountOverview());
  const input = container.getByTestId('make_A_Payment_Button_1');
  expect(input).toBeTruthy();
  fireEvent.click(input);
  const page = container.getByTestId("heading")
  await waitFor(() => expect(page).toBeInTheDocument());
});

it("Enable AutoPay should navigate to Make a Payment Page Test", async() => {
  AccountOverviewDataMock();
  const container = render(MockAccountOverview());
  const autoPayElement = container.getByTestId("enableAutoPay_1")
  expect(autoPayElement).toBeTruthy();
  fireEvent.click(autoPayElement);
  const page = container.getByTestId("heading")
  await waitFor(() => expect(page).toBeInTheDocument());
});
