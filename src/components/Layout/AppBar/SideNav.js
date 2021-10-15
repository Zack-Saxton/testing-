import React from "react";
import clsx from "clsx";
import "./SideNav.css";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined"; 
import ListIcon from "@material-ui/icons/List";
import CallIcon from "@material-ui/icons/Call"
import DataUsageOutlinedIcon from "@material-ui/icons/DataUsageOutlined";
import { Checkbox } from "@material-ui/core";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import logoIcon from "../../../assets/images/Favicon.png";
import logoImage from "../../../assets/images/Normallogo.png";
import { NavLink, useHistory } from "react-router-dom";
import quickPay from "../../../assets/images/quickpay.png";
import profileImg from "../../../assets/images/profile-img.png"
import Notification from "../Notification/Notification"
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import MoneySkill from "../../Pages/MoneySkill/MoneySkill";

const drawerWidth = 240; 

//Material UI css
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
  },
  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("xs")]: {
      width: "0px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "0px",
    },
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(9) + 1,
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing(9) + 1,
    },
    [theme.breakpoints.up("xl")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  customBadge: {
    backgroundColor: "#ffd524",
    color: "black",
  },

  logo: {
    maxWidth: 40,
  },
  inputRoot: {
    color: "inherit",
  },
  headerAlign: {
    margin: "12px",
  },

  branchLocator: {
    "@media (max-width: 700px)": {
      width: "min-content",
    },
  },
  headerimg: {
    width: "40px",
    marginBottom: "-20px",
  },
  headerimgResp: {
    "@media (max-width: 700px)": {
      width: "25px",
    },
  },

  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  activeNavbar: {
    background: `linear-gradient(
      85deg
      , #264266, #0F4EB3) !important;
      color:white!important`,
    width: "220px",
    borderRadius: "0 5px 5px 0",
    boxShadow: `3px 3px 10px 0 rgb(123 31 162 / 50%)`,
  },
}));

export default function SideNav() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const history = useHistory();
  const [disable, setDisable] = React.useState(false);
  const [skill, setSkill] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

//Material UI media query for responsiveness
  let check = useMediaQuery("(min-width:960px)");

  React.useEffect(() => {
    if (check === true && checked === true) {
      setChecked(true);
      setOpen(true);
      document.getElementById("main").style.marginLeft = "240px";
      document.getElementById("close").style.display = "none";
    } else {
      setOpen(false);
    }
  }, [checked, check]);

  const branchName = localStorage.getItem('branchname');
  const branchPhone = localStorage.getItem('branchphone');
  const branchcloseStatus = localStorage.getItem('branchopenstatus');
  
//Side bar open on mouse event
  const handleDrawer = () => {
    const closeElementId = "close";
    const valueQualifiedName = "value";

    if (checked === false || check === false) {
      let menuValue = document
        .getElementById(closeElementId)
        .getAttribute(valueQualifiedName);
      if (menuValue === closeElementId) {
        setOpen(true);
        document
          .getElementById(closeElementId)
          .setAttribute(valueQualifiedName, "open");
      } else {
        setOpen(false);
        document
          .getElementById(closeElementId)
          .setAttribute(valueQualifiedName, closeElementId);
      }
      const child = document.getElementById(closeElementId);
      const parent = document.getElementById("close2");
      if (parent.offsetWidth > 73) {
        child.style.display = "block";
      } else {
        child.style.display = "none";
      }
      if (checked === false || check === false) {
        document.getElementById("main").style.marginLeft = "73px";
      } else {
        document.getElementById("main").style.marginLeft = "240px";
      }
      var profiledetailTag = document.getElementById("profileDetails");
      profiledetailTag.style.display = "block";
    }
  };

//Side bar close on mouse event

  const handleDrawerleave = () => {
    const closeElementId = "close";
    const valueQualifiedName = "value";

    if (checked === false || check === false) {
      let menuValue = document
        .getElementById(closeElementId)
        .getAttribute(valueQualifiedName);

      if (menuValue === closeElementId) {
        setOpen(true);
        document
          .getElementById(closeElementId)
          .setAttribute(valueQualifiedName, "close");
      } else {
        setOpen(false);
        document
          .getElementById(closeElementId)
          .setAttribute(valueQualifiedName, closeElementId);
      }
      const child = document.getElementById(closeElementId);
      const parent = document.getElementById("close2");
      if (parent.offsetWidth > 73) {
        child.style.display = "block";
      } else {
        child.style.display = "none";
      }
      if (checked === false || check === false) {
        document.getElementById("main").style.marginLeft = "73px";
      } else {
        document.getElementById("main").style.marginLeft = "240px";
      }
      
    var profiledetailTag = document.getElementById("profileDetails");
    profiledetailTag.style.display = "none";
    }
  };

//Menu button on mouse view
  const handleMenuButtonOpen = () => {
    if (check === false) {
      document.getElementById("close2").style.display = "block ";

      setOpen(true);
    }
  };

//Money skill popup
  const handleMoneySkillNav = () => {
    setSkill(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    if (checked === false || check === false) {
      setOpen(false);
    }
  };

  const logOut = () => {
    setAnchorEl(null);
    let userToken = { isLoggedIn: false };
    localStorage.setItem("token", JSON.stringify(userToken));

    history.push({
      pathname: "/login",
    });
  };

  const logoutUser = () => {
    setDisable(true);
    toast.success("You are being logged out of the system", {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => logOut(),
    });
  };

//Side bar enable and disable
  const handleChangeCheckbox = (event) => {
    if (event.target.checked === "false") {
      document.getElementById("main").style.marginLeft = "73px";
    } else {
      document.getElementById("main").style.marginLeft = "240px";
    }

    setChecked(event.target.checked);
  };

  
  const menuId = "primary-search-account-menu";

//Menu bar 
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={logoutUser} disabled={disable}>
        Log Out
      </MenuItem>
    </Menu>
  );

  <Menu>
    <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
      >
        <SettingsIcon />
      </IconButton>
      <p>Settings</p>
    </MenuItem>
  </Menu>;

//View part
  return (
    <div className={classes.grow}>
      <ToastContainer
        toastStyle={{ backgroundColor: "green", color: "white" }}
      />
      <AppBar
        position="absolute"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar id="toolbar">
          <IconButton
            aria-label="open drawer"
            onClick={handleMenuButtonOpen}
            id="close1"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.grow} />
          <div
            id="tool-bar-list"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
            }}
          >
            <Typography className={classes.headerAlign}>
              <a
                href="https://www.marinerfinance.com/blog"
                style={{ color: "white" }}
                className="hrefTag"
              >
                Blog
              </a>
            </Typography>

            <NavLink
              to="/customers/faq"
              className="nav_link"
              style={{ color: "white" }}
            >
              <Typography className={classes.headerAlign}>FAQ's</Typography>
            </NavLink>

            <Typography
              className={clsx(classes.headerAlign, classes.branchLocator)}
            >
              <a
                href=" https://cis-qa.marinerfinance.io/branchlocatorpage"
                style={{ color: "white" }}
                className="hrefTag"
              >
                Branch Locator
              </a>
            </Typography>

            <img
              className={clsx(classes.headerimg, classes.headerimgResp)}
              src={quickPay}
              data-test-id="background"
              alt="quick pay"
            />

            <Notification />

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMenu}
      <div className={classes.sectionDrawer}>
        <Drawer
          id="close2"
          variant="permanent"
          onClick={handleMobileMenuClose}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          onMouseEnter={handleDrawer}
          onMouseLeave={handleDrawerleave}
        >
          <div className={classes.toolbar}>
            <input
              type="image"
              src={logoImage}
              alt="logo image"
              style={{ height: "60px" }}
            />

            <Checkbox
              icon={<CircleUnchecked id="sidemenuRadio" />}
              checkedIcon={<CircleCheckedFilled id="sidemenuRadio" />}
              onClick={handleChangeCheckbox}
              name="sidemenuradio"
              checked={checked}
            />

            <div id="close" style={{ display: "none" }}>
              <img
                src={logoIcon}
                alt="logo icon"
                className={classes.logo}
                style={{ margin: "13px" }}
              />
            </div>
          </div>
          <Divider />
          <List onClick={handleMobileMenuClose}>
            <ListItem id="profileDetails" className="profileDetails">
              <List >
              <ListItem>
                <img id="sidebarProfilePic" src={profileImg} alt="Profile Pic" />
              </ListItem> 
              <ListItem id="sidemenuBranch">  
                  {branchName === '' || undefined ? '' : 'Branch : '+ branchName}  
              </ListItem>               
              <ListItem id={branchcloseStatus === 'null' ? 'sidemenuOpenNow' : 'sidemenuCloseNow'} >  
                {branchcloseStatus === 'null' ? 'Open Now' : 'Closed Now'}
              </ListItem> 
              {branchPhone === '' || undefined  ? '' :  
              <ListItem id="sidemenuPhone"> 
                  <CallIcon />  
                  {branchPhone}
              </ListItem> 
              }  
              </List>
            </ListItem>
            <NavLink to="/customers/accountOverview" className="nav_link">
              <ListItem className="titleSidenav">
                <ListItemIcon>
                  {" "}
                  <AssignmentTurnedInOutlinedIcon />{" "}
                </ListItemIcon>
                Account Overview
              </ListItem>
            </NavLink>

            <NavLink to="/customers/makePayment" className="nav_link">
              <ListItem className="titleSidenav">
                <ListItemIcon>
                  {" "}
                  <AccountBalanceWalletIcon />{" "}
                </ListItemIcon>
                <ListItemText style={{ textDecoration: "none" }}>
                  Make a Payment{" "}
                </ListItemText>
              </ListItem>
            </NavLink>

            <NavLink to="/customers/selectOffer" className="nav_link">
              <ListItem className="titleSidenav">
                <ListItemIcon>
                  {" "}
                  <MonetizationOnRoundedIcon />{" "}
                </ListItemIcon>
                <ListItemText> Apply for a Loan </ListItemText>
              </ListItem>
            </NavLink>

            <NavLink to="/customers/loanDocument" className="nav_link">
              <ListItem className="titleSidenav">
                <ListItemIcon>
                  {" "}
                  <DescriptionOutlinedIcon />{" "}
                </ListItemIcon>
                <ListItemText> Loan Documents </ListItemText>
              </ListItem>
            </NavLink>

            <NavLink to="/customers/myBranch" className="nav_link">
              <ListItem className="titleSidenav">
                <ListItemIcon>
                  {" "}
                  <AccountBalanceIcon />{" "}
                </ListItemIcon>
                <ListItemText> My Branch</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink to="/customers/myProfile" className="nav_link">
              <ListItem className="titleSidenav">
                <ListItemIcon>
                  {" "}
                  <AccountCircleIcon />{" "}
                </ListItemIcon>
                <ListItemText> My Profile</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink to="/customers/loanHistory" className="nav_link">
              <ListItem className="titleSidenav">
                <ListItemIcon>
                  {" "}
                  <ListIcon />{" "}
                </ListItemIcon>
                <ListItemText> Loan History</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink to="/customers/vantageScore" className="nav_link">
              <ListItem className="titleSidenav">
                <ListItemIcon>
                  {" "}
                  <InboxIcon />{" "}
                </ListItemIcon>
                <ListItemText> VantageScore &reg;</ListItemText>
              </ListItem>
            </NavLink>

            <ListItem id="moneySkillNavLink" onClick={handleMoneySkillNav}>
              <ListItemIcon>
                {" "}
                <DataUsageOutlinedIcon />{" "}
              </ListItemIcon>
              <ListItemText className="titleSidenav">
                {" "}
                MoneySKILL &reg;{" "}
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </div>
      <MoneySkill moneySkill={skill} onChange={setSkill} />
    </div>
  );
}