/*#################################################################################################################

File Name           :    Zipcode/index.js
Component Name      :    Zipcode
Functionality       :    To use this component to validate and get the zipcode in the correct format from the user.

#################################################################################################################*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import TextBox from "../Textfield";


const ZipCodeWrapper = ({ name, error, helperText, value, onChange, ...otherProps }) => {
  //Set Formik field
  const [zipCode, setZipCode] = useState(value ? value : "");
  const [isError, setIsError] = useState(false);
  const [helpertext, setHelpertext] = useState("");
  

  //Account Number field onChange handle
  const onHandleZipcodeChange = (event) => {
    const reg = /^[0-9\b]+$/;
    let acc = event.target.value;

    if (acc === "" || reg.test(acc)) {
      setZipCode(event.target.value);
    }
    var isValid = /(^\d{5}$)/.test(event.target.value);
    (!isValid && event.target.value) ? setIsError(true) : setIsError(false) ;
    (!isValid && event.target.value) ? setHelpertext("Zipcode should 5 digits") : setHelpertext("") ;
   if(onChange){ onChange(event);}
  };

  
  //Configuring the field with properties
  const configTextfield = {
    name: name,
    type: "text",
    fullWidth: true,
    setError: error ? error : isError,
    setHelperText: helperText ? helperText : helpertext ,
    ...otherProps,
  };

  //return the view block
  return (
    <TextBox
      {...configTextfield}
      materialProps={{ maxLength: "5", "data-testid": "zipcode"}}
      value={zipCode}
      onChange={onHandleZipcodeChange}
    />
  );
};

//set name prop as mandatory
ZipCodeWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ZipCodeWrapper;
