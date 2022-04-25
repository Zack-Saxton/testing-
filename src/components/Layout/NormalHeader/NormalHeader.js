import MoreIcon from "@mui/icons-material/MoreVert";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/images/mf-logo.png";
import "../Layout.css";
import { useStyles } from "./NormalHeaderStyle";

const NormalHeader = () => {
  const classes = useStyles();
  const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //Menu open & close
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  //Menu button on mobile view
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Typography className={classes.headerAlign}>
          <a href={`${ process.env.REACT_APP_WEBSITE }/blog/`} target="_blank" className="hrefTag" rel="noreferrer">
            Blog
          </a>
        </Typography>
      </MenuItem>
      <MenuItem >
        <NavLink to="/faq" className="nav_link ">
          <Typography className={classes.headerAlign}>FAQ</Typography>
        </NavLink>
      </MenuItem>
      <MenuItem >
        <NavLink to="/branch-locator" className="nav_link">
          <Typography className={classes.headerAlign}>Branch Locator</Typography>
        </NavLink>
      </MenuItem>
    </Menu>
  );

  const redirectToAccountOverview = () => {
    window.open(`${ process.env.REACT_APP_WEBSITE }`, "_blank");
  };

  //View Part
  return (
    <div id="headerWrap" className={classes.grow}>
      <AppBar id="MainHeaderWrap" position="static">
        <Toolbar className="headerToolBar">
          <Typography onClick={redirectToAccountOverview} className={classes.title}>
            <img className={classes.logoFormat} src={Logo} alt="MF logo" />
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography id="blogsLink" className={classes.subtitle}>
              <a href={`${ process.env.REACT_APP_WEBSITE }/blog/`} target="_blank" className="hrefTag" rel="noreferrer">
                Blog
              </a>
            </Typography>
            <NavLink className="faqLink" to="/faq"  >
              <Typography className={classes.subtitle}>FAQ</Typography>
            </NavLink>
            <NavLink to="/branch-locator" className="nav_link branchLocatorLink">
              <Typography className={classes.subtitle}>Branch Locator</Typography>
            </NavLink>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              className={classes.moreIconButton}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};

export default NormalHeader;
