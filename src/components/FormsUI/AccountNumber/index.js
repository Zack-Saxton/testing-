/*#################################################################################################################

File Name           :    AccountNumber/index.js
Component Name      :    Account Number
Functionality       :    To use this component to validate and get the account number in the correct format from the user.

#################################################################################################################*/

import React, { useState } from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import TextBox from "../Textfield";

const AccountNumberWrapper = ({ name, ...otherProps }) => {
  //Set Formik field
  const [accNum, setAccNum] = useState("");
  const [field, mata, helpers] = useField(name);

  //Account Number field onChange handle
  const onHandleAccountChange = (event) => {

    const reg = /^[0-9\b]+$/;
    let val = (event.target.value === "" || reg.test(event.target.value)) ? event.target.value : accNum;
    setAccNum(val);
    helpers.setValue(val);
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
  var isValid = /(^\d{6,17}$)/.test(field.value);

  // check validity

  configTextfield.error = (!isValid && field.value && mata.touched) ? true :  configTextfield.error ?? false;
  configTextfield.helperText = (!isValid && field.value && mata.touched) ? "Account number should be between 6 to 17 digits" : configTextfield.helperText ?? '';
  
  configTextfield.error = (mata && mata.touched && mata.error) ? true :  configTextfield.error ?? false;
  configTextfield.helperText = (mata && mata.touched && mata.error) ? mata.error : configTextfield.helperText ?? '';

  //return the view block
  return (
    <TextBox
      {...configTextfield}
      materialProps={{ maxLength: "17", minLength: "6" }}
      value={accNum}
      onChange={onHandleAccountChange}
      required={true}
    />
  );
};

//set name prop as mandatory
AccountNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AccountNumberWrapper;
