/*#################################################################################################################

File Name           :    RadioButtonBox/index.js
Component Name      :    RadioButtonBox
Functionality       :    To use this Radio button as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/

import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";

const RadioButtonBoxWrapper = ({
  children,
  stylebutton,
  type,
  ...otherProps
}) => {

  //Styling Part
  const useStyles = makeStyles((theme) => ({
    buttonColor: {
      fontFamily: "sans-serif",
      textTransform: "capitalize",
      width: 100,
      border: "1px solid #0F4EB3",
      background: "#fff",
      minWidth: "100% !important",
      lineHeight: 2,
      cursor: "pointer",
      display: "block",
    },
  }));

  const classes = useStyles();

  //Configuring Field with Properties
  const configRadioButtonBox = {
    variant: "contained",
    fullWidth: true,
    className: classes.buttonColor,
    type: type,
    ...otherProps,
  };

  //parsing data using json
  let styleButtonMF = JSON.parse(stylebutton);

  //View Part
  return (
    <Button {...configRadioButtonBox} style={styleButtonMF}>
      {children}
    </Button>
  );
};

RadioButtonBoxWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]),
  stylebutton: PropTypes.string,
  type: PropTypes.string
};

export default RadioButtonBoxWrapper;
