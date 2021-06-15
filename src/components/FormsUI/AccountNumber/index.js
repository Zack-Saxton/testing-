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
    let acc = event.target.value;

    if (acc === "" || reg.test(acc)) {
      setAccNum(event.target.value);
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
  var isValid = /(^\d{6,17}$)/.test(field.value);

  // check validity
  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  //Check account number
  if (!isValid && field.value && mata.touched) {
    configTextfield.error = true;
    configTextfield.helperText =
      "Account number should be between 6 to 17 digits";
  }

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
