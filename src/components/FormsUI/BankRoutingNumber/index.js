/*#################################################################################################################

File Name           :    BankRoutingNumber/index.js
Component Name      :    Bank Routing Number
Functionality       :    To use this component to validate and get the Bank routing number in the correct format from the user.

#################################################################################################################*/

import PropTypes from "prop-types";
import React, { useState } from "react";
import TextBox from "../Textfield";
import globalMessages from "../../../assets/data/globalMessages.json";

const BankRoutingNumberWrapper = ({ name, ...otherProps }) => {
  //Set Formik field
  const [ bankRoutingNumber, setBankRoutingNumber ] = useState("");
  const [ isError, setIsError ] = useState(false);
  const [ helperText, setHelperText ] = useState("");

  //Account Number field onChange handle
  const onHandleBRNChange = (event) => {
    const reg = /^[0-9\b]+$/;
    let account = event.target.value.trim();

    if (!account || reg.test(account)) {
      setBankRoutingNumber(event.target.value);
    }
    const isValid = /(^\d{9}$)/.test(account);
    (!isValid && account) ? setIsError(true) : setIsError(false);
    (!isValid && account) ? setHelperText(globalMessages.validBankRoutingNumber) : setHelperText("");
  };

  //Configuring the field with properties
  const configTextfield = {
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
      { ...configTextfield }
      materialProps={ { maxLength: "9", "data-testid": "BRN" } }
      value={ bankRoutingNumber }
      onChange={ onHandleBRNChange }
      required={ true }
    />
  );
};

//set name prop as mandatory
BankRoutingNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default BankRoutingNumberWrapper;
