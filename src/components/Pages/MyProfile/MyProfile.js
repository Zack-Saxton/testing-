import React, { useEffect, useState } from "react";
import { useStylesMyProfile } from "./Style";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";
import ScrollToTopOnMount from '../ScrollToTop';
import SettingsIcon from "@material-ui/icons/Brightness5";
import TextsmsIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PaymentsIcon from "@material-ui/icons/LinkOutlined";
import BasicInformationCard from "./BasicInformation";
import TextNotificationCard from "./TextNotification";
import MailingAddressCard from "./MailingAddress";
import PaymentMethodCard from "./PaymentMethod";
import AccountDetailsController from "../../Controllers/AccountOverviewController";
import ChangePassword from "./ChangePassword"
import "./Style.css";
import {  ButtonWithIcon} from "../../FormsUI";
import CheckLoginStatus from "../../App/CheckLoginStatus";

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



export default function MyProfile(props) {
  
  const classes = useStylesMyProfile();
  const [value] = React.useState(0);
  const [values, setValues] = React.useState(props?.location?.state?.tab ? props?.location?.state?.tab : 0);
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
  

  let phonenum = accountDetailData?.customer?.latest_contact?.opted_phone_texting;
  let textnotify = phonenum ? "On" : "Off";

  

  return (
    <div>
      <CheckLoginStatus/>
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
        <Grid item xs={12} style={{ paddingBottom: "200px" }}>
          <TabPanel value={value} index={0}>
            <Grid container item xs={12}>
              <Grid
                item
                xs={12}
                sm={4}
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
                        <span style={{ float: "left", width: "100%", verticalAlign: "top" }}>
                          <SettingsIcon style={{ verticalAlign: "top" }} />{" "}  Basic Information
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(0)}
                    />

                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          <LockOpenIcon style={{ verticalAlign: "top" }} />{" "}
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
                          <TextsmsIcon style={{ verticalAlign: "top" }} />{" "}
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
                          <PaymentsIcon style={{ verticalAlign: "top" }} />{" "}
                          Payment Method
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(3)}
                    />
                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          <LockOpenIcon style={{ verticalAlign: "top" }} />{" "}
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
                sm={8}
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
                  {/* END Mailing Address */}

                  {/* Start Text Notification */}
                  <TabVerticalPanel value={values} verticalIndex={2}>
                    <TextNotificationCard userAccountDetailCard={accountDetailData} />
                  </TabVerticalPanel>
                  {/* END Text Notification */}

                  {/* Payment Method */}
                  <TabVerticalPanel  value={values} verticalIndex={3}>
                    <PaymentMethodCard />
                  </TabVerticalPanel>
                  {/* END Payment Method */}

                  {/* Change Poassword */}
                  <TabVerticalPanel value={values} verticalIndex={4}>
                    <ChangePassword />
                  </TabVerticalPanel>
                  {/* END Change Poassword */}
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </div>

  );
}