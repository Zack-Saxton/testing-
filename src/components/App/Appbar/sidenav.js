import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import logo from "../../../assets/images/MarinerLogo.png";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import ListIcon from "@material-ui/icons/List";
import DataUsageOutlinedIcon from "@material-ui/icons/DataUsageOutlined";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
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
    [theme.breakpoints.up("sm")]: {
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
    maxWidth: 140,
  },
  inputRoot: {
    color: "inherit",
  },
  headeralign: {
    margin: "12px",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export default function Sidenav() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <img src={logo} alt="logo" className={classes.logo} />

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography variant="" className={classes.headeralign}>
              Blog
            </Typography>

            <Typography variant="" className={classes.headeralign}>
              FAQ's
            </Typography>

            <Typography variant="" className={classes.headeralign}>
              Branch Locator
            </Typography>

            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge classes={{ badge: classes.customBadge }} badgeContent={17}>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
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
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <NavLink to="/customers/accountoverview">
            <ListItem>
              <ListItemIcon>
                {" "}
                <AssignmentTurnedInOutlinedIcon />{" "}
              </ListItemIcon>
              <ListItemText>Account Overview </ListItemText>
            </ListItem>
          </NavLink>

          <ListItem>
            <ListItemIcon>
              {" "}
              <AccountBalanceWalletIcon />{" "}
            </ListItemIcon>
            <ListItemText>Make a Payment </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {" "}
              <MonetizationOnRoundedIcon />{" "}
            </ListItemIcon>
            <ListItemText> Apply for a Loan </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {" "}
              <DescriptionOutlinedIcon />{" "}
            </ListItemIcon>
            <ListItemText> Loan Document </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {" "}
              <AccountBalanceIcon />{" "}
            </ListItemIcon>
            <ListItemText> My Branch</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {" "}
              <AccountCircleIcon />{" "}
            </ListItemIcon>
            <ListItemText> My Profile</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {" "}
              <ListIcon />{" "}
            </ListItemIcon>
            <ListItemText> Loan History</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {" "}
              <InboxIcon />{" "}
            </ListItemIcon>
            <ListItemText> VantageScore</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {" "}
              <DataUsageOutlinedIcon />{" "}
            </ListItemIcon>
            <ListItemText> MoneySkill </ListItemText>
          </ListItem>
        </List>
        {/* <List>
          {['Account Overview', 'Make a Payment', 'Apply for a Loan', 'Loan Document', 'My Branch','My Profile',
          'Loan History', 'VantageScore', 'MoneySKILL'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon> <InboxIcon /> , <AccountBalanceWalletIcon /> , <AccountBalanceIcon /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
    </div>
  );
}
