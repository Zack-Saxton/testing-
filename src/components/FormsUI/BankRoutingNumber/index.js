/*#################################################################################################################

File Name           :    BankRoutingNumber/index.js
Component Name      :    Bank Routing Number
Functionality       :    To use this component to validate and get the Bank routing number in the correct format from the user.

#################################################################################################################*/

import React, { useState } from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import TextBox from "../Textfield";

const BankRoutingNumberWrapper = ({ name, ...otherProps }) => {
  //Set Formik field
  const [BRNum, setBRNum] = useState("");
  const [field, mata, helpers] = useField(name);

  const onHandleBRNumberChange = (event) => {
    const reg = /^[0-9\b]+$/;
    let acc = event.target.value;

    if (acc === "" || reg.test(acc)) {
      setBRNum(event.target.value);
      helpers.setValue(acc);
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
  var isValid = /^[0-9\b]+$/.test(field.value);

  // check validity
  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  //Validate - Digit count
  if (!isValid && field.value && mata.touched) {
    configTextfield.error = true;
    configTextfield.helperText = "Should be 9 digit";
  }

  //return the view block
  return (
    <TextBox
      {...configTextfield}
      materialProps={{ maxLength: "9" }}
      value={BRNum}
      onChange={onHandleBRNumberChange}
      required={true}
    />
  );
};

//set name prop as mandatory
BankRoutingNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default BankRoutingNumberWrapper;
