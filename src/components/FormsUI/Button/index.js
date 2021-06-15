/*#################################################################################################################

File Name           :    Button/index.js
Component Name      :    Button
Functionality       :    To use this button as a default component for UI purpose across the whole application to 
                          maintain same consistency.

#################################################################################################################*/

import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ButtonWrapper = ({
  children,
  stylebutton,
  background,
  ...otherProps
}) => {
  //Styling Part
  const useStyles = makeStyles((theme) => ({
    buttoncolor: {
      color: "#fff",
      background: "blue",
      fontFamily: "sans-serif",
      borderRadius: 150,
      textTransform: "capitalize",
    },
  }));
  const classes = useStyles();

  //Configuring Field with Properties
  const configButton = {
    variant: "contained",
    fullWidth: true,
    className: classes.buttoncolor,
  };

  //parsing data using json
  let stylebutton1 = JSON.parse(stylebutton);

  //View Part
  return (
    <Button {...configButton} style={{ stylebutton1 }}>
      {children}
    </Button>
  );
};

export default ButtonWrapper;
