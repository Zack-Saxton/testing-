/*#################################################################################################################

File Name           :    TextArea/index.js
Component Name      :    TextArea
Functionality       :    To use this TextArea as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/

import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";

const TextAreaWrapper = ({
  name,
  value,
  required,
  inputprops,
  placeholder,
  label,
  variant,
  row,
  character_limit,
  ...otherProps
}) => {

  const [ values, setValues ] = useState({
    name: "",
  });

  const handleChange = (nam) => (event) => {
    setValues({ ...values, [ nam ]: event.target.value.trim() });
  };

  //Styling Part
  const useStyles = makeStyles((theme) => ({
    textarea: {},
  }));

  const classes = useStyles();

  //Configuring the field with properties
  const config = {
    name: name,
    placeholder: placeholder,
    label: label,
    variant: variant,
    required: required,
    rows: row,
    ...otherProps,
    onChange: handleChange("name"),
    className: classes.textarea,
  };

  //View Part
  return (
    <TextField
      {...config}
      className={classes.textarea}
      multiline
      inputProps={{
        maxLength: character_limit ?? 20,
        "data-testid": "textarea"
      }}
      value={values.name}
      helperText={`${ values.name.length }/${ character_limit }`}
    />
  );
};

TextAreaWrapper.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  inputprops: PropTypes.object,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  row: PropTypes.string,
  character_limit: PropTypes.string,
};

export default TextAreaWrapper;
