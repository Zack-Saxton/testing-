/*#################################################################################################################

File Name           :    Email/index.js
Component Name      :    Email
Functionality       :    To use this component to get only valid Email address.

#################################################################################################################*/
import React, {useState} from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

//Initializing EmailWrapper component
const EmailWrapper = ({ name, suffix, lable,materialProps, id, ...otherProps }) => {

  //Basic Configuration for Email field
  const configTextfield = {
    name: name,
    type: "email",
    lable: lable,
    fullWidth: true,
    InputProps: suffix
      ? {
          endAdornment: (
            <InputAdornment position="end">{suffix}</InputAdornment>
          ),
        }
      : {},
    ...otherProps,
  };

  const [setValues] = useState("");
  const handleChange = (event) => {
    setValues(event.target.value + suffix);
    // helpers.setValue(event.target.value + suffix);
  };

  return (
    <TextField
      id={id}
      lable="email"
      type="email"
      fullWidth={true}
      // value= {value}
      inputProps={materialProps}
      onChange={handleChange}
      {...configTextfield}
    />
  );
};

export default EmailWrapper;
