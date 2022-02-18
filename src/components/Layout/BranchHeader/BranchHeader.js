import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MoreIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/mf-logo.png";
import { useStyles } from "../NormalHeader/NormalHeaderStyle";
import "./BranchHeader.css"

const BranchHeader = () => {
  const classes = useStyles();
  const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = React.useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();

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
      anchorEl={ mobileMoreAnchorEl }
      anchorOrigin={ { vertical: "top", horizontal: "right" } }
      id={ mobileMenuId }
      keepMounted
      transformOrigin={ { vertical: "top", horizontal: "right" } }
      open={ isMobileMenuOpen }
      onClose={ handleMobileMenuClose }
    >
      <MenuItem>
        <Typography className={ classes.headerAlign }>
          <a href="https://www.marinerfinance.com/blog" className="hrefTag">
            Blog
          </a>
        </Typography>
      </MenuItem>
      <MenuItem>
        <NavLink to="/faq" className="nav_link">
          <Typography className={ classes.headerAlign }>FAQ</Typography>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/branch/branchlocator" className="nav_link">
          <Typography className={classes.headerAlign}>Branch Locator</Typography>
        </NavLink>
      </MenuItem>
    </Menu>
  );

  const redirectToAccountOverview = () => {
    navigate("/customers/accountOverview" );
  };

  //View Part
  return (
    <div className={ classes.grow }>
      <AppBar id="MainHeaderWrap" position="static">
        <Toolbar>
          <Typography style={{height:"79px"}} onClick={ redirectToAccountOverview } className={ classes.title }>
            <img style={{marginTop:"6px"}} className={ classes.logoFormat } src={ Logo } alt="MF logo" />
          </Typography>
          <div className={ classes.grow } />
          <div className={ classes.sectionDesktop }>
            <Typography className={ classes.subtitle }>
              <a href="https://www.marinerfinance.com/blog" className="hrefTag">
                Blog
              </a>
            </Typography>
            <NavLink to="/faq" style={ { textDecoration: "none" } }>
              <Typography className={ classes.subtitle }>FAQ</Typography>
            </NavLink>
            <NavLink to="/branch/branchlocator" className="nav_link">
              <Typography className={classes.subtitle}>Branch Locator</Typography>
            </NavLink>
          </div>
          <div className={ classes.sectionMobile }>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={ handleMobileMenuOpen }
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      { renderMobileMenu }
    </div>
  );
};

export default BranchHeader;
