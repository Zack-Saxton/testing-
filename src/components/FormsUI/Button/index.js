/*#################################################################################################################

File Name           :    Button/index.js
Component Name      :    Button
Functionality       :    To use this button as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/

import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";

const ButtonWrapper = ({
  children,
  stylebutton,
  onClick,
  ...otherProps
}) => {
  //Styling Part
  const useStyles = makeStyles(() => ({
    buttonColor: {
      color: "#fff",
      background: "blue",
      fontFamily: "'Muli', sans-serif !important",
      borderRadius: 150,
      textTransform: "capitalize",
    },
  }));
  const classes = useStyles();

  //Configuring Field with Properties
  const configButton = {
    variant: "contained",
    fullWidth: true,
    className: classes.buttonColor,
    ...otherProps
  };

  //parsing data using json
  let styleButtonMF = JSON.parse(stylebutton);

  //View Part
  return (
    <Button {...configButton} onClick={onClick} style={styleButtonMF}>
      {children}
    </Button>
  );
};

ButtonWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]),
  stylebutton: PropTypes.string,
  onClick: PropTypes.func
};

export default ButtonWrapper;
