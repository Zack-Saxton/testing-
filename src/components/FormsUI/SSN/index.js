/*#################################################################################################################

File Name           :    password/index.js
Component Name      :    password
Functionality       :    To use this component to validate and get the password with hide and show option.

#################################################################################################################*/
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";

//Initializing component
const PasswordWrapper = ({ name, id, onChange, value, label, ...otherProps }) => {
  const [ values, setValues ] = React.useState({
    password: "",
    showPassword: false,
  });

  //to prevent from cut, copy and paste
  const handleEdit = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [ prop ]: event.target.value });
    if (onChange) {
      onChange(event);
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl fullWidth={ true }>
      <InputLabel htmlFor={ id }>{ label }</InputLabel>
      <Input
        id={ id }
        type={ values.showPassword ? "text" : "password" }
        value={ values?.password }
        name={ name }
        autoComplete="password"
        onChange={ handleChange("password") }
        onCut={ handleEdit }
        onCopy={ handleEdit }
        onPaste={ handleEdit }
        inputProps={ { "data-test-id": "pass" } }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={ handleClickShowPassword }
              onMouseDown={ handleMouseDownPassword }
              data-test-id="passButton"
            >
              { values.showPassword ? <Visibility /> : <VisibilityOff /> }
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordWrapper;
