/*#################################################################################################################

File Name           :    TextArea/index.js
Component Name      :    TextArea
Functionality       :    To use this TextArea as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

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

export default TextAreaWrapper;
