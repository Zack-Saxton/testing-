/*#################################################################################################################

File Name           :    TextfieldWithIcon/index.js
Component Name      :    TextfieldWithIcon
Functionality       :    To use this component to add Iconwith textfield

#################################################################################################################*/
import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "../Textfield";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";

const TextfieldWithIconWrapper = ({
  icon,
  iconPosition,
  iconColor,
  customClass,
  //get dynamic icon name
  ...otherProps
}) => {
  // const [field, mata] = useField(name);

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
    ...otherProps,
  };

  //Validation part

  // configTextfield.error = (mata && mata.touched && mata.error) ? true :  configTextfield.error ?? false;
  // configTextfield.helperText = (mata && mata.touched && mata.error) ? mata.error : configTextfield.helperText ?? '';


  //View part
  return (
    <div>
      <Grid container spacing={3}>
        {iconPosition === "left" || !iconPosition ? (
          <Grid item xs={2} sm={1} md={1} lg={1} >
            <Icon className={classNames(customClass, classes.cssIcon)} data-testid= "icon" >
              {" "}
              {icon}
            </Icon>
          </Grid>
        ) : (
          ""
        )}

        <Grid item  xs={10} sm={11} md={11} lg={11} >
          <TextField {...configTextfield} />
        </Grid>
        {iconPosition === "right" ? (
          <Grid item  xs={2} sm={1} md={1} lg={1} >
            <Icon className={classes.cssIcon} data-testid= "icon" >{icon}</Icon>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
};

export default TextfieldWithIconWrapper;
