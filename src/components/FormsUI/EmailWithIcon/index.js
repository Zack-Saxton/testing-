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

const EmailWithIconWrapper = ({
  name,
  icon,
  iconPosition,
  iconColor,
  customClass, //get dynamic icon name
  ...otherProps
}) => {
  const [field, mata] = useField(name);

  //Styling
  const useStyles = makeStyles((theme) => ({
    cssIcon: {
      paddingTop: "20px",
      color: iconColor,
    },
  }));
  const classes = useStyles();

  //Configuring the field properties
  const configTextfield = {
    name: name,
    ...otherProps,
  };

  //Validation part

  configTextfield.error = (!field.value && mata.touched) ? true :  configTextfield.error ?? false;
  configTextfield.helperText = (field.value && mata.touched) ? "required" : configTextfield.helperText ?? '';
  
  configTextfield.error = (mata && mata.touched && mata.error) ? true :  configTextfield.error ?? false;
  configTextfield.helperText = (mata && mata.touched && mata.error) ? mata.error : configTextfield.helperText ?? '';

  //View part
  return (
    <div>
      <Grid container spacing={3}>
        {iconPosition === "left" || !iconPosition ? (
          <Grid item xs={1}>
            <Icon className={classNames(customClass, classes.cssIcon)}>
              {" "}
              {icon}
            </Icon>
          </Grid>
        ) : (
          ""
        )}

        <Grid item xs={11}>
          <Email {...configTextfield} />
        </Grid>
        {iconPosition === "right" ? (
          <Grid item xs={1}>
            <Icon className={classNames(customClass, classes.cssIcon)}>
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
