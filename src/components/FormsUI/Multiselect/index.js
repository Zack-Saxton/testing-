/*#################################################################################################################

File Name           :    Multiselect/index.js
Component Name      :    Multiselect
Functionality       :    To use this Multiselect as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/
import { FormControl } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useStylesMultiSelectComponent } from "./Style";


const MultiSelectWrapper = ({
  name,
  multiselect,
  labelform,
  variant,
  ...otherProps
}) => {
  //To return all formik state
  // const [field, meta] = useField(name);
  const [ multiSelect, setMultiSelect ] = useState([]);
  const handleChange = (event) => {
    setMultiSelect(event.target.value);
  };


  const classes = useStylesMultiSelectComponent();
  const itemHeight = 48;
  const paddingTop = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: itemHeight * 4.5 + paddingTop,
        width: 150,
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left"
    },
    getContentAnchorEl: null
  };

  //Configuring Field with Properties
  const configMultiSelect = {
    name,
    variant: variant,
    fullWidth: true,
    className: classes.menu,
    onChange: handleChange,
  };

  //Validation Part
  const configFormControl = {
    className: classes.formControl,
    required: true,
  };

  //Parsing json data
  let multiselect1 = JSON.parse(multiselect);

  return (
    <FormControl {...configFormControl}>
      <InputLabel className={classes.formControl}>{labelform}</InputLabel>
      <Select
        {...configMultiSelect}
        {...otherProps}
        value={multiSelect}
        multiple
        MenuProps={MenuProps}
        data-test-id="multiSelectBox"
        inputProps={{ "data-testid": "multiSelectInput" }}
        renderValue={(selected) => selected.join(", ")}
      >
        {multiselect1.map((nam) => (
          <MenuItem key={nam.value} value={nam.value}>
            <Checkbox
              refvalue={nam.value}
              checked={multiSelect.indexOf(nam.value) > -1}
              className={classes.check}
            />
            <ListItemText primary={nam.value} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectWrapper;

MultiSelectWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  multiselect: PropTypes.string,
  labelform: PropTypes.string,
  value: PropTypes.array,
  variant: PropTypes.string,
  checkboxcolor: PropTypes.string,
  required: PropTypes.bool
};