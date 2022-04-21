/*#################################################################################################################

File Name           :    EmailWithIcon/index.js
Component Name      :    EmailWithIcon
Functionality       :    To use this component to vad icon with the email component

#################################################################################################################*/
import { Grid } from "@mui/material";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import React from "react";
import Email from "../Email";
import { makeStyles } from "@mui/styles";

const useEmailWithIcon = makeStyles((theme) => ({
  outerGrid: {
    display: "inline-flex", 
    width: "100%"
  },
  innerGrid: {
    paddingTop: "20px", 
    paddingRight: "10px"
  },
  emailGrid: {
    paddingTop: "20px", 
    paddingLeft: "10px"
  }
}))

const EmailWithIconWrapper = ({
  name,
  icon,
  iconPosition,
  iconColor,
  customClass, //get dynamic icon name
  ...otherProps
}) => {
  //Configuring the field properties
  const configTextfield = {
    name,
    ...otherProps,
  };
  const classes = useEmailWithIcon()

  //View part
  return (
    <div>
      <Grid container item xs={ 12 } direction="row" id="em" className={classes.outerGrid}>
        { iconPosition === "left" || !iconPosition ? (
          <Grid className={ classes.innerGrid }>
            <Icon data-testid="icon" >
              { " " }
              { icon }
            </Icon>
          </Grid>
        ) : (
          ""
        ) }

        <Email { ...configTextfield } />
        { iconPosition === "right" ? (
          <Grid className={ classes.emailGrid }>
            <Icon data-testid="icon">
              { " " }
              { icon }
            </Icon>
          </Grid>
        ) : (
          ""
        ) }
      </Grid>
    </div>
  );
};

EmailWithIconWrapper.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  iconColor: PropTypes.string,
  customClass: PropTypes.string,
};

export default EmailWithIconWrapper;
