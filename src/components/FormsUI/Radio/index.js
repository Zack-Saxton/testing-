/*#################################################################################################################

File Name           :    Radio/index.js
Component Name      :    RadioButton
Functionality       :    To use this RadioButton as a default component for UI purpose across the whole application to 
                          maintain same consistency.

#################################################################################################################*/

import React from "react";
import { FormControl, FormControlLabel, FormLabel } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useField, useFormikContext } from "formik";

const RadioButtonWrapper = ({
  name,
  radiolabel,
  labelforform,
  value,
  row,
  required,
  labelplacement,
  ...otherProps
}) => {
  //To return all formik state
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(value);
  const handleChange = (evt) => {
    const { checked } = evt.target;
    setFieldValue(value, checked);
  };

  //Configuring the field with properties
  const configRadioButton = {
    name,
    row: row,
    ...field,
    ...otherProps,
    onChange: handleChange,
  };

  //Validation
  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  if (required && !field.value && meta.touched) {
    configRadioButton.error = true;
    configRadioButton.helperText = "required";
  }

  //parsing data using json
  let radiolabelMF = JSON.parse(radiolabel);

  //View Part
  return (
    <FormControl {...configFormControl}>
      <FormLabel>{labelforform}</FormLabel>
      <RadioGroup {...configRadioButton}>
        {radiolabelMF.map((radio) => (
          <FormControlLabel
            labelPlacement={labelplacement}
            value={radio.value}
            key={radio.value}
            label={radio.label}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonWrapper;
