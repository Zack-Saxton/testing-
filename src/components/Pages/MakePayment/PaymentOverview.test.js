
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import PaymentOverview from "./PaymentOverview";
import { useAccountOverview } from './useAccountOverview';
import { useHolidayCalender } from './useHolidayCalender';
import { usePaymentMethod } from './usePaymentMethod';
import { accOverviewData, holidayData, paymentData } from './MakePaymentMockData';

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
const handleClick = jest.fn();

const component = () => {

  const latestLoanData = {
    "overview": [
        {
            "loanDetails": {
                "PaymentOptions": {
                    "NumberOfDaysAllowedForPayoff": 0,
                    "ImmediateAchFee": 0,
                    "ScheduledAchFee": 0,
                    "MaximumAchPaymentAmount": 8320.94,
                    "MinimumAchPaymentAmount": 1,
                    "DebitCardFeeAmount": 0,
                    "MaxminumCardPaymentAmount": 0,
                    "MinimumCardPaymentAmount": 0,
                    "NumberDaysPastDueBeforeDelinquent": 0,
                    "RequiresThirdPartyFeeForCardPayment": false,
                    "AllowCardPayments": false,
                    "AllowACHPayments": true
                },
                "AccountNumber": "4103-001995-21",
                "Name": "TAMMY JJASMINE",
                "Address": {
                    "HouseholdNumber": 0,
                    "Address1": "79 XEEDKWW AVE",
                    "Address2": "",
                    "City": "OCEAN VIEW",
                    "State": "DE",
                    "ZipCode": "84108"
                },
                "OriginalFinancedAmount": 7985,
                "OriginalAmountFinanced": 7985,
                "OriginalBalance": 7985,
                "OriginalAPR": 35.98872,
                "LastPaymentAmount": 11,
                "LastPaymentDate": "2022-05-10T00:00:00",
                "NextPaymentAmount": 315.97,
                "NextPaymentDate": "2022-06-07T00:00:00",
                "CurrentYearToDateInterest": 22,
                "LastYearToDateInterest": 0,
                "InterestRate": 35.98872,
                "LoanOriginationDate": "2022-05-07T00:00:00",
                "RegularPaymentAmount": 315.97,
                "CurrentPayOffAmount": 8320.94,
                "LoanFeesAndCharges": 14.7,
                "LoanIsDelinquent": false,
                "NextDueDate": "2022-06-07T00:00:00",
                "Errors": [],
                "SuccessMessage": "",
                "HasNoErrors": true
            },
            "loanPaymentInformation": {
                "accountDetails": {
                    "RegularPaymentAmount": 315.97,
                    "CurrentPayOffAmount": 8320.94,
                    "LoanFeesAndCharges": 14.7,
                    "LoanIsDeliquent": false,
                    "NextDueDate": "2022-06-07T00:00:00",
                    "CurrentYearToDateInterest": 22,
                    "InterestRate": 35.98872,
                    "LastYearToDateInterest": 0,
                    "NextPaymentAmount": 315.97,
                    "NextPaymentDate": "2022-06-07T00:00:00",
                    "LastPaymentAmount": 11,
                    "LastPaymentDate": "2022-05-10T00:00:00",
                    "OriginalFinancedAmount": 7985,
                    "LoanOriginationDate": "2022-05-07T00:00:00"
                },
                "hasScheduledPayment": false,
                "scheduledPayments": [],
                "paymentOptions": {
                    "NumberOfDaysAllowedForPayoff": 0,
                    "ImmediateAchFee": 0,
                    "ScheduledAchFee": 0,
                    "MaximumAchPaymentAmount": 8320.94,
                    "MinimumAchPaymentAmount": 1,
                    "DebitCardFeeAmount": 0,
                    "MaxminumCardPaymentAmount": 0,
                    "MinimumCardPaymentAmount": 1,
                    "NumberDaysPastDueBeforeDelinquent": 13,
                    "RequiresThirdPartyFeeForCardPayment": true,
                    "AllowCardPayments": true,
                    "AllowACHPayments": true
                },
                "appRecurringACHPayment": null
            },
            "loanData": {
                "accountNumber": "4103-001995-21",
                "balance": 7985,
                "status": "Past Due",
                "dueDate": "2022-06-07T00:00:00",
                "amountDue": 308.67,
                "loanOriginationDate": "2022-05-07T00:00:00"
            }
        }
    ]
}
const status = {};
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PaymentOverview  paymentData={latestLoanData} status={status} />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};


test("Componenct rendered successfully", () => {
  render(component());
  const element = screen.getByTestId("paymentOverviewTable");
  expect(element).toBeTruthy();
});

test("Table rendered", () => {
  render(component());
  const element = screen.getByTestId("paymentOverviewTable");
  expect(element).toBeTruthy();
});

test("Headers rendered correctly", () => {
  render(component());
  const AccNo = screen.getByText("Account Number");
  expect(AccNo).toBeTruthy();  
  const todayPayoff = screen.getByText("Today's Payoff");
  expect(todayPayoff).toBeTruthy();  
  const regAmount = screen.getByText("Regular Amount");
  expect(regAmount).toBeTruthy();
  const intrest = screen.getByText("Interest");
  expect(intrest).toBeTruthy();
  const loadFees = screen.getByText("Loan Fees");
  expect(loadFees).toBeTruthy();
  const dueDate = screen.getByText("Due Date");
  expect(dueDate).toBeTruthy();
  const autoPay = screen.getByText("Auto Pay");
  expect(autoPay).toBeTruthy();
  const shedulePayment = screen.getByText("Scheduled Payment");
  expect(shedulePayment).toBeTruthy();
});

test("Rows rendered correctly", () => {
  render(component());
  expect(screen.getAllByRole('row')).toHaveLength(2);
});

test("Cells rendered correctly", () => {
  render(component());
  expect(screen.getAllByRole('cell')).toHaveLength(7);
});

test("Cell values rendered correct;y", () => {
  render(component());
  const AccNo = screen.getByText("4103-001995-21");
  expect(AccNo).toBeTruthy();  
  const todayPayoff = screen.getByText("$8,320.94");
  expect(todayPayoff).toBeTruthy();  
  const regAmount = screen.getByText("$315.97");
  expect(regAmount).toBeTruthy();
  const intrest = screen.getByText("$35.99");
  expect(intrest).toBeTruthy();
  const loadFees = screen.getByText("$14.70");
  expect(loadFees).toBeTruthy();
  const dueDate = screen.getByText("06/07/2022");
  expect(dueDate).toBeTruthy();
  const autoPay = screen.getByText("NONE");
  expect(autoPay).toBeTruthy();
  const shedulePayment = screen.getByText("Disabled");
  expect(shedulePayment).toBeTruthy();
});

test('should match the snapshot', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});