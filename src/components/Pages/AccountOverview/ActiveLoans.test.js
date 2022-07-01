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

const mockDataActiveLoans = {
  data : {
    "activeLoans":[
      {
         "loanDetails":{
            "PaymentOptions":{
               "NumberOfDaysAllowedForPayoff":0,
               "ImmediateAchFee":0,
               "ScheduledAchFee":0,
               "MaximumAchPaymentAmount":8368.83,
               "MinimumAchPaymentAmount":1,
               "DebitCardFeeAmount":0,
               "MaxminumCardPaymentAmount":0,
               "MinimumCardPaymentAmount":0,
               "NumberDaysPastDueBeforeDelinquent":0,
               "RequiresThirdPartyFeeForCardPayment":false,
               "AllowCardPayments":false,
               "AllowACHPayments":true
            },
            "AccountNumber":"4103-001995-21",
            "Name":"TAMMY JJASMINE",
            "Address":{
               "HouseholdNumber":0,
               "Address1":"79 XEEDKWW AVE",
               "Address2":"",
               "City":"OCEAN VIEW",
               "State":"DE",
               "ZipCode":"84108"
            },
            "OriginalFinancedAmount":7985,
            "OriginalAmountFinanced":7985,
            "OriginalBalance":7985,
            "OriginalAPR":35.98872,
            "LastPaymentAmount":11,
            "LastPaymentDate":"2022-05-10T00:00:00",
            "NextPaymentAmount":315.97,
            "NextPaymentDate":"2022-06-07T00:00:00",
            "CurrentYearToDateInterest":22,
            "LastYearToDateInterest":0,
            "InterestRate":35.98872,
            "LoanOriginationDate":"2022-05-07T00:00:00",
            "RegularPaymentAmount":315.97,
            "CurrentPayOffAmount":8368.83,
            "LoanFeesAndCharges":14.7,
            "LoanIsDelinquent":false,
            "NextDueDate":"2022-06-07T00:00:00",
            "Errors":[
               
            ],
            "SuccessMessage":"",
            "HasNoErrors":true
         },
         "loanPaymentInformation":{
            "accountDetails":{
               "RegularPaymentAmount":315.97,
               "CurrentPayOffAmount":8368.83,
               "LoanFeesAndCharges":14.7,
               "LoanIsDeliquent":false,
               "NextDueDate":"2022-06-07T00:00:00",
               "CurrentYearToDateInterest":22,
               "InterestRate":35.98872,
               "LastYearToDateInterest":0,
               "NextPaymentAmount":315.97,
               "NextPaymentDate":"2022-06-07T00:00:00",
               "LastPaymentAmount":11,
               "LastPaymentDate":"2022-05-10T00:00:00",
               "OriginalFinancedAmount":7985,
               "LoanOriginationDate":"2022-05-07T00:00:00"
            },
            "hasScheduledPayment":true,
            "scheduledPayments":[
               {
                  "LoanAccountNumber":"",
                  "ReferenceNumber":1,
                  "PaymentMethod":{
                     "AchInfo":{
                        "AccountType":"Savings",
                        "RoutingNumber":"73901592",
                        "AccountNumber":"2343",
                        "OwnerName":null,
                        "Nickname":null,
                        "ProfileId":0,
                        "IsVerified":false,
                        "Token":null
                     },
                     "CardInfo":null,
                     "WalletInfo":null,
                     "IsCard":false,
                     "IsDeleted":false,
                     "IsRestricted":false,
                     "LoanLastFour":null
                  },
                  "PaymentAmount":315.97,
                  "PaymentDate":"2022-06-28T00:00:00",
                  "PaymentFee":0,
                  "ThirdPartyFee":0
               }
            ],
            "paymentOptions":{
               "NumberOfDaysAllowedForPayoff":0,
               "ImmediateAchFee":0,
               "ScheduledAchFee":0,
               "MaximumAchPaymentAmount":8368.83,
               "MinimumAchPaymentAmount":1,
               "DebitCardFeeAmount":0,
               "MaxminumCardPaymentAmount":0,
               "MinimumCardPaymentAmount":1,
               "NumberDaysPastDueBeforeDelinquent":19,
               "RequiresThirdPartyFeeForCardPayment":true,
               "AllowCardPayments":true,
               "AllowACHPayments":true
            },
            "appRecurringACHPayment":null
         },
         "loanData":{
            "accountNumber":"4103-001995-21",
            "balance":7985,
            "status":"Past Due",
            "dueDate":"2022-06-07T00:00:00",
            "amountDue":308.67,
            "loanOriginationDate":"2022-05-07T00:00:00"
         }
      },
      {
         "loanDetails":{
            "PaymentOptions":{
               "NumberOfDaysAllowedForPayoff":0,
               "ImmediateAchFee":0,
               "ScheduledAchFee":0,
               "MaximumAchPaymentAmount":7326.78,
               "MinimumAchPaymentAmount":1,
               "DebitCardFeeAmount":0,
               "MaxminumCardPaymentAmount":0,
               "MinimumCardPaymentAmount":0,
               "NumberDaysPastDueBeforeDelinquent":0,
               "RequiresThirdPartyFeeForCardPayment":false,
               "AllowCardPayments":false,
               "AllowACHPayments":true
            },
            "AccountNumber":"1001-017915-16",
            "Name":"TAMMY JJASMINE",
            "Address":{
               "HouseholdNumber":0,
               "Address1":"79 XEEDKWW AVE",
               "Address2":"",
               "City":"OCEAN VIEW",
               "State":"DE",
               "ZipCode":"19970"
            },
            "OriginalFinancedAmount":15591.66,
            "OriginalAmountFinanced":9976.76,
            "OriginalBalance":15591.66,
            "OriginalAPR":27.28203,
            "LastPaymentAmount":371.23,
            "LastPaymentDate":"2022-06-23T00:00:00",
            "NextPaymentAmount":371.23,
            "NextPaymentDate":"2022-08-09T00:00:00",
            "CurrentYearToDateInterest":0,
            "LastYearToDateInterest":0,
            "InterestRate":27.15,
            "LoanOriginationDate":"2022-01-27T00:00:00",
            "RegularPaymentAmount":371.23,
            "CurrentPayOffAmount":7326.78,
            "LoanFeesAndCharges":0,
            "LoanIsDelinquent":false,
            "NextDueDate":"2022-08-09T00:00:00",
            "Errors":[
               
            ],
            "SuccessMessage":"",
            "HasNoErrors":true
         },
         "loanPaymentInformation":{
            "accountDetails":{
               "RegularPaymentAmount":371.23,
               "CurrentPayOffAmount":7326.78,
               "LoanFeesAndCharges":0,
               "LoanIsDeliquent":false,
               "NextDueDate":"2022-08-09T00:00:00",
               "CurrentYearToDateInterest":0,
               "InterestRate":27.15,
               "LastYearToDateInterest":0,
               "NextPaymentAmount":371.23,
               "NextPaymentDate":"2022-08-09T00:00:00",
               "LastPaymentAmount":371.23,
               "LastPaymentDate":"2022-06-23T00:00:00",
               "OriginalFinancedAmount":15591.66,
               "LoanOriginationDate":"2022-01-27T00:00:00"
            },
            "hasScheduledPayment":false,
            "scheduledPayments":[
               
            ],
            "paymentOptions":{
               "NumberOfDaysAllowedForPayoff":0,
               "ImmediateAchFee":0,
               "ScheduledAchFee":0,
               "MaximumAchPaymentAmount":7326.78,
               "MinimumAchPaymentAmount":1,
               "DebitCardFeeAmount":0,
               "MaxminumCardPaymentAmount":0,
               "MinimumCardPaymentAmount":1,
               "NumberDaysPastDueBeforeDelinquent":0,
               "RequiresThirdPartyFeeForCardPayment":true,
               "AllowCardPayments":true,
               "AllowACHPayments":true
            },
            "appRecurringACHPayment":null
         },
         "loanData":{
            "accountNumber":"1001-017915-16",
            "balance":13904.88,
            "status":"Active",
            "dueDate":"2022-08-09T00:00:00",
            "amountDue":371.23,
            "loanOriginationDate":"2022-01-27T00:00:00"
         }
      },
      {
         "loanDetails":{
            "PaymentOptions":{
               "NumberOfDaysAllowedForPayoff":0,
               "ImmediateAchFee":0,
               "ScheduledAchFee":0,
               "MaximumAchPaymentAmount":4807.7,
               "MinimumAchPaymentAmount":1,
               "DebitCardFeeAmount":0,
               "MaxminumCardPaymentAmount":0,
               "MinimumCardPaymentAmount":0,
               "NumberDaysPastDueBeforeDelinquent":0,
               "RequiresThirdPartyFeeForCardPayment":false,
               "AllowCardPayments":false,
               "AllowACHPayments":true
            },
            "AccountNumber":"7005-016179-14",
            "Name":"TAMMY JJASMINE",
            "Address":{
               "HouseholdNumber":0,
               "Address1":"79 XEEDKWW AVE",
               "Address2":"",
               "City":"OCEAN VIEW",
               "State":"DE",
               "ZipCode":"19970"
            },
            "OriginalFinancedAmount":2069.97,
            "OriginalAmountFinanced":2069.97,
            "OriginalBalance":2069.97,
            "OriginalAPR":24,
            "LastPaymentAmount":10,
            "LastPaymentDate":"2022-05-10T00:00:00",
            "NextPaymentAmount":81.21,
            "NextPaymentDate":"2022-10-07T00:00:00",
            "CurrentYearToDateInterest":0,
            "LastYearToDateInterest":0,
            "InterestRate":24,
            "LoanOriginationDate":"2017-07-08T00:00:00",
            "RegularPaymentAmount":81.21,
            "CurrentPayOffAmount":4807.7,
            "LoanFeesAndCharges":270.32,
            "LoanIsDelinquent":false,
            "NextDueDate":"2022-10-07T00:00:00",
            "Errors":[
               
            ],
            "SuccessMessage":"",
            "HasNoErrors":true
         },
         "loanPaymentInformation":{
            "accountDetails":{
               "RegularPaymentAmount":81.21,
               "CurrentPayOffAmount":4807.7,
               "LoanFeesAndCharges":270.32,
               "LoanIsDeliquent":false,
               "NextDueDate":"2022-10-07T00:00:00",
               "CurrentYearToDateInterest":0,
               "InterestRate":24,
               "LastYearToDateInterest":0,
               "NextPaymentAmount":81.21,
               "NextPaymentDate":"2022-10-07T00:00:00",
               "LastPaymentAmount":10,
               "LastPaymentDate":"2022-05-10T00:00:00",
               "OriginalFinancedAmount":2069.97,
               "LoanOriginationDate":"2017-07-08T00:00:00"
            },
            "hasScheduledPayment":false,
            "scheduledPayments":[
               
            ],
            "paymentOptions":{
               "NumberOfDaysAllowedForPayoff":0,
               "ImmediateAchFee":0,
               "ScheduledAchFee":0,
               "MaximumAchPaymentAmount":4807.7,
               "MinimumAchPaymentAmount":1,
               "DebitCardFeeAmount":0,
               "MaxminumCardPaymentAmount":0,
               "MinimumCardPaymentAmount":1,
               "NumberDaysPastDueBeforeDelinquent":0,
               "RequiresThirdPartyFeeForCardPayment":true,
               "AllowCardPayments":true,
               "AllowACHPayments":true
            },
            "appRecurringACHPayment":null
         },
         "loanData":{
            "accountNumber":"7005-016179-14",
            "balance":2069.97,
            "status":"Active",
            "dueDate":"2022-10-07T00:00:00",
            "amountDue":4807.7,
            "loanOriginationDate":"2017-07-08T00:00:00"
         }
      }
   ],
  }
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
    accountDetails: mockDataActiveLoans,
  }));
  const container = render(MockActiveloans());
  const headingElement = container.getByTestId("loanGridWithData_0");
  expect(headingElement).toBeTruthy();
});

