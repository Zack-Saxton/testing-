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
  checked,
  labelPlacement,
  ...otherProps
}) => {
  //To return all formik state
  // const { setFieldValue } = useFormikContext();
  // const [field, meta] = useField(name);
  // const handleChange = (evt) => {
  //   const { checked } = evt.target;
  //   setFieldValue(value, checked);
  // };

  const [radioValue, setRadioValue] = React.useState("");

  function handleRadioClick(event) {
 

    
    if (event.target.value === radioValue) {
      setRadioValue("");
     
    } else {
      setRadioValue(event.target.value);
      
    }
    if(onClick){
        onClick(value??event.target.value);

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
  let radioLabelMF = JSON.parse(radiolabel);

  //View Part
  return (
    <FormControl >
      <FormLabel style={{fontFamily: "system-ui",fontWeight: "normal",}}>{labelforform}</FormLabel>
      <RadioGroup  value={radioValue} {...configRadioButton}>
        {radioLabelMF.map((radio) => (
          <FormControlLabel 
            labelPlacement={labelPlacement}
            value={radio.value}
            key={radio.value}
            label={radio.label}
            control={<Radio style={{color: "#0F4EB3"}} checked={checked === radio.value   ? true : false} onClick={handleRadioClick} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonWrapper;
