/*#################################################################################################################

File Name           :    PasswordWithIcon/index.js
Component Name      :    Password with Icon
Functionality       :    To use this component to have icon with password Field

#################################################################################################################*/
import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Password from "../Password";
import Icon from "@material-ui/core/Icon";

//Initializing component
const PasswordWithIconWrapper = ({
  name,
  icon,
  id,
  iconPosition,
  iconColor,
  customClass, //get dynamic icon name
  ...otherProps
}) => {

  //Styling part
  const useStyles = makeStyles((theme) => ({
    cssIcon: {
      color: iconColor,
      paddingTop: "20px",
      
    },
  }));

  const classes = useStyles();
  //Configuring the field properties
  const configTextfield = {
    name,
    id:id,
    ...otherProps,
  };

  //Validation part

  // <Grid item xs={12}  direction="row" style={{display:"inline-flex"}}>
  // <Grid   style={{paddingTop:"20px" , paddingRight:"10px"}}> 
  //    <Icon >lock</Icon>
  //  </Grid>
  

  //View part
  return (
    <div>
    <Grid item xs={12}  direction="row" style={{display:"inline-flex", width: "-webkit-fill-available"}}>
              {iconPosition === "left" || !iconPosition ? (
          <Grid  style={{paddingTop:"20px" , paddingRight:"10px"}}>
            <Icon data-testid= "icon">
              {" "}
              {icon}
            </Icon>
          </Grid>
        ) : (
          ""
        )}

       
          <Password startIcon {...configTextfield} />
       
        {iconPosition === "right" ? (
          <Grid  style={{paddingTop:"20px" , paddingLeft:"10px"}}>
          <Icon data-testid= "icon">{icon}</Icon>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
};

export default PasswordWithIconWrapper;
