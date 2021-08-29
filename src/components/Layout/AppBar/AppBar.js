import React from "react";
import clsx from "clsx";
import "./appbar.css";
import { makeStyles } from "@material-ui/core/styles";
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
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import ListIcon from "@material-ui/icons/List";
import DataUsageOutlinedIcon from "@material-ui/icons/DataUsageOutlined";
import { Checkbox } from "@material-ui/core";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import logoicon from "../../../assets/images/Favicon.png";
import logoimage from "../../../assets/images/Normallogo.png";
import { NavLink, useHistory } from "react-router-dom";
import quickpay from "../../../assets/images/quickpay.png";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  // appBarShift: {
  //   // marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
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
  headeralign: {
    margin: "12px",
  },
  // sectionDesktop: {
  //   // display: 'none',
  //   [theme.breakpoints.up('md')]: {
  //     display: 'flex',
  //   },
  // },
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
      boxShadow: `3px 3px 10px 0 rgb(123 31 162 / 50%)`
  }
}));

export default function Sidenav() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const history = useHistory();

  const handleDrawer = () => {
    console.log("close");
    console.log(checked);
    if (checked === false) {
      let menuvalue = document.getElementById("close").getAttribute("value");
      if (menuvalue === "close") {
        setOpen(true);
        document.getElementById("close").setAttribute("value", "open");
      } else {
        setOpen(false);
        document.getElementById("close").setAttribute("value", "close");
      }
      var child = document.getElementById("close");
      var parent = document.getElementById("close2");
      console.log(parent.offsetWidth);
      if (parent.offsetWidth > 73) {
        child.style.display = "block";
      } else {
        child.style.display = "none";
      }
      if (checked === false) {
        document.getElementById("main").style.marginLeft = '73px';
        // document.getElementById("main").style.width = "100%";
      } else {
        document.getElementById("main").style.marginLeft = "240px";
        // document.getElementById("main").style.width = "95%";
      }
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {

    setAnchorEl(null);
    let userToken = {isLoggedIn: false};
		localStorage.setItem('token', JSON.stringify(userToken));
    history.push({
			pathname: "/login",
		});

  };

  const [checked, setChecked] = React.useState(false);

  const handleChangeCheckbox = (event) => {
    if (event.target.checked === "false") {
      document.getElementById("main").style.marginLeft = "73px";
      // document.getElementById("main").style.width = "100%";
    } else {
      document.getElementById("main").style.marginLeft = "240px";
      // document.getElementById("main").style.width = "95%";
    }
    setChecked(event.target.checked);
  };

  const menuId = "primary-search-account-menu";

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
      <NavLink to="/login" style={{ textDecoration: "none" }}>
        <MenuItem onClick={logoutUser}>Log Out</MenuItem>
      </NavLink>
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

  return (
    <div className={classes.grow}>
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
            onClick={handleDrawer}
            id="close1"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.grow} />
          <div
            id="toolbarlist"
            style={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            <Typography variant="" className={classes.headeralign}>
              Blog
            </Typography>

            <Typography variant="" className={classes.headeralign}>
              FAQ's
            </Typography>

            <Typography variant="" className={classes.headeralign}>
              Branch Locator
            </Typography>

            <img
              src={quickpay}
              style={{marginBottom: "-20px"}}
              data-testid="background"
              alt="quickpay"
            />

            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge classes={{ badge: classes.customBadge }} badgeContent={17}>
                <NotificationsIcon />
              </Badge>
            </IconButton>

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
          // onMouseLeave={}
        >
          <div className={classes.toolbar}>
            <img src={logoimage} alt="logoimage" style={{ height: "60px" }} />

            <Checkbox
              icon={<CircleUnchecked id="sidemenuradio" />}
              checkedIcon={<CircleCheckedFilled />}
              onClick={handleChangeCheckbox}
              name="sidemenuradio"
              checked={checked}
            />
            <div value="close" id="close">
              <img
                src={logoicon}
                alt="logoicon"
                className={classes.logo}
                style={{ margin: "13px" }}
              />
            </div>
          </div>
          <Divider />
          <List >
            <NavLink
              to="/customers/accountoverview"
              style={{ textDecoration: "none" }}
            >
              <ListItem 
              // button
              //  selected={true}
              //  classes={{ selected: classes.activeNavbar }}
                 >
                <ListItemIcon>
                  {" "}
                  <AssignmentTurnedInOutlinedIcon />{" "}
                </ListItemIcon>
                <ListItemText>Account Overview </ListItemText>
              </ListItem>
            </NavLink>

            <NavLink
              to="/customers/makepayment"
              style={{ textDecoration: "none" }}
            >
              <ListItem 
              //  selected={true}
              //  classes={{ selected: classes.activeNavbar }}
               style={{ textDecoration: "none" }}>
                <ListItemIcon>
                  {" "}
                  <AccountBalanceWalletIcon />{" "}
                </ListItemIcon>
                <ListItemText style={{ textDecoration: "none" }}>
                  Make a Payment{" "}
                </ListItemText>
              </ListItem>
            </NavLink>

            <NavLink
              to="/customers/selectoffer"
              style={{ textDecoration: "none" }}
            >
              <ListItem>
                <ListItemIcon>
                  {" "}
                  <MonetizationOnRoundedIcon />{" "}
                </ListItemIcon>
                <ListItemText> Apply for a Loan </ListItemText>
              </ListItem>
            </NavLink>

            <NavLink
              to="/customers/loandocument"
              style={{ textDecoration: "none" }}
            >
              <ListItem>
                <ListItemIcon>
                  {" "}
                  <DescriptionOutlinedIcon />{" "}
                </ListItemIcon>
                <ListItemText> Loan Document </ListItemText>
              </ListItem>
            </NavLink>

            <NavLink to="/customers/mybranch" style={{ textDecoration: "none" }}>
              <ListItem>
                <ListItemIcon>
                  {" "}
                  <AccountBalanceIcon />{" "}
                </ListItemIcon>
                <ListItemText> My Branch</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink
              to="/customers/myprofile"
              style={{ textDecoration: "none" }}
            >
              <ListItem>
                <ListItemIcon>
                  {" "}
                  <AccountCircleIcon />{" "}
                </ListItemIcon>
                <ListItemText> My Profile</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink
              to="/customers/loanhistory"
              style={{ textDecoration: "none" }}
            >
              <ListItem>
                <ListItemIcon>
                  {" "}
                  <ListIcon />{" "}
                </ListItemIcon>
                <ListItemText> Loan History</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink
              to="/customers/vantagescore"
              style={{ textDecoration: "none" }}
            >
              <ListItem>
                <ListItemIcon>
                  {" "}
                  <InboxIcon />{" "}
                </ListItemIcon>
                <ListItemText> VantageScore</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink
              to="/customers/moneyskill"
              style={{ textDecoration: "none" }}
            >
              <ListItem>
                <ListItemIcon>
                  {" "}
                  <DataUsageOutlinedIcon />{" "}
                </ListItemIcon>
                <ListItemText> MoneySkill </ListItemText>
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
      </div>
    </div>
  );
}
