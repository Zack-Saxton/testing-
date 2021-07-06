/*#################################################################################################################

File Name           :    Password/index.js
Component Name      :    Password
Functionality       :    To use this component to validate and get the Password with hide and show option.

#################################################################################################################*/
import React from "react";
import { useField } from "formik";
import Input from "@material-ui/core/Input";
import { passwordValidation } from "../../../helpers/validations";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

//Initializing component
const PasswordWrapper = ({ name, id, ...otherProps }) => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  //to prevent from cut, copy and paste
  const handleEdit = (e) => {
    e.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Basic field configurations
  const configTextfield = {
    name: name,
    ...otherProps,
  };

  // configTextfield.error = (mata && mata.touched && mata.error) ? true :  configTextfield.error ?? false;
  // configTextfield.helperText = (mata && mata.touched && mata.error) ? mata.error : configTextfield.helperText ?? '';
  // //Validation part
  // let check = passwordValidation(field.value);

  // configTextfield.error = (mata.touched && check) ? true :  configTextfield.error ?? false;
  // configTextfield.helperText = (mata.touched && check) ? check : configTextfield.helperText ?? '';
  
  return (
    // <TextField {...configTextfield} />
    <FormControl fullWidth={true}>
      <InputLabel htmlFor={id}>Password</InputLabel>
      <Input
        id= {id}
        type={values.showPassword ? "text" : "password"}
        value={values?.password}
        autoComplete="password"
        onChange={handleChange("password")}
        onCut={handleEdit}
        onCopy={handleEdit}
        onPaste={handleEdit}
        inputProps={{"data-testid": "pass"}}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              data-testid= "passButton"
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordWrapper;
