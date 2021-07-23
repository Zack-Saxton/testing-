
export function testing(formData) {
  return formData;
} 

export async function checkMyOfferSubmit(formData) {
    //result - to store the result from api call, token - auth token, leggedIn
    let result, token, loggedIn;
    //response - get the required data from result
    let response = {
        branch_referral: '',
        offer_id: '',
        application_id: '',
        skip_offer: '',
        errors: '',
        appSubmissionResult: ''
    }

    //Data to be send to api call
    let body = {
      'zip_code': formData?.zip ?? null,
      'user': {
        'terms_agreement': 'on',
        'create_account_get_rate_button': 'Get Your Rate',
        'Consent_Credit_Contact_Authorization_Version__c': formData.consent_credit_contact_auth,
        'Consent_Electronic_Communication_Policy_Version__c': formData.consent_electronic_communication,
        'Consent_Privacy_Policy_Version__c': formData.consent_privacy_policy,
        'Consent_Terms_Of_Use_Version__c': formData.consent_terms_of_use
      },
      'isAuthenticated': true,
      'formData': {
        'application': {
          'requested_product_details': {
            'requested_loan_amount_raw': Number(formData.loanAmount) > 1500 ? formData.loanAmount : 1500,
            'requested_loan_amount': Number(formData.loanAmount) > 1500 ? formData.loanAmount : 1500,
            'requested_loan_term': formData.term,
            'offer_code': formData.offerCode || null,
            'offer_credit_score': 'undefined',
            'offer_amount': 'undefined'
          },
          'contact': {
            'first_name': formData.firstName,
          },
          'processing': {},
          'processing.tokens': {
            'utm_source': null,
            'utm_campaign': null,
            'utm_medium': null
          }
        },
        'applicant': {
          'contact': {
            'address_city': formData.city,
            'address_postal_code': formData?.zip ?? null,
            'address_state': formData?.state,
            'address_street': formData?.streetAddress,
            'email': formData.email,
            'phone_number_primary': formData.phone,
            'phone_type':  'Cell',
            'first_name': formData.firstName,
            'full_name': formData.fullName,
            'last_name': formData.lastName
          },
          'self_reported': {
            'annual_income': formData.annualIncome,
            'household_annual_income': formData.householdAnnualIncome,
            "employer_name": formData?.employerName,
            "position_at_employer": formData?.jobTitle,
            'employment_status': formData.employmentStatus,
            'employer_phone_number': formData?.employmentPhoneNumber,
            'tenure_at_employer': formData.yearsAtEmployers,
            "military_active_duty": formData.militaryActiveDuty,
            // "active_duty_rank": req.body.application.activeDutyRank,
            'marital_status': formData.maritalStatus,
            'spouse_address_city': formData.spouse_address_city,
            'spouse_address_postal_code': formData.spouse_address_postal_code,
            'spouse_address_state': formData.spouse_address_state,
            'spouse_address_street': formData.spouse_address_street,
            'loan_purpose': formData.loanPurpose,
            'citizenship': formData.citizenship,
            'home_ownership': formData.homeOwnership,
            'mortgage_or_rental_payment': formData.rentMortageAmount,
          },
          'applicant_type': 'primary'
        },
        'coborrower_token': null,
        'cosigner_token': null,
        'customer': {
          'identification': {
            'citizenship': formData.citizenship,
            'date_of_birth': formData.dob,
            'age': formData.age,
            'social_security_number_backup': formData.ssn,
            'social_security_number': formData.ssn,
            'first_name': formData.firstName,
            'full_name': formData.fullName,
            'last_name': formData.lastName
          },
          'latest_contact': {
            'address_city': formData.city,
            'address_postal_code': formData?.zip ?? null,
            'address_state': formData?.state,
            'address_street': formData?.streetAddress,
            'email': formData.email,
            'phone_number_primary': formData.phone,
            'phone_type': 'Cell',
          }
        },
        'submission_id': null,
        'submission_type': 'Mobile',
        'submission_paramter': null,
        'ip_address': formData.userIP ?? '127.0.0.1'
      },
      'gclid': null,
    //   'requested_product': req.body.application.requested_product,
      'geoip': formData.userIP ?? '127.0.0.1',
      'update_sor_applicant_consents': {
        'consents': {
          'credit_contact_authorization': {
            'consent': true,
            'version': '12'
          },
          'electronic_communications': {
            'consent': true,
            'version': '14'
          },
          'privacy_policy': {
            'consent': true,
            'version': '9'
          },
          'terms_of_use': {
            'consent': true,
            'version': '7'
          },
          'delaware_itemized_schedule_of_charges': {
            'consent': false,
            'version': '1.0'
          },
          'california_credit_education_program': {
            'consent': false,
            'version': '1.0'
          }
        },
        'esigns': {
          'credit_contact_authorization': {
            'date': '2020-04-21T20:24:57.644Z',
            'useragent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            'ipaddress': formData.userIP ?? '127.0.0.1'
          },
          'electronic_communications': {
            'date': '2020-04-21T20:24:57.644Z',
            'useragent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            'ipaddress': formData.userIP ?? '127.0.0.1'
          },
          'privacy_policy': {
            'date': '2020-04-21T20:24:57.644Z',
            'useragent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            'ipaddress': formData.userIP ?? '127.0.0.1'
          },
          'terms_of_use': {
            'date': '2020-04-21T20:24:57.644Z',
            'useragent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            'ipaddress': formData.userIP ?? '127.0.0.1'
          },
          'delaware_itemized_schedule_of_charges': null,
          'california_credit_education_program': null
        }
      },
      'sourceTracking': [
        {
          'originalUrl': 'http://localhost:4000',
          'referer': 'http://localhost:4000/psa/submit_application',
          'date': Date.now(),
          'utm_source': null,
          'utm_medium': null,
          'utm_campaign': null
        }
      ],
      'headersHost': 'localhost:4000'
    }
    try {
		if (!loggedIn && !token) {
			    result = await fetch("/api/v2/psa_digifi", {
				method: "POST",
				body: body,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			});
      result = await result.json();

      console.log("API Result: ", result);

      if (result && result.data && result.data.applicantStatus) {
            if (result.data.applicantStatus === 'referred' && result.data.branch_referral);
            if (result.data.applicantStatus === 'offers_available' && result.data.offer_id) {
                response.offer_id = result.data.offer_id;
                response.application_id = result.data.applicationID;
                response.skip_offer = false;
            }
		}

	}
 } catch (error) {
		response.errors = error;
	}

    response.appSubmissionResult = result;
    return response;
  };


