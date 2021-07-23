import React, { createContext, useState } from "react";
import { useFormik } from "formik";
import { useHistory, Link } from "react-router-dom";

export const CheckMyOffers = createContext();

const CheckMyOffersContext = (props) => {
	const [data, setData] = useState({
		loanAmount: "",
		term: 36,
		offerCode: "",
		citizenship: "",
		zip: "",
		loanPurpose: "",
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		dob: "",
		employmentStatus: "",
		yearsAtEmployers: "",
		householdAnnualIncome: "",
		annualIncome: "",
		maritalStatus: "",
		spouse_address_street: "",
		spouse_address_city: "",
		spouse_address_postal_code: "",
		spouse_address_state: "",
		streetAddress: "",
		city: "",
		state: "",
		ssn: "",
		homeOwnership: "",
		rentMortageAmount: "",
		militaryActiveDuty: "",
		consent_credit_contact_auth: "",
		consent_electronic_communication: "",
		consent_privacy_policy: "",
		consent_terms_of_use: "",
		militaryActiveDutyRank: ""
	});
	const formikField = useFormik({
		initialValues: {
			zip: "",
		},
		// validationSchema: validationSchema,
		// onSubmit: (values) => {n
		// 	history.push("/personal-info");
		// },
	});
	return (
		<CheckMyOffers.Provider value={{ data: data, setData: setData }}>
			{props.children}
		</CheckMyOffers.Provider>
	);
};

export default CheckMyOffersContext;
