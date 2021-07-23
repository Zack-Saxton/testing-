/*#################################################################################################################

File Name           :    Password/index.js
Component Name      :    Password
Functionality       :    To use this component to validate and get the Password with hide and show option.

#################################################################################################################*/
import React,{useState} from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";


//Initializing component
const PasswordWrapper = ({ name, label,materialProps, id, ...otherProps }) => {
  const [showPassword, setShowPassword] = useState({
    password: "",
});
 
const handleClickShowPassword = () => setShowPassword(!showPassword);
 const handleEdit = (e) => {
    e.preventDefault();
  };

  
   return (
      // <FormControl fullWidth={true} >
       <TextField
       fullWidth={true}
  label={label}
  id={id} name={name} {...otherProps}
   type={!showPassword ? "text" : "password"} 
onCut={handleEdit}
onCopy={handleEdit}
onPaste={handleEdit}
InputProps={materialProps}
  InputProps={{ 
    "data-testid": "passProps",
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          data-testid= "passButton"
        >
          {!showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>
      // </FormControl>
    );
  }

export default PasswordWrapper;
