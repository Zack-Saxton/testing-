/*#################################################################################################################

File Name           :    Text fieldWithIcon/index.js
Component Name      :    Text fieldWithIcon
Functionality       :    To use this component to add Icon with text field

#################################################################################################################*/
import { Grid } from "@mui/material";
import Icon from "@mui/material/Icon";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";
import TextField from "../Textfield";

const useTextFieldWithIcon = makeStyles((theme) => ({
  outerGrid: {
    display: "inline-flex",
    width: "100%"
  },
  innerGrid: {
    paddingTop: "20px",
    paddingRight: "10px"
  },
  textFieldGrid: {
    paddingTop: "20px",
    paddingLeft: "10px"
  }
}))


const TextFieldWithIconWrapper = ({
  icon,
  iconPosition,
  iconColor,
  //get dynamic icon name
  ...otherProps
}) => {

  //Configuring the field properties
  const configTextField = {
    ...otherProps,
  };
  const classes = useTextFieldWithIcon()

  //View part
  return (
    <div>
      <Grid container item xs={12} direction="row" className={classes.outerGrid}>
        {iconPosition === "left" || !iconPosition ? (
          <Grid className={classes.innerGrid}>
            <Icon data-test-id="icon" >
              {" "}
              {icon}
            </Icon>
          </Grid>
        ) : (
          ""
        )}
        <TextField {...configTextField} />
        {iconPosition === "right" ? (
          <Grid className={classes.textFieldGrid}>
            <Icon data-testid="icon" >{icon}</Icon>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
};

TextFieldWithIconWrapper.propTypes = {
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  iconColor: PropTypes.string,
};

export default TextFieldWithIconWrapper;
