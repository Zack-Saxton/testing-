/*#################################################################################################################

File Name           :    ButtonWithIcon/index.js
Component Name      :    ButtonWithIcon
Functionality       :    To use this ButtonWithIcon as a default component for UI purpose across the whole application to 
                          maintain same consistency.

#################################################################################################################*/

import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const ButtonWithIcon = ({
  children,
  icon,
  iconposition,
  stylebutton,
  styleicon,
  ...otherProps
}) => {
  
  //Styling Part
  const useStyles = makeStyles((theme) => ({
    buttoncolor: {
      color: "#171717",
      background: "#ffbc23",
      fontFamily: "sans-serif",
      textTransform: "capitalize",
      width: "auto",
    },
  }));

  const classes = useStyles();

  //Configuring Field with Properties
  const configButton = {
    variant: "contained",
    fullWidth: true,
    className: classes.buttoncolor,
    ...otherProps,
  };

  //parsing data using json
  let stylebuttonMF = JSON.parse(stylebutton);
  let styleiconMF = JSON.parse(styleicon);

  //View Part
  return (
    <Button {...configButton} style={stylebuttonMF}>
      {iconposition === "left" ? <Icon style={styleiconMF} data-testid= "icon">{icon}</Icon> : ""}
      {children}
      {iconposition === "right" ? <Icon style={styleiconMF} data-testid= "icon">{icon}</Icon> : ""}
    </Button>
  );
};

export default ButtonWithIcon;
