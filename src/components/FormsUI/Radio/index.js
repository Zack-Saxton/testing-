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

const RadioButtonWrapper = ({
  name,
  radiolabel,
  labelforform,
  value,
  row,
  required,
  onClick,
  labelplacement,
  ...otherProps
}) => {
  //To return all formik state
  // const { setFieldValue } = useFormikContext();
  // const [field, meta] = useField(name);
  // const handleChange = (evt) => {
  //   const { checked } = evt.target;
  //   setFieldValue(value, checked);
  // };

  const [radiovalue, setradioValue] = React.useState("");

  function handleRadioClick(event) {
    if (event.target.value === radiovalue) {
      setradioValue("");
    } else {
      setradioValue(event.target.value);
    }
  }
  //Configuring the field with properties
  const configRadioButton = {
    name,
    row: row,
    required: required,
    
    ...otherProps,
   
  };


  //Validation

  //parsing data using json
  let radiolabelMF = JSON.parse(radiolabel);

  //View Part
  return (
    <FormControl >
      <FormLabel style={{fontFamily: "system-ui",fontWeight: "normal",}}>{labelforform}</FormLabel>
      <RadioGroup  value={radiovalue} {...configRadioButton}>
        {radiolabelMF.map((radio) => (
          <FormControlLabel 
            labelPlacement={labelplacement}
            value={radio.value}
            key={radio.value}
            label={radio.label}
           
            control={<Radio onClick={handleRadioClick} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonWrapper;
