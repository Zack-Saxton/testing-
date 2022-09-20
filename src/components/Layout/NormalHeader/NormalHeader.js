import MoreIcon from "@mui/icons-material/MoreVert";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/images/mf-logo.png";
import "../Layout.css";
import { useStyles } from "./NormalHeaderStyle";

const NormalHeader = () => {
  const classes = useStyles();
  const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const loginToken = JSON.parse(
    Cookies.get("token") ? Cookies.get("token") : "{ }"
  );
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
      data-testid="mobileMenu"
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
          <a data-testid="blogNavigation" href={`${ process.env.REACT_APP_WEBSITE }/blog/`} className="hrefTag" rel="noreferrer">
            Blog
          </a>
        </Typography>
      </MenuItem>
      <MenuItem >
        <a rel="noreferrer" data-testid="faqMobileNavigation" href={`${ process.env.REACT_APP_WEBSITE }/resources/faq/`} className="nav_link ">
          <Typography className={classes.headerAlign}>FAQ</Typography>
        </a>
      </MenuItem>
      <MenuItem >
        <NavLink data-testid="branchLocatorMobileNavigation" to="/branch-locator" className="nav_link">
          <Typography className={classes.headerAlign}>Branch Locator</Typography>
        </NavLink>
      </MenuItem>
      <MenuItem className="MenuListMain" style={loginToken?.isLoggedIn || window?.location?.pathname === '/login' ? { display: "none" } : { display: "inline-flex" }} >
      <NavLink data-testid="loginNavigation" to="/login" className="nav_link loginLink">
              <Typography className={classes.subtitle}>Login</Typography>
            </NavLink>
      </MenuItem>
    </Menu>
  );

  const redirectToAccountOverview = () => {
    window.open(`${ process.env.REACT_APP_WEBSITE }`, "_self");
  };

  //View Part
  return (
    <div id="headerWrap" data-testid="pre_login_component" className={classes.grow}>
      <AppBar id="MainHeaderWrap" position="static">
        <Toolbar className="headerToolBar">
          <Typography onClick={redirectToAccountOverview} className={classes.title}>
            <img data-testid="MF_logo" className={classes.logoFormat} src={Logo} alt="MF logo" />
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography id="blogsLink" className={classes.subtitle}>
              <a data-testid="blogsLink" href={`${ process.env.REACT_APP_WEBSITE }/blog/`} className="hrefTag" rel="noreferrer">
                Blog
              </a>
            </Typography>
            <a rel="noreferrer" data-testid="faqNavigation" className="faqLink" href={`${ process.env.REACT_APP_WEBSITE }/resources/faq/`} >
              <Typography className={classes.subtitle}>FAQ</Typography>
            </a>
            <NavLink data-testid="branchLocatorNavigation" to="/branch-locator" className="nav_link branchLocatorLink">
              <Typography className={classes.subtitle}>Branch Locator</Typography>
            </NavLink>
            <NavLink style={loginToken?.isLoggedIn || window?.location?.pathname === '/login' ? { display: "none" } : { display: "block" }} data-testid="loginMobileNavigation" to="/login" className="nav_link branchLocatorLink logInLink">
              <Typography className={classes.subtitle}>Login</Typography>
            </NavLink>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              data-testid="moreIcon"
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
