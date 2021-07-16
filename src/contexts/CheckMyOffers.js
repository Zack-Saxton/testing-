import React, { createContext, useState } from 'react';
import { useFormik } from 'formik';
import { useHistory, Link } from "react-router-dom";

export const CheckMyOffers = createContext();

const CheckMyOffersContext = (props) => {
  const [data, setData] = useState(
    {select: '',
    offerCode: '',
    citizenship: '',
    zip: '',
    purpose: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    employmentStatus: '',
    yearsAtEmployers: '',
    householdIncome: '',
    personalIncome: '',
    streetAddress: '',
    city: '',
    state: '',
    livingPlace: '',
    rentMortageAmount: '',
    activeDuty: '',

  },
  );
  const formikField = useFormik({
		initialValues: {
			zip: "",
		},
		// validationSchema: validationSchema,
		// onSubmit: (values) => {
		// 	history.push("/personal-info");
		// },
	});
  return (
    <CheckMyOffers.Provider value={{data: data, setData: setData}}>
      {props.children}
    </CheckMyOffers.Provider>
  )
}

export default CheckMyOffersContext;