import axios from "axios";
import getClientIp from "../Controllers/CommonController";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import globalMessages from "../../assets/data/globalMessages.json";


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

	const utm_sources = {
		"utm_source": customer.utm_source_otherPartner,
		"utm_medium": customer.utm_medium_otherPartner,
		"utm_campaign": customer.utm_campaign_otherPartner,
	}
	try {
		//creating function to load ip address from the API
		let dateNow = new Date().toISOString();
		let browserType = navigator.userAgent;
		let ipAddress = await getClientIp();
		let esignConsent = {
			"date": dateNow,
			"useragent": browserType,
			"ipaddress": ipAddress,
		};
		let customerAddress = {
			"address_city": customer.city,
			"address_postal_code": customer.zip,
			"address_state": customer.state,
			"address_street": customer.streetAddress,
			"email": customer.email,
			"phone_number_primary": customer.phone,
			"phone_type": "Cell",
		}

		//API for latest consent versions
		let url = "get_active_documents";
		let param = "";
		let data = {};
		let method = "GET";
		let addAccessToken = false;

		//API call
		let activeConsetDocument = await APICall(url, param, data, method, addAccessToken);
		let consent = {};
		let esign = {};
		let user = {};

		//Assemble 'consent', 'user' Object with dynamic data
		activeConsetDocument.data.documents.forEach(doc => {
			if (doc.displayname.toLowerCase() === 'credit_contact_authorization') {
				consent.credit_contact_authorization = {
					"consent": true,
					"version": doc.version.toString(),
				}
				user.Consent_Credit_Contact_Authorization_Version__c = doc.version.toString();
			} else if (doc.displayname.toLowerCase() === 'electronic_disclosure_consent') {
				consent.electronic_communications = {
					"consent": true,
					"version": doc.version.toString(),
				}
				user.Consent_Electronic_Communication_Policy_Version__c = doc.version.toString();
			} else if (doc.displayname.toLowerCase() === 'terms_of_use_document') {
				consent.terms_of_use = {
					"consent": true,
					"version": doc.version.toString(),
				}
				user.Consent_Terms_Of_Use_Version__c = doc.version.toString();
			} else if (doc.displayname.toLowerCase() === 'privacy_policy_document') {
				consent.privacy_policy = {
					"consent": true,
					"version": doc.version.toString(),
				}
				user.Consent_Privacy_Policy_Version__c = doc.version.toString();
			}
		});

		consent.delaware_itemized_schedule_of_charges = {
			"consent": false,
			"version": "1.0",
		};
		consent.california_credit_education_program = {
			"consent": false,
			"version": "1.0",
		};

		//dynamically update deleware 'consent' and 'esign' if applicable
		if (customer.state === 'DE') {
			consent.delaware_itemized_schedule_of_charges.consent = true;
			esign.delaware_itemized_schedule_of_charges = esignConsent;
		}

		//dynamically update california 'consent' and 'esign' if applicable
		if (customer.state === 'CA') {
			consent.california_credit_education_program.consent = true;
			esign.california_credit_education_program = esignConsent;
		}

		//assemble 'esign' Object
		esign.credit_contact_authorization = esignConsent;
		esign.electronic_communications = esignConsent;
		esign.privacy_policy = esignConsent;
		esign.terms_of_use = esignConsent;

		//assemble 'user' Object
		user.password = customer.password;
		user.confirm_password = customer.confirmPassword;
		user.terms_agreement = "on";
		user.create_account_get_rate_button = "Get Your Rate";

		//Data to be send to api
		let body = {
			"user": user,
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
						...customerAddress,
						"first_name": customer.firstName,
						"full_name": customer.firstName + ' ' + customer.lastName,
						"last_name": customer.lastName,
					},
					"processing": {
						"tokens": utm_sources
					},
				},
				"lightbox": {
					"amount": customer.loanAmount,
					"term": customer.term,
					"tracking_id": customer.trkcid,
					"utm_source": customer.utm_source,
					"utm_medium": customer.utm_medium,
					"utm_campaign": customer.utm_campaign,
				},
				"applicant": {
					"contact": {
						...customerAddress,
						"first_name": customer.firstName,
						"full_name": customer.firstName + ' ' + customer.lastName,
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
						"mortgage_or_rental_payment": customer.rentMortgageAmount,
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
						"age": Math.abs(new Date(Date.now() - customer.dob.getTime()).getUTCFullYear() - 1970),
						"social_security_number_backup": customer.ssn,
						"social_security_number": customer.ssn,
						"first_name": customer.firstName,
						"full_name": customer.firstName + ' ' + customer.lastName,
						"last_name": customer.lastName,
					},
					"latest_contact": customerAddress,
				},
				"submission_id": null,
				"submission_type": "CAC",
				"submission_paramter": null,
				"ip_address": ipAddress,
			},
			"gclid": customer.gclid_otherPartner === "null" ? null : customer.gclid_otherPartner,
			"requested_product": "unsecured-individual-loan",
			"geoip": ipAddress,
			"sourceTracking": [
				{
					"referer": customer.referer_otherPartner,
					"date": Date.now(),
					...utm_sources
				},
			],
			"update_sor_applicant_consents": {
				"consents": consent,
				"esigns": esign,
			},
			"headersHost": process.env.REACT_APP_HOST_NAME,
		};
		if (!loggedIn && !token) {
			result = await axios({
				method: "POST",
				url: "/api/v2/psa_digifi",
				data: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
				transformRequest: (data, headers) => {
					delete headers.common["Content-Type"];
					return data;
				},
			});
			response.appSubmissionResult = result?.data;
		}
	} catch (error) {
		ErrorLogger(globalMessages.Error_executing_checkMyOfferSubmit_API, error);
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
		ErrorLogger(globalMessages.Error_executing_getCustomerByEmail_API, error);
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
		ErrorLogger(globalMessages.Error_executing_creatProspect_API, error);
	}
}


export async function getCKLightBox(query) {
	try {
		//API
		let url = "get_CK_Light_box";
		let param = "";
		let data = {
			"query": {
				"trkcid": query.trkcid,
				"ib": query.ib,
				"apr": query.apr,
				"amnt": query.amt,
				"term": query.term,
				"campaign": query.campaign,
				"hp": query.hp,
				"own": query.own,
				"lp": query.lp
			}
		};
		let method = "POST";
		let addAccessToken = false;

		//API call
		return await APICall(url, param, data, method, addAccessToken);
	} catch (error) {
		ErrorLogger(globalMessages.Error_executing_getCKLightBox_API, error);
	}
}
