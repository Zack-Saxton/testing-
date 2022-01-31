/*#################################################################################################################

File Name           :    Button/index.js
Component Name      :    Button
Functionality       :    To use this button as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const ButtonWrapper = ({
  children,
  stylebutton,
  background,
  onClick,
  ...otherProps
}) => {
  //Styling Part
  const useStyles = makeStyles((theme) => ({
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
    <Button { ...configButton } onClick={ onClick } style={ styleButtonMF }>
      { children }
    </Button>
  );
};

export default ButtonWrapper;
