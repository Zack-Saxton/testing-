import { Checkbox } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import CallIcon from "@material-ui/icons/Call";
import DataUsageOutlinedIcon from "@material-ui/icons/DataUsageOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ListIcon from "@material-ui/icons/List";
import MenuIcon from "@material-ui/icons/Menu";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import SettingsIcon from "@material-ui/icons/Settings";
import clsx from "clsx";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useQuery, useQueryClient } from "react-query";
import { Link, NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import logoIcon from "../../../assets/images/Favicon.png";
import logoImage from "../../../assets/images/Normallogo.png";
import profileImg from "../../../assets/images/profile-img.jpg";
import quickPay from "../../../assets/images/quickpay.png";
import { CheckMyOffers } from "../../../contexts/CheckMyOffers";
import { ProfilePicture } from "../../../contexts/ProfilePicture";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import LogoutController from "../../Controllers/LogoutController";
import branchDetails from "../../Controllers/MyBranchController";
import ProfileImageController from "../../Controllers/ProfileImageController";
import MoneySkill from "../../Pages/MoneySkill/MoneySkill";
import { tabAtom } from "../../Pages/MyProfile/MyProfileTab";
import Notification from "../Notification/Notification";
import globalValidation from "../../lib/Lang/globalValidation.json";
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
    width: theme.spacing(7) + 1,
    [ theme.breakpoints.up("xs") ]: {
      width: "0px",
    },
    [ theme.breakpoints.up("sm") ]: {
      width: "0px",
    },
    [ theme.breakpoints.up("md") ]: {
      width: theme.spacing(9) + 1,
    },
    [ theme.breakpoints.up("lg") ]: {
      width: theme.spacing(9) + 1,
    },
    [ theme.breakpoints.up("xl") ]: {
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
}));

