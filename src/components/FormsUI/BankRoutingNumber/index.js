/*#################################################################################################################

File Name           :    BankRoutingNumber/index.js
Component Name      :    Bank Routing Number
Functionality       :    To use this component to validate and get the Bank routing number in the correct format from the user.

#################################################################################################################*/

import PropTypes from "prop-types";
import React, { useState } from "react";
import TextBox from "../Textfield";

const BankRoutingNumberWrapper = ({ name, ...otherProps }) => {
  //Set Formik field
  const [ BRNum, setBRNum ] = useState("");
  const [ isError, setIsError ] = useState(false);
  const [ helperText, setHelperText ] = useState("");

  //Account Number field onChange handle
  const onHandleBRNChange = (event) => {
    const reg = /^[0-9\b]+$/;
    let acc = event.target.value;

    if (acc === "" || reg.test(acc)) {
      setBRNum(event.target.value);
    }
    const isValid = /(^\d{9}$)/.test(event.target.value);
    (!isValid && event.target.value) ? setIsError(true) : setIsError(false);
    (!isValid && event.target.value) ? setHelperText("Bank Routing number should be 9 digits") : setHelperText("");

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
      materialProps={ { maxLength: "9", "data-test-id": "BRN" } }
      value={ BRNum }
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
