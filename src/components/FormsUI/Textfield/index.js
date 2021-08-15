/*#################################################################################################################

File Name           :    TextField/index.js
Component Name      :    TextFiedl
Functionality       :    To use this component to validate and get the input from the user as text field.

#################################################################################################################*/
import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Content from '../../../assets/Content/content';
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import PropTypes from "prop-types";


//Main textfield wrapper
const TextfieldWrapper = ({
  name,
  required,
  color,
  lableSize,
  margin,
  padding,
  type,
  style,
  materialProps,
  form,
  emailVal,
  setError,
  setHelperText,
  onChange,
  error, 
  helperText,
  ...otherProps
}) => {

  //Configure it with Formik

  //Styling part
  const [errorTF, setErrorTF] = useState(false);
  const [helpertextTF, setHelpertextTF] = useState("");

  const useStyles = makeStyles((theme) => ({
    cssLabel: {
      backgroundColor: color,
      fontSize: lableSize,
      padding: padding,
    },

    dynamic: {
      margin: margin,
      padding: padding,
      webkitTextSecurity: "square",
    },
    cssOutlinedInput: {
      "&$cssFocused $notchedOutline": {
        borderColor: `${theme.palette.primary.main} !important`,
        webkitTextSecurity: "square",
        color: red,
        backgroundColor: "yellow",
      },
    },
    cssFocused: {},
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "blue !important",
    },
  }));

  const classes = useStyles();
  setError = error ?? setError;
  setHelperText = helperText ?? setHelperText;

  //Configuring the textfield with properties
  const configTextfield = {
    name: name,
    required: required,
    ...otherProps,
    fullWidth: true,
    // error: setError ? setError : errorTF,
    // helperText: setError ? setHelperText : helpertextTF,

    error: setError ? setError : errorTF,
    helperText: setError ? setHelperText : helpertextTF,
    classes: {
      root: classes.dynamic,
    },
    InputLabelProps: {
      classes: {
        root: classes.cssLabel,
        focused: classes.cssFocused,
      },
    },
  
  };
  //Validation part
  const handleOnchange = (e) =>{
    setErrorTF((required && !e.target.value) ? true :  false);
    setHelpertextTF((required && !e.target.value) ? Content.required : '');
    if(onChange)
    {
      onChange(e);
    }
    

}



  return <TextField {...configTextfield} onChange={handleOnchange} inputProps={materialProps} />;
};
 
//set name prop as mandatory
TextfieldWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TextfieldWrapper;