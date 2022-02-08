import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MoreIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import Logo from "../../../assets/images/MarinerLogo.png";
import { useStyles } from "./NormalHeaderStyle";

const NormalHeader = () => {
  const classes = useStyles();
  const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = React.useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const history = useHistory();

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
        <Typography className={ classes.headerAlign }>
          <a
            href=" https://loans.marinerfinance.com/branchlocatorpage"
            className="hrefTag"
          >
            Branch Locator
          </a>
        </Typography>
      </MenuItem>
    </Menu>
  );

  const redirectToAccountOverview = () => {
    history.push({
      pathname: "/customers/accountOverview",
    });
  };

  //View Part
  return (
    <div className={ classes.grow }>
      <AppBar id="MainHeaderWrap" position="static">
        <Toolbar className={ classes.toolbar }>
          <Typography onClick={ redirectToAccountOverview } className={ classes.title }>
            <img className={ classes.logoFormat } src={ Logo } alt="MF logo" />
          </Typography>
          <div className={ classes.grow } />
          <div className={ classes.sectionDesktop }>
            <Typography className={ classes.subtitle }>
              <a href="https://www.marinerfinance.com/blog" className="hrefTag">
                Blogs
              </a>
            </Typography>
            <NavLink to="/faq" style={ { textDecoration: "none" } }>
              <Typography className={ classes.subtitle }>FAQ</Typography>
            </NavLink>
            <Typography style={ { paddingRight: "0px" } } className={ classes.subtitle }>
              <a
                href=" https://loans.marinerfinance.com/branchlocatorpage"
                className="hrefTag"
              >
                Branch Locator
              </a>
            </Typography>
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

export default NormalHeader;