export default function SideNav() {
  const classes = useStyles();
  const [ open, setOpen ] = React.useState(true);
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const history = useHistory();
  const [ disable, setDisable ] = React.useState(false);
  const [ skill, setSkill ] = React.useState(false);
  const [ checked, setChecked ] = React.useState(true);
  const [ , setTabvalue ] = useAtom(tabAtom);
  const { dataProfile, resetProfilePicture } = useContext(ProfilePicture);
  const { resetData } = useContext(CheckMyOffers);

  const { data: dataAccountOverview } = useQuery('loan-data', usrAccountDetails);
  const queryClient = useQueryClient();
  const [ activeLoanData, setActiveLoanData ] = useState(true);
  const [ currentLoan, setCurrentLoan ] = useState(true);
  const [ checkPresenceOfLoan, setCheckPresenceOfLoan ] = useState(false);
  const [ checkPresenceOfLoanStatus, setCheckPresenceOfLoanStatus ] = useState('');

  useEffect(() => {
    let noOfLoans = dataAccountOverview?.data?.activeLoans?.length;
    let activeLoan = dataAccountOverview?.data?.applicants;
    //logic to check if atleast one active initiated Loan is there or not
    const presenceOfLoan = activeLoan?.some((applicant) => applicant.isActive === true && applicant?.status !== "referred" && applicant?.status !== "contact_branch");
    const presenceOfLoanStatus = activeLoan?.find((applicant) => applicant.isActive === true);
    const userAccountStatus = dataAccountOverview?.data?.customer?.user_account?.status;

    setCheckPresenceOfLoanStatus(presenceOfLoanStatus?.status);
    setCurrentLoan(presenceOfLoan === true || userAccountStatus === "closed" ? true : false);
    setCheckPresenceOfLoan(presenceOfLoan); 

    //logic to if there is any active Loan Data is there or not
    if (noOfLoans === undefined) {
      setActiveLoanData(true);
    } else if (noOfLoans === 0) {
      setActiveLoanData(true);
    } else {
      setActiveLoanData(false);
    }

    return () => {
      setCurrentLoan({});

    };
  }, [ dataAccountOverview, activeLoanData, currentLoan ]);



  let statusStrLink = {
    "approved": "/customers/finalVerification",
    "completing_application": "/customers/finalVerification",
    "contact_branch": "/customers/myBranch",
    "confirming_info": "/partner/confirm-signup",
    "expired": "/select-amount",
    "invalid": "/select-amount",
    "signature_complete": "/customers/finalVerification",
    "offer_selected": "/customers/reviewAndSign",
    "offers_available": "/customers/selectOffer",
    "pre_qual_referred": "/select-amount",
    "pre_qual_rejected": "/select-amount",
    "pre_qualified": "/credit-karma",
    "referred": "/referred-to-branch",
    "rejected": "/no-offers-available",
    "under_review": "/customers/loanDocument",
    "closing_process": "/customers/finalVerification",
    "final_review": "/customers/loanDocument"
  };



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
  const [ branchVal, setBranchDetails ] = useState(null);
  async function getUserBranchDetails() {
    setBranchDetails(await branchDetails());
  }
  useEffect(() => {
    getUserBranchDetails();
  }, []);

  //Api call Profile Picture
  const [ profileImage, setProfileImage ] = useState(null);
  async function AsyncEffect_profileImage() {
    setProfileImage(await ProfileImageController());
  }
  useEffect(() => {

    AsyncEffect_profileImage();
  }, []);


  let getProfImage = (profileImage != null) ? profileImage : profileImg;

  // Side bar branch details
  Cookies.set('branchname', ((branchVal?.data?.BranchName) ? (branchVal?.data?.BranchName) : (branchVal?.data?.branchName) ? (branchVal?.data?.branchName) : ""));
  Cookies.set('branchphone', branchVal?.data?.PhoneNumber);
  Cookies.set('branchopenstatus', branchVal?.data?.date_closed);
  Cookies.set('getProfileImage', getProfImage);


  let hasActiveLoan = Cookies.get("hasActiveLoan") === "true" ? true : false;
  let hasApplicationStatus = Cookies.get("hasApplicationStatus")
  var appStatus = ["rejected", "referred", "expired"];
  let checkAppStatus = appStatus.includes(hasApplicationStatus)
  let disableField = (checkAppStatus === true || hasActiveLoan === true) ? true : false;
  const branchName = Cookies.get("branchname");
  const branchPhone = Cookies.get('branchphone');
  const branchcloseStatus = Cookies.get('branchopenstatus');
  const getProfileImage = Cookies.get('getProfileImage');



  const lastLoginRaw = JSON.parse(Cookies.get("user") ? Cookies.get("user") : '{ }')?.user?.extensionattributes?.login?.timestamp_date;
  const date = lastLoginRaw ? new Date(lastLoginRaw) : new Date();
  const lastLogin = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();

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

  const handleMenuProfile = () => {
    history.push({
      pathname: '/customers/myProfile'
    });
    setTabvalue(0);
    handleMenuClose();
  };
  const handleMenuPaymentProfile = () => {
    history.push({
      pathname: '/customers/myProfile'
    });
    setTabvalue(3);
    handleMenuClose();
  };

  const logOut = async () => {
    setAnchorEl(null);
    queryClient.removeQueries();
    await LogoutController();
    resetData();
    resetProfilePicture();
    history.push({
      pathname: "/login"
    });
  };

  const logoutUser = () => {
    setDisable(true);
    toast.success(globalValidation.LoggedOut, {
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

  const onAFLClick = () => {
    history.push({
      pathname: "/customers/applyForLoan",
    });
  };

  const resumeApplicationClick = () => {
    history.push({
      pathname: statusStrLink[ checkPresenceOfLoanStatus ],
    });

  };

  //Menu bar
  const renderMenu = (
    <Menu
      id="settingsMenu"
      anchorEl={ anchorEl }
      open={ isMenuOpen }
      onClose={ handleMenuClose }
    >
      <MenuItem onClick={ handleMenuProfile } id="settingsMenuList">
        My Profile</MenuItem>
      <MenuItem
        disabled={ disableField === true ? false : true }
        onClick={ handleMenuPaymentProfile } id="settingsMenuList">
        Payment Accounts</MenuItem>
      <MenuItem onClick={ logoutUser } id="settingsMenuListLogout" disabled={ disable }>
        Logout
      </MenuItem>
    </Menu>
  );
  let navElement = document.getElementById("applyForLoanNav");
  if (navElement) {
    document.getElementById("applyForLoanNav").removeAttribute("href");
  }

  //View part
  return (
    <div className={ classes.grow }>
      <AppBar
        position="absolute"
        elevation={ 0 }
        className={ clsx(classes.appBar, {
          [ classes.appBarShift ]: open,
        }) }
      >
        <Toolbar id="toolbar">
          <IconButton
            aria-label="open drawer"
            onClick={ handleMenuButtonOpen }
            id="close1"
            className={ clsx(classes.menuButton, {
              [ classes.hide ]: open,
            }) }
          >
            <MenuIcon />
          </IconButton>

          <div className={ classes.grow } />
          <div
            id="tool-bar-list"
            style={ {
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
            } }
          >
            <Typography className={ classes.headerAlign }>
              <a
                href="https://www.marinerfinance.com/blog"
                style={ { color: "white" } }
                className="hrefTag"
              >
                Blog
              </a>
            </Typography>

            <NavLink
              to="/customers/faq"
              className="nav_link"
              style={ { color: "white" } }
            >
              <Typography className={ classes.headerAlign }>FAQ's</Typography>
            </NavLink>

            <Typography
              className={ clsx(classes.headerAlign, classes.branchLocator) }
            >
              <a
                href=" https://loans.marinerfinance.com/branchlocatorpage"
                style={ { color: "white" } }
                className="hrefTag"
              >
                Branch Locator
              </a>
            </Typography>


            <NavLink to="/customers/makePayment" onClick={ (event) => { activeLoanData && event.preventDefault(); } } className={ activeLoanData ? 'nav_link_disabled' : '' }>
              <Tooltip title="Quick Pay" placement="bottom">
                <img
                  className={ clsx(classes.headerimg, classes.headerimgResp) }
                  src={ quickPay }
                  data-test-id="background"
                  alt="quick pay"
                />
              </Tooltip>
            </NavLink>

            <Notification />

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={ handleProfileMenuOpen }
              color="inherit"

            >
              <SettingsIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      { renderMenu }
      <div className={ classes.sectionDrawer }>
        <Drawer
          id="close2"
          variant="permanent"
          onClick={ handleMobileMenuClose }
          className={ clsx(classes.drawer, {
            [ classes.drawerOpen ]: open,
            [ classes.drawerClose ]: !open,
          }) }
          classes={ {
            paper: clsx({
              [ classes.drawerOpen ]: open,
              [ classes.drawerClose ]: !open,
            }),
          } }
          onMouseEnter={ handleDrawer }
          onMouseLeave={ handleDrawerleave }
        >
          <div className={ classes.toolbar }>
            <Link to="/customers/accountOverview">
              <input
                type="image"
                src={ logoImage }
                alt="logo image"
                style={ { height: "60px" } }
              />
            </ Link>

            <Checkbox
              icon={ <RadioButtonUncheckedIcon id="sidemenuRadio" /> }
              checkedIcon={ <RadioButtonCheckedIcon id="sidemenuRadio" /> }
              onClick={ handleChangeCheckbox }
              name="sidemenuradio"
              checked={ checked }
            />

            <div id="close" style={ { display: "none" } }>
              <img
                src={ logoIcon }
                alt="logo icon"
                className={ classes.logo }
                style={ { margin: "13px" } }
              />
            </div>
          </div>
          <Divider />
          <PerfectScrollbar options={ { suppressScrollX: true, wheelSpeed: 2, wheelPropagation: false, minScrollbarLength: 20 } }>
            <List id="listItemWrap" onClick={ handleMobileMenuClose }>
              <ListItem id="profileDetails" className="profileDetails">
                <List >
                  <ListItem>
                    <div id="imgWrap">
                      <img id="sidebarProfilePic" src={ dataProfile?.profile_picture_url ? dataProfile?.profile_picture_url : getProfileImage } alt="Profile Pic" onClick={ handleMenuProfile } />
                    </div>
                  </ListItem>
                  <ListItem id="sidemenuName">
                    { (dataAccountOverview?.data?.applicant?.contact?.first_name) ? 'Welcome ' + dataAccountOverview?.data?.applicant?.contact?.first_name : "" }
                  </ListItem>
                  { (branchName === '' || branchName === 'undefined') || (branchPhone === '' || branchPhone === 'undefined') 
                    ?
                    <>
                      
                      <ListItem id="sidemenuLastLogin">
                        { lastLogin === '' || undefined ? '' : 'Last Login : ' + lastLogin }
                      </ListItem> 
                      
                    </> 
                    :

                    <>
                      <ListItem id="sidemenuLastLogin">
                        { lastLogin === '' || undefined ? '' : 'Last Login : ' + lastLogin }
                      </ListItem>
                      <ListItem id="sidemenuBranch">
                      { branchName === '' || undefined ? '' : 'Branch : ' + branchName }
                      </ListItem>
                      <ListItem id={ branchcloseStatus === 'null' ? 'sidemenuOpenNow' : 'sidemenuCloseNow' }>
                        { branchcloseStatus === 'null' ? 'Open now' : 'Closed now' }
                      </ListItem>
                      { formatPhoneNumber(branchPhone) === '' || undefined ? '' :
                        <ListItem id="sidemenuPhone">
                          <CallIcon />
                          <a href="tel:" className="hrefPhoneNo">
                            { formatPhoneNumber(branchPhone) }
                          </a>
                        </ListItem>
                      }  </> }
                </List>
              </ListItem>
              <NavLink to="/customers/accountOverview" className="nav_link">
                <ListItem className="titleSidenav">
                  <ListItemIcon>
                    { " " }
                    <AssignmentTurnedInOutlinedIcon />{ " " }
                  </ListItemIcon>
                  <ListItemText style={ { textDecoration: "none" } }>
                    Account Overview
                  </ListItemText>
                </ListItem>
              </NavLink>

              <NavLink to="/customers/makePayment" onClick={ (event) => { activeLoanData && event.preventDefault(); } } className={ activeLoanData ? 'nav_link_disabled' : 'nav_link' }>
                <ListItem className="titleSidenav" disabled={ activeLoanData }>
                  <ListItemIcon>
                    { " " }
                    <AccountBalanceWalletIcon />{ " " }
                  </ListItemIcon>
                  <ListItemText style={ { textDecoration: "none" } }>
                    Make a Payment{ " " }
                  </ListItemText>
                </ListItem>
              </NavLink>


              { checkPresenceOfLoan === true ?
                <NavLink to={ { state: { from: "user" } } } onClick={ (event) => { resumeApplicationClick() } } className="nav_link" >
                  <ListItem className="titleSidenav" >
                    <ListItemIcon>
                      { " " }
                      <MonetizationOnRoundedIcon />{ " " }
                    </ListItemIcon>
                    <ListItemText> Resume Application </ListItemText>
                  </ListItem>
                </NavLink>
                :
                <NavLink id="applyForLoanNav" to={ { state: { from: "user" } } } onClick={ (event) => { currentLoan ? event.preventDefault() : onAFLClick(); } } className={ currentLoan ? "nav_link_disabled" : "nav_link" } >
                  <ListItem className="titleSidenav" disabled={ currentLoan }>
                    <ListItemIcon>
                      { " " }
                      <MonetizationOnRoundedIcon />{ " " }
                    </ListItemIcon>
                    <ListItemText> Apply for a Loan </ListItemText>
                  </ListItem>
                </NavLink> }

              <NavLink to="/customers/loanDocument" onClick={ (event) => { activeLoanData && checkPresenceOfLoanStatus !== "under_review" && checkPresenceOfLoanStatus !== "final_review" && event.preventDefault(); } } className={ activeLoanData && checkPresenceOfLoanStatus !== "under_review" && checkPresenceOfLoanStatus !== "final_review" ? 'nav_link_disabled' : 'nav_link' }>
                <ListItem className="titleSidenav" disabled={ activeLoanData === true && checkPresenceOfLoanStatus !== "under_review" && checkPresenceOfLoanStatus !== "final_review" ? true : false }>
                  <ListItemIcon>
                    { " " }
                    <DescriptionOutlinedIcon />{ " " }
                  </ListItemIcon>
                  <ListItemText> Loan Documents </ListItemText>
                </ListItem>
              </NavLink>

              <NavLink to="/customers/myBranch" onClick={ (event) => { activeLoanData && event.preventDefault(); } } className={ activeLoanData ? 'nav_link_disabled' : 'nav_link' }>
                <ListItem className="titleSidenav" disabled={ activeLoanData }>
                  <ListItemIcon>
                    { " " }
                    <AccountBalanceIcon />{ " " }
                  </ListItemIcon>
                  <ListItemText> My Branch</ListItemText>
                </ListItem>
              </NavLink>

              <NavLink to="/customers/myProfile" onClick={ handleMenuProfile } className="nav_link">
                <ListItem className="titleSidenav" >
                  <ListItemIcon>
                    { " " }
                    <AccountCircleIcon />{ " " }
                  </ListItemIcon>
                  <ListItemText> My Profile</ListItemText>
                </ListItem>
              </NavLink>

              <NavLink to="/customers/loanHistory" onClick={ (event) => { activeLoanData && event.preventDefault(); } } className={ activeLoanData ? 'nav_link_disabled' : 'nav_link' }>
                <ListItem className="titleSidenav" disabled={ activeLoanData }>
                  <ListItemIcon>
                    { " " }
                    <ListIcon />{ " " }
                  </ListItemIcon>
                  <ListItemText> Loan History</ListItemText>
                </ListItem>
              </NavLink>

              <NavLink to="/customers/vantageScore" onClick={ (event) => { activeLoanData && event.preventDefault(); } } className={ activeLoanData ? 'nav_link_disabled' : 'nav_link' }>
                <ListItem className="titleSidenav" disabled={ activeLoanData }>
                  <ListItemIcon>
                    { " " }
                    <InboxIcon />{ " " }
                  </ListItemIcon>
                  <ListItemText> VantageScore &reg;</ListItemText>
                </ListItem>
              </NavLink>

              <ListItem id="moneySkillNavLink" onClick={ handleMoneySkillNav }>
                <ListItemIcon>
                  { " " }
                  <DataUsageOutlinedIcon />{ " " }
                </ListItemIcon>
                <ListItemText className="titleSidenav">
                  { " " }
                  MoneySKILL &reg;{ " " }
                </ListItemText>
              </ListItem>
            </List>
          </PerfectScrollbar>
        </Drawer>
      </div>
      <MoneySkill moneySkill={ skill } onChange={ setSkill } />
    </div>
  );
}
