/*#################################################################################################################

File Name           :    Zipcode/index.js
Component Name      :    Zipcode
Functionality       :    To use this component to validate and get the zipcode in the correct format from the user.

#################################################################################################################*/

import PropTypes from "prop-types";
import React, { useState } from "react";
import TextBox from "../Textfield";
import globalMessages from "../../../assets/data/globalMessages.json";


const ZipCodeWrapper = ({ name, error, helperText, value, onChange, refId, ...otherProps }) => {
  //Set Formik field
  console.log("value inside zipcod comp on top:", value, "condition", (value ? value : ""));
  const [ zipCode, setZipCode ] = useState(value ? value : "");
  const [ isError, setIsError ] = useState(false);
  const [ helperText2, setHelperText2 ] = useState("");
  console.log();

  //Account Number field onChange handle
  const onHandleZipcodeChange = (event) => {
    // const reg = /^[0-9\b]+$/;
    console.log("calling on change");
    let zipcode = event.target.value.trim();

    // if (!zipcode || reg.test(zipcode)) {
    //   console.log("inside");
      setZipCode(zipcode);
    // }
    // const isValid = /(^\d{5}$)/.test(zipcode);
    // const isNonZeroValue = zipcode=='00000';
    // const validationMessage = isNonZeroValue ? globalMessages.ZipCodeValid : globalMessages.ZipCodeMax;
    // ((!isValid || isNonZeroValue) && zipcode) ? setIsError(true) : setIsError(false);
    // ((!isValid || isNonZeroValue) && zipcode) ? setHelperText2(validationMessage) : setHelperText2("");
    // if (onChange) { onChange(event); }
  };

  // console.log("value inside zipcod comp:", value);

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
      {...configTextField}
      materialProps={{ maxLength: "5", "data-testid": "zipcode", ref: refId }}
      value={zipCode}
      onChange={onHandleZipcodeChange}
    />
  );
};

//set name prop as mandatory
ZipCodeWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  refId: PropTypes.object,

};

export default ZipCodeWrapper;
