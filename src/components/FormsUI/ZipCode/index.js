/*#################################################################################################################

File Name           :    Zipcode/index.js
Component Name      :    Zipcode
Functionality       :    To use this component to validate and get the zipcode in the correct format from the user.

#################################################################################################################*/

import PropTypes from "prop-types";
import React, { useState } from "react";
import TextBox from "../Textfield";


const ZipCodeWrapper = ({ name, error, helperText, value, onChange, ...otherProps }) => {
  //Set Formik field
  const [ zipCode, setZipCode ] = useState(value ? value : "");
  const [ isError, setIsError ] = useState(false);
  const [ helperText2, setHelperText2 ] = useState("");


  //Account Number field onChange handle
  const onHandleZipcodeChange = (event) => {
    const reg = /^[0-9\b]+$/;
    let acc = event.target.value;

    if (acc === "" || reg.test(acc)) {
      setZipCode(event.target.value);
    }
    const isValid = /(^\d{5}$)/.test(event.target.value);
    (!isValid && event.target.value) ? setIsError(true) : setIsError(false);
    (!isValid && event.target.value) ? setHelperText2("Zip Code should be at least 5 digits") : setHelperText2("");
    if (onChange) { onChange(event); }
  };


  //Configuring the field with properties
  const configTextField = {
    name: name,
    type: "text",
    fullWidth: true,
    setError: error ? error : isError,
    setHelperText: helperText ? helperText : helperText2,
    ...otherProps,
  };

  //return the view block
  return (
    <TextBox
      { ...configTextField }
      materialProps={ { maxLength: "5", "data-test-id": "zipcode" } }
      value={ zipCode }
      onChange={ onHandleZipcodeChange }
    />
  );
};

//set name prop as mandatory
ZipCodeWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ZipCodeWrapper;
