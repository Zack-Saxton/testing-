/*#################################################################################################################

File Name           :    AutoComplete/index.js
Component Name      :    AutoComplete
Functionality       :    To use this AutoComplete SingleSelect as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import React from "react";

const AutoCompleteWrapper = ({
  name,
  value,
  id,
  jsonInput,
  textfieldlabel: textFieldLabel,
  variant,
  styleAutocomplete,
  ..._otherProps
}) => {
  //parsing data using json
  const jsonData = JSON.parse(jsonInput);
  let styleAutocompleteMF = JSON.parse(styleAutocomplete);
  //View Part
  return (
    <Autocomplete
      id={id}
      name = {name}
      value = {value}
      options={jsonData}
      getOptionLabel={(option) => option.value}
      style={styleAutocompleteMF}
      renderInput={(params) => (
        <TextField {...params} label={textFieldLabel} variant={variant} />
      )}
    />
  );
};

AutoCompleteWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  id: PropTypes.string,
  jsonInput: PropTypes.string.isRequired,
  textfieldlabel: PropTypes.string,
  styleAutocomplete: PropTypes.string,
  variant: PropTypes.string
};

export default AutoCompleteWrapper;