/*#################################################################################################################

File Name           :    PasswordWithIcon/index.js
Component Name      :    Password with Icon
Functionality       :    To use this component to have icon with password Field

#################################################################################################################*/
import React from "react";
import { Grid } from "@material-ui/core";
import { useField } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Password from "../Password";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";

//Initializing component
const PasswordWithIconWrapper = ({
  name,
  icon,
  iconPosition,
  iconColor,
  customClass, //get dynamic icon name
  ...otherProps
}) => {
  const [field, mata] = useField(name);

  //Styling part
  const useStyles = makeStyles((theme) => ({
    cssIcon: {
      paddingTop: "20px",
      color: iconColor,
    },
  }));

  const classes = useStyles();
  //Configuring the field properties
  const configTextfield = {
    ...field,
    ...otherProps,
  };

  //Validation part
  configTextfield.error = (mata && mata.touched && mata.error) ? true :  configTextfield.error ?? false;
  configTextfield.helperText = (mata && mata.touched && mata.error) ? mata.error : configTextfield.helperText ?? '';

  configTextfield.error = (!field.value && mata.touched) ? true :  configTextfield.error ?? false;
  configTextfield.helperText = (field.value && mata.touched) ? "required" : configTextfield.helperText ?? '';
  

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
          <Password startIcon {...configTextfield} />
        </Grid>
        {iconPosition === "right" ? (
          <Grid item xs={1}>
            <Icon className={classes.cssIcon}>{icon}</Icon>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
};

export default PasswordWithIconWrapper;
