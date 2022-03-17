/*#################################################################################################################

File Name           :    ButtonSwitch/index.js
Component Name      :    ButtonSwitch
Functionality       :    To use this ButtonSwitch as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/

import { FormControl, FormControlLabel } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import React, { useState } from "react";

const ButtonSwitchWrapper = ({
  name,
  id,
  label,
  labelplacement,
  ...otherProps
}) => {
  //Validation
  const [ state, setState ] = useState(true);

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

ButtonSwitchWrapper.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  labelplacement: PropTypes.string,
};

export default ButtonSwitchWrapper;
