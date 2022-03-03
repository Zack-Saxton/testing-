/*
#################################################################################################################

File Name           :    AutoCompleteMultiSelect/index.js
Component Name      :    AutoCompleteMultiSelect
Functionality       :    To use this ButtonWithIcon as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################
 */
import { Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from '@mui/material/Autocomplete';
import { useField, useFormikContext } from "formik";
import PropTypes from "prop-types";
import React from "react";
import globalMessages from '../../../assets/data/globalMessages.json';

const AutoCompleteMultipleWrapper = ({
  name,
  value,
  id,
  jsonInput,
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
  const [ field, meta ] = useField(name);

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

  configAutocomplete.error = (required && !field.value && meta.touched) ? true : configAutocomplete.error ?? false;
  configAutocomplete.helperText = (required && !field.value && meta.touched) ? globalMessages.required : configAutocomplete.helperText ?? '';

  //parsing data using json
  let jsonData = JSON.parse(jsonInput);
  let styleCheckBoxMF = JSON.parse(stylecheckbox);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  //View Part
  return (
    <Autocomplete
      id={ id }
      disableCloseOnSelect
      multiple
      options={ jsonData }
      getOptionLabel={ (option) => option.value }
      renderOption={ (props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={ icon }
            checkedIcon={ checkedIcon }
            style={ styleCheckBoxMF }
            checked={ selected }
          />
          { option.value }
        </li>
      ) }
      // style={styleAutocompleteMF}
      renderInput={ (params) => (
        <TextField
          { ...params }
          label={ label }
          variant={ variant }
          placeholder={ placeholder }
        />
      ) }
    />
  );
};

AutoCompleteMultipleWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  id: PropTypes.string,
  jsonInput: PropTypes.string.isRequired,
  label: PropTypes.string,
  stylecheckbox: PropTypes.string,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool
};

export default AutoCompleteMultipleWrapper;