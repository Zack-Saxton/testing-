/*#################################################################################################################

File Name           :    PhoneNumber/index.js
Component Name      :    PhoneNumber
Functionality       :    To use this component to validate and get the Phone Number in the correct format from the user.

#################################################################################################################*/
import React from "react";
import {useField} from "formik";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";

const MobileNumberWrapper = ({ name, ...otherProps }) => {
  //Set Formik field
  const [field, mata] = useField(name);
  const [mobile, setMobile] = React.useState("");

  const handleChange = (event) => {
    setMobile(event.target.value);
  };


  // Check validity

  return (
    <FormControl fullWidth={true}>
      <MuiThemeProvider>
        <InputMask
          fullWidth={true}
          mask="(+1)- 9"
          value={mobile}
          name={name}
          onChange={handleChange}
          disabled={false}
          maskChar=" "
          {...otherProps}
          {...field}
        >
          {() => <TextField label="Enter " />}
        </InputMask>
      </MuiThemeProvider>
    </FormControl>
  );
};

MobileNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MobileNumberWrapper;
