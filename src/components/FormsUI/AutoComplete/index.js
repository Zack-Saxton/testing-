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
  textfieldlabel,
  variant,
  ...otherProps
}) => {
  //parsing data using json
  const jsonData = JSON.parse(jsonInput);

  //View Part
  return (
    <Autocomplete
      id={id}
      options={jsonData}
      getOptionLabel={(option) => option.value}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={textfieldlabel} variant={variant} />
      )}
    />
  );
};

export default AutoCompleteWrapper;
