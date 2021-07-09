/*#################################################################################################################

File Name           :    Checkbox/index.js
Component Name      :    Checkbox
Functionality       :    To use this checkbox as a default component for UI purpose across the whole application to 
                          maintain same consistency.

#################################################################################################################*/

import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const CheckboxWrapper = ({
  name,
  value,
  label,
  id,
  labelid,
  formlabel,
  stylecheckbox,
  stylecheckboxlabel,
  stylelabelform,
  required,
  ...otherProps
}) => {
  //To return all formik state
  // const { setFieldValue } = useFormikContext(value);
  // const [field, meta] = useField();

  // const handleChange = (evt) => {
  //   const { checked } = evt.target.value;
  //   // setFieldValue(checked);
  // };

  //Configuring Field with Properties
  const configCheckbox = {
    required,
    id:id,
   
    ...otherProps,
   
  };

  //Validation
 
  

  //parsing data using json
  let stylecheckboxMF = JSON.parse(stylecheckbox);
  let stylecheckboxlabelMF = JSON.parse(stylecheckboxlabel);
  let stylelabelformMF = JSON.parse(stylelabelform);

  //view Part
  return (
    <FormControl>
      <FormLabel  style={stylelabelformMF}>{formlabel}</FormLabel>
      <FormGroup >
        <FormControlLabel
          control={<Checkbox id={id} {...configCheckbox} style={stylecheckboxMF} /> }
         
          label={label}
          style={stylecheckboxlabelMF}
          id={labelid}
         
         
        />
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxWrapper;
