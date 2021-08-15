/*#################################################################################################################

File Name           :    TextfieldWithIcon/index.js
Component Name      :    TextfieldWithIcon
Functionality       :    To use this component to add Iconwith textfield

#################################################################################################################*/
import React from "react";
import { Grid } from "@material-ui/core";
import TextField from "../Textfield";
import Icon from "@material-ui/core/Icon";

const TextfieldWithIconWrapper = ({
  icon,
  iconPosition,
  iconColor,
  customClass,
  //get dynamic icon name
  ...otherProps
}) => {
  // const [field, mata] = useField(name);


  //Configuring the field properties
  const configTextfield = { 
    ...otherProps,
  };

  //Validation part

  // configTextfield.error = (mata && mata.touched && mata.error) ? true :  configTextfield.error ?? false;
  // configTextfield.helperText = (mata && mata.touched && mata.error) ? mata.error : configTextfield.helperText ?? '';


  //View part
  return (
    <div>
       <Grid item xs={12}  direction="row" style={{display:"inline-flex", width: "100%"}}>
              {iconPosition === "left" || !iconPosition ? (
          <Grid  style={{paddingTop:"20px" , paddingRight:"10px"}}>
            <Icon data-testid= "icon" >
              {" "}
              {icon}
            </Icon>
          </Grid>
        ) : (
          ""
        )}
          <TextField {...configTextfield} />
        {iconPosition === "right" ? (
          <Grid  style={{paddingTop:"20px" , paddingLeft:"10px"}}>
          <Icon data-testid= "icon" >{icon}</Icon>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
};

export default TextfieldWithIconWrapper;
