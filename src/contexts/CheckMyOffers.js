import React, { createContext, useState } from 'react';
import { useFormik } from 'formik';
import { useHistory, Link } from "react-router-dom";

export const CheckMyOffers = createContext();

const CheckMyOffersContext = (props) => {
  const [data, setData] = useState(
    {select: '',
    citizenship: '',
    zip: '',
    purpose: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    employmentStatus: '',
    householdIncome: '',
    personalIncome: '',
    streetAddress: '',
    city: '',
    state: '',
    livingPlace: '',
    activeDuty: ''
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
    <CheckMyOffers.Provider value={{data: data}}>
      {props.children}
    </CheckMyOffers.Provider>
  )
}

export default CheckMyOffersContext;