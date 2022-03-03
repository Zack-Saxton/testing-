/*#################################################################################################################

File Name           :    PhoneNumber/index.js
Component Name      :    PhoneNumber
Functionality       :    To use this component to validate and get the Phone Number in the correct format from the user.

#################################################################################################################*/
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useField } from "formik";
import PropTypes from "prop-types";
import React from "react";
import InputMask from "react-input-mask";

const MobileNumberWrapper = ({ name, ...otherProps }) => {
  //Set Formik field
  const [ field ] = useField(name);
  const [ mobile, setMobile ] = React.useState("");

  const handleChange = (event) => {
    setMobile(event.target.value);
  };

  // Check validity

  return (
    <FormControl fullWidth={ true }>
       <InputMask
          fullWidth={ true }
          mask="(+1)- 9"
          value={ mobile }
          name={ name }
          onChange={ handleChange }
          disabled={ false }
          maskChar=" "
          { ...otherProps }
          { ...field }
        >
          { () => <TextField label="Enter " /> }
        </InputMask>
    </FormControl>
  );
};

MobileNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MobileNumberWrapper;
