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
  const onHandleTelephoneChange = (event) => {
    let reg = /^[0-9\b]+$/;
    let tempVal = event.target.value;

    if (tempVal === "" || reg.test(tempVal)) {
      setZip(event.target.value);
      helpers.setValue(tempVal);
    }
  };
  //Configuring the field with properties
  const configTextfield = {
    name: name,
    type: "text",
    fullWidth: true,
    ...field,
    ...otherProps,
  };

  //Validation part
  var isValid = /^[0-5\b]+$/.test(field.value);

  // check validity
  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  if (!isValid && field.value && mata.touched) {
    configTextfield.error = true;
    configTextfield.helperText = "Should be 5 digit";
  }

  //return the view block
  return (
    <TextBox
      {...configTextfield}
      materialProps={{ maxLength: "5" }}
      value={zip}
      onChange={onHandleTelephoneChange}
      required={true}
    />
  );
};

//set name prop as mandatory
ZipCodeWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ZipCodeWrapper;
