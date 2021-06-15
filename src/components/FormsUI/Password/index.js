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
const PasswordWrapper = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name);
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
    id: "standard-adornment-password",
    ...otherProps,
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  //Validation part
  let check = passwordValidation(field.value);
  if (mata.touched && check) {
    configTextfield.error = true;
    configTextfield.helperText = check;
  }

  return (
    // <TextField {...configTextfield} />
    <FormControl fullWidth={true}>
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <Input
        id="standard-adornment-password"
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChange("password")}
        onCut={handleEdit}
        onCopy={handleEdit}
        onPaste={handleEdit}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
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
