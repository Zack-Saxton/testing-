import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MoreIcon from "@material-ui/icons/MoreVert";
import React from "react";
import Logo from "../../../assets/images/mf-logo.png";
import "../Layout.css";
import { useStyles } from "./NormalHeaderStyle";

const HeaderWithoutMenu = () => {
  const classes = useStyles();

  const redirectToAccountOverview = () => {
    window.open(`${ process.env.REACT_APP_WEBSITE }`, "_blank");
  };
  //Menu open & close
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  //View Part
  return (
    <div id="headerWrap" className={ classes.grow }>
      <AppBar id="MainHeaderWrap" position="static">
        <Toolbar className="headerToolBar">
          <Typography onClick={ redirectToAccountOverview } className={ classes.title }>
            <img className={ classes.logoFormat } src={ Logo } alt="MF logo" />
          </Typography>
          <div className={ classes.grow } />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderWithoutMenu;
