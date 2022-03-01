/*#################################################################################################################

File Name           :    ButtonPrimary/index.js
Component Name      :    Button
Functionality       :    To use this button as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import PropTypes from "prop-types";

const ButtonPrimary = ({
  children,
  stylebutton,
  ...otherProps
}) => {
  //Styling Part
  const useStyles = makeStyles((theme) => ({
    buttonColor: {
      color: "black",
      background: "#ffbc23",
      fontFamily: "'Muli', sans-serif !important",
      borderRadius: "50px",
      textTransform: "capitalize",
      height: "36px",
      whiteSpace: "nowrap",
      fontWeight: "normal",
      boxShadow: ` 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12), 0 1px 5px 0 rgba(0, 0, 0, .2)`,

      width: "auto",
      '&:hover': {
        background: '#ffbc23',
        color: 'black',
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
    <Button { ...configButton } style={ styleButtonMF } >
      { children }
    </Button>
  );
};

ButtonPrimary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]),
  stylebutton: PropTypes.string,
};

export default ButtonPrimary;
