/*#################################################################################################################

File Name           :    EmailWithIcon/index.js
Component Name      :    EmailWithIcon
Functionality       :    To use this component to vadd icon with the email component

#################################################################################################################*/
import React from "react";
import { Grid } from "@material-ui/core";
import { useField } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Email from "../Email";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import Content from '../../../assets/Content/content';

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
  const useStyles = makeStyles((theme) => ({
    cssIcon: {
      // paddingTop: "100%",
      color: iconColor,
      paddingTop: "20px",
      
    //   verticalAlign: 'middle',
    // display: 'inline-flex',   
    // flexWrap: 'wrap',
    },
  }));
  const classes = useStyles();

  //Configuring the field properties
  const configTextfield = {
    name,
   
    ...otherProps,
  };

  //Validation part

  // configTextfield.error = (!field.value && mata.touched) ? true :  configTextfield.error ?? false;
  // configTextfield.helperText = (field.value && mata.touched) ? Content.required : configTextfield.helperText ?? '';
  
  // configTextfield.error = (mata && mata.touched && mata.error) ? true :  configTextfield.error ?? false;
  // configTextfield.helperText = (mata && mata.touched && mata.error) ? mata.error : configTextfield.helperText ?? '';

  //View part
  return (
    <div>
      <Grid item xs={12}  direction="row" style={{display:"inline-flex", width: "-webkit-fill-available"}}>
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
