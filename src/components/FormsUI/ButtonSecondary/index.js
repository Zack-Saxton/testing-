/*#################################################################################################################

File Name           :    ButtonSecondary/index.js
Component Name      :    Button
Functionality       :    To use this button as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/

import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";

const ButtonSecondary = ({
  children,
  stylebutton,
  ...otherProps
}) => {
  //Styling Part
  const useStyles = makeStyles(() => ({
    buttonColor: {
      color: "#214476",
      background: "#fff",
      fontFamily: "'Muli', sans-serif !important",
      borderRadius: "50px",
      borderColor: "#214476",
      border: "1px solid",
      textTransform: "capitalize",
      height: "36px",
      fontWeight: "normal",
      boxShadow: ` 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12), 0 1px 5px 0 rgba(0, 0, 0, .2)`,
      width: "auto",
      '&:hover': {
        backgroundColor: '#214476',
        color: '#fff',
      },
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
    <Button {...configButton} style={styleButtonMF}>
      {children}
    </Button>
  );
};

ButtonSecondary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]),
  stylebutton: PropTypes.string,
};

export default ButtonSecondary;
