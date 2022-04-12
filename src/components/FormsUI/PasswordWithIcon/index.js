/*#################################################################################################################

File Name           :    PasswordWithIcon/index.js
Component Name      :    password with Icon
Functionality       :    To use this component to have icon with password Field

#################################################################################################################*/
import { Grid } from "@mui/material";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import React from "react";
import Password from "../Password";
import { makeStyles } from "@mui/styles";

const usePasswordWithIcon = makeStyles((theme) => ({
  outerGrid: {
    display: "inline-flex", 
    width: "100%"
  },
  innerGrid: {
    paddingTop: "20px", 
    paddingRight: "10px"
  },
  passwordGrid: {
    paddingTop: "20px", 
    paddingLeft: "10px"
  }
}))

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

  //Configuring the field properties
  const configTextfield = {
    name,
    id: id,
    ...otherProps,
  };
  const classes = usePasswordWithIcon()

  //View part
  return (
    <div>
      <Grid container item xs={ 12 } direction="row" className={classes.outerGrid}>
        { iconPosition === "left" || !iconPosition ? (
          <Grid className={ classes.innerGrid }>
            <Icon data-test-id="icon">
              { " " }
              { icon }
            </Icon>
          </Grid>
        ) : (
          ""
        ) }

        <Password { ...configTextfield } />

        { iconPosition === "right" ? (
          <Grid className={ classes.passwordGrid }>
            <Icon data-test-id="icon">{ icon }</Icon>
          </Grid>
        ) : (
          ""
        ) }
      </Grid>
    </div>
  );
};

export default PasswordWithIconWrapper;

PasswordWithIconWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  id: PropTypes.string,
  iconPosition: PropTypes.string,
  iconColor: PropTypes.string,
  customClass: PropTypes.object
};