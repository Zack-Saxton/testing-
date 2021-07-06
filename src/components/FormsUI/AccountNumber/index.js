/*#################################################################################################################

File Name           :    AccountNumber/index.js
Component Name      :    Account Number
Functionality       :    To use this component to validate and get the account number in the correct format from the user.

#################################################################################################################*/

import React, { useState } from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import TextBox from "../Textfield";
import { TextField } from '@material-ui/core';
import { set } from "date-fns";

const AccountNumberWrapper = ({ name, ...otherProps }) => {
  //Set Formik field
  const [accNum, setAccNum] = useState("");
  const [isError, setIsError] = useState(false);
  const [helpertext, setHelpertext] = useState("");

  //Account Number field onChange handle
  const onHandleAccountChange = (event) => {
    const reg = /^[0-9\b]+$/;
    let acc = event.target.value;

    if (acc === "" || reg.test(acc)) {
      setAccNum(event.target.value);
    }
    var isValid = /(^\d{6,17}$)/.test(event.target.value);
    (!isValid && event.target.value) ? setIsError(true) : setIsError(false) ;
    (!isValid && event.target.value) ? setHelpertext("Account number should be between 6 to 17 digits") : setHelpertext("") ;

  };

  
  //Configuring the field with properties
  const configTextfield = {
    name: name,
    type: "text",
    fullWidth: true,
    setError: isError,
    setHelperText: helpertext,
    ...otherProps,
  };

  //return the view block
  return (
    <TextBox
      {...configTextfield}
      materialProps={{ maxLength: "17", minLength: "6", "data-testid": "accountNum"}}
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
