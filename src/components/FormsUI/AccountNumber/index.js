/*#################################################################################################################

File Name           :    AccountNumber/index.js
Component Name      :    Account Number
Functionality       :    To use this component to validate and get the account number in the correct format from the user.

#################################################################################################################*/

import PropTypes from "prop-types";
import React, { useState } from "react";
import globalMessages from "../../../assets/data/globalMessages.json";
import TextBox from "../Textfield";

const AccountNumberWrapper = ({ name, ...otherProps }) => {
  //Set Formik field
  const [ accountNumber, setAccountNumber ] = useState("");
  const [ isError, setIsError ] = useState(false);
  const [ helperText, setHelperText ] = useState("");

  //Account Number field onChange handle
  const onHandleAccountChange = (event) => {
    const reg = /^[0-9\b]+$/;
    let account = event.target.value.trim();

    if (!account || reg.test(account)) {
      setAccountNumber(event.target.value);
    }
    const isValid = /(^\d{6,17}$)/.test(account);
    (!isValid && account) ? setIsError(true) : setIsError(false);
    (!isValid && account) ? setHelperText(globalMessages.validAccountNumber) : setHelperText("");
  };

  //Configuring the field with properties
  const configTextField = {
    name: name,
    type: "text",
    fullWidth: true,
    setError: isError,
    setHelperText: helperText,
    ...otherProps,
  };

  //return the view block
  return (
    <TextBox
      {...configTextField}
      materialProps={{ maxLength: "17", minLength: "6", "data-testid": "accountNumber" }}
      value={accountNumber}
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