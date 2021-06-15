/*#################################################################################################################

File Name           :    TextArea/index.js
Component Name      :    TextArea
Functionality       :    To use this TextArea as a default component for UI purpose across the whole application to 
                          maintain same consistency.

#################################################################################################################*/

import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";
import { makeStyles } from "@material-ui/core/styles";

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
  //To return all formik state
  const [field, meta] = useField(name);

  const CHARACTER_LIMIT = character_limit;
  const [values, setValues] = React.useState({
    name: "",
  });

  const handleChange = (nam) => (event) => {
    setValues({ ...values, [nam]: event.target.value });
  };

  //Styling Part
  const useStyles = makeStyles((theme) => ({
    textarea: {},
  }));

  const classes = useStyles();

  //Configuring the field with properties
  const configTextArea = {
    name: name,
    placeholder: placeholder,
    label: label,
    variant: variant,
    required: required,
    rows: row,
    ...otherProps,
    fullWidth: true,
    ...field,
    onChange: handleChange("name"),
    className: classes.textarea,
  };

  //Validation
  if (meta && meta.touched && meta.error) {
    configTextArea.error = true;
    configTextArea.helperText = meta.error;
  }

  if (required && !values.name && meta.touched) {
    configTextArea.error = true;
    configTextArea.helperText = "required";
  }

  //View Part
  return (
    <TextField
      {...configTextArea}
      className={classes.textarea}
      multiline
      inputProps={{
        maxLength: CHARACTER_LIMIT,
      }}
      value={values.name}
      helperText={`${values.name.length}/${CHARACTER_LIMIT}`}
    />
  );
};

export default TextAreaWrapper;
