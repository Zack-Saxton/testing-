const dynamicDateGetter = (date) => {
   let calculation = new Date();
   let dynamicDate = calculation.setDate(calculation.getDate() + date);
   dynamicDate = new Date(dynamicDate).toISOString();
   return dynamicDate.toString()
}

export const mockDataOne = (dueDate, enabledOrNot, hasScheduledPayment) => {
   return {
      data: {
         activeLoans:
            [
               { 
                  "loanDetails": {
                     "PaymentOptions": {
                        "NumberOfDaysAllowedForPayoff": 0,
                        "ImmediateAchFee": 0,
                        "ScheduledAchFee": 0,
                        "MaximumAchPaymentAmount": 4561.1,
                        "MinimumAchPaymentAmount": 792.85,
                        "DebitCardFeeAmount": 0,
                        "MaxminumCardPaymentAmount": 0,
                        "MinimumCardPaymentAmount": 0,
                        "NumberDaysPastDueBeforeDelinquent": 0,
                        "RequiresThirdPartyFeeForCardPayment": false,
                        "AllowCardPayments": false,
                        "AllowACHPayments": true
                     },
                     "AccountNumber": "4105-001175-13",
                     "Name": "ROBERTA FFRZYLKKR",
                     "Address": {
                        "HouseholdNumber": 0,
                        "Address1": "779 T 94SZ ST APT 3S",
                        "Address2": "",
                        "City": "SPANISH FORK",
                        "State": "UT",
                        "ZipCode": "84660"
                     },
                     "OriginalFinancedAmount": 8000,
                     "OriginalAmountFinanced": 8000,
                     "OriginalBalance": 8000,
                     "OriginalAPR": 18.99,
                     "LastPaymentAmount": 312.2,
                     "LastPaymentDate": "2021-11-15T00:00:00",
                     "NextPaymentAmount": 293.21,
                     "NextPaymentDate": dynamicDateGetter(dueDate),
                     "CurrentYearToDateInterest": 0,
                     "LastYearToDateInterest": 1803.17,
                     "InterestRate": 18.99,
                     "LoanOriginationDate": "2020-02-13T00:00:00",
                     "RegularPaymentAmount": 293.21,
                     "CurrentPayOffAmount": 4561.1,
                     "LoanFeesAndCharges": 90,
                     "LoanIsDelinquent": true,
                     "NextDueDate": dynamicDateGetter(dueDate),
                     "Errors": [
                        {
                           "ErrorMessage": "Delinquent",
                           "ReturnCodeNumberOnly": ""
                        }
                     ],
                     "SuccessMessage": "",
                     "HasNoErrors": false
                  },
                  "loanPaymentInformation": {
                     "accountDetails": {
                        "RegularPaymentAmount": 293.21,
                        "CurrentPayOffAmount": 4561.1,
                        "LoanFeesAndCharges": 90,
                        "LoanIsDeliquent": true,
                        "NextDueDate": dynamicDateGetter(dueDate),
                        "CurrentYearToDateInterest": 0,
                        "InterestRate": 18.99,
                        "LastYearToDateInterest": 1803.17,
                        "NextPaymentAmount": 293.21,
                        "NextPaymentDate": "2022-02-13T00:00:00",
                        "LastPaymentAmount": 312.2,
                        "LastPaymentDate": "2021-11-15T00:00:00",
                        "OriginalFinancedAmount": 8000,
                        "LoanOriginationDate": "2020-02-13T00:00:00"
                     },
                     "hasScheduledPayment": hasScheduledPayment,
                     "scheduledPayments": [

                     ],
                     "paymentOptions": {
                        "NumberOfDaysAllowedForPayoff": 0,
                        "ImmediateAchFee": 0,
                        "ScheduledAchFee": 0,
                        "MaximumAchPaymentAmount": 4561.1,
                        "MinimumAchPaymentAmount": 792.85,
                        "DebitCardFeeAmount": 0,
                        "MaxminumCardPaymentAmount": 792.85,
                        "MinimumCardPaymentAmount": 792.85,
                        "NumberDaysPastDueBeforeDelinquent": 75,
                        "RequiresThirdPartyFeeForCardPayment": true,
                        "AllowCardPayments": true,
                        "AllowACHPayments": true
                     },
                     "appRecurringACHPayment": enabledOrNot
                  }
               }
            ]
      }
   }
}

export const mockDataTwo = () => {
   return {
      data: {
         activeLoans:
            [
               {
                  "loanDetails": {
                     "PaymentOptions": {
                        "NumberOfDaysAllowedForPayoff": 0,
                        "ImmediateAchFee": 0,
                        "ScheduledAchFee": 0,
                        "MaximumAchPaymentAmount": 4561.1,
                        "MinimumAchPaymentAmount": 792.85,
                        "DebitCardFeeAmount": 0,
                        "MaxminumCardPaymentAmount": 0,
                        "MinimumCardPaymentAmount": 0,
                        "NumberDaysPastDueBeforeDelinquent": 0,
                        "RequiresThirdPartyFeeForCardPayment": false,
                        "AllowCardPayments": false,
                        "AllowACHPayments": true
                     },
                     "AccountNumber": "4105-001175-13",
                     "Name": "ROBERTA FFRZYLKKR",
                     "Address": {
                        "HouseholdNumber": 0,
                        "Address1": "779 T 94SZ ST APT 3S",
                        "Address2": "",
                        "City": "SPANISH FORK",
                        "State": "UT",
                        "ZipCode": "84660"
                     },
                     "OriginalFinancedAmount": 8000,
                     "OriginalAmountFinanced": 8000,
                     "OriginalBalance": 8000,
                     "OriginalAPR": 18.99,
                     "LastPaymentAmount": 312.2,
                     "LastPaymentDate": "2021-11-15T00:00:00",
                     "NextPaymentAmount": 293.21,
                     "NextPaymentDate": "2022-02-13T00:00:00",
                     "CurrentYearToDateInterest": 0,
                     "LastYearToDateInterest": 1803.17,
                     "InterestRate": 18.99,
                     "LoanOriginationDate": "2020-02-13T00:00:00",
                     "RegularPaymentAmount": 293.21,
                     "CurrentPayOffAmount": 4561.1,
                     "LoanFeesAndCharges": 90,
                     "LoanIsDelinquent": true,
                     "NextDueDate": "2022-02-13T00:00:00",
                     "Errors": [
                        {
                           "ErrorMessage": "Delinquent",
                           "ReturnCodeNumberOnly": ""
                        }
                     ],
                     "SuccessMessage": "",
                     "HasNoErrors": false
                  },
                  "loanPaymentInformation": {
                     "accountDetails": {
                        "RegularPaymentAmount": 293.21,
                        "CurrentPayOffAmount": 4561.1,
                        "LoanFeesAndCharges": 90,
                        "LoanIsDeliquent": true,
                        "NextDueDate": "2022-02-13T00:00:00",
                        "CurrentYearToDateInterest": 0,
                        "InterestRate": 18.99,
                        "LastYearToDateInterest": 1803.17,
                        "NextPaymentAmount": 293.21,
                        "NextPaymentDate": "2022-02-13T00:00:00",
                        "LastPaymentAmount": 312.2,
                        "LastPaymentDate": "2021-11-15T00:00:00",
                        "OriginalFinancedAmount": 8000,
                        "LoanOriginationDate": "2020-02-13T00:00:00"
                     },
                     "hasScheduledPayment": false,
                     "scheduledPayments": [

                     ],
                     "paymentOptions": {
                        "NumberOfDaysAllowedForPayoff": 0,
                        "ImmediateAchFee": 0,
                        "ScheduledAchFee": 0,
                        "MaximumAchPaymentAmount": 4561.1,
                        "MinimumAchPaymentAmount": 792.85,
                        "DebitCardFeeAmount": 0,
                        "MaxminumCardPaymentAmount": 792.85,
                        "MinimumCardPaymentAmount": 792.85,
                        "NumberDaysPastDueBeforeDelinquent": 75,
                        "RequiresThirdPartyFeeForCardPayment": true,
                        "AllowCardPayments": true,
                        "AllowACHPayments": true
                     },
                     "appRecurringACHPayment": null
                  },
                  "loanData": {
                     "accountNumber": "4105-001175-13",
                     "balance": 4115.1,
                     "status": "Past Due",
                     "dueDate": "2022-02-13T00:00:00",
                     "amountDue": 792.85,
                     "loanOriginationDate": "2020-02-13T00:00:00"
                  }
               },
               {
                  "loanDetails": {
                     "PaymentOptions": {
                        "NumberOfDaysAllowedForPayoff": 0,
                        "ImmediateAchFee": 0,
                        "ScheduledAchFee": 0,
                        "MaximumAchPaymentAmount": 4549.37,
                        "MinimumAchPaymentAmount": 774.01,
                        "DebitCardFeeAmount": 0,
                        "MaxminumCardPaymentAmount": 0,
                        "MinimumCardPaymentAmount": 0,
                        "NumberDaysPastDueBeforeDelinquent": 0,
                        "RequiresThirdPartyFeeForCardPayment": false,
                        "AllowCardPayments": false,
                        "AllowACHPayments": true
                     },
                     "AccountNumber": "4105-001177-20",
                     "Name": "ROBERTA FFRZYLKKR",
                     "Address": {
                        "HouseholdNumber": 0,
                        "Address1": "779 T 94SZ ST APT 3S",
                        "Address2": "",
                        "City": "SPANISH FORK",
                        "State": "UT",
                        "ZipCode": "84660"
                     },
                     "OriginalFinancedAmount": 8000,
                     "OriginalAmountFinanced": 8000,
                     "OriginalBalance": 8000,
                     "OriginalAPR": 18.99,
                     "LastPaymentAmount": 312.2,
                     "LastPaymentDate": "2022-01-11T00:00:00",
                     "NextPaymentAmount": 293.21,
                     "NextPaymentDate": "2022-02-13T00:00:00",
                     "CurrentYearToDateInterest": 136.77,
                     "LastYearToDateInterest": 1789.15,
                     "InterestRate": 18.99,
                     "LoanOriginationDate": "2020-02-13T00:00:00",
                     "RegularPaymentAmount": 293.21,
                     "CurrentPayOffAmount": 4549.37,
                     "LoanFeesAndCharges": 90,
                     "LoanIsDelinquent": true,
                     "NextDueDate": "2022-02-13T00:00:00",
                     "Errors": [
                        {
                           "ErrorMessage": "Delinquent",
                           "ReturnCodeNumberOnly": ""
                        }
                     ],
                     "SuccessMessage": "",
                     "HasNoErrors": false
                  },
                  "loanPaymentInformation": {
                     "accountDetails": {
                        "RegularPaymentAmount": 293.21,
                        "CurrentPayOffAmount": 4549.37,
                        "LoanFeesAndCharges": 90,
                        "LoanIsDeliquent": true,
                        "NextDueDate": "2022-02-13T00:00:00",
                        "CurrentYearToDateInterest": 136.77,
                        "InterestRate": 18.99,
                        "LastYearToDateInterest": 1789.15,
                        "NextPaymentAmount": 293.21,
                        "NextPaymentDate": "2022-02-13T00:00:00",
                        "LastPaymentAmount": 312.2,
                        "LastPaymentDate": "2022-01-11T00:00:00",
                        "OriginalFinancedAmount": 8000,
                        "LoanOriginationDate": "2020-02-13T00:00:00"
                     },
                     "hasScheduledPayment": false,
                     "scheduledPayments": [

                     ],
                     "paymentOptions": {
                        "NumberOfDaysAllowedForPayoff": 0,
                        "ImmediateAchFee": 0,
                        "ScheduledAchFee": 0,
                        "MaximumAchPaymentAmount": 4549.37,
                        "MinimumAchPaymentAmount": 774.01,
                        "DebitCardFeeAmount": 0,
                        "MaxminumCardPaymentAmount": 774.01,
                        "MinimumCardPaymentAmount": 774.01,
                        "NumberDaysPastDueBeforeDelinquent": 75,
                        "RequiresThirdPartyFeeForCardPayment": true,
                        "AllowCardPayments": true,
                        "AllowACHPayments": true
                     },
                     "appRecurringACHPayment": null
                  },
                  "loanData": {
                     "accountNumber": "4105-001177-20",
                     "balance": 4219.01,
                     "status": "Past Due",
                     "dueDate": "2022-02-13T00:00:00",
                     "amountDue": 774.01,
                     "loanOriginationDate": "2020-02-13T00:00:00"
                  }
               },
            ]
      }
   }
}