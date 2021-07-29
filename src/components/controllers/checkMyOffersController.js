export async function testing() {
	try {
		    let data = '';
			let result = await fetch("https://psa-qa.marinerfinance.io/api/v2/psa_digifi", 
			{
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					
				},
				body: data,
				
			}
			);
			result = await result.json();
			console.log("API Result: ");

		
	} catch (error) {
		console.log(error);
	}
}


export async function checkMyOfferSubmit(customer) {
	//result - to store the result from api call, token - auth token, loggedIn
	let result, token, loggedIn;
	//response - get the required data from result
	let response = {
		branch_referral: "",
		offer_id: "",
		application_id: "",
		skip_offer: "",
		errors: "",
		appSubmissionResult: "",
	};

	//Data to be send to api 
	let body = {
		"user": {
			"password": "Mariner1",
			"confirm_password": "Mariner1",
			"terms_agreement": "on",
			"create_account_get_rate_button": "Get Your Rate",
			"Consent_Credit_Contact_Authorization_Version__c": "12",
			"Consent_Electronic_Communication_Policy_Version__c": "14",
			"Consent_Privacy_Policy_Version__c": "9",
			"Consent_Terms_Of_Use_Version__c": "7"
		},
		"isAuthenticated": true,
		"formData": {
			"application": {
				"requested_product_details": {
					"requested_loan_amount_raw": 5000,
					"requested_loan_amount": 5000,
					"requested_loan_term": 36,
					"offer_code": null
				},
				"contact": {
					"address_city": customer.city,
					"address_postal_code": customer.zip ,
					"address_state": customer.state ,
					"address_street": customer.streetAddress|| "366 EHRHARDT RD",
					"email": customer.email,
					"phone_number_primary":customer.phone,
					"phone_type": "Cell",
					"first_name": customer.firstName,
					"full_name": `${customer.firstName} ${customer.lastName}`,
					"last_name": customer.lastName,
				},
				"processing": {
					"tokens": {
						"utm_source": null,
						"utm_campaign": null,
						"utm_medium": null
					}
				},
				"processing.tokens": {
					"utm_source": null,
					"utm_campaign": null,
					"utm_medium": null
				}
			},
			"applicant": {
				"contact": {
					"address_city": customer.city,
					"address_postal_code": customer.zip,
					"address_state": customer.streetAddress ,
					"address_street":  customer.streetAddress|| "366 EHRHARDT RD",
					"email":  customer.email,
					"phone_number_primary":customer.phone,
					"phone_type": "Cell",
					"first_name": customer.firstName,
					"full_name": `${customer.firstName} ${customer.lastName}`,
					"last_name": customer.lastName
				},
				"self_reported": {
					"annual_income": "8976890",
					"household_annual_income": "9876543",
					"employment_status":customer.employmentStatus,
					"employer_phone_number": null,
					"loan_purpose":customer.loanPurpose,
					"tenure_at_employer": 10,
					"marital_status": (customer.state.toLowerCase() === 'wi') ? "Unmarried" : null,
					"spouse_address_city": customer.spouse_address_city || null,
					"spouse_address_postal_code": customer.spouse_address_postal_code || null,
					"spouse_address_state": customer.spouse_address_state || null,
					"spouse_address_street": customer.spouse_address_street|| "366 EHRHARDT RD",
					"citizenship": customer.citizenship,
					"home_ownership": customer.homeOwnership,
					"mortgage_or_rental_payment": 0,
					"military_status": customer.state === "NC"? "Not Active Military": null
				},
				"applicant_type": "primary"
			},
			"coborrower_token": null,
			"cosigner_token": null,
			"customer": {
				"identification": {
					"citizenship": customer.citizenship,
					"date_of_birth":  customer.dob,
					"age": 39,
					"social_security_number_backup": customer.ssn,
					"social_security_number": customer.ssn,
					"first_name": customer.firstName,
					"full_name": `${customer.firstName} ${customer.lastName}`,
					"last_name": customer.lastName
				},
				"latest_contact": {
					"address_city": customer.city,
					"address_postal_code": customer.zip ,
					"address_state": customer.state ,
					"address_street": customer.streetAddress|| "366 EHRHARDT RD",
					"email": customer.email,
					"phone_number_primary": customer.phone,
					"phone_type": "Cell"
				}
			},
			"submission_id": null,
			"submission_type": "CIS",
			"submission_paramter": null,
			"ip_address": "65.158.22.67",
		},
		"gclid": null,
		"requested_product": "unsecured-individual-loan",
		"geoip": "::ffff:127.0.0.1",
		"sourceTracking": [{
			"referer": "https://cis-qa.marinerfinance.io/application/form",
			"date": 1599165637950,
			"utm_source": null,
			"utm_medium": null,
			"utm_campaign": null
		}],
		"update_sor_applicant_consents": {
			"consents": {
				"credit_contact_authorization": {
					"consent": true,
					"version": "12"
				},
				"electronic_communications": {
					"consent": true,
					"version": "14"
				},
				"privacy_policy": {
					"consent": true,
					"version": "9"
				},
				"terms_of_use": {
					"consent": true,
					"version": "7"
				},
				"delaware_itemized_schedule_of_charges": {
					"consent": (customer.state.toLowerCase() === 'de') ? true : false,
					"version": "1.0"
				},
				"california_credit_education_program": {
					"consent": (customer.state.toLowerCase() === 'ca') ? true : false,
					"version": "1.0"
				}
			},
			"esigns": {
				"credit_contact_authorization": {
					"date": "2020-09-03T20:40:37.950Z",
					"useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
					"ipaddress": "127.0.0.1"
				},
				"electronic_communications": {
					"date": "2020-09-03T20:40:37.950Z",
					"useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
					"ipaddress": "127.0.0.1"
				},
				"privacy_policy": {
					"date": "2020-09-03T20:40:37.950Z",
					"useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
					"ipaddress": "127.0.0.1"
				},
				"terms_of_use": {
					"date": "2020-09-03T20:40:37.950Z",
					"useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
					"ipaddress": "127.0.0.1"
				},
				"delaware_itemized_schedule_of_charges": (customer.state.toLowerCase() === 'de') ? true : null,
				"california_credit_education_program": (customer.state.toLowerCase() === 'ca') ? true : null
			}
		},
		"headersHost": "cis-qa.marinerfinance.io"
	};
	try {
		if (!loggedIn && !token) {
			result = await fetch("https://psa-qa.marinerfinance.io/api/v2/psa_digifi", {
				method: "POST",
				body: body,
				mode: "no-cors",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				
			});
			// result = await result.json();
			console.log("Request", body);
			console.log("API Result: ", result);

			if (result && result.data && result.data.applicantStatus) {
				if (
					result.data.applicantStatus === "referred" &&
					result.data.branch_referral
				);
				if (
					result.data.applicantStatus === "offers_available" &&
					result.data.offer_id
				) {
					response.offer_id = result.data.offer_id;
					response.application_id = result.data.applicationID;
					response.skip_offer = false;
				}
			}
		}
	} catch (error) {
		response.errors = error;
		console.log(error);
	}

	response.appSubmissionResult = result;
	return response;
}
