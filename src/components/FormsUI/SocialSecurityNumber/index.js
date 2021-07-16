/*#################################################################################################################

File Name           :    SocialSecurityNumber/index.js
Component Name      :    SocialSecurityNumber
Functionality       :    To use this component to validate and get the SSN in the correct format from the user.

#################################################################################################################*/
import React,{useState} from "react";
import { useField } from "formik";
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import InputMask from "react-input-mask";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
 import Textfield from "../Textfield/index"

import { TextField, FormLabel,FormControlLabel } from "@material-ui/core";
import Content from '../../../assets/Content/content';

const theme = createMuiTheme();
const SSNWrapper = ({ name,label, error,  required,

  onChange,
   helperText,
  setError,
  setHelperText, ...otherProps }) => {
  // const [mobile, setSSN] = React.useState("");
  const[unMaskedVal, setUnMaskedVal] = useState('');
  // const [isError, setIsError] = useState(false);
  // const [helpertext, setHelpertext] = useState("");

  const handleChange = (event) => {
    setUnMaskedVal(event.target.value
    
      .replace(/-/g, "")
      .replace(/ /g, "") || "" );
  // setFieldValue("ssn", value);
  // setUnMaskedVal(value);
  // setIsError((required && !event.target.value) ? true :  false);
  //   setHelpertext((required && !event.target.value) ? Content.required : '');
  if(onChange){  
  onChange(event);
  }
  };

  //  setError = error ?? setError;
  // setHelperText = helperText ?? setHelperText; 
  // //Basic field configurations
  // const config = {
  //   name: name,
   
  //   error: setError ? setError : isError,
  //   helperText: setError ? setHelperText : helpertext,
  //   ...otherProps,
  // };
  //Validation part
  // check validity

 

  return (
    <FormControl fullWidth={true}>
      <MuiThemeProvider theme={theme}>
        <InputMask
          fullWidth={true}
          mask="999-99-999"
          value={unMaskedVal}
          name={name}
          onChange={handleChange}
          disabled={false}
          maskChar=" "
          {...otherProps}
        >
          {() => <TextField label={label} 
          name={name} 
         
          error={error} 
          helperText={helperText}
           inputProps={{"data-testid": "ssn", "unmaskedval": unMaskedVal}}/>}
        </InputMask>
      </MuiThemeProvider> 

{/* <MuiThemeProvider>
        
            <TextField
            label={label} 
            name={name} 
           >
             
             <InputMask mask="999-99-99" maskChar=" " />
            </TextField>
              
      </MuiThemeProvider> */}


    </FormControl>
  );
};

SSNWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SSNWrapper;
