import React from "react";
import { NavLink, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from "../../../assets/images/MarinerLogo.png";
import {useStyles} from "./Normalheaderstyle"
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
  
  
const NormalHeader = () => {


    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(false);    
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const history = useHistory();
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

const handleMobileMenuOpen = (event) => {
    console.log(event)
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const logoutUser = () => {

    let tokenData = {isLoggedIn: false};
		localStorage.setItem('token', JSON.stringify(tokenData));
    history.push({
			pathname: "/login",
		});

  };


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      <Typography  variant="" className={classes.headeralign} >
            Blog
          </Typography>         
      </MenuItem>
      <MenuItem>
      <Typography variant="" className={classes.headeralign}>
            FAQ's
          </Typography>
      </MenuItem>
      <MenuItem>
      <Typography variant="" className={classes.headeralign}>
            Branch Locator
          </Typography>
      </MenuItem>
      <MenuItem>
      <NavLink to='/select-amount'className={classes.navlink}  >
          <Typography className={classes.headeralign} >
            Check My Offers
          </Typography>
          </NavLink>
          </MenuItem>
          <MenuItem>
          {userToken?.isLoggedIn ? 
          <Typography className={classes.subtitle} onClick={logoutUser} >
            Logout
          </Typography> : 
          <NavLink to='/login'style={{'textDecoration':'none'}} >
          <Typography className={classes.subtitle} >
            Login
          </Typography>
          </NavLink> }
          </MenuItem>
     
      </Menu>
      )

  //View Part
  return (
    <div className={classes.grow}>
    <AppBar position="static">
        <Toolbar className={classes.toolbar}>
        <Typography  className={classes.title}>
       <img className={classes.logoFormat} src={Logo} alt="MF logo" />
       </Typography>
       <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
       
          <Typography className={classes.subtitle} >
            Blog
          </Typography>
          <Typography className={classes.subtitle} >
            FAQ'S
          </Typography>
          <Typography className={classes.subtitle} >
            Branch Locator
          </Typography>
          <NavLink to='/customers/accountoverview'style={{'textDecoration':'none'}} >
          <Typography className={classes.subtitle} >
            Main UI
          </Typography>
          </NavLink>
          <NavLink to='/components'style={{'textDecoration':'none'}} >
          <Typography className={classes.subtitle} >
            Components
          </Typography>
          </NavLink>
          <NavLink to='/select-amount'style={{'textDecoration':'none'}} >
          <Typography className={classes.subtitle} >
            Check My Offers
          </Typography>
          </NavLink>
          {userToken?.isLoggedIn ? 
          <Typography className={classes.subtitle} onClick={logoutUser} >
            Logout
          </Typography> : 
          <NavLink to='/login'style={{'textDecoration':'none'}} >
          <Typography className={classes.subtitle} >
            Login
          </Typography>
          </NavLink> }
          {/* <NavLink to='/login'style={{'textDecoration':'none'}} >
          <Typography className={classes.subtitle} >
            Login
          </Typography>
          </NavLink> */}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}

    </div>
  ); 


  }

  export default NormalHeader;