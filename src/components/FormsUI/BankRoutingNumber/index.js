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
    let val = (event.target.value === "" || reg.test(event.target.value)) ? event.target.value : BRNum;
    setBRNum(val);
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
  var isValid = /(^\d{9}$)/.test(field.value);

  // check validity

  // Validation

  config.error = (!isValid && field.value && mata.touched) ? true :  config.error ?? false;
  config.helperText = (!isValid && field.value && mata.touched) ? "Should be 9 digit" : config.helperText ?? '';
  config.error = (mata && mata.touched && mata.error) ? true :  config.error ?? false;
  config.helperText = (mata && mata.touched && mata.error) ? mata.error : config.helperText ?? '';


  //return the view block
  return (
    <TextBox
      {...config}
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
