/*#################################################################################################################

File Name           :    AutoComplete/index.js
Component Name      :    AutoComplete
Functionality       :    To use this AutoComplete SingleSelect as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import PropTypes from "prop-types";

const AutoCompleteWrapper = ({
  name,
  value,
  id,
  jsonInput,
  textfieldlabel: textFieldLabel,
  variant,
  styleAutocomplete,
  ...otherProps
}) => {
  //parsing data using json
  const jsonData = JSON.parse(jsonInput);
  let styleAutocompleteMF = JSON.parse(styleAutocomplete);
  //View Part
  return (
    <Autocomplete
      id={ id }
      options={ jsonData }
      getOptionLabel={ (option) => option.value }
      style={ styleAutocompleteMF }
      renderInput={ (params) => (
        <TextField { ...params } label={ textFieldLabel } variant={ variant } />
      ) }
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