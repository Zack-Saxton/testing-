/*#################################################################################################################

File Name           :    TextField/index.js
Component Name      :    TextFiedl
Functionality       :    To use this component to validate and get the input from the user as text field.

#################################################################################################################*/
import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";
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
  ...otherProps
}) => {

  //Configure it with Formik
  const [field, mata] = useField(name);

  //Styling part
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

  //Configuring the textfield with properties
  const configTextfield = {
    name: name,
    ...field,
    ...otherProps,
    fullWidth: true,
    classes: {
      root: classes.dynamic,
    },
    InputLabelProps: {
      classes: {
        root: classes.cssLabel,
        focused: classes.cssFocused,
      },
    },
    InputProps: {
      classes: {
        root: classes.cssOutlinedInput,
        focused: classes.cssFocused,
      },
    },
  };

  //Validation part

  configTextfield.error = (required && !field.value && mata.touched) ? true :  configTextfield.error ?? false;
  configTextfield.helperText = (required && !field.value && mata.touched) ? "required" : configTextfield.helperText ?? '';
  
  configTextfield.error = (mata && mata.touched && mata.error) ? true :  configTextfield.error ?? false;
  configTextfield.helperText = (mata && mata.touched && mata.error) ? mata.error : configTextfield.helperText ?? '';

  //return the Materil UI component with configuration
  return <TextField {...configTextfield} inputProps={materialProps} />;
};

//set name prop as mandatory
TextfieldWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TextfieldWrapper;