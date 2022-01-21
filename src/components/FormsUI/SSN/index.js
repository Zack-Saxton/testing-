/*#################################################################################################################

File Name           :    password/index.js
Component Name      :    password
Functionality       :    To use this component to validate and get the password with hide and show option.

#################################################################################################################*/
import React from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

//Initializing component
const PasswordWrapper = ({ name, id, onChange, value, label, ...otherProps }) => {
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
    <FormControl fullWidth={true}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        type={values.showPassword ? "text" : "password"}
        value={values?.password}
        name={name}
        autoComplete="password"
        onChange={handleChange("password")}
        onCut={handleEdit}
        onCopy={handleEdit}
        onPaste={handleEdit}
        inputProps={{ "data-test-id": "pass" }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              data-test-id="passButton"
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
