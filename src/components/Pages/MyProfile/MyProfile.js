import React, { useEffect, useState, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Link, NavLink} from "react-router-dom";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import ScrollToTopOnMount from '../scrollToTop';
import Button from "@material-ui/core/Button";
import ListIcon from "@material-ui/icons/List";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import TextsmsIcon from "@material-ui/icons/NotificationsNone";
//import TextsmsIcon from "@material-ui/icons/Textsms";
import PaymentsIcon from "@material-ui/icons/Payment";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import BasicInformationCard from "./BasicInformation";
import MailingAddressCard from "./MailingAddress";
import TextNotificationCard from "./TextNotification";
import PaymentMethodCard from "./PaymentMethod";
import { toast } from "react-toastify";
import {changePassword} from "../../controllers/myProfileController"
import AccountDetailsController from "../../controllers/AccountOverviewController";
import "./selectoffer.css";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonWithIcon,
  ButtonSwitch,
  Checkbox,
  Radio,
  PasswordField,
} from "../../FormsUI";

import {
  loanDocumentController as loanDocument,
  uploadDocument as uploadDocument,
} from "../../controllers/LoanDocumentController";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tab-panel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tab-panel-${index}`,
  };
}

function TabVerticalPanel(props) {
  const { children, value, verticalIndex, ...other } = props;

  return (
    <div
      //role="tab-panel"
      hidden={value !== verticalIndex}
      id={`scrollable-auto-tab-panel-${verticalIndex}`}
      aria-labelledby={`scrollable-auto-tab-${verticalIndex}`}
      {...other}
    >
      {value === verticalIndex && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabVerticalPanel.propTypes = {
  children: PropTypes.node,
  verticalIndex: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function tabVerticalProps(verticalIndex) {
  return {
    id: `scrollable-auto-tab-vertical-${verticalIndex}`,
    "aria-controls": `scrollable-auto-tab-panel-${verticalIndex}`,
  };
}

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  paperVerticalTab: {
    paddingTop: "20px",
    paddingBottom: "20px",
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  heading: {
    color: "#fff",
    fontWeight: "400",
    fontSize: "1.64rem",
    paddingLeft: "7px",
    paddingBottom: "25px"
  },
  tabLabel: {
    background: "white",
    margin: "10px",
    color: "#3f51b5",
    fontFamily: "'Multi', sans-serif !important",
    fontSize: "1rem",
    textTransform: "none",
    fontWeight: "600",
  },
  tabVerticalLabel: {
    color: "#3f51b5",
    textTransform: "none",
    fontWeight: "600",
    fontFamily: "'Multi', sans-serif !important",
    fontSize: "1rem",
    textAlign: "start",
  },

  table: {
    minWidth: 650,
  },
  tableHead: {
    color: "#171717!important",
    fontWeight: "600",
    fontSize: "1rem",
  },
  tableHeadRow: {
    color: "#171717!important",
    fontSize: "15px",
  },
  indicator: {
    left: "0px",
    background: "unset",
  },
}));

function createData(
  type,
  name,
  setdefault,
  paymentmethodid,
  deletethis
) {
  return {
    type,
    name,
    setdefault,
    paymentmethodid,
    deletethis
    };
}
const branch = (
  <Grid container direction="row" alignItems="center">
    <AccountBalanceIcon /> 
  </Grid>
);

const online = (
  <Grid container direction="row" alignItems="center">
    <DesktopMacIcon /> 
  </Grid>
);

const rows36term = [
  createData(branch, "Test1", "", "101", ""),
  createData(online, "Test2", "", "102", ""),
];


export default function ApplyLoan() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [value, setValue] = React.useState(0);
  const [values, setValues] = React.useState(0);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const handleTabChange = (event, newValues) => {
    setValues(newValues);
  };

  const [accountDetailStatus, setaccountDetailStatus] = useState(null);
  async function AsyncEffect_accountDetail() {
    setaccountDetailStatus(await AccountDetailsController());
  }
  useEffect(() => {
    AsyncEffect_accountDetail();
  }, []);

    //Load data
    let accountDetailData = accountDetailStatus != null ? accountDetailStatus.data.data : null;

const onClickCancelChangePassword = async () => {
// Write code to clear text of all passwords...

}
const onClickChangePassword = async () => {
  let response = await changePassword(oldPassword, newPassword);
  if (response.data.data.change_password.passwordReset) {
    toast.success("Password Changed successfully", {
      position: "bottom-left",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.error("Password not Changed, Check Password and try again", {
      position: "bottom-left",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
//Preventing space key
    const preventSpace = (event) => {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    };

  return (
    <div>
      <ScrollToTopOnMount />
      <Grid container justifyContent={"center"} style={{ marginTop: "-150px", paddingRight: "30px", paddingLeft: "30px" }}>
        <Grid container item xs={12} direction="row" style={{ marginBottom: "-20px", width: "100%" }}>
          <Typography className={classes.heading} variant="h3">
            <NavLink
              to="/customers/accountOverview"
              style={{ textDecoration: "none" }}
            >
              <ButtonWithIcon
                icon="arrow_backwardIcon"
                iconposition="left"
                stylebutton='{"background": "#fff", "color":"#214476",
                        "minWidth": "0px",
                        "width": "36px",
                        "padding": "0px",
                        "marginRight": "5px",
                      "marginTop":"unset" }'
                styleicon='{ "color":"" }'
              />
            </NavLink>{" "}
            Profile Settings
          </Typography>
        </Grid>

        {/* Left Side Nav */}

        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            <Grid container item xs={12}>
              <Grid
                item
                xs={12}
                sm={3}
                style={{ padding: "5px", width: "100%" }}
              >
                <Paper className={classes.paperVerticalTab}>
                  <Tabs
                    value={values}
                    onChange={handleTabChange}
                    classes={{
                      indicator: classes.indicator,
                    }}
                    textColor="primary"
                    scrollButtons="auto"
                    orientation="vertical"
                    variant="scrollable"
                    style={{ paddingTop: "5px" }}
                    aria-label="scrollable auto tabs example"
                  >

                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          <SettingsIcon/>{" "}
                          Basic Information
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(0)}
                    />

                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          <HomeIcon/>{" "}
                          Mailing Address
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(1)}
                    />
                    <Tab
                      id="tab-vertical"
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                         <TextsmsIcon/>{" "}
                          Text Notification - Off
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(2)}
                    />
                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                         <PaymentsIcon/>{" "}
                          Payment Method
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(3)}
                    />
                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                        <LockOpenIcon/>{" "}
                           Change Password
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(4)}
                    />
                  </Tabs>
                </Paper>
              </Grid>
     {/* End Left Side Nav */}


     {/* Main Content */}
              <Grid
                item
                xs={12}
                sm={9}
                style={{ padding: "5px", width: "100%" }}
              >
                <Paper className={classes.paper}>

        {/* Basic Information */}
  
                  <TabVerticalPanel value={values} verticalIndex={0}>
                      <BasicInformationCard userAccountDetailCard={accountDetailData} />
                  </TabVerticalPanel>
  
        {/* //END Basic Information */}


        {/* Mailing Address */}

                  <TabVerticalPanel value={values} verticalIndex={1}>
                      <MailingAddressCard userAccountDetailCard={accountDetailData} />
                  </TabVerticalPanel>
                    <TabVerticalPanel value={values} verticalIndex={1}>
                    <Grid container
                      item
                      xs={12}
                      direction="row"
                      style={{ paddingBottom: "10px", width: "100%" }}
                    >
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid container direction="row">
                      <Grid container
                        item
                        xs={20}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" }}
                      >
                        <ButtonSecondary
                          stylebutton='{"marginRight": "" }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-reset-button"
                        >
                          Cancel
                        </ButtonSecondary>
                      </Grid>

                      <Grid container
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="apply-loan-continue-button-grid"
                      >
                        <NavLink
                          to="/customers/reviewAndSign"
                          style={{ textDecoration: "none", width: "inherit" }}
                        >
                          <ButtonPrimary
                            stylebutton='{"marginLeft": "10px","fontSize":"1rem" }'
                            styleicon='{ "color":"" }'
                            id="apply-loan-continue-button"
                          >
                            Save changes
                          </ButtonPrimary>
                        </NavLink>
                      </Grid>

                    </Grid>
                  </TabVerticalPanel>
        {/* END Mailing Address */}

        {/* Text Notification */}
                  <TabVerticalPanel value={values} verticalIndex={2}>
                      <TextNotificationCard userAccountDetailCard={accountDetailData} />
                  </TabVerticalPanel>


                  <TabVerticalPanel value={values} verticalIndex={2}>

                    <Grid container
                      item
                      xs={12}
                      direction="row"
                      style={{ paddingBottom: "10px", width: "100%" }}
                    >

                    </Grid>
                    <Grid container direction="row">
                      <Grid container
                        item
                        xs={20}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" }}
                      >
                        <ButtonSecondary
                          stylebutton='{"marginRight": "" }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-reset-button"
                        >
                          Cancel
                        </ButtonSecondary>
                      </Grid>

                      <Grid container
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="apply-loan-continue-button-grid"
                      >
                        <NavLink
                          to="/customers/reviewAndSign"
                          style={{ textDecoration: "none", width: "inherit" }}
                        >
                          <ButtonPrimary
                            stylebutton='{"marginLeft": "10px","fontSize":"1rem" }'
                            styleicon='{ "color":"" }'
                            id="apply-loan-continue-button"
                          >
                            Update
                          </ButtonPrimary>
                        </NavLink>
                      </Grid>

                    </Grid>
                  </TabVerticalPanel>
        {/* END Text Notification */}

        {/* Payment Method */}
              <TabVerticalPanel value={values} verticalIndex={3}>
                      <PaymentMethodCard userAccountDetailCard={accountDetailData} />
                  </TabVerticalPanel>


                  <TabVerticalPanel value={values} verticalIndex={3}>

                    <Grid container direction="row">
                      <Grid container
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="apply-loan-continue-button-grid"
                      >
                        <NavLink
                          to="/customers/reviewAndSign"
                          style={{ textDecoration: "none", width: "inherit" }}
                        >
                          <ButtonPrimary
                            stylebutton='{"marginLeft": "10px","fontSize":"1rem"}'
                            styleicon='{ "color":"" }'
                            id="apply-loan-continue-button"
                          >
                            Add Bank Account
                          </ButtonPrimary>
                        </NavLink>
                      </Grid>

                      <Grid container
                        item
                        xs={20}
                        sm={8}
                        direction="row"
                        style={{ padding: "10px", width: "100%", justifyContent: "end" }}
                        id="apply-loan-comparison-button-grid"
                      > &nbsp; &nbsp; &nbsp; 
                        <ButtonSecondary
                          fullWidth={true}
                          stylebutton='{"background": "", "float":"right"  }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-comparison-button"
                        >
                          Add Debit Card
                        </ButtonSecondary>

                      </Grid>
                      <p >
                        You have two payment method options. You can either add your bank account information to make payments directly from your bank account or you can add debit card information to make payments through your debit card. You also have the option to set either of these payment methods as your default payment methods.
                      </p>

                    </Grid>
                  </TabVerticalPanel>
                  {/* END Payment Method */}

                  {/* Change Poassword */}
                  <TabVerticalPanel value={values} verticalIndex={4}>
                    <Grid container
                      item
                      xs={12}
                      direction="row"
                      //style={{ paddingBottom: "10px", width: "100%" }}
                    >
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableBody>
                          <TableRow>
                              <TableCell
                                component="th"
                                className={classes.tableHeadRow}
                                scope="row"
                              >
                              <PasswordField
                                  name="oldpassword"
                                  type="password"
                                  label="Old Password"
                                  onKeyDown={preventSpace}
                                  materialProps={{ maxLength: "30" }}
                                  value= {oldPassword}
                                  onChange= {(event) => {
                                    setOldPassword(event.target.value);
                                  }}
                                  variant="standard"
                                  disabled={false}
                                  
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                className={classes.tableHeadRow}
                                scope="row"
                              >
                                <PasswordField
                                  name="newpassword"
                                  type="password"
                                  label="New Password"
                                  onKeyDown={preventSpace}
                                  materialProps={{ maxLength: "30" }}
                                  variant="standard"
                                  value= {newPassword}
                                  onChange= {(event) => {
                                    setNewPassword(event.target.value);
                                  }}
                                  floatingLabelText="Password"
                                  disabled={false}
                                />
                                <p>
                                Please ensure your password meets the following criteria: between 8 and 30 characters in length, at least 1 uppercase letter, at least 1 lowercase letter, and at least 1 number.
                                </p>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                className={classes.tableHeadRow}
                                scope="row"
                              >
                                <PasswordField
                                  name="retypenewpassword"
                                  type="password"
                                  label="Retype New Password"
                                  onKeyDown={preventSpace}
                                  materialProps={{ maxLength: "30" }}
                                  value= {confirmPassword}
                                  onChange= {(event) => {
                                    setConfirmPassword(event.target.value);
                                  }}
                                  variant="standard"
                                  disabled={false}
                                />
                              </TableCell>
                            </TableRow>

                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid container direction="row">
                      <Grid container
                        item
                        xs={20}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" }}
                      >
                        <ButtonSecondary
                          stylebutton='{"marginRight": "" }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-reset-button"
                          onClick = {onClickCancelChangePassword}
                        >
                          Cancel
                        </ButtonSecondary>
                      </Grid>

                      <Grid container
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="apply-loan-continue-button-grid"
                      >
                          <ButtonPrimary
                            stylebutton='{"marginLeft": "10px","fontSize":"1rem" }'
                            styleicon='{ "color":"" }'
                            id="apply-loan-continue-button"
                            onClick = {onClickChangePassword}
                          >
                            Submit
                          </ButtonPrimary>                      
                      </Grid>
                    </Grid>
                  </TabVerticalPanel>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
