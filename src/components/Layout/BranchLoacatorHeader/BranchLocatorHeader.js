import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MoreIcon from "@material-ui/icons/MoreVert";
import { ButtonPrimary } from "../../FormsUI";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/mf-logo.png";
import { useStyles } from "../BranchLoacatorHeader/BranchLocatorStyle";
import "../Layout.css"

const BranchLocatorHeader = () => {
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
        <Typography id="blogsLink" className={ classes.headerAlign }>
          <a href="https://www.marinerfinance.com/blog" className="hrefTag">
            Blogs
          </a>
        </Typography>
      </MenuItem>
      <MenuItem className="faqLink">
        <NavLink to="/faq" className="nav_link ">
          <Typography className={ classes.headerAlign }>FAQ</Typography>
        </NavLink>
      </MenuItem>
      <MenuItem className="branchLocatorLink">
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
    <div id="headerWrap" className={ classes.grow }>
      <AppBar id="MainHeaderWrap" position="static">
        <Toolbar className="headerToolBar">
          <Typography onClick={ redirectToAccountOverview } className={ classes.title }>
            <img style={{marginTop:"6px"}} className={ classes.logoFormat } src={ Logo } alt="MF logo" />
          </Typography>
          <div className={ classes.grow } />
          <div className={ classes.sectionDesktop }>
          <NavLink className="branchHeaderLinksFirst" to="/branch/branchlocator" style={ { textDecoration: "none" } }>
              <Typography className={ classes.subtitle }>Personal Loans</Typography>
            </NavLink>
          <NavLink className="branchHeaderLinksFirst" to="/branch/branchlocator" style={ { textDecoration: "none" } }>
              <Typography className={ classes.subtitle }>Car Loans</Typography>
            </NavLink>
          <NavLink className="branchHeaderLinks" to="/branch/branchlocator" style={ { textDecoration: "none" } }>
              <Typography className={ classes.subtitle }>Home Loans</Typography>
            </NavLink>
            <NavLink className="branchHeaderLinks" to="/branch/branchlocator" style={ { textDecoration: "none" } }>
              <Typography className={ classes.subtitle }>Resources</Typography>
            </NavLink>
            <NavLink to="/branch/branchlocator" className="nav_link branchHeaderLinks">
              <Typography className={classes.subtitle}>Why Us?</Typography>
            </NavLink>
            <NavLink to="/branch/branchlocator" className="nav_link branchHeaderLinks">
              <Typography className={classes.subtitle}>Mail Offer?</Typography>
            </NavLink>
            <NavLink to="/login" className="nav_link branchHeaderLinks">
              <Typography className={classes.subtitle}>Login</Typography>
            </NavLink>
            <NavLink to="/customers/applyForLoan" className="nav_link branchHeaderLinksLast">
            <ButtonPrimary
            id="Continue"
            stylebutton='{"fontSize":"1rem","fontWeight":"400","color":"#151147"}'
            target="_blank"
            >
            Check My Offers
            </ButtonPrimary>
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

export default BranchLocatorHeader;
