const dynamicDateGetter = (date) => {
   let calculation = new Date();
   let dynamicDate = calculation.setDate(calculation.getDate() + date);
   dynamicDate = new Date(dynamicDate).toISOString();
   return dynamicDate.toString()
}

export const accOverviewData = () => {
   return {
      data: {
         "skip_session": true,
         "applicant": {
             "contact": {
                 "address_street": "1234 MAIN AVE",
                 "address_city": "NEWARK",
                 "address_state": "DE",
                 "address_postal_code": "19702",
                 "mailing_address_street": "1234 MAIN AVE",
                 "mailing_address_city": "NEWARK",
                 "mailing_address_state": "DE",
                 "mailing_address_postal_code": "19702",
                 "email": "zdunkerton@marinerfinance.com",
                 "first_name": "jean",
                 "full_name": "jean llmtwxy",
                 "last_name": "llmtwxy",
                 "phone_number_primary": "1231231234",
                 "phone_type": "Cell"
             },
             "funding_information": {
                 "bank_account_holder": "JEAN LLMTWXY",
                 "bank_account_number": "3cf0fa8fbdd139dc1959",
                 "bank_account_type": "saving",
                 "bank_name": "JPMORGAN CHASE",
                 "bank_routing_number": "021000021"
             },
             "identification": {
                 "guid": "AT-JE1647874278389",
                 "trace_number": 1647874278389
             },
             "processing": {
                 "email_verified": false,
                 "review_state": null,
                 "status": "referred",
                 "verification_status": null,
                 "propensity_score": "P",
                 "propensity_score_risk": null,
                 "distance_to_branch": 40.2,
                 "referral_ranking": 2,
                 "consents": {
                     "credit_contact_authorization": {
                         "consent": true,
                         "version": "13"
                     },
                     "electronic_communications": {
                         "consent": true,
                         "version": "15"
                     },
                     "privacy_policy": {
                         "consent": true,
                         "version": null
                     },
                     "terms_of_use": {
                         "consent": true,
                         "version": "9"
                     },
                     "delaware_itemized_schedule_of_charges": {
                         "consent": true,
                         "version": "1.0"
                     },
                     "california_credit_education_program": {
                         "consent": false,
                         "version": "1.0"
                     },
                     "new_mexico_disclosure": {
                         "consent": false,
                         "version": "1.0"
                     }
                 },
                 "esigns": {
                     "credit_contact_authorization": {
                         "date": "2022-03-21T14:51:16.045Z",
                         "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                         "ipaddress": "40.128.72.32"
                     },
                     "electronic_communications": {
                         "date": "2022-03-21T14:51:16.045Z",
                         "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                         "ipaddress": "40.128.72.32"
                     },
                     "privacy_policy": {
                         "date": "2022-03-21T14:51:16.045Z",
                         "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                         "ipaddress": "40.128.72.32"
                     },
                     "terms_of_use": {
                         "date": "2022-03-21T14:51:16.045Z",
                         "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                         "ipaddress": "40.128.72.32"
                     },
                     "delaware_itemized_schedule_of_charges": {
                         "date": "2022-03-21T14:51:16.045Z",
                         "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                         "ipaddress": "40.128.72.32"
                     },
                     "california_credit_education_program": null,
                     "new_mexico_disclosure": null
                 },
                 "flag": {
                     "referred": true
                 }
             },
             "self_reported": {
                 "annual_income": 120000,
                 "citizenship": "USA Citizen",
                 "employment_status": "Employed Hourly",
                 "employer_name": null,
                 "employer_phone_number": "3322018552",
                 "home_ownership": "Renting",
                 "household_annual_income": 200000,
                 "loan_purpose": "Home Improvement",
                 "marital_status": null,
                 "military_status": null,
                 "mortgage_or_rental_payment": 2000,
                 "position_at_employer": null,
                 "relationship_to_borrower": null,
                 "spouse_address_city": null,
                 "spouse_address_postal_code": null,
                 "spouse_address_state": null,
                 "spouse_address_street": null,
                 "tenure_at_employer": 4,
                 "years_at_current_address": null,
                 "how_did_you_hear_about_us": null
             },
             "sorad": {
                 "third_party_data": {
                     "geoips": [],
                     "soft_credit_pull": "623890f0676f6d044d5a9b62"
                 },
      
                 "application": "623890e6676f6d044d5a9b54",
                 "customer": "5c743dbcffbf7814ab74f6da",
                 "external_referral": {
                     "actionToTake": 2,
                     "appSubmitted": true,
                     "applicationNumber": "2032-0000025205"
                 }
             },
             "contenttypes": [],
             "entitytype": "applicant",
             "applicant_type": "primary",
             "external_borrower_type": "present borrower",
             "pb_sales_finance_loan": false,
             "customer_relationship_status": null,
             "_id": "623890e6676f6d044d5a9b5a",
             "random": 0.5984155311964423,
             "createdat": "2022-03-21T14:51:18.392Z",
             "updatedat": "2022-06-09T18:07:22.427Z",
             "__v": 0,
             "attributes": {
                 "external_referral_sent": true
             },
             "giact_info": {
                 "ItemReferenceId": null,
                 "CreatedDate": null,
                 "ErrorMessage": null,
                 "VerificationResponse": null,
                 "AccountResponseCode": null,
                 "BankName": null,
                 "AccountAddedDate": null,
                 "AccountLastUpdatedDate": null,
                 "AccountClosedDate": null,
                 "BankAccountType": null,
                 "VoidedCheckImage": null,
                 "FundsConfirmationResult": null,
                 "CustomerResponseCode": null,
                 "IpAddressInformationResult": null,
                 "DomainWhoIsResult": null,
                 "MobileResult": null,
                 "AccountInsightsResult": null
             }
         },
         "loanData": [
             {
                 "accountNumber": "3506-005079-19",
                 "balance": 8.03,
                 "status": "Active",
                 "dueDate": "2022-06-15T00:00:00",
                 "amountDue": 8.03,
                 "loanOriginationDate": "2019-04-01T00:00:00"
             }
         ],
         "allLoansClosed": false,
         "activeLoans": [
             {
                 "loanDetails": {
                     "PaymentOptions": {
                         "NumberOfDaysAllowedForPayoff": 0,
                         "ImmediateAchFee": 0,
                         "ScheduledAchFee": 0,
                         "MaximumAchPaymentAmount": 8.03,
                         "MinimumAchPaymentAmount": 1,
                         "DebitCardFeeAmount": 0,
                         "MaxminumCardPaymentAmount": 0,
                         "MinimumCardPaymentAmount": 0,
                         "NumberDaysPastDueBeforeDelinquent": 0,
                         "RequiresThirdPartyFeeForCardPayment": false,
                         "AllowCardPayments": false,
                         "AllowACHPayments": true
                     },
                     "AccountNumber": "3506-005079-19",
                     "Name": "JEAN LLMTWXY",
                     "Address": {
                         "HouseholdNumber": 0,
                         "Address1": "123 MAIN ST",
                         "Address2": "",
                         "City": "DAYTON",
                         "State": "OH",
                         "ZipCode": "45459"
                     },
                     "OriginalFinancedAmount": 6688.44,
                     "OriginalAmountFinanced": 5000,
                     "OriginalBalance": 6688.44,
                     "OriginalAPR": 19.99,
                     "LastPaymentAmount": 10,
                     "LastPaymentDate": "2022-03-29T00:00:00",
                     "NextPaymentAmount": 185.79,
                     "NextPaymentDate": "2022-06-15T00:00:00",
                     "CurrentYearToDateInterest": 0,
                     "LastYearToDateInterest": 0,
                     "InterestRate": 19.99,
                     "LoanOriginationDate": "2019-04-01T00:00:00",
                     "RegularPaymentAmount": 8.03,
                     "CurrentPayOffAmount": 8.03,
                     "LoanFeesAndCharges": 0,
                     "LoanIsDelinquent": false,
                     "NextDueDate": "2022-06-15T00:00:00",
                     "Errors": [],
                     "SuccessMessage": "",
                     "HasNoErrors": true
                 },
                 "loanPaymentInformation": {
                     "errorMessage": "Error getting loan payment information for Account Number: 3506-005079-19"
                 },
                 "loanData": {
                     "accountNumber": "3506-005079-19",
                     "balance": 8.03,
                     "status": "Active",
                     "dueDate": "2022-06-15T00:00:00",
                     "amountDue": 8.03,
                     "loanOriginationDate": "2019-04-01T00:00:00"
                 }
             }
         ],
     }
   }
}

export const holidayData = () => {
   return {
      data: {
         "MFYearHolidays": [
             {
                 "Date": "January 3, 2022",
                 "Day": "Monday",
                 "Holiday_Name": "New Year’s Day (observed)"
             },
             {
                 "Date": "January 17, 2022",
                 "Day": "Monday",
                 "Holiday_Name": "Martin Luther King Jr. Day"
             },
             {
                 "Date": "February 21, 2022",
                 "Day": "Monday",
                 "Holiday_Name": "President’s Day"
             },
             {
                 "Date": "May 30, 2022",
                 "Day": "Monday",
                 "Holiday_Name": "Memorial Day"
             },
             {
                 "Date": "June 20, 2022",
                 "Day": "Monday",
                 "Holiday_Name": "Juneteenth Independence Day (observed)"
             },
             {
                 "Date": "July 4, 2022",
                 "Day": "Monday",
                 "Holiday_Name": "\tLabor Day"
             },
             {
                 "Date": "October 10, 2022",
                 "Day": "Monday",
                 "Holiday_Name": "Columbus Day"
             },
             {
                 "Date": "November 24, 2022",
                 "Day": "Thursday",
                 "Holiday_Name": "Thanksgiving Day"
             },
             {
                 "Date": "December 26, 2022",
                 "Day": "Monday",
                 "Holiday_Name": "Christmas Day (observed)"
             }
         ]
     }
   }
}

export const paymentData = () => {
   return {
      data: {
         "defaultBank": "Ashok",
         "paymentOptions": [
             {
                 "AccountType": "Savings",
                 "RoutingNumber": "091000022",
                 "AccountNumber": "988343",
                 "OwnerName": "kkumar",
                 "Nickname": "Ashok",
                 "SequenceNumber": 19,
                 "IsVerified": false
             },
             {
                 "AccountType": "Checking",
                 "RoutingNumber": "052001633",
                 "AccountNumber": "8874110526",
                 "OwnerName": "JEAN LLMTWXY",
                 "Nickname": "Acct-0526",
                 "SequenceNumber": 0,
                 "IsVerified": false
             },
             {
                 "AccountType": "Checking",
                 "RoutingNumber": "121122676",
                 "AccountNumber": "0000000016",
                 "OwnerName": "Jain",
                 "Nickname": "Rudolph",
                 "SequenceNumber": 6,
                 "IsVerified": false
             },
             {
                 "AccountType": "Savings",
                 "RoutingNumber": "091000022",
                 "AccountNumber": "4532",
                 "OwnerName": "Ravi",
                 "Nickname": "Ram",
                 "SequenceNumber": 10,
                 "IsVerified": false
             },
             {
                 "ProfileId": 429,
                 "CardType": "MasterCard",
                 "LastFour": "0003",
                 "ExpirationDate": "2023-04-01T00:00:00",
                 "OwnerName": "Karun",
                 "Restricted": false,
                 "Nickname": "Debit-0003"
             },
             {
                 "ProfileId": 3638,
                 "CardType": "MasterCard",
                 "LastFour": "0052",
                 "ExpirationDate": "2023-04-01T00:00:00",
                 "OwnerName": "Arun",
                 "Restricted": false,
                 "Nickname": "Debit-0052"
             }
         ]
     }
   }
}