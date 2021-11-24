import React, { createContext, useState } from "react";
import usrAccountDetails from "../components/Controllers/AccountOverviewController";
import states from "../contexts/States.json"

export const CheckMyOffers = createContext();

const CheckMyOffersContext = (props) => {
	//context data initial State
	const [data, setData] = useState({
		loanAmount: null,
		term: 36,
		offerCode: "",
		citizenship: null,
		zip: null,
		loanPurpose: null,
		firstName: null,
		lastName: null,
		phone: null,
		email: null,
		dob: null,
		employmentStatus: null,
		yearsAtEmployers: '',
		EmployerPhone: null,
		householdAnnualIncome: null,
		annualIncome: null,
		maritalStatus: null,
		spouse_address_street: null,
		spouse_address_city: null,
		spouse_address_postal_code: null,
		spouse_address_state: null,
		spouse_address_state_full_form: null,
		streetAddress: null,
		city: null,
		state: null,
		stateFullform: null,
		ssn: null,
		homeOwnership: null,
		rentMortageAmount: '',
		militaryActiveDuty: null,
		consent_credit_contact_auth: null,
		consent_electronic_communication: null,
		consent_privacy_policy: null,
		consent_terms_of_use: null,
		militaryActiveDutyRank: null,
		password: null,
		confirmPassword: null,
		result: null,
		formStatus: '',
		completedPage: 0,
		loading: true,
		isActiveUser: null,
		disabled: false,
		last4SSN: null,
		page: {
			selectAmount: 1,
			loanPurpose: 2,
			citizenship: 3,
			homeAddress: 4,
			personalInfo: 5,
			newUser: 6,
			existingUser: 6,
			employmentStatus: 7,
			annualIncome: 8,
			livingPlace: 9,
			activeDuty: 10,
			marriedStatus: 10,
			ssn: 11
		},
		applicationStatus: ''
	});

	//setUserAccountDetails in context
	async function setUserAccountDetails() {
		data.loading = true
		let accountDetail= await usrAccountDetails();

			   let identification = (accountDetail != null) ? accountDetail?.data?.data?.customer?.identification : null;
			   let latestContact = (accountDetail != null) ? accountDetail?.data?.data?.customer?.latest_contact : null;
			   let statesFullForm = (accountDetail != null) ? accountDetail?.data?.data?.customer?.latest_contact.address_state : null;
			   let userStatus = (accountDetail != null) ? accountDetail?.data?.data?.customer?.user_account?.status : null;
			   data.citizenship = identification?.citizenship ? identification?.citizenship : null
			   data.zip = latestContact?.address_postal_code ? latestContact?.address_postal_code : null
			   data.firstName = identification?.first_name ? identification?.first_name : null
			   data.lastName = identification?.last_name ? identification?.last_name : null
			   data.phone = latestContact?.phone_number_primary ? latestContact?.phone_number_primary : null
			   data.email = latestContact?.email ? latestContact?.email : null
			   data.dob = identification?.date_of_birth ? identification?.date_of_birth : null
			   data.streetAddress = latestContact?.address_street ? latestContact?.address_street : null
			   data.city = latestContact?.address_city ? latestContact?.address_city : null
			   data.state = latestContact?.address_state? latestContact.address_state: null
			   data.stateFullform = states[statesFullForm]
			   data.last4SSN = identification?.last4SSN ? identification?.last4SSN : null;
			   data.loanPurpose = null
			   data.ssn = identification?.social_security_number ? identification?.social_security_number : null
			   data.loading = false
			   data.isActiveUser = userStatus;
			   data.disabled= true
			   setData({...data})
			   }
   

	const resetData = () => {
			const loginToken = JSON.parse(localStorage.getItem("token"));
			setData({
				loanAmount: null,
				term: 36,
				offerCode: null,
				citizenship: null,
				zip: null,
				loanPurpose: null,
				firstName: null,
				lastName: null,
				phone: null,
				email: null,
				dob: null,
				employmentStatus: null,
				yearsAtEmployers: '',
				EmployerPhone: null,
				householdAnnualIncome: null,
				annualIncome: null,
				maritalStatus: null,
				spouse_address_street: null,
				spouse_address_city: null,
				spouse_address_postal_code: null,
				spouse_address_state: null,
				spouse_address_state_full_form: null,
				streetAddress: null,
				city: null,
				state: null,
				stateFullform: null,
				ssn: null,
				homeOwnership: null,
				rentMortageAmount: '',
				militaryActiveDuty: null,
				consent_credit_contact_auth: null,
				consent_electronic_communication: null,
				consent_privacy_policy: null,
				consent_terms_of_use: null,
				militaryActiveDutyRank: null,
				password: null,
				confirmPassword: null,
				result: null,
				formStatus: '', 
				completedPage: 0,
				isActiveUser: null,
				last4SSN: null,
				disabled: false,
				loading: loginToken?.isLoggedIn ? true :false,
				page: {
					selectAmount: 1,
					loanPurpose: 2,
					citizenship: 3,
					homeAddress: 4,
					personalInfo: 5,
					newUser: 6,
					existingUser: 6,
					employmentStatus: 7,
					annualIncome: 8,
					livingPlace: 9,
					activeDuty: 10,
					marriedStatus: 10,
					ssn: 11
				},
				applicationStatus: ''
			});
			if(loginToken?.isLoggedIn){
				//fetch userdetails
				setUserAccountDetails()
			}
	}

	return (
		<CheckMyOffers.Provider value={{ data: data, setData: setData, resetData: resetData }}>
			{props.children}
		</CheckMyOffers.Provider>
	);
};

export default CheckMyOffersContext;
