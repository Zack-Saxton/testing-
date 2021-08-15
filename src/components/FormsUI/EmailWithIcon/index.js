/*#################################################################################################################

File Name           :    EmailWithIcon/index.js
Component Name      :    EmailWithIcon
Functionality       :    To use this component to vadd icon with the email component

#################################################################################################################*/
import React from "react";
import { Grid } from "@material-ui/core";
import Email from "../Email";
import Icon from "@material-ui/core/Icon";

const EmailWithIconWrapper = ({
  name,
  icon,
 
  iconPosition,
  iconColor,
  customClass, //get dynamic icon name
  ...otherProps
}) => {
  // const [field, mata] = useField(name);

  //Styling


  //Configuring the field properties
  const configTextfield = {
    name,
   
    ...otherProps,
  };

  //Validation part

  //View part
  return (
    <div>
      <Grid item xs={12}  direction="row" id="em" fullWidth={true} style={{display:"inline-flex", width: "100%"}}>
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

          <Email {...configTextfield} />
        {iconPosition === "right" ? (
          <Grid  style={{paddingTop:"20px" , paddingLeft:"10px"}}>
          <Icon data-testid= "icon">
              {" "}
              {icon}
            </Icon>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
};

export default EmailWithIconWrapper;
