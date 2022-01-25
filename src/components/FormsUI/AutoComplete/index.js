/*#################################################################################################################

File Name           :    AutoComplete/index.js
Component Name      :    AutoComplete
Functionality       :    To use this AutoComplete SingleSelect as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AutoCompleteWrapper = ({
  name,
  value,
  id,
  jsonInput,
  optionlabel,
  textfieldlabel: textFieldLabel,
  variant,
  styleAutocomplete,
  ...otherProps
}) => {
  //parsing data using json
  const jsonData = JSON.parse(jsonInput);
  let styleAutocompleteMF = JSON.parse(styleAutocomplete)
  //View Part
  return (
    <Autocomplete
      id={id}
      options={jsonData}
      getOptionLabel={(option) => option.value}
      style={styleAutocompleteMF}
      renderInput={(params) => (
        <TextField {...params} label={textFieldLabel} variant={variant} />
      )}
    />
  );
};

export default AutoCompleteWrapper;