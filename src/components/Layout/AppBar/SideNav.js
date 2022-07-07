import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import BookIcon from '@mui/icons-material/Book';
import CallIcon from "@mui/icons-material/Call";
import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ListIcon from "@mui/icons-material/List";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import MenuIcon from "@mui/icons-material/Menu";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SettingsIcon from "@mui/icons-material/Settings";
import { Checkbox } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grow from '@mui/material/Grow';
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useRef, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useQuery, useQueryClient } from "react-query";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import applicationStatusRedirectPage from "../../../assets/data/applicationStatusRedirectPage.json";
import globalMessages from "../../../assets/data/globalMessages.json";
import logoIcon from "../../../assets/images/Favicon.png";
import logoImage from "../../../assets/images/Normallogo.png";
import profileImg from "../../../assets/images/profile-img.jpg";
import quickPay from "../../../assets/images/quickpay.png";
import { CheckMyOffers } from "../../../contexts/CheckMyOffers";
import { useGlobalState } from "../../../contexts/GlobalStateProvider";
import { LoanAccount } from "../../../contexts/LoanAccount";
import { NavContext } from "../../../contexts/NavContext";
import { ProfilePicture } from "../../../contexts/ProfilePicture";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import { verificationSteps } from "../../Controllers/ApplyForLoanController";
import LogoutController from "../../Controllers/LogoutController";
import branchDetails from "../../Controllers/MyBranchController";
import ProfileImageController from "../../Controllers/ProfileImageController";
import MoneySkill from "../../Pages/MoneySkill/MoneySkill";
import Notification from "../Notification/Notification";
import "./SideNav.css";


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
    transition: theme.transitions.create([ "width", "margin" ], {
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
    width: theme.spacing(7),
    [ theme.breakpoints.up("xs") ]: {
      width: "0px",
    },
    [ theme.breakpoints.up("sm") ]: {
      width: "0px",
    },
    [ theme.breakpoints.up("md") ]: {
      width: theme.spacing(9),
    },
    [ theme.breakpoints.up("lg") ]: {
      width: theme.spacing(9),
    },
    [ theme.breakpoints.up("xl") ]: {
      width: theme.spacing(9),
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

  logoIcon: {
    maxWidth: 40,
    margin: "13px"
  },
  inputRoot: {
    color: "inherit",
  },
  headerAlign: {
  },

  branchLocator: {
    "@media (max-width: 700px)": {
      width: "min-content",
    },
  },
  headerimg: {
    height: "55px",
    width: "55px"
  },

  sectionMobile: {
    display: "flex",
    [ theme.breakpoints.up("md") ]: {
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
  logoIconDiv: {
    display: "none"
  },
  textDecoration: {
    textDecoration: "none"
  }
}));

export default function SideNav() {
  const classes = useStyles();
  const [ open, setOpen ] = useState(true);
  const [ anchorEl, setAnchorEl ] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const [ disable, setDisable ] = useState(false);
  const [ skill, setSkill ] = useState(false);
  const [ checked, setChecked ] = useState(true);
  const [ , setProfileTabNumber ] = useGlobalState();
  const { dataProfile, resetProfilePicture } = useContext(ProfilePicture);
  const { resetData } = useContext(CheckMyOffers);
  const { resetLoanAccount } = useContext(LoanAccount);
  const { dataNavmessage } = useContext(NavContext);
  const { data: dataAccountOverview } = useQuery('loan-data', usrAccountDetails);
  const queryClient = useQueryClient();
  const [ activeLoanData, setActiveLoanData ] = useState(true);
  const [ currentLoan, setCurrentLoan ] = useState(true);
  const [ checkPresenceOfLoan, setCheckPresenceOfLoan ] = useState(false);
  const [ checkPresenceOfLoanStatus, setCheckPresenceOfLoanStatus ] = useState('');
  const [ isMobileDevice, setDeviceType ] = useState(false);
  const [ checkFinalVerificationStatus, setCheckFinalVerificationStatus ] = useState(false);
  const { data: verificationStepsApplyforLoan } = useQuery('verification-data', verificationSteps);
  const [ option, setOpenOption ] = React.useState(false);
  const anchorRef = React.useRef(null);
  let refProfileDetails = useRef();
  let refApplyForLoanNav = useRef();
  let refClose2 = useRef();
  let refClose = useRef();
  let loanStatus = [ "under_review", "final_review" ];

  const handleClickAway = () => {
    if (isMobileDevice) {
      setOpen(false);
    }
  };
  const handleDeviceType = (status) => {
    setDeviceType(status);
  };

  useEffect(() => {
    let noOfLoans = dataAccountOverview?.data?.activeLoans?.length;
    let activeLoan = dataAccountOverview?.data?.applicants;
    //logic to check if atleast one active initiated Loan is there or not
    const presenceOfLoan = activeLoan?.some((applicant) => applicant.isActive && applicant?.status !== "referred" && applicant?.status !== "contact_branch");
    const presenceOfLoanStatus = activeLoan?.find((applicant) => applicant?.isActive);
    const userAccountStatus = dataAccountOverview?.data?.customer?.user_account?.status;

    setCheckPresenceOfLoanStatus(presenceOfLoanStatus?.status);
    setCurrentLoan(presenceOfLoan || userAccountStatus === "closed" ? true : false);
    setCheckPresenceOfLoan(presenceOfLoan);
    //logic to if there is any active Loan Data is there or not
    if (!noOfLoans) {
      setActiveLoanData(true);
    } else {
      setActiveLoanData(false);
    }
    return () => {
      setCurrentLoan({});
    };
  }, [ dataAccountOverview, activeLoanData, currentLoan ]);

  const getFinalApplicationStatus = async () => {
    if (
      verificationStepsApplyforLoan?.data?.email &&
      verificationStepsApplyforLoan?.data?.financial_information &&
      verificationStepsApplyforLoan?.data?.id_document &&
      verificationStepsApplyforLoan?.data?.id_photo &&
      verificationStepsApplyforLoan?.data?.id_questions &&
      verificationStepsApplyforLoan?.data?.bank_account_information &&
      verificationStepsApplyforLoan?.data?.bank_account_verification &&
      verificationStepsApplyforLoan?.data?.income_verification
    ) {
      setCheckFinalVerificationStatus(true)
    }
  };
  useEffect(() => {
    getFinalApplicationStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ verificationStepsApplyforLoan ]);

  //Navigating customer according to application status
  let NavUrlResumeApplication = "";
  if (([ 'approved', 'completing_application', 'signature_complete', 'closing_process' ].includes(checkPresenceOfLoanStatus))) {
    NavUrlResumeApplication = checkFinalVerificationStatus ? "/customers/receiveYourMoney" : "/customers/finalverification";
  }
  else if (([ 'offers_available', "offer_selected" ].includes(checkPresenceOfLoanStatus))) {
    NavUrlResumeApplication = checkPresenceOfLoanStatus === "offers_available" ? "/customers/selectOffer" : "/customers/reviewAndSign";
  }
  let pageNavResumeApplication = NavUrlResumeApplication !== "" ? true : false;

  //Material UI media query for responsiveness
  let check = useMediaQuery("(min-width:960px)");

  useEffect(() => {
    if (check && checked) {
      setChecked(true);
      setOpen(true);
      handleDeviceType(false);
      document.getElementById("main").style.marginLeft = "240px";
      document.getElementById("close").style.display = "none";

    } else {
      setOpen(false);
      handleDeviceType(true);
    }
  }, [ checked, check ]);

  //Formating Phone Number
  function formatPhoneNumber(phoneNumber) {
    if (phoneNumber) {
      const cleanNum = phoneNumber.toString().replace(/\D/g, '');
      const match = cleanNum.match(/^(\d{3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        return '(' + match[ 1 ] + ') ' + (match[ 2 ] ? match[ 2 ] + "-" : "") + match[ 3 ];
      }
      return cleanNum;
    }
    else {
      return false;
    }
  }

  //Api call Branch Details
  const { data: branchVal } = useQuery('my-branch', branchDetails);
  const [ branchAvailability, setBranchAvailability ] = useState(false);

  useEffect(() => {
    if (branchVal) {
      setBranchAvailability(branchVal?.data?.branchIsOpen);
    }
  }, [ branchVal ]);

  //Api call Profile Picture
  const { data: profileImage } = useQuery('my-profile-picture', ProfileImageController);
  let getProfImage = profileImage ?? profileImg;

  // Side bar branch details
  Cookies.set('branchname', ((branchVal?.data?.BranchName) ? (branchVal?.data?.BranchName) : (branchVal?.data?.branchName) ? (branchVal?.data?.branchName) : ""));
  Cookies.set('branchphone', branchVal?.data?.PhoneNumber);
  Cookies.set('getProfileImage', getProfImage);

  let hasActiveLoan = (/true/i).test(Cookies.get("hasActiveLoan"));
  let hasApplicationStatus = Cookies.get("hasApplicationStatus");
  let appStatus = [ "rejected", "referred", "expired" ];
  let checkAppStatus = appStatus.includes(hasApplicationStatus);
  let disableField = (checkAppStatus && !hasActiveLoan ? true : !checkAppStatus && !hasActiveLoan ? true : false);
  const branchName = Cookies.get("branchname");
  const branchPhone = Cookies.get('branchphone');
  const getProfileImage = Cookies.get('getProfileImage');

  const lastLoginRaw = JSON.parse(Cookies.get("user") ? Cookies.get("user") : '{ }')?.user?.extensionattributes?.login?.timestamp_date;
  const loginDate = lastLoginRaw ? new Date(lastLoginRaw) : new Date();
  const lastLogin = ((loginDate.getMonth() > 8) ? (loginDate.getMonth() + 1) : ('0' + (loginDate.getMonth() + 1))) + '/' + ((loginDate.getDate() > 9) ? loginDate.getDate() : ('0' + loginDate.getDate())) + '/' + loginDate.getFullYear();


  //Side bar open on mouse event
  const handleDrawer = () => {
    const closeElementId = "close";
    const valueQualifiedName = "value";

    if (!checked || !check) {
      let profiledetailTag = refProfileDetails.current;
      profiledetailTag.style.display = "block";
      let menuValue = refClose.current.getAttribute(valueQualifiedName);

      if (menuValue === closeElementId) {
        setOpen(true);
        refClose.current.setAttribute(valueQualifiedName, "open")
      } else {
        setOpen(false);
        refClose.current.setAttribute(valueQualifiedName, closeElementId)
      }
      const child = refClose.current
      const parent = refClose2.current
      if (parent.offsetWidth > 73) {
        child.style.display = "block";
      } else {
        child.style.display = "none";
      }
      if (!checked || !check) {
        document.getElementById("main").style.marginLeft = "73px";
      } else {
        document.getElementById("main").style.marginLeft = "240px";
      }

    }
  };


  //Side bar close on mouse event
  const handleDrawerleave = () => {
    const closeElementId = "close"
    const valueQualifiedName = "value";

    if (!checked || !check) {
      let profiledetailTag = refProfileDetails.current;
      profiledetailTag.style.display = "none";
      let menuValue = refClose.current.getAttribute(valueQualifiedName);

      if (menuValue === closeElementId) {
        setOpen(true);
        refClose.current.setAttribute(valueQualifiedName, "close")
      } else {
        setOpen(false);
        refClose.current.setAttribute(valueQualifiedName, closeElementId)
      }
      const child = refClose.current
      const parent = refClose2.current

      if (parent.offsetWidth > 73) {
        child.style.display = "block";
      } else {
        child.style.display = "none";
      }
      if (!checked || !check) {
        document.getElementById("main").style.marginLeft = "73px";
      } else {
        document.getElementById("main").style.marginLeft = "240px";
      }
    }
  };

  //Menu button on mouse view
  const handleMenuButtonOpen = () => {
    if (!check) {
      let drawerRefClose2 = refClose2.current
      drawerRefClose2.style.display = "block ";
      setOpen(true);
      let profiledetailTag = refProfileDetails.current;
      profiledetailTag.style.display = "block";
    }
  };

  //Money skill popup
  const handleMoneySkillNav = () => {
    setSkill(true);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    if ((!checked || !check) && window.matchMedia("only screen and (max-width: 760px)").matches ) {
      setOpen(false);
    }
  };

  const handleMenuProfile = (navType) => {
    if (navType === 'top') {
      navigate('/customers/myProfile');
    }
    setProfileTabNumber({ profileTabNumber: 0 });
    handleMenuClose();
  };
  const handleMenuPaymentProfile = () => {
    navigate('/customers/myProfile');
    setProfileTabNumber({ profileTabNumber: 3 });
    handleMenuClose();
  };

  function logOut() {
    setAnchorEl(null);
    queryClient.removeQueries();
    LogoutController();
    resetData();
    resetLoanAccount();
    resetProfilePicture();
    navigate("/login");
  }

  const logoutUser = () => {
    setDisable(true);
    toast.success(globalMessages.LoggedOut, {
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

  //Menu bar
  const renderMenu = (
    <Menu
      id="settingsMenu"
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={(_menuType) => handleMenuProfile('top')} id="settingsMenuList">
        My Profile</MenuItem>
      <MenuItem
        disabled={disableField}
        onClick={handleMenuPaymentProfile} id="settingsMenuList">
        Payment Methods</MenuItem>
      <MenuItem onClick={logoutUser} id="settingsMenuListLogout" disabled={disable}>
        Logout
      </MenuItem>
    </Menu>
  );
  let navElement = refApplyForLoanNav.current
  if (navElement) {
    navElement.removeAttribute("href");
  }



  const handleToggle = () => {
    setOpenOption((prevOpen_toggle) => !prevOpen_toggle);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenOption(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(option);
  useEffect(() => {
    if (prevOpen.current === true && option === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = option;
  }, [ option ]);

  //View part
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div data-testid="side_nav_component" id="headerWrap" className={classes.grow}>
        <AppBar
          data-testid="appBar"
          id="MainHeaderWrapping"
          position="static"
          elevation={0}
          className={clsx(classes.appBar, {
            [ classes.appBarShift ]: open,
          })}
        >
          <Toolbar id="toolbar">
            <IconButton
              data-testid="menuIcon"
              aria-label="open drawer"
              onClick={handleMenuButtonOpen}
              id="close1"
              className={clsx(classes.menuButton, {
                [ classes.hide ]: open,
              })}
            >
              <MenuIcon />
            </IconButton>

            <div className={classes.grow} />
            <div id="tool-bar-list">
              <NavLink
                data-testid="qickPayIcon"
                id="quickNameIcon"
                to="/customers/makePayment"
                onClick={(event) => {
                  activeLoanData && event.preventDefault();
                }}
                className={activeLoanData ? "nav_link_disabled" : ""}
              >
                <Tooltip title="Quick Pay" placement="bottom">
                  <img
                    className={clsx(classes.headerimg, classes.headerimgResp)}
                    src={quickPay}
                    data-test-id="background"
                    alt="quick pay"
                  />
                </Tooltip>
              </NavLink>

              <Notification />

              <Stack direction="row" spacing={2}>
                <div>
                  <IconButton
                    data-testid="settingsIcon"
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <SettingsIcon />
                  </IconButton>
                  <Popper
                    open={option}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom-start"
                              ? "left top"
                              : "left bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                            // onKeyDown={handleListKeyDown}
                            >
                              <MenuItem
                                onClick={(_menuType) => handleMenuProfile("top")}
                                id="settingsMenuList"
                              >
                                My Profile
                              </MenuItem>
                              <MenuItem
                                disabled={disableField}
                                onClick={handleMenuPaymentProfile}
                                id="settingsMenuList"
                              >
                                Payment Methods
                              </MenuItem>
                              <MenuItem
                                onClick={logoutUser}
                                id="settingsMenuListLogout"
                                disabled={disable}
                              >
                                Logout
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </Stack>
            </div>
          </Toolbar>
        </AppBar>

        {renderMenu}
        <div className={classes.sectionDrawer}>
          <Drawer
            id="close2"
            ref={refClose2}
            variant="permanent"
            onClick={handleMobileMenuClose}
            className={clsx(classes.drawer, {
              [ classes.drawerOpen ]: open,
              [ classes.drawerClose ]: !open,
            })}
            classes={{
              paper: clsx({
                [ classes.drawerOpen ]: open,
                [ classes.drawerClose ]: !open,
              }),
            }}
            onMouseEnter={handleDrawer}
            onMouseLeave={handleDrawerleave}
          >
            <div className={classes.toolbar}>
              <a
                href={`${ process.env.REACT_APP_WEBSITE }`}
                target="_blank"
                rel="noreferrer"
              >
                <input
                  type="image"
                  src={logoImage}
                  alt="logo image"
                  id="logoImage"
                />
              </a>

              <Checkbox
                icon={<RadioButtonUncheckedIcon id="sidemenuRadio" />}
                checkedIcon={<RadioButtonCheckedIcon id="sidemenuRadio" />}
                onClick={handleChangeCheckbox}
                name="sidemenuradio"
                checked={checked}
              />

              <div id="close" ref={refClose} className={classes.logoIconDiv}>
                <img
                  data-testid="mfLogo"
                  src={logoIcon}
                  alt="logo icon"
                  className={classes.logoIcon}
                />
              </div>
            </div>
            <Divider />
            <PerfectScrollbar
              options={{
                suppressScrollX: true,
                wheelSpeed: 2,
                wheelPropagation: false,
                minScrollbarLength: 20,
              }}
            >
              <List id="listItemWrap" onClick={handleMobileMenuClose}>
                <ListItem id="profileDetails" ref={refProfileDetails}>
                  <List>
                    <ListItem>
                      <div id="imgWrap">
                        <img
                          id="sidebarProfilePic"
                          src={
                            dataProfile?.profilePictureURL
                              ? dataProfile?.profilePictureURL
                              : getProfileImage
                          }
                          alt="Profile Pic"
                          onClick={(_navType) => handleMenuProfile("top")}
                        />
                      </div>
                    </ListItem>
                    <ListItem id="sidemenuName">
                      {dataAccountOverview?.data?.applicant?.contact?.first_name
                        ? "Welcome " +
                        dataAccountOverview?.data?.applicant?.contact
                          ?.first_name
                        : ""}
                    </ListItem>
                    {!branchName || !branchPhone ? (
                      <>
                        <ListItem id="sidemenuLastLogin">
                          {!lastLogin ? "" : `Last Login : ${ lastLogin }`}
                        </ListItem>
                      </>
                    ) : (
                      <>
                        <ListItem id="sidemenuLastLogin">
                          {!lastLogin ? "" : `Last Login : ${ lastLogin }`}
                        </ListItem>
                        <ListItem id="sidemenuBranch">
                          {!branchName ? "" : `Branch :  ${ branchName }`}
                        </ListItem>
                        <ListItem
                          id={
                            branchAvailability
                              ? "sidemenuOpenNow"
                              : "sidemenuCloseNow"
                          }
                        >
                          {branchAvailability ? "Open now" : "Closed now"}
                        </ListItem>
                        {!formatPhoneNumber(branchPhone) ? (
                          ""
                        ) : (
                          <ListItem id="sidemenuPhone">
                            <CallIcon />
                            <a href="tel:" className="hrefPhoneNo">
                              {formatPhoneNumber(branchPhone)}
                            </a>
                          </ListItem>
                        )}{" "}
                      </>
                    )}
                  </List>
                </ListItem>
                <NavLink data-testid="sideNavAccountOverviewNavigation" to="/customers/accountOverview" className="nav_link">
                  <ListItem className="titleSidenav">
                    <ListItemIcon>
                      {" "}
                      <AssignmentTurnedInOutlinedIcon />{" "}
                    </ListItemIcon>
                    <ListItemText className={classes.textDecoration}>
                      Account Overview
                    </ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink
                  data-testid="sideNavMakePaymentNavigation"
                  to="/customers/makePayment"
                  onClick={(event) => {
                    activeLoanData && event.preventDefault();
                  }}
                  className={activeLoanData ? "nav_link_disabled" : "nav_link"}
                >
                  <ListItem className="titleSidenav" disabled={activeLoanData}>
                    <ListItemIcon>
                      {" "}
                      <AccountBalanceWalletIcon />{" "}
                    </ListItemIcon>
                    <ListItemText className={classes.textDecoration}>
                      Make a Payment{" "}
                    </ListItemText>
                  </ListItem>
                </NavLink>

                {checkPresenceOfLoan ? (
                  pageNavResumeApplication ? (
                    <NavLink to={dataNavmessage.status === true ? "/customers/selectOffer" : NavUrlResumeApplication} className="nav_link">
                      <ListItem className="titleSidenav">
                        <ListItemIcon>
                          {" "}
                          <MonetizationOnRoundedIcon />{" "}
                        </ListItemIcon>
                        <ListItemText> Resume Application </ListItemText>
                      </ListItem>
                    </NavLink>
                  ) : (
                    <Link
                      to={
                        applicationStatusRedirectPage[ checkPresenceOfLoanStatus ]
                      }
                      className="nav_link"
                    >
                      <ListItem className="titleSidenav">
                        <ListItemIcon>
                          {" "}
                          <MonetizationOnRoundedIcon />{" "}
                        </ListItemIcon>
                        <ListItemText> Resume Application </ListItemText>
                      </ListItem>
                    </Link>
                  )
                ) : (
                  <NavLink
                    data-testid="sideNavApplyLoanNavigation"
                    id="applyForLoanNav"
                    ref={refApplyForLoanNav}
                    to="/customers/applyForLoan"
                    state={{ from: "user" }}
                    onClick={(event) => {
                      currentLoan && event.preventDefault()
                    }}
                    className={currentLoan ? "nav_link_disabled" : "nav_link"}
                  >
                    <ListItem className="titleSidenav" disabled={currentLoan}>
                      <ListItemIcon>
                        {" "}
                        <MonetizationOnRoundedIcon />{" "}
                      </ListItemIcon>
                      <ListItemText> Apply for a Loan </ListItemText>
                    </ListItem>
                  </NavLink>
                )}

                <NavLink
                  data-testid="sideNavLoanDocumentsNavigation"
                  to="/customers/loanDocument"
                  onClick={(event) => {
                    activeLoanData && event.preventDefault();
                  }}
                  className={activeLoanData ? "nav_link_disabled" : "nav_link"}
                >
                  <ListItem
                    className="titleSidenav"
                    disabled={
                      activeLoanData &&
                        !loanStatus.includes(checkPresenceOfLoanStatus)
                        ? true
                        : false
                    }
                  >
                    <ListItemIcon>
                      {" "}
                      <DescriptionOutlinedIcon />{" "}
                    </ListItemIcon>
                    <ListItemText> Loan Documents </ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink
                  data-testid="sideNavMyBranchNavigation"
                  to="/customers/myBranch"
                  onClick={(event) => {
                    activeLoanData &&
                      (!checkPresenceOfLoanStatus === "referred" ||
                        !checkPresenceOfLoanStatus === "contact_branch") &&
                      event.preventDefault();
                  }}
                  className={
                    activeLoanData &&
                      (!checkPresenceOfLoanStatus === "referred" ||
                        !checkPresenceOfLoanStatus === "contact_branch")
                      ? "nav_link_disabled"
                      : "nav_link"
                  }
                >
                  <ListItem className="titleSidenav">
                    <ListItemIcon>
                      {" "}
                      <AccountBalanceIcon />{" "}
                    </ListItemIcon>
                    <ListItemText> My Branch</ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink
                  data-testid="sideNavMyProfileNavigation"
                  to="/customers/myProfile"
                  onClick={(_menuType) => handleMenuProfile("side")}
                  className="nav_link"
                >
                  <ListItem className="titleSidenav">
                    <ListItemIcon>
                      {" "}
                      <AccountCircleIcon />{" "}
                    </ListItemIcon>
                    <ListItemText> My Profile</ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink
                  data-testid="sideNavLoanHistoryNavigation"
                  to="/customers/loanHistory"
                  onClick={(event) => {
                    activeLoanData && event.preventDefault();
                  }}
                  className={activeLoanData ? "nav_link_disabled" : "nav_link"}
                >
                  <ListItem className="titleSidenav" disabled={activeLoanData}>
                    <ListItemIcon>
                      {" "}
                      <ListIcon />{" "}
                    </ListItemIcon>
                    <ListItemText> Loan History</ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink
                  data-testid="sideNavVantageScoreNavigation"
                  to="/customers/vantageScore"
                  onClick={(event) => {
                    activeLoanData && event.preventDefault();
                  }}
                  className={activeLoanData ? "nav_link_disabled" : "nav_link"}
                >
                  <ListItem className="titleSidenav" disabled={activeLoanData}>
                    <ListItemIcon>
                      {" "}
                      <InboxIcon />{" "}
                    </ListItemIcon>
                    <ListItemText> VantageScore &reg;</ListItemText>
                  </ListItem>
                </NavLink>

                <ListItem data-testid="moneySkill" id="moneySkillNavLink" onClick={handleMoneySkillNav}>
                  <ListItemIcon>
                    {" "}
                    <DataUsageOutlinedIcon />{" "}
                  </ListItemIcon>
                  <ListItemText className="titleSidenav">
                    {" "}
                    MoneySKILL &reg;{" "}
                  </ListItemText>
                </ListItem>
                <a
                 data-testid="sideNavBlogNavigation"
                  href={`${ process.env.REACT_APP_WEBSITE }/blog/`}
                  className="titleSidenav"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ListItem>
                    <ListItemIcon>
                      {" "}
                      <BookIcon />{" "}
                    </ListItemIcon>
                    <ListItemText> Blog </ListItemText>
                  </ListItem>
                </a>
                <NavLink data-testid="sideNavfaqNavigation" to="/customers/faq" className="titleSidenav">
                  <ListItem>
                    <ListItemIcon>
                      {" "}
                      <LiveHelpIcon />{" "}
                    </ListItemIcon>
                    <ListItemText> FAQ </ListItemText>
                  </ListItem>
                </NavLink>
              </List>
            </PerfectScrollbar>
          </Drawer>
        </div>
        <MoneySkill moneySkill={skill} onChange={setSkill} />
      </div>
    </ClickAwayListener>
  );
}