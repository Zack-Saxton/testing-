import Moment from "moment"
export const mockDataActiveLoans = {
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
             "NextPaymentDate":Moment(new Date(), "DD-MM-YYYY").add(20, 'days'),
             "CurrentYearToDateInterest":0,
             "LastYearToDateInterest":0,
             "InterestRate":27.15,
             "LoanOriginationDate":"2022-01-27T00:00:00",
             "RegularPaymentAmount":371.23,
             "CurrentPayOffAmount":7326.78,
             "LoanFeesAndCharges":0,
             "LoanIsDelinquent":false,
             "NextDueDate":Moment(new Date(), "DD-MM-YYYY").add(5, 'days'),
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