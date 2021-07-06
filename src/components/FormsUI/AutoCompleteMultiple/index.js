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
import Content from '../../../assets/Content/content';

const AutoCompleteMultipleWrapper = ({
  name,
  value,
  id,
  jsonInput,
  optionlabel,
  label,
  variant,
  placeholder,
  required,
  stylecheckbox,
  //styleAutocomplete,
  ...otherProps
}) => {
  //To return all formik state
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

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

  configAutocomplete.error = (required && !field.value && meta.touched) ? true :  configAutocomplete.error ?? false;
  configAutocomplete.helperText = (required && !field.value && meta.touched) ? Content.required : configAutocomplete.helperText ?? '';
  
  //parsing data using json
  let jsonData = JSON.parse(jsonInput);
  let stylecheckboxMF = JSON.parse(stylecheckbox)
 //let styleAutocompleteMF = JSON.parse(styleAutocomplete)

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
            style={stylecheckboxMF}
            checked={selected}
          />
          {option.value}
        </React.Fragment>
      )}
     // style={styleAutocompleteMF}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant={variant}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default AutoCompleteMultipleWrapper;
