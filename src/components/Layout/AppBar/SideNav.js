import { Checkbox } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
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
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState,useRef } from "react";
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
import { LoanAccount } from "../../../contexts/LoanAccount"
import { useGlobalState } from "../../../contexts/GlobalStateProvider";
import { ProfilePicture } from "../../../contexts/ProfilePicture";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import LogoutController from "../../Controllers/LogoutController";
import branchDetails from "../../Controllers/MyBranchController";
import ProfileImageController from "../../Controllers/ProfileImageController";
import {verificationSteps} from "../../Controllers/ApplyForLoanController";
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
  logoIconDiv:{
    display: "none"
  },
  textDecoration:{
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
  const { data: dataAccountOverview } = useQuery('loan-data', usrAccountDetails);
  const queryClient = useQueryClient();
  const [ activeLoanData, setActiveLoanData ] = useState(true);
  const [ currentLoan, setCurrentLoan ] = useState(true);
  const [ checkPresenceOfLoan, setCheckPresenceOfLoan ] = useState(false);
  const [ checkPresenceOfLoanStatus, setCheckPresenceOfLoanStatus ] = useState('');
  const [ isMobileDevice, setDeviceType ] = useState(false);
  const [ checkFinalVerificationStatus, setCheckFinalVerificationStatus ] = useState(false);
  const { data: verificationStepsApplyforLoan } = useQuery('verification-data',verificationSteps );
  let refProfileDetails = useRef();
  let refApplyForLoanNav = useRef();
  let refClose2 = useRef();
  let refClose = useRef();
  let loanStatus = ["under_review", "final_review"]; 

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
		return null;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [verificationStepsApplyforLoan]);

  //Navigating customer according to application status
  let NavUrlResumeApplication = "";
  if (([ 'approved', 'completing_application', 'signature_complete', 'closing_process' ].includes(checkPresenceOfLoanStatus))) {
    NavUrlResumeApplication = checkFinalVerificationStatus  ? "/customers/receiveYourMoney" : "/customers/finalverification";
  }
  else if (([ 'offers_available', "offer_selected" ].includes(checkPresenceOfLoanStatus))) {
    NavUrlResumeApplication = checkPresenceOfLoanStatus === "offers_available" ? "/customers/selectOffer" : "/customers/reviewAndSign";
  }
  let pageNavResumeApplication = NavUrlResumeApplication !== "" ? true : false;

  //Material UI media query for responsiveness
  let check = useMediaQuery("(min-width:960px)");
  let refCloseValue = refClose.current

  useEffect(() => {
    if (check && checked) {
      setChecked(true);
      setOpen(true);
      handleDeviceType(false);
      document.getElementById("main").style.marginLeft = "240px";
      refCloseValue.style.display = "none";
    } else {
      setOpen(false);
      handleDeviceType(true);
    }
  }, [ checked, check,refCloseValue ]);

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
    return null;
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
  let disableField = (checkAppStatus && !hasActiveLoan ? true : checkAppStatus || !hasActiveLoan ? true : false );
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
        refClose.current.setAttribute(valueQualifiedName,"open")
      } else {
        setOpen(false);
        refClose.current.setAttribute(valueQualifiedName,closeElementId)
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
        refClose.current.setAttribute(valueQualifiedName,"close")
      } else {
        setOpen(false);
        refClose.current.setAttribute(valueQualifiedName,closeElementId)
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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    if (!checked || !check) {
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
      anchorEl={ anchorEl }
      open={ isMenuOpen }
      onClose={ handleMenuClose }
    >
      <MenuItem onClick={ (menuType) => handleMenuProfile('top') } id="settingsMenuList">
        My Profile</MenuItem>
      <MenuItem
        disabled={ disableField }
        onClick={ handleMenuPaymentProfile } id="settingsMenuList">
        Payment Methods</MenuItem>
      <MenuItem onClick={ logoutUser } id="settingsMenuListLogout" disabled={ disable }>
        Logout
      </MenuItem>
    </Menu>
  );
  let navElement = refApplyForLoanNav.current
  if (navElement) {
    navElement.removeAttribute("href");
  }
    //View part
  return (
    <ClickAwayListener onClickAway={ handleClickAway }>

      <div id="headerWrap" className={ classes.grow }>
        <AppBar
          id="MainHeaderWrapping"
          position="static"
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
            >
              {/* <Typography id="blogsLink" className={ classes.headerAlign }>
                <a
                  target="_blank"
                  href={ `${ process.env.REACT_APP_WEBSITE }/blog/` }
                  className="hrefTag"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </Typography>

              <NavLink
                to="/customers/faq"
                className="nav_link faqLink"
              >
                <Typography className={ classes.headerAlign }>FAQ</Typography>
              </NavLink> */}

              {/* <NavLink to="/branch-locator" className="nav_link branchLocatorLink">
                <Typography className={ classes.headerAlign }>Branch Locator</Typography>
              </NavLink> */}

              <NavLink id="quickNameIcon" to="/customers/makePayment" onClick={ (event) => { activeLoanData && event.preventDefault(); } } className={ activeLoanData ? 'nav_link_disabled' : '' }>
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
                className="noPaddingIcon"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={ handleProfileMenuOpen }
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
            ref = {refClose2}
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
              <a href={ `${ process.env.REACT_APP_WEBSITE }` } target="_blank" rel="noreferrer">
                <input
                  type="image"
                  src={ logoImage }
                  alt="logo image"
                  id = "logoImage"
                />
              </a>

              <Checkbox
                icon={ <RadioButtonUncheckedIcon id="sidemenuRadio" /> }
                checkedIcon={ <RadioButtonCheckedIcon id="sidemenuRadio" /> }
                onClick={ handleChangeCheckbox }
                name="sidemenuradio"
                checked={ checked }
              />

              <div id="close" ref = {refClose} className={classes.logoIconDiv}>
                <img
                  src={ logoIcon }
                  alt="logo icon"
                  className={ classes.logoIcon }
                />
              </div>
            </div>
            <Divider />
            <PerfectScrollbar options={ { suppressScrollX: true, wheelSpeed: 2, wheelPropagation: false, minScrollbarLength: 20 } }>
              <List id="listItemWrap" onClick={ handleMobileMenuClose }>
                <ListItem id="profileDetails" ref = {refProfileDetails}>
                  <List >  
                    <ListItem>
                      <div id="imgWrap">
                        <img id="sidebarProfilePic" src={ dataProfile?.profilePictureURL ? dataProfile?.profilePictureURL : getProfileImage } alt="Profile Pic" onClick={ (navType) => handleMenuProfile('top') } />
                      </div>
                    </ListItem>
                    <ListItem id="sidemenuName">
                      { (dataAccountOverview?.data?.applicant?.contact?.first_name) ? 'Welcome ' + dataAccountOverview?.data?.applicant?.contact?.first_name : "" }
                    </ListItem>
                    { !branchName || !branchPhone
                      ?
                      <>
                        <ListItem id="sidemenuLastLogin">
                          { !lastLogin ? '' : `Last Login : ${ lastLogin }` }
                        </ListItem>
                      </>
                      :

                      <>
                        <ListItem id="sidemenuLastLogin">
                          { !lastLogin ? '' : `Last Login : ${ lastLogin }` }
                        </ListItem>
                        <ListItem id="sidemenuBranch">
                          { !branchName ? '' : `Branch :  ${ branchName }` }
                        </ListItem>
                        <ListItem id={ branchAvailability ? 'sidemenuOpenNow' : 'sidemenuCloseNow' }>
                          { branchAvailability ? 'Open now' : 'Closed now' }
                        </ListItem>
                        { !formatPhoneNumber(branchPhone) ? '' :
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
                    <ListItemText className = {classes.textDecoration}>
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
                    <ListItemText className = {classes.textDecoration}>
                      Make a Payment{ " " }
                    </ListItemText>
                  </ListItem>
                </NavLink>

                { checkPresenceOfLoan ?
                  pageNavResumeApplication ?

                    <NavLink to={ NavUrlResumeApplication } className="nav_link" >
                      <ListItem className="titleSidenav" >
                        <ListItemIcon>
                          { " " }
                          <MonetizationOnRoundedIcon />{ " " }
                        </ListItemIcon>
                        <ListItemText> Resume Application </ListItemText>
                      </ListItem>
                    </NavLink>
                    :
                    <Link to={ applicationStatusRedirectPage[ checkPresenceOfLoanStatus ] } className="nav_link" >
                      <ListItem className="titleSidenav" >
                        <ListItemIcon>
                          { " " }
                          <MonetizationOnRoundedIcon />{ " " }
                        </ListItemIcon>
                        <ListItemText> Resume Application </ListItemText>
                      </ListItem>
                    </Link>
                  :
                  <NavLink id="applyForLoanNav" ref = {refApplyForLoanNav} to="/customers/applyForLoan" state={ { from: "user" } } onClick={ (event) => { currentLoan ? event.preventDefault() : ""; } } className={ currentLoan ? "nav_link_disabled" : "nav_link" } >
                    <ListItem className="titleSidenav" disabled={ currentLoan }>
                      <ListItemIcon>
                        { " " }
                        <MonetizationOnRoundedIcon />{ " " }
                      </ListItemIcon>
                      <ListItemText> Apply for a Loan </ListItemText>
                    </ListItem>
                  </NavLink> }

                <NavLink to="/customers/loanDocument" onClick={ (event) => { activeLoanData && loanStatus.includes(checkPresenceOfLoanStatus) && event.preventDefault(); } } className={ activeLoanData ? 'nav_link_disabled' : 'nav_link' }>
                  <ListItem className="titleSidenav" disabled={ activeLoanData && !loanStatus.includes(checkPresenceOfLoanStatus) ? true : false }>
                    <ListItemIcon>
                      { " " }
                      <DescriptionOutlinedIcon />{ " " }
                    </ListItemIcon>
                    <ListItemText> Loan Documents </ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink id="mybranchNav" to="/customers/myBranch" onClick={ (event) => { activeLoanData && event.preventDefault(); } } className={ activeLoanData ? 'nav_link_disabled' : 'nav_link' }>
                  <ListItem className="titleSidenav" disabled={ checkPresenceOfLoanStatus === "referred" || checkPresenceOfLoanStatus === "contact_branch" ? false : activeLoanData }>
                    <ListItemIcon>
                      { " " }
                      <AccountBalanceIcon />{ " " }
                    </ListItemIcon>
                    <ListItemText> My Branch</ListItemText>
                  </ListItem>
                </NavLink>

                <NavLink to="/customers/myProfile" onClick={ (menuType) => handleMenuProfile('side') } className="nav_link">
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
                <NavLink to={ `${ process.env.REACT_APP_WEBSITE }/blog/` }>
                <ListItem>
                 <ListItemText className="titleSidenav">
                    { " " }
                   Blog{ " " }
                  </ListItemText>
                </ListItem>
                </NavLink>
                <NavLink to="/customers/faq">
                <ListItem>
                 <ListItemText className="titleSidenav">
                    { " " }
                   FAQ{ " " }
                  </ListItemText>
                </ListItem>
                </NavLink>
              </List>
            </PerfectScrollbar>
          </Drawer>
        </div>
        <MoneySkill moneySkill={ skill } onChange={ setSkill } />
      </div>
    </ClickAwayListener>
  );
}
