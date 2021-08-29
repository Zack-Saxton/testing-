/*#################################################################################################################

File Name           :    ButtonSecondary/index.js
Component Name      :    Button
Functionality       :    To use this button as a default component for UI purpose across the whole application to 
                          maintain same consistency.

#################################################################################################################*/

import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ButtonSecondary = ({
  children,
  stylebutton,
  background,
  
  ...otherProps
}) => {
  //Styling Part
  const useStyles = makeStyles((theme) => ({
    buttoncolor: {
        color: "#214476",
        background: "#fff",
        fontFamily: "Segoe UI",
        borderRadius: "50px",
        borderColor: "#214476",
        border: "1px solid",
        textTransform: "capitalize",
        height: "36px",
        fontWeight: "normal",
        boxShadow:` 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12), 0 1px 5px 0 rgba(0, 0, 0, .2)`,
       
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
    className: classes.buttoncolor,
    ...otherProps
  };

  //parsing data using json
  let stylebuttonMF = JSON.parse(stylebutton);

  //View Part
  return (
    <Button {...configButton}  style={ stylebuttonMF }>
      {children}
    </Button>
  );
};

export default ButtonSecondary;
