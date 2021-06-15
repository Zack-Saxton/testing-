/*
#################################################################################################################

File Name           :    AutoCompleteMultiSelect/index.js
Component Name      :    AutoCompleteMultiSelect
Functionality       :    To use this ButtonWithIcon as a default component for UI purpose across the whole application to 
                          maintain same consistency.

#################################################################################################################
 */
import React from "react";
import { Checkbox } from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const AutoCompleteMultipleWrapper = ({
  name,
  value,
  id,
  jsonInput,
  optionlabel,
  textfieldlabel,
  variant,
  placeholder,
  required,
  ...otherProps
}) => {
  //To return all formik state
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(value);

  const handleChange = (evt) => {
    const { checked } = evt.target;
    setFieldValue(value, checked);
  };

  const useStyles = makeStyles((theme) => ({}));
  const classes = useStyles();

  //Configuring the field with properties
  const configAutocomplete = {
    name,
    ...field,
    onChange: handleChange,
    className: classes.autocomplete,
  };

  //Validation
  if (required && !field.value && meta.touched) {
    configAutocomplete.error = true;
    configAutocomplete.helperText = "required";
  }

  //parsing data using json
  let jsonData = JSON.parse(jsonInput);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  //View Part
  return (
    <Autocomplete
      id={id}
      disableCloseOnSelect
      multiple
      options={jsonData}
      getOptionLabel={(option) => option.value}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.value}
        </React.Fragment>
      )}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={textfieldlabel}
          variant={variant}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default AutoCompleteMultipleWrapper;
