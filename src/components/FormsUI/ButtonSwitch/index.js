/*#################################################################################################################

File Name           :    ButtonSwitch/index.js
Component Name      :    ButtonSwitch
Functionality       :    To use this ButtonSwitch as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/

import React from "react";
import { FormControl, FormControlLabel } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

const ButtonSwitchWrapper = ({
  name,
  value,
  id,
  label,
  labelplacement,
  ...otherProps
}) => {
  //Validation
  const [ state, setState ] = React.useState(true);

  let handleChange = (event) => {
    setState(event.target.checked);
  };

  //View Part
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={ state }
            onChange={ handleChange }
            value={ state }
            inputProps={ { "data-test-id": "switch" } }
            color="primary"
          />
        }
        labelPlacement={ labelplacement }
        label={ state ? label + " ON" : label + " Off" }
      />
    </FormControl>
  );
};

export default ButtonSwitchWrapper;
