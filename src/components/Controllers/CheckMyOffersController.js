import axios from "axios";
import APICall from "../lib/AxiosLib";

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
			"password": customer.password,
			"confirm_password": customer.confirmPassword,
			"terms_agreement": "on",
			"create_account_get_rate_button": "Get Your Rate",
			"Consent_Credit_Contact_Authorization_Version__c": "12",
			"Consent_Electronic_Communication_Policy_Version__c": "14",
			"Consent_Privacy_Policy_Version__c": "9",
			"Consent_Terms_Of_Use_Version__c": "7",
		},
		"isAuthenticated": true,
		"formData": {
			"application": {
				"requested_product_details": {
					"requested_loan_amount_raw": customer.loanAmount,
					"requested_loan_amount": customer.loanAmount,
					"requested_loan_term": 36,
					"offer_code": null,
				},
				"contact": {
					"address_city": customer.address_city,
					"address_postal_code": customer.zip,
					"address_state": customer.state,
					"address_street": customer.streetAddress,
					"email": customer.email,
					"phone_number_primary": customer.phone,
					"phone_type": "Cell",
					"first_name": customer.firstName,
					"full_name": customer.firstName + ' ' + customer.lastName,
					"last_name": customer.lastName,
				},
				"processing": {
					"tokens": {
						"utm_source": null,
						"utm_campaign": null,
						"utm_medium": null,
					},
				},
				"processing.tokens": {
					"utm_source": null,
					"utm_campaign": null,
					"utm_medium": null,
				},
			},
			"applicant": {
				"contact": {
					"address_city": customer.city,
					"address_postal_code": customer.zip,
					"address_state": customer.state,
					"address_street": customer.streetAddress,
					"email": customer.email,
					"phone_number_primary": customer.phone,
					"phone_type": "Cell",
					"first_name": customer.firstName,
					"full_name": customer.firstName + customer.lastName,
					"last_name": customer.lastName,
				},
				"self_reported": {
					"annual_income": customer.annualIncome,
					"household_annual_income": customer.householdAnnualIncome,
					"employment_status": customer.employmentStatus,
					"employer_phone_number": customer.EmployerPhone,
					"loan_purpose": customer.loanPurpose,
					"tenure_at_employer": customer.yearsAtEmployers,
					"marital_status": customer.maritalStatus,
					"spouse_address_city": customer.spouse_address_city,
					"spouse_address_postal_code": customer.spouse_address_postal_code,
					"spouse_address_state": customer.spouse_address_state,
					"spouse_address_street": customer.spouse_address_street,
					"citizenship": customer.citizenship,
					"home_ownership": customer.homeOwnership,
					"mortgage_or_rental_payment": customer.rentMortageAmount,
					"military_status": customer.militaryActiveDuty,
				},
				"applicant_type": "primary",
			},
			"coborrower_token": null,
			"cosigner_token": null,
			"customer": {
				"identification": {
					"citizenship": customer.citizenship,
					"date_of_birth": customer.dob,
					"age": 39,
					"social_security_number_backup": customer.ssn,
					"social_security_number": customer.ssn,
					"first_name": customer.firstName,
					"full_name": customer.firstName + customer.lastName,
					"last_name": customer.lastName,
				},
				"latest_contact": {
					"address_city": customer.city,
					"address_postal_code": customer.zip,
					"address_state": customer.state,
					"address_street": customer.streetAddress,
					"email": customer.email,
					"phone_number_primary": customer.phone,
					"phone_type": "Cell",
				},
			},
			"submission_id": null,
			"submission_type": "CIS",
			"submission_paramter": null,
			"ip_address": "65.158.22.67",
		},
		"gclid": null,
		"requested_product": "unsecured-individual-loan",
		"geoip": "::ffff:127.0.0.1",
		"sourceTracking": [
			{
				"referer": "https://cis-development.marinerfinance.io/application/form",
				"date": 1599165637950,
				"utm_source": null,
				"utm_medium": null,
				"utm_campaign": null,
			},
		],
		"update_sor_applicant_consents": {
			"consents": {
				"credit_contact_authorization": {
					"consent": true,
					"version": "12",
				},
				"electronic_communications": {
					"consent": true,
					"version": "14",
				},
				"privacy_policy": {
					"consent": true,
					"version": "9",
				},
				"terms_of_use": {
					"consent": true,
					"version": "7",
				},
				"delaware_itemized_schedule_of_charges": {
					"consent": true,
					"version": "1.0",
				},
				"california_credit_education_program": {
					"consent": false,
					"version": "1.0",
				},
			},
			"esigns": {
				"credit_contact_authorization": {
					"date": "2020-09-03T20:40:37.950Z",
					"useragent":
						"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
					"ipaddress": "127.0.0.1",
				},
				"electronic_communications": {
					"date": "2020-09-03T20:40:37.950Z",
					"useragent":
						"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
					"ipaddress": "127.0.0.1",
				},
				"privacy_policy": {
					"date": "2020-09-03T20:40:37.950Z",
					"useragent":
						"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
					"ipaddress": "127.0.0.1",
				},
				"terms_of_use": {
					"date": "2020-09-03T20:40:37.950Z",
					"useragent":
						"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
					"ipaddress": "127.0.0.1",
				},
				"delaware_itemized_schedule_of_charges": true,
				"california_credit_education_program": null,
			},
		},
		"headersHost": "cis-development.marinerfinance.io",
	};

	try {
		if (!loggedIn && !token) {
			result = await axios({
				method: "POST",
				url: "/api/v2/psa_digifi",
				data: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
				transformRequest: (data, headers) => {
					delete headers.common[ "Content-Type" ];
					return data;
				},
			})
			response.appSubmissionResult = result?.data;
		}
	} catch (error) {
		response.appSubmissionResult = error.response;
	}
	return response;
}

export async function checkMyOfferSubmitTest(customer) {
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
	let bodyTest = {
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
					"address_city": "GERMANTOWN",
					"address_postal_code": "38138",
					"address_state": "TN",
					"address_street": "4500 BEARCLAW ST",
					"email": "qacustomertest1@marinerfinance.com",
					"phone_number_primary": "4434432343",
					"phone_type": "Cell",
					"first_name": "DWAYNE",
					"full_name": "DWAYNE GGDXHR",
					"last_name": "GGDXHR"
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
					"address_city": "GERMANTOWN",
					"address_postal_code": "38138",
					"address_state": "TN",
					"address_street": "4500 BEARCLAW ST",
					"email": "qacustomertest1@marinerfinance.com",
					"phone_number_primary": "4434432343",
					"phone_type": "Cell",
					"first_name": "DWAYNE",
					"full_name": "DWAYNE GGDXHR",
					"last_name": "GGDXHR"
				},
				"self_reported": {
					"annual_income": "8976890",
					"household_annual_income": "9876543",
					"employment_status": "Employed - Hourly",
					"employer_phone_number": null,
					"loan_purpose": "Home Improvement",
					"tenure_at_employer": 10,
					"marital_status": null,
					"spouse_address_city": null,
					"spouse_address_postal_code": null,
					"spouse_address_state": null,
					"spouse_address_street": "4500 BEARCLAW ST",
					"citizenship": "USA Citizen",
					"home_ownership": "Home Owner",
					"mortgage_or_rental_payment": 0,
					"military_status": null
				},
				"applicant_type": "primary"
			},
			"coborrower_token": null,
			"cosigner_token": null,
			"customer": {
				"identification": {
					"citizenship": "USA Citizen",
					"date_of_birth": "1984-02-13T05:00:00.000Z",
					"age": 39,
					"social_security_number_backup": "666090570",
					"social_security_number": "666090570",
					"first_name": "DWAYNE",
					"full_name": "DWAYNE GGDXHR",
					"last_name": "GGDXHR"
				},
				"latest_contact": {
					"address_city": "GERMANTOWN",
					"address_postal_code": "38138",
					"address_state": "TN",
					"address_street": "4500 BEARCLAW ST",
					"email": "qacustomertest1@marinerfinance.com",
					"phone_number_primary": "4434432343",
					"phone_type": "Cell"
				}
			},
			"submission_id": null,
			"submission_type": "CIS",
			"submission_paramter": null,
			"ip_address": "65.158.22.67"
		},
		"gclid": null,
		"requested_product": "unsecured-individual-loan",
		"geoip": "::ffff:127.0.0.1",
		"sourceTracking": [
			{
				"referer": "https://cis-development.marinerfinance.io/application/form",
				"date": 1599165637950,
				"utm_source": null,
				"utm_medium": null,
				"utm_campaign": null
			}
		],
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
					"consent": true,
					"version": "1.0"
				},
				"california_credit_education_program": {
					"consent": false,
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
				"delaware_itemized_schedule_of_charges": true,
				"california_credit_education_program": null
			}
		},
		"headersHost": "cis-development.marinerfinance.io"
	};

	try {
		if (!loggedIn && !token) {
			result = await axios({
				method: "POST",
				url: "/api/v2/psa_digifi",
				data: JSON.stringify(bodyTest),
				headers: {
					"Content-Type": "application/json",
				},
				transformRequest: (data, headers) => {
					delete headers.common["Content-Type"];
					return data;
				},
			})
			response.appSubmissionResult = result;
		}
	} catch (error) {
		response.appSubmissionResult = error.response;
	}
	return response;
}

export async function getCustomerByEmail(email) {
	try {
		//API
		let url = "get_customer_by_email";
		let param = "";
		let data = {
			"email": email
		};
		let method = "POST";
		let addAccessToken = false;

		//API call
		return await APICall(url, param, data, method, addAccessToken);
	} catch (error) {
		Error("Error executing getCustomerByEmail API");
	}
}

export async function creatProspect(body) {
	try {
		//API
		let url = "create_prospect";
		let param = "";
		let dobDate = new Date(body.dob);
		let data = {
			"first_name": body.firstName,
			"last_name": body.lastName,
			"email": body.email,
			"ssn": body.ssn,
			"address_postal_code": body.zip,
			"password": null,
			"phone": body.phone,
			"phone_type": null,
			"citizenship": body.citizenship,
			"income": null,
			"household_annual_income": null,
			"employment_status": null,
			"tenure_at_employer": null,
			"rent_or_own_home": null,
			"rent_or_mortgage_payment": null,
			"loan_purpose": null,
			"marital_status": null,
			"spouse_address_street": null,
			"spouse_address_city": null,
			"spouse_address_state": null,
			"utm_source": null,
			"is_partner_signup": null,
			"gclid": null,
			"loan_requested": null,
			"birth_year": dobDate.getFullYear().toString(),
			"birth_month": ("0" + (dobDate.getMonth() + 1)).slice(-2),
			"birth_day": ("0" + (dobDate.getDate() + 1)).slice(-2),
			"address_street": body.streetAddress,
			"address_city": body.city,
			"address_state": body.state
		};
		let method = "POST";
		let addAccessToken = true;
		//API call
		return await APICall(url, param, data, method, addAccessToken);
	} catch (error) {
		Error("Error executing creatProspect API");
	}
}
