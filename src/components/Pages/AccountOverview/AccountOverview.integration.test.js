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
import { useAccountOverview } from './AccountOverviewHook/useAccountOverview';
import RecentPayments from './RecentPayments';
import { mockData } from './RecentPaymentsMockData';
import RecentApplications from './RecentApplications';
import { mockData as recentApplicationsMockData } from '../../../__mock__/RecentApplicationsMockData';
import ViewAccountDetails from './ViewAccountDetails';
import NavContext from '../../../contexts/NavContext';
import ActiveLoans from './ActiveLoans';
import MakePayment from '../MakePayment/MakePayment';

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
const userOffers =  {
  "title": "NULL",
  "firstName": "TAMMY",
  "middleName": "",
  "lastName": "JJASMINE",
  "suffix": "NULL",
  "addressLine1": "4500 BEARCLAW ST",
  "addressCity": "SALT LAKE CITY",
  "addressState": "UT",
  "addressZip": "84108",
  "addressZip4": null,
  "dateOfBirth": "11/05/1984 12:00:00 AM",
  "offerAmount": "12000",
  "dateCampaign": "06/01/2022 12:00:00 AM",
  "CampaignTypeDesc": "GRIDS",
  "maskedSSN": "6475394",
  "branch": "7866",
  "brand": "Mariner",
  "letterCode": null,
  "FICO_Score": "0",
  "dateExpiration": "12/31/9999 12:00:00 AM",
  "campaignId": "2872",
  "lbmRate": {
    "Company": null,
    "ltrCode": null,
    "APR": null,
    "Fin_Chg": null,
    "Amt_Fin": null,
    "Total": null,
    "No_Payments": null,
    "Pmt_Amt": null,
    "Prepd_FC": null,
    "Interest_Charge": null,
    "Simple_Int_Rate": null,
    "FL_Amount_Given": null,
    "NC_Borrowed_Sum": null,
    "Maintenance_Fee": null,
    "Closing_Fee": null,
    "Four_Percent_Fee": null,
    "Eight_Percent_Fee": null,
    "NSF_Fee": null,
    "Interest_Charge_2": null,
    "Principal_Amt": null,
    "Loan_Origination_Fee": null,
    "Doc_Fee": null,
    "Service_Charge": null,
    "Administrative_Fee": null
  },
  "OfferCode": "TEST000036",
  "CreativeCode": "PCB",
  "campaignTypeMessage": "Prequalified Offer. You may have money available now! Up to: $12,000"
}

