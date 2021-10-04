/*#################################################################################################################

File Name           :    Checkbox/index.js
Component Name      :    Checkbox
Functionality       :    To use this checkbox as a default component for UI purpose across the whole application to 
                          maintain same consistency.

#################################################################################################################*/

import React from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel,} from "@material-ui/core";

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

  //Configuring Field with Properties
  const configCheckbox = {
    required,
    id,
   
    ...otherProps,
   
  };

  //Validation
 
  

  //parsing data using json
  let styleCheckBoxMF = JSON.parse(stylecheckbox);
  let styleCheckBoxLabelMF = JSON.parse(stylecheckboxlabel);
  let styleLabelFormMF = JSON.parse(stylelabelform);

  //view Part
  return (
    <FormControl>
      <FormLabel  style={styleLabelFormMF}>{formlabel}</FormLabel>
      <FormGroup >
        <FormControlLabel
          control={<Checkbox id={id} {...configCheckbox} style={styleCheckBoxMF} /> }
         
          label={label}
          style={styleCheckBoxLabelMF}
          id={labelid}
         
         
        />
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxWrapper;
