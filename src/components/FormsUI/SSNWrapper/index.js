/*#################################################################################################################

File Name           :    Password/index.js
Component Name      :    Password
Functionality       :    To use this component to validate and get the Password with hide and show option.

#################################################################################################################*/
import React, { useState } from "react";
import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import "./ssn.css";
import InputMask from "react-input-mask";
import FormControl from "@material-ui/core/FormControl";


//Initializing component
const SSNNewWrapper = ({
  name,
  label,
  materialProps,
  id,
  error,
  required,
  value,
  onChange,
  helperText,
  setError,
  setHelperText,
  placeholder,
  ...otherProps }) => {
  const [showPassword, setShowPassword] = useState({
    password: "",
  });
  const [unmaskedval, setUnMaskedVal] = useState("");
  const handleChange = (event) => {
    setUnMaskedVal(
      event.target.value.replace(/-/g, "").replace(/ /g, "") || ""
    );




    if (onChange) {
      onChange(event);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleEdit = (e) => {
    e.preventDefault();
  };



  return (

    <Grid container  style={{width:"100%"}}>
      

      <TextField
          label={label}
          id={id}
          name={name} {...otherProps}
          type={!showPassword ? "text" : "password"} onCut={handleEdit} onCopy={handleEdit} onPaste={handleEdit} inputProps={materialProps}
          InputProps={{
            "data-test-id": "ssnFirstSection",
            unmaskedval: unmaskedval
          }}
          name={name}
          error={error}
          placeholder={placeholder}
          helperText={helperText}
          style={{width: "25%",maxLength:"3",paddingRight:"2%",justifyContent:"flex-start",marginLeft:"0px",paddingLeft:"0px"}}
          materialProps={{ "maxLength": "3" }}
        />

       <span style={{padding:"1%"}}> -- </span>

      <TextField fullWidth={true} label={label} id={id} name={name} {...otherProps} type={!showPassword ? "text" : "password"}
          onCut={handleEdit} onCopy={handleEdit} onPaste={handleEdit} inputProps={materialProps}
          InputProps={{
            "data-test-id": "ssnSecondSection"
          }}
          style={{width: "25%",maxLength:"2",paddingRight:"2%",PaddingLeft:"1%"}}
          materialProps={{ "maxLength": "2" }}
        />
        <span style={{padding:"1%"}}> -- </span>
        <TextField fullWidth={true} label={label} id={id} name={name} {...otherProps} type={!showPassword ? "text" : "password"}
          onCut={handleEdit} onCopy={handleEdit} onPaste={handleEdit} inputProps={materialProps}
          InputProps={{
            "data-test-id": "ssnThirdSection",
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  data-testid="passButton"
                  className="rem1FSize"
                  justifyContent="flex-end"
                >
                  {!showPassword ? "Hide" : "Show"}
                </IconButton>
              </InputAdornment>
            )
          }}
          style={{width: "25%",maxLength:"4",paddingRight:"2%",PaddingLeft:"1%"}}
          materialProps={{ "maxLength": "4" }}
        />
    </Grid>
  );
}

export default SSNNewWrapper;
