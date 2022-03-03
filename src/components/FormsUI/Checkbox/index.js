/*#################################################################################################################

File Name           :    Checkbox/index.js
Component Name      :    Checkbox
Functionality       :    To use this checkbox as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/

import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";

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

  //Styling Part
  const useStyles = makeStyles((theme) => ({
    checkboxStyle: {
      color: "#0F4EB3 !important"

    },
  }));
  const classes = useStyles();

  //Configuring Field with Properties
  const configCheckbox = {
    required,
    id,

    ...otherProps,

  };

  //parsing data using json
  let styleCheckBoxMF = JSON.parse(stylecheckbox);
  let styleCheckBoxLabelMF = JSON.parse(stylecheckboxlabel);
  let styleLabelFormMF = JSON.parse(stylelabelform);

  //view Part
  return (
    <FormControl>
      <FormLabel style={ styleLabelFormMF }>{ formlabel }</FormLabel>
      <FormGroup >
        <FormControlLabel
          control={ <Checkbox id={ id } { ...configCheckbox } className={ classes.checkboxStyle } style={ styleCheckBoxMF } /> }

          label={ label }
          style={ styleCheckBoxLabelMF }
          id={ labelid }

        />
      </FormGroup>
    </FormControl>
  );
};

CheckboxWrapper.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.any,
  value: PropTypes.any,
  labelid: PropTypes.string,
  formlabel: PropTypes.string,
  stylecheckbox: PropTypes.string,
  stylecheckboxlabel: PropTypes.string,
  stylelabelform: PropTypes.string,
  required: PropTypes.bool,
};

export default CheckboxWrapper;
