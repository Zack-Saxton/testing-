/*#################################################################################################################

File Name           :    Multiselect/index.js
Component Name      :    Multiselect
Functionality       :    To use this Multiselect as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/
import { FormControl } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const MultiSelectWrapper = ({
  name,
  multiselect,
  labelform,
  value,
  variant,
  checkboxcolor,
  required,
  ...otherProps
}) => {
  //To return all formik state
  // const [field, meta] = useField(name);
  const [ multiSelect, setMultiSelect ] = React.useState([]);
  const handleChange = (event) => {
    setMultiSelect(event.target.value);
  };

  //Styling part
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    check: {
      color: checkboxcolor,
    },
    menu: {
      width: 200,
    },
  }));

  const classes = useStyles();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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
    <FormControl { ...configFormControl }>
      <InputLabel className={ classes.formControl }>{ labelform }</InputLabel>
      <Select
        { ...configMultiSelect }
        value={ multiSelect }
        multiple
        MenuProps={ MenuProps }
        data-test-id="multiSelectBox"
        inputProps={ { "data-test-id": "multiSelectInput" } }
        renderValue={ (selected) => selected.join(", ") }

      >
        { multiselect1.map((nam) => (
          <MenuItem key={ nam.value } value={ nam.value }>
            <Checkbox
              refvalue={ nam.value }
              checked={ multiSelect.indexOf(nam.value) > -1 }
              className={ classes.check }
            />
            <ListItemText primary={ nam.value } />
          </MenuItem>
        )) }
      </Select>
    </FormControl>
  );
};

export default MultiSelectWrapper;
