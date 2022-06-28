import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import React from "react";
import Logo from "../../../assets/images/mf-logo.png";
import "../Layout.css";
import { useStyles } from "./NormalHeaderStyle";

const HeaderWithoutMenu = () => {
  const classes = useStyles();

  const redirectToAccountOverview = () => {
    window.open(`${ process.env.REACT_APP_WEBSITE }`, "_blank");
  };

  //View Part
  return (
    <div id="headerWrap" className={classes.grow}>
      <AppBar id="MainHeaderWrap" position="static">
        <Toolbar className="headerToolBar">
          <Typography onClick={redirectToAccountOverview} className={classes.title}>
            <img  data-testid='mf-logo' className={classes.logoFormat} src={Logo} alt="MF logo" />
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderWithoutMenu;