it("Make a Payment Button is navigating to Make a payment page", async () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataActiveLoans,
  }));
  const container = render(MockActiveloans());
  const input = container.getByTestId('make_A_Payment_Button_1');
  expect(input).toBeTruthy();
  fireEvent.click(input);  
  const page = container.getByTestId("heading")
  await waitFor(() => expect(page).toBeInTheDocument());
});


it("Make a Payment Button - Past Due Date", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataActiveLoans,
  }));
  const container = render(MockActiveloans());
  const dueDateElement = container.getByTestId("make_A_Payment_Button_0");
  expect(dueDateElement).toHaveStyle(`background: #f15d48`);
  expect(dueDateElement).toHaveClass('pulse');
});

it("Make a Payment Button - Due Date greater than 10 days", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataActiveLoans,
  }));
  const container = render(MockActiveloans());
  const dueDateElement = container.getByTestId("make_A_Payment_Button_1");
  expect(dueDateElement).toHaveStyle(`background: #ffbc23`);
  expect(dueDateElement).not.toHaveClass('pulse');
});

it("Make a Payment Button - Due Date less than or equal to 10 days", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataActiveLoans,
  }));
  const container = render(MockActiveloans());
  const dueDateElement = container.getByTestId("make_A_Payment_Button_0");
  expect(dueDateElement).toHaveClass('pulse');
});

