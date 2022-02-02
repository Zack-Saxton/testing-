/*#################################################################################################################

File Name           :    Text fieldWithIcon/index.js
Component Name      :    Text fieldWithIcon
Functionality       :    To use this component to add Icon with text field

#################################################################################################################*/
import { Grid } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import React from "react";
import TextField from "../Textfield";

const TextFieldWithIconWrapper = ({
  icon,
  iconPosition,
  iconColor,
  customClass,
  //get dynamic icon name
  ...otherProps
}) => {

  //Configuring the field properties
  const configTextField = {
    ...otherProps,
  };

  //View part
  return (
    <div>
      <Grid container item xs={ 12 } direction="row" style={ { display: "inline-flex", width: "100%" } }>
        { iconPosition === "left" || !iconPosition ? (
          <Grid style={ { paddingTop: "20px", paddingRight: "10px" } }>
            <Icon data-test-id="icon" >
              { " " }
              { icon }
            </Icon>
          </Grid>
        ) : (
          ""
        ) }
        <TextField { ...configTextField } />
        { iconPosition === "right" ? (
          <Grid style={ { paddingTop: "20px", paddingLeft: "10px" } }>
            <Icon data-test-id="icon" >{ icon }</Icon>
          </Grid>
        ) : (
          ""
        ) }
      </Grid>
    </div>
  );
};

export default TextFieldWithIconWrapper;
