import React, { useEffect, useState } from "react";
import { useStylesMyProfile } from "./Style";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { Link, NavLink } from "react-router-dom";
import ScrollToTopOnMount from '../ScrollToTop';
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import TextsmsIcon from "@material-ui/icons/NotificationsNone";
import PaymentsIcon from "@material-ui/icons/Payment";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { FormControlLabel } from '@material-ui/core';
import Switch from "@material-ui/core/Switch";
import BasicInformationCard from "./BasicInformation";
import { textNotification } from "../../Controllers/myProfileController";
//import TextNotification from "./TextNotification";
import MailingAddressCard from "./MailingAddress";
import PaymentMethodCard from "./PaymentMethod";
import { toast } from "react-toastify";
import { changePassword } from "../../Controllers/myProfileController"
//import { changeTextNotify } from "../../Controllers/textNotificationController"
import AccountDetailsController from "../../Controllers/AccountOverviewController";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./Style.css";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonWithIcon,
  Checkbox,
  PhoneNumber,
  PasswordField,
} from "../../FormsUI";
import * as yup from "yup";
import { useFormik } from "formik";

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

//yup validation schema
const validationSchema = yup.object({
  phone: yup
    .string("Enter a name")
    .required("Your Phone number is required")
    .transform((value) => value.replace(/[^\d]/g, ""))
    //eslint-disable-next-line
    .matches(
      /^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
      "Please enter your valid Phone number"
    )
    .matches(/^(\d)(?!\1+$)\d{9}$/, "Please enter your valid Phone number")
    .min(10, "Name must contain at least 10 digits"),
});


export default function MyProfile() {
  const classes = useStylesMyProfile();
  const [value] = React.useState(0);
  const [values, setValues] = React.useState(0);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [opted_phone_texting, setPhoneTexting] = React.useState('');
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
  const [openDisclosure, setDisclosureOpen] = useState(false);

  let phonenum = accountDetailData?.customer?.latest_contact?.opted_phone_texting;
  let textnotify = phonenum ? "On" : "Off";
  let textnotifybool = phonenum ? true : false;
  const [disabledContent, setdisabledContent] = useState(textnotifybool);

  // Formik configutration
  const formik = useFormik({
    initialValues: {
      opted_phone_texting: accountDetailData?.customer?.latest_contact?.opted_phone_texting ? accountDetailData?.customer?.latest_contact?.opted_phone_texting : "",
    },
    validationSchema: validationSchema,
    // Submit value - store the values to context and proceeds next pages

    onSubmit: async (values) => {
      const phone =
        values.phone
          .replace(/-/g, "")
          .replace(/\)/g, "")
          .replace(/\(/g, "")
          .replace(/ /g, "") || "";

      let body = {
        "phone": values.opted_phone_texting,
      };

      let res = await textNotification(body);

      if (res.data.data.emailUpdate === true) {
        toast.success("Updates successfull", {
          position: "bottom-left",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("No changes made", {
          position: "bottom-left",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  });



  const onClickCancelChangePassword = async () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    tabVerticalProps(0)
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

  //Text Notification enable/disable switch
  const handleSwitchNotification = (event) => {
    setdisabledContent(event.target.checked)
  };

  // Disclosure pop up open and close
  const handleDisclosureClickOpen = () => {
    setDisclosureOpen(true)
  };

  const handleDisclosureClose = () => {
    setDisclosureOpen(false)
  };

  //Text Notify Submit
  const onClickChangeTextNotify = async () => {
    let body = {
      "phone": values.opted_phone_texting,
    };

    let response = await textNotification(body);

    if (response.data.data.textingSubscrption) {
      toast.success("Text Subscription Changed successfully", {
        position: "bottom-left",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Text Subscription not Changed", {
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
  // End Text Notify Submit


  return (
    <div>
      <ScrollToTopOnMount />
      <Grid container
        justifyContent={"center"}
        style={{
          marginTop: "-150px",
          paddingRight: "30px",
          paddingLeft: "30px"
        }}
      >
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
                <Paper className={classes.cardHeading}>
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
                          <SettingsIcon />{" "}
                          Basic Information
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(0)}
                    />

                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          <HomeIcon />{" "}
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
                          <TextsmsIcon />{" "}
                          Text Notification -
                          {textnotify}
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(2)}
                    />
                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          <PaymentsIcon />{" "}
                          Payment Method
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(3)}
                    />
                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          <LockOpenIcon />{" "}
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
                    <Grid container direction="row">
                    </Grid>
                  </TabVerticalPanel>
                  {/* END Mailing Address */}


                  {/* Start Text Notification */}

                  <TabVerticalPanel value={values} verticalIndex={2}>
                    <TableContainer>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >

                        <TableRow>
                          <TableCell
                            component="th"
                            className={classes.tableHeadRow}
                            scope="row"
                          >
                            <Typography className={classes.cardHeading} >
                              Enable Text Notifications
                            </Typography>

                            <FormControlLabel
                              control={
                                <Switch
                                  checked={disabledContent}
                                  onChange={handleSwitchNotification}
                                  value={disabledContent}
                                  inputProps={{ "data-test-id": "switch" }}
                                  color="primary"
                                />
                              }
                              labelPlacement='end'
                              label={disabledContent ? "Text Notifications are ON" : "Text Notifications are Off"}
                            />
                            <Typography className={classes.cardHeading} ><br />
                              If you have not yet agreed to receive  text messages and would like to receive text messages concerning your account, please enable text notifications above and provide the requested information.
                            </Typography>
                            <Typography className={classes.cardHeading} >
                              <br />
                              Mobile number
                            </Typography>
                            <PhoneNumber
                              name="phone"
                              label="Mobile Number"
                              placeholder="Mobile number"
                              id="phone"
                              defaultvalue={opted_phone_texting}
                              type="text"
                              materialProps={{ defaultValue: "" }}
                              onKeyDown={preventSpace}
                              value={formik.values.phone}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.phone && Boolean(formik.errors.phone)
                              }
                              helperText={formik.touched.phone && formik.errors.phone}
                            />

                            <Link to="#"
                              onClick={handleDisclosureClickOpen}
                              className={classes.autoPayLink}
                            >
                              Disclosure
                            </Link>

                            <p>
                              <Checkbox
                                name="textingterms"
                                labelid="texting-terms"
                                testid="checkbox"
                                stylelabelform='{ "fontSize":"12px" }'
                                stylecheckbox='{ "fontSize":"12px" }'
                                stylecheckboxlabel='{ "fontSize":"12px" }'
                              />

                              I have read, understand, and agree to the&nbsp;
                              <Link to="https://www.marinerfinance.com/resources/legal/texting-terms-of-use"
                                className={classes.autoPayLink}
                              >
                                Texting Terms of Use.
                              </Link>
                            </p>

                          </TableCell>
                        </TableRow>

                      </Table>
                    </TableContainer>

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
                        <ButtonPrimary
                          stylebutton='{"marginLeft": "10px","fontSize":"1rem" }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-continue-button"
                          onClick={onClickChangeTextNotify}
                        >
                          Update
                        </ButtonPrimary>
                      </Grid>

                    </Grid>
                  </TabVerticalPanel>

                  {/* END Text Notification */}

                  {/* Payment Method */}
                  <TabVerticalPanel value={values} verticalIndex={3}>
                    <PaymentMethodCard />
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

                      <Grid
                        item
                        xs={12}
                        style={{ width: "100%", gap: 15, marginBottom: 18 }}
                        container
                        direction="row"
                      >
                        <PasswordField
                          name="oldpassword"
                          type="password"
                          label="Old Password"
                          onKeyDown={preventSpace}
                          materialProps={{ maxLength: "30" }}
                          value={oldPassword}
                          onChange={(event) => {
                            setOldPassword(event.target.value);
                          }}
                          variant="standard"
                          disabled={false}

                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        style={{ width: "100%", gap: 15, marginBottom: 18 }}
                        container
                        direction="row"
                      >
                        <PasswordField
                          name="newpassword"
                          type="password"
                          label="New Password"
                          onKeyDown={preventSpace}
                          materialProps={{ maxLength: "30" }}
                          variant="standard"
                          value={newPassword}
                          onChange={(event) => {
                            setNewPassword(event.target.value);
                          }}
                          floatingLabelText="Password"
                          disabled={false}
                        />
                        <p>
                          Please ensure your password meets the following criteria: between 8 and 30 characters in length, at least 1 uppercase letter, at least 1 lowercase letter, and at least 1 number.
                        </p>

                      </Grid>

                      <Grid
                        item
                        xs={12}
                        style={{ width: "100%", gap: 15, marginBottom: 18 }}
                        container
                        direction="row"
                      >
                        <PasswordField
                          name="retypenewpassword"
                          type="password"
                          label="Retype New Password"
                          onKeyDown={preventSpace}
                          materialProps={{ maxLength: "30" }}
                          value={confirmPassword}
                          onChange={(event) => {
                            setConfirmPassword(event.target.value);
                          }}
                          variant="standard"
                          disabled={false}
                        />

                      </Grid>

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
                          onClick={onClickCancelChangePassword}
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
                          onClick={onClickChangePassword}
                        >
                          Update
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

      {/* **************  Disclosure modal******************* */}

      <Dialog
        open={openDisclosure}
        onClose={handleDisclosureClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Disclosure
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontSize: "12px" }}
          >
            <p className={classes.discosureContent}>
              By providing my mobile and/or home number (including any phone number that I later convert to a mobile number),
              I expressly consent and agree to receive informational phone calls and text messages
              (including auto dialers and/or with pre-recorded messages) by or on behalf of Mariner for transactional purposes,
              such as the collection and servicing of all of my accounts. I understand that my consent for non-marketing,
              informational calls and messages applies to each phone number that I provide to Mariner now or in the future.
            </p>
            <p className={classes.discosureContent}>
              I understand that any text messages Mariner sends to me may be accessed by anyone with access to my text messages.
              I acknowledge that my mobile phone service provider may charge me fees for text messages that Mariner sends to me,
              and I agree that Mariner shall have no liability for the cost of any such text messages. I understand that I may
              unsubscribe from text messages by replying "STOP" to any text message that I receive from Mariner or on Mariner's behalf.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleDisclosureClose}
          >
            Ok
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </div>

  );
}
