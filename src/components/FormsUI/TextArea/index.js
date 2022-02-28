/*#################################################################################################################

File Name           :    TextArea/index.js
Component Name      :    TextArea
Functionality       :    To use this TextArea as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import PropTypes from "prop-types";

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

  const CHARACTER_LIMIT = character_limit;
  const [ values, setValues ] = React.useState({
    name: "",
  });

  const handleChange = (nam) => (event) => {
    setValues({ ...values, [ nam ]: event.target.value });
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
      { ...config }
      className={ classes.textarea }
      multiline
      inputProps={ {
        maxLength: CHARACTER_LIMIT ?? 20,
        "data-test-id": "textarea"
      } }
      value={ values.name }
      helperText={ `${ values.name.length }/${ CHARACTER_LIMIT }` }
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
  character_limit: PropTypes.number,
};

export default TextAreaWrapper;
