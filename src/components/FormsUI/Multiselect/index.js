/*#################################################################################################################

File Name           :    Multiselect/index.js
Component Name      :    Multiselect
Functionality       :    To use this Multiselect as a default component for UI purpose across the whole application to 
                          maintain same consistency.

#################################################################################################################*/
import React from "react";
import { FormControl } from "@material-ui/core";
import { useField } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

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
  const [field, meta] = useField(value);
  const [setmultiselect, setMultiSelect] = React.useState([]);
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
    formlabel: {
      position: "unset!important",
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
        width: 250,
      },
    },
  };

  //Configuring Field with Properties
  const configMultiSelect = {
    name,
    variant: variant,
    fullWidth: true,
    className: classes.menu,
    ...field,
    onChange: handleChange,
  };

  //Validation Part
  const configFormControl = {
    className: classes.formControl,
    required: true,
  };

  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  if (required && !field.value && meta.touched) {
    configFormControl.error = true;
    configFormControl.helpertext = "required";
  }

  //Parsing json data
  let multiselect1 = JSON.parse(multiselect);

  return (
    <FormControl {...configFormControl}>
      <InputLabel className={classes.formlabel}>{labelform}</InputLabel>
      <Select
        {...configMultiSelect}
        value={setmultiselect}
        multiple
        MenuProps={MenuProps}
        renderValue={(selected) => selected.join(", ")}
      >
        {multiselect1.map((nam) => (
          <MenuItem key={nam.value} value={nam.value}>
            <Checkbox
              checked={setmultiselect.indexOf(nam.value) > -1}
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
