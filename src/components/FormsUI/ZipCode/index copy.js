/*#################################################################################################################

File Name           :    Zipcode/index.js
Component Name      :    Zipcode
Functionality       :    To use this component to validate and get the Zip code in the correct format from the user.

#################################################################################################################*/

import React, { useState } from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import TextBox from "../Textfield";

const ZipCodeWrapper = ({ name, ...otherProps }) => {
  const [zip, setZip] = useState("");
  const [field, mata, helpers] = useField(name);

  //Handle on change 
  const onHandleZipCode = (event) => {
    const reg = /^[0-9\b]+$/;
    let val = (event.target.value === "" || reg.test(event.target.value)) ? event.target.value : zip;
    setZip(val);
    helpers.setValue(val);
  };
  //Configuring the field with properties
  const config = {
    name: name,
    type: "text",
    fullWidth: true,
    ...field,
    ...otherProps,
  };

  //Validation part
  var isValid = /(^\d{5}$)/.test(field.value);

  // check validity

  config.error = (mata && mata.touched && mata.error) ? true :  config.error ?? false;
  config.helperText = (mata && mata.touched && mata.error) ? mata.error : config.helperText ?? '';

  config.error = (!isValid && field.value && mata.touched) ? true :  config.error ?? false;
  config.helperText = (!isValid && field.value && mata.touched) ? "Should be 5 digit" : config.helperText ?? '';
  


  //return the view block
  return (
    <TextBox
      {...config}
      materialProps={{ maxLength: "5" }}
      value={zip}
      onChange={onHandleZipCode}
      required={true}
    />
  );
};

//set name prop as mandatory
ZipCodeWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ZipCodeWrapper;
