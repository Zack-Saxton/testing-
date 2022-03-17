/*#################################################################################################################

File Name           :    Radio/index.js
Component Name      :    RadioButton
Functionality       :    To use this RadioButton as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/

import { FormControl, FormControlLabel, FormLabel } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import PropTypes from "prop-types";
import React, { useState } from "react";

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
  disabled,
  ...otherProps
}) => {
  //To return all formik state
  const [ radioValue, setRadioValue ] = useState("");

  function handleRadioClick(event) {
    if (event.target.value === radioValue) {
      setRadioValue("");
    } else {
      setRadioValue(event.target.value);
    }
    if (onClick) {
      onClick(value ?? event.target.value);
    }
  }
  //Configuring the field with properties
  const configRadioButton = {
    name,
    row: row,
    required: required,
    ...otherProps,
  };
  //parsing data using json
  let radioLabelMF = JSON.parse(radiolabel);

  //View Part
  return (
    <FormControl >
      <FormLabel disabled={ disabled ?? false } style={ { fontFamily: "system-ui", fontWeight: "normal", } }>{ labelforform }</FormLabel>
      <RadioGroup value={ radioValue } { ...configRadioButton }>
        { radioLabelMF.map((radio) => (
          <FormControlLabel
            labelPlacement={ labelPlacement }
            value={ radio.value }
            key={ radio.value }
            disabled={ disabled ?? false }
            label={ radio.label }
            control={ <Radio style={ { color: "#0F4EB3" } } checked={ checked === radio.value ? true : false } onClick={ handleRadioClick } /> }
          />
        )) }
      </RadioGroup>
    </FormControl>
  );
};

RadioButtonWrapper.propTypes = {
  name: PropTypes.string,
  radiolabel: PropTypes.string,
  labelforform: PropTypes.string,
  value: PropTypes.string,
  row: PropTypes.bool,
  required: PropTypes.bool,
  onClick: PropTypes.func,
  checked: PropTypes.string,
  labelPlacement: PropTypes.string,
  disabled: PropTypes.bool,
};

export default RadioButtonWrapper;
