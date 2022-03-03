/*#################################################################################################################

File Name           :    ButtonWithIcon/index.js
Component Name      :    ButtonWithIcon
Functionality       :    To use this ButtonWithIcon as a default component for UI purpose across the whole application to
                          maintain same consistency.

#################################################################################################################*/

import { Button } from "@mui/material";
import Icon from "@mui/material/Icon";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";

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
    buttonColor: {
      color: "black",
      background: "#ffbc23",
      fontFamily: "'Muli', sans-serif !important",
      borderRadius: "50px",
      textTransform: "capitalize",
      height: "36px",
      fontSize: "1rem",
      fontWeight: "normal",
      boxShadow: ` 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12), 0 1px 5px 0 rgba(0, 0, 0, .2)`,
      padding: " 0 2rem",
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
    ...otherProps,
  };

  //parsing data using json
  let styleButtonMF = JSON.parse(stylebutton);
  let styleIconMF = JSON.parse(styleicon);

  //View Part
  return (
    <Button { ...configButton } style={ styleButtonMF }>
      { iconposition === "left" ? <Icon style={ styleIconMF } data-testid="icon">{ icon }</Icon> : "" }
      { children }
      { iconposition === "right" ? <Icon style={ styleIconMF } data-testid="icon">{ icon }</Icon> : "" }
    </Button>
  );
};

ButtonWithIcon.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]),
  iconposition: PropTypes.string,
  id: PropTypes.string,
  icon: PropTypes.string,
  stylebutton: PropTypes.string,
  styleicon: PropTypes.string,
};

export default ButtonWithIcon;