it("To Enable AutoPay Test", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataActiveLoans,
  }));
  const container = render(MockActiveloans());
  const autoPayElement = container.getByTestId("enableAutoPay_1")
  expect(autoPayElement).toBeTruthy();
});


it("Enable AutoPay should navigate to Make a Payment Page Test", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataActiveLoans,
  }));
  const container = render(MockActiveloans());
  const autoPayElement = container.getByTestId("enableAutoPay_1")
  expect(autoPayElement).toBeTruthy();
});

it("Check number of Loan Accounts", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataActiveLoans,
  }));
  render(MockActiveloans());
  expect(screen.getAllByTestId('loanGridWithData_0')).toHaveLength(1);
});

it("AutoPay Enabled Test", async () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails:mockDataActiveLoans,
  }));
  const container = render(MockActiveloans());
  const autoPayElement = container.getByTestId("enableAutoPay_1")
  expect(autoPayElement).toBeTruthy();
  fireEvent.click(autoPayElement);
  const page = container.getByTestId("heading")
  await waitFor(() => expect(page).toBeInTheDocument());
});

it("Has Scheduled Payment Test", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataActiveLoans,
  }));
  const container = render(MockActiveloans());
  const scheduledPayElement = container.getByTestId("hasScheduledPayment")
  expect(scheduledPayElement).toBeTruthy();
});

