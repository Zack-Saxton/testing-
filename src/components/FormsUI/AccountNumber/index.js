/*#################################################################################################################

File Name           :    AccountNumber/index.js
Component Name      :    Account Number
Functionality       :    To use this component to validate and get the account number in the correct format from the user.

#################################################################################################################*/

import PropTypes from "prop-types";
import React, { useState } from "react";
import TextBox from "../Textfield";

const AccountNumberWrapper = ({ name, ...otherProps }) => {
  //Set Formik field
  const [ accountNum, setAccountNum ] = useState("");
  const [ isError, setIsError ] = useState(false);
  const [ helperText, setHelperText ] = useState("");

  //Account Number field onChange handle
  const onHandleAccountChange = (event) => {
    const reg = /^[0-9\b]+$/;
    let account = event.target.value.trim();

    if (!account || reg.test(account)) {
      setAccountNum(event.target.value);
    }
    const isValid = /(^\d{6,17}$)/.test(account);
    (!isValid && account) ? setIsError(true) : setIsError(false);
    (!isValid && account) ? setHelperText("Account number should be between 6 to 17 digits") : setHelperText("");
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
      { ...configTextField }
      materialProps={ { maxLength: "17", minLength: "6", "data-testid": "accountNum" } }
      value={ accountNum }
      onChange={ onHandleAccountChange }
      required={ true }
    />
  );
};

//set name prop as mandatory
AccountNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AccountNumberWrapper;