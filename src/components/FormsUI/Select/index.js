/*#################################################################################################################

File Name           :    Select/index.js
Component Name      :    Single Select
Functionality       :    To use this Select Box as a default component for UI purpose across the whole application to 
                          maintain same consistency.

#################################################################################################################*/

import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const SelectWrapper = ({ name, options, variant, required, ...otherProps }) => {
  //To return all formik state
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  //Configuring Field with Properties
  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    fullWidth: true,
    variant: variant,
    onChange: handleChange,
  };

  //Validation Part
  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  if (required && !field.value && meta.touched) {
    configSelect.error = true;
    configSelect.helperText = "required";
  }

  //View Part
  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