const mockDataRecentPayments = {
  data: {
     "loanHistory":[
        {
           "accountNumber":"4103-001995-21",
           "AppAccountHistory":[
              {
                 "TransactionDate":"2022-06-11T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":14.7,
                 "RunningPrincipalBalance":7985
              },
              {
                 "TransactionDate":"2022-05-10T00:00:00",
                 "TransactionDescription":"Regular Payment",
                 "PrincipalAmount":0,
                 "InterestAmount":11,
                 "OtherAmount":0,
                 "RunningPrincipalBalance":7985
              },
              {
                 "TransactionDate":"2022-05-09T00:00:00",
                 "TransactionDescription":"Regular Payment",
                 "PrincipalAmount":0,
                 "InterestAmount":11,
                 "OtherAmount":0,
                 "RunningPrincipalBalance":7985
              },
              {
                 "TransactionDate":"2022-05-04T00:00:00",
                 "TransactionDescription":"Open Loan",
                 "PrincipalAmount":7985,
                 "InterestAmount":0,
                 "OtherAmount":0,
                 "RunningPrincipalBalance":7985
              }
           ],
           "Errors":[
              
           ],
           "SuccessMessage":"",
           "HasNoErrors":true
        },
        {
           "accountNumber":"1001-017915-16",
           "AppAccountHistory":[
              {
                 "TransactionDate":"2022-06-23T00:00:00",
                 "TransactionDescription":"Regular Payment",
                 "PrincipalAmount":-371.23,
                 "InterestAmount":0,
                 "OtherAmount":0,
                 "RunningPrincipalBalance":13904.88
              },
              {
                 "TransactionDate":"2022-06-13T00:00:00",
                 "TransactionDescription":"Regular Payment",
                 "PrincipalAmount":-1315.55,
                 "InterestAmount":0,
                 "OtherAmount":-55.68,
                 "RunningPrincipalBalance":14276.11
              },
              {
                 "TransactionDate":"2022-05-07T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":18.56,
                 "RunningPrincipalBalance":15591.66
              },
              {
                 "TransactionDate":"2022-04-06T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":18.56,
                 "RunningPrincipalBalance":15591.66
              },
              {
                 "TransactionDate":"2022-03-09T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":18.56,
                 "RunningPrincipalBalance":15591.66
              },
              {
                 "TransactionDate":"2022-01-27T00:00:00",
                 "TransactionDescription":"Principal Decrease",
                 "PrincipalAmount":0,
                 "InterestAmount":5594.9,
                 "OtherAmount":0,
                 "RunningPrincipalBalance":15591.66
              },
              {
                 "TransactionDate":"2022-01-27T00:00:00",
                 "TransactionDescription":"Open Loan",
                 "PrincipalAmount":15591.66,
                 "InterestAmount":0,
                 "OtherAmount":0,
                 "RunningPrincipalBalance":15591.66
              }
           ],
           "Errors":[
              
           ],
           "SuccessMessage":"",
           "HasNoErrors":true
        },
        {
           "accountNumber":"7005-016179-14",
           "AppAccountHistory":[
              {
                 "TransactionDate":"2022-05-10T00:00:00",
                 "TransactionDescription":"Regular Payment",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":-10,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2022-05-10T00:00:00",
                 "TransactionDescription":"Regular Payment",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":-12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2020-07-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2020-06-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2020-05-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2020-04-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2020-03-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2020-02-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2020-01-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2019-12-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2019-11-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2019-10-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2019-09-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2019-08-17T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2019-07-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2019-06-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2019-05-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2019-04-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2019-03-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2019-02-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2019-01-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2018-12-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2018-11-17T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2018-10-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2018-09-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2018-08-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2018-07-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2018-06-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2018-05-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2018-04-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2018-03-17T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2018-02-17T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2018-01-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2017-12-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2017-11-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2017-10-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2017-09-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2017-08-18T00:00:00",
                 "TransactionDescription":"Late Charge Assessed",
                 "PrincipalAmount":0,
                 "InterestAmount":0,
                 "OtherAmount":8.12,
                 "RunningPrincipalBalance":2069.97
              },
              {
                 "TransactionDate":"2017-07-21T00:00:00",
                 "TransactionDescription":"Open Loan",
                 "PrincipalAmount":2069.97,
                 "InterestAmount":0,
                 "OtherAmount":0,
                 "RunningPrincipalBalance":2069.97
              }
           ],
           "Errors":[
              
           ],
           "SuccessMessage":"",
           "HasNoErrors":true
        }
     ],
  }
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

const MockAccountOverview = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LoanAccount>
          <NavContext>
            <ActiveLoans />
            <RecentPayments />
            <PaymentHistory />
            <RecentApplications />
            <ViewAccountDetails />
            <MakePayment />
          </NavContext>
          </LoanAccount>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}


it("Payment history Button is navigating to Payment History page", async () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockData,
  }));
  const container = render(MockAccountOverview());
  const input = container.getByTestId('payment_history_button');
  expect(input).toBeTruthy();
  fireEvent.click(input);
  const page = container.getByTestId("payment_History")
  await waitFor(() => expect(page).toBeInTheDocument());
});

it("Navigate to View Account Page", async () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: recentApplicationsMockData,
  }));
  const container = render(MockAccountOverview());
  const input = container.getByTestId("navigate_View_Account_1");
  expect(input).toBeTruthy();
  fireEvent.click(input);
  const page = container.getByTestId("view_Account")
  await waitFor(() => expect(page).toBeInTheDocument());
});

it("Default Account Number with Payment History", () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataRecentPayments,
  }));
  const container = render(MockAccountOverview());
  const headingElement = container.getByTestId('selectInput');
  expect(headingElement.value).toBe("4103-001995-21");
});

it("Select one loan account from Select Dropdown - Display the Data accordingly", async() => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataRecentPayments,
  }));
  const {container} = render(MockAccountOverview());
  const headingElement = container.querySelector(`input[name="loans"]`);
  await act(() => {
		fireEvent.change(headingElement, { target: { value: "1001-017915-16" } });
	});
	expect(headingElement).toBeTruthy();
  expect(headingElement.value).toBe("1001-017915-16");
});

it("Make a Payment Button is navigating to Make a payment page", async () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataActiveLoans,
  }));
  const container = render(MockAccountOverview());
  const input = container.getByTestId('make_A_Payment_Button_1');
  expect(input).toBeTruthy();
  fireEvent.click(input);
  const page = container.getByTestId("heading")
  await waitFor(() => expect(page).toBeInTheDocument());
});

it("Enable AutoPay should navigate to Make a Payment Page Test", async() => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataActiveLoans,
  }));
  const container = render(MockAccountOverview());
  const autoPayElement = container.getByTestId("enableAutoPay_1")
  expect(autoPayElement).toBeTruthy();
  fireEvent.click(autoPayElement);
  const page = container.getByTestId("heading")
  await waitFor(() => expect(page).toBeInTheDocument());
});
