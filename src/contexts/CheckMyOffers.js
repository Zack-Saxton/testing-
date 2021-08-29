import React, { createContext, useState } from "react";

export const CheckMyOffers = createContext();

const CheckMyOffersContext = (props) => {
	const [data, setData] = useState({
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

	const resetData = () => {
		if(data.formStatus !== ''){

		
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
	}
	}

	return (
		<CheckMyOffers.Provider value={{ data: data, setData: setData, resetData: resetData }}>
			{props.children}
		</CheckMyOffers.Provider>
	);
};

export default CheckMyOffersContext;
