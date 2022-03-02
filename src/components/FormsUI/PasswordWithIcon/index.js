/*#################################################################################################################

File Name           :    PasswordWithIcon/index.js
Component Name      :    password with Icon
Functionality       :    To use this component to have icon with password Field

#################################################################################################################*/
import { Grid } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import React from "react";
import Password from "../Password";

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

  //View part
  return (
    <div>
      <Grid container item xs={ 12 } direction="row" style={ { display: "inline-flex", width: "100%" } }>
        { iconPosition === "left" || !iconPosition ? (
          <Grid style={ { paddingTop: "20px", paddingRight: "10px" } }>
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
          <Grid style={ { paddingTop: "20px", paddingLeft: "10px" } }>
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