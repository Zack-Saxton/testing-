/*#################################################################################################################

File Name           :    TextField/index.js
Component Name      :    TextField
Functionality       :    To use this component to validate and get the input from the user as text field.

#################################################################################################################*/
import { TextField } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";
import globalMessages from '../../../assets/data/globalMessages.json';

//Main text field wrapper
const TextFieldWrapper = ({
  name,
  required,
  color,
  lableSize,
  margin,
  padding,
  type,
  materialProps,
  setError,
  setHelperText,
  error,
  helperText,
  onChange,
  InputProps,
  ...otherProps
}) => {

  //Configure it with Formik

  //Styling part
  const [ errorTF, setErrorTF ] = useState(false);
  const [ helperTextTF, setHelperTextTF ] = useState("");

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
        borderColor: `${ theme.palette.primary.main } !important`,
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

  //Configuring the text field with properties
  const configTextField = {
    name: name,
    required: required,
    ...otherProps,
    fullWidth: true,
    // error: setError ? setError : errorTF,
    // helperText: setError ? setHelperText : helperTextTF,

    error: setError ? setError : errorTF,
    helperText: setError ? setHelperText : helperTextTF,
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
  const handleOnchange = (event) => {
    setErrorTF((required && !event.target.value));
    setHelperTextTF((required && !event.target.value) ? globalMessages.required : '');
    if (onChange) {
      onChange(event);
    }
  };

  return <TextField { ...configTextField } onChange={ handleOnchange } InputProps={ InputProps } inputProps={ materialProps } />;
};

//set name prop as mandatory
TextFieldWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  color: PropTypes.string,
  lableSize: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  type: PropTypes.string,
  materialProps: PropTypes.object,
  setError: PropTypes.string,
  setHelperText: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
  InputProps: PropTypes.object,
};

export default TextFieldWrapper;
