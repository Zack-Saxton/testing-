import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Brightness5";
import TextsmsIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import PaymentsIcon from "@material-ui/icons/LinkOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import RoomIcon from "@material-ui/icons/Room";
import { useAtom } from 'jotai';
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import { getTextNotify } from "../../Controllers/myProfileController";
import ProfileImageController from "../../Controllers/ProfileImageController";
import { ButtonWithIcon } from "../../FormsUI";
import ScrollToTopOnMount from "../ScrollToTop";
import BasicInformationCard from "./BasicInformation";
import ChangePassword from "./ChangePassword";
import MailingAddressCard from "./MailingAddress";
import { tabAtom } from "./MyProfileTab";
import PaymentMethodCard from "./PaymentMethod";
import { useStylesMyProfile } from "./Style";
import "./Style.css";
import TextNotificationCard from "./TextNotification";



function TabVerticalPanel(props) {
  const { children, value, verticalIndex, ...other } = props;

  return (
    <div
      //role="tab-panel"
      hidden={ value !== verticalIndex }
      id={ `scrollable-auto-tab-panel-${ verticalIndex }` }
      aria-labelledby={ `scrollable-auto-tab-${ verticalIndex }` }
      { ...other }
    >
      { value === verticalIndex && (
        <Box>
          { children }
        </Box>
      ) }
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
    id: `scrollable-auto-tab-vertical-${ verticalIndex }`,
    "aria-controls": `scrollable-auto-tab-panel-${ verticalIndex }`,
  };
}

export default function MyProfile() {
  window.zeHide();
  const classes = useStylesMyProfile();

  const [ profileImage, setProfileImage ] = useState(null);
  async function AsyncEffect_profileImage() {
    setProfileImage(await ProfileImageController());
  }
  useEffect(() => {
    AsyncEffect_profileImage();
  }, []);

  const { data: accountDetails } = useQuery('loan-data', usrAccountDetails);
  Cookies.set("opted_phone_texting", accountDetails?.data?.customer?.latest_contact?.opted_phone_texting);

  let basicInfoData = (accountDetails != null) ? accountDetails?.data?.customer : null;
  let getProfImage = (profileImage != null) ? profileImage : null;
  const [ values, setValues ] = useAtom(tabAtom);
  const handleTabChange = (event, newValues) => {
    setValues(newValues);
  };


  let cookieTextNotify = Cookies.get("isTextNotify");
  if (!cookieTextNotify) {
    let textNotifyStatus = getTextNotify();
    let textNotifyData = textNotifyStatus?.data;
    let isTextNotify = textNotifyData?.sbt_getInfo != null && textNotifyData?.sbt_getInfo?.SubscriptionInfo != null ? textNotifyData?.sbt_getInfo?.SubscriptionInfo[ 0 ]?.SubscriptionOptions[ 0 ]?.OptInMarketing : false;
    Cookies.set('isTextNotify', isTextNotify);
    cookieTextNotify = Cookies.get("isTextNotify");
  }

  let textnotify = cookieTextNotify === "true" ? "On" : "Off";
  let hasActiveLoan = Cookies.get("hasActiveLoan") === "true" ? true : false;
  let hasApplicationStatus = Cookies.get("hasApplicationStatus");
  var appStatus = [ "rejected", "referred", "expired" ];
  let checkAppStatus = appStatus.includes(hasApplicationStatus);
  let disableField = (checkAppStatus === true || hasActiveLoan === true) ? true : false;

  return (
    <div>
      <CheckLoginStatus />
      <ScrollToTopOnMount />
      <Grid
        container
        justifyContent={ "center" }
        style={ {
          marginTop: "-150px",
          paddingRight: "23px",
          paddingLeft: "23px",
        } }
      >
        <Grid
          container
          item
          xs={ 12 }
          direction="row"
          style={ { width: "100%", paddingBottom: "10px" } }
        >
          <Typography className={ classes.heading } variant="h3">
            <NavLink
              to="/customers/accountOverview"
              style={ { textDecoration: "none" } }
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
            </NavLink>{ " " }
            Profile Settings
          </Typography>
        </Grid>

        {/* Left Side Nav */ }
        <Grid item xs={ 12 } style={ { paddingBottom: "200px", paddingTop: "10px" } }>
          <Grid container item xs={ 12 }>
            <Grid
              item
              xs={ 12 }
              sm={ 4 }
              style={ { width: "100%" } }
            >
              <Paper id="basicInfo" className={ classes.cardHeading }>
                <Tabs
                  value={ values }
                  onChange={ handleTabChange }
                  classes={ {
                    indicator: classes.indicator,
                  } }
                  textColor="primary"
                  scrollButtons="auto"
                  orientation="vertical"
                  variant="scrollable"
                  style={ { padding: "20px 0px" } }
                  aria-label="scrollable auto tabs example"
                >
                  <Tab
                    label={
                      <span
                        style={ {
                          float: "left",
                          width: "100%",
                          verticalAlign: "top",
                          "fontSize": "0.938rem",
                          "fontFamily": "Muli,sans-serif", fontWeight: "700"
                        } }
                      >
                        <SettingsIcon style={ { verticalAlign: "top", paddingRight: "10px" } } />{ " " }
                        Basic Information
                      </span>
                    }
                    className={ classes.tabVerticalLabel }
                    { ...tabVerticalProps(0) }
                  />

                  <Tab
                    label={
                      <span style={ { float: "left", width: "100%", "fontSize": "0.938rem", "fontFamily": "Muli,sans-serif", fontWeight: "700" } }>
                        <RoomIcon style={ { verticalAlign: "top", paddingRight: "10px" } } />{ " " }
                        Mailing Address
                      </span>
                    }
                    className={ classes.tabVerticalLabel }
                    { ...tabVerticalProps(1) }
                  />
                  <Tab
                    id="tab-vertical"
                    disabled={ disableField === true ? false : true }
                    label={
                      <span style={ { float: "left", width: "100%", "fontSize": "0.938rem", "fontFamily": "Muli,sans-serif", fontWeight: "700" } }>
                        <TextsmsIcon style={ { verticalAlign: "top", paddingRight: "10px" } } />
                        Text Notification - { textnotify }
                      </span>
                    }
                    className={ classes.tabVerticalLabel }
                    { ...tabVerticalProps(2) }
                  />

                  <Tab
                    disabled={ disableField === true ? false : true }
                    label={
                      <span style={ { float: "left", width: "100%", "fontSize": "0.938rem", "fontFamily": "Muli,sans-serif", fontWeight: "700" } }>
                        <PaymentsIcon style={ { verticalAlign: "top", paddingRight: "10px" } } />{ " " }
                        Payment Method
                      </span>
                    }
                    className={ classes.tabVerticalLabel }
                    { ...tabVerticalProps(3) }
                  />
                  <Tab
                    label={
                      <span style={ { float: "left", width: "100%", "fontSize": "0.938rem", "fontFamily": "Muli,sans-serif", fontWeight: "700" } }>
                        <LockOpenIcon style={ { verticalAlign: "top", paddingRight: "10px" } } />{ " " }
                        Change Password
                      </span>
                    }
                    className={ classes.tabVerticalLabel }
                    { ...tabVerticalProps(4) }
                  />
                </Tabs>
              </Paper>
            </Grid>
            {/* End Left Side Nav */ }

            {/* Main Content */ }
            <Grid
              id="myProfileMainContent"
              item
              xs={ 12 }
              sm={ 8 }
              style={ { paddingLeft: "15px", width: "100%" } }
            >
              <Paper id="mainContentTab" className={ classes.paper }>
                {/* Basic Information */ }
                <TabVerticalPanel value={ values } verticalIndex={ 0 }>
                  <BasicInformationCard basicInformationData={ basicInfoData } getUserAccountDetails={ accountDetails } AsyncEffect_profileImage={ AsyncEffect_profileImage } getProfileImage={ getProfImage } />
                </TabVerticalPanel>
                {/* //END Basic Information */ }

                {/* Mailing Address */ }
                <TabVerticalPanel value={ values } verticalIndex={ 1 }>
                  <MailingAddressCard basicInformationData={ basicInfoData } getUserAccountDetails={ accountDetails } />
                </TabVerticalPanel>
                {/* END Mailing Address */ }

                {/* Start Text Notification */ }
                <TabVerticalPanel value={ values } verticalIndex={ 2 }>
                  <TextNotificationCard />
                </TabVerticalPanel>
                {/* END Text Notification */ }

                {/* Payment Method */ }
                <TabVerticalPanel value={ values } verticalIndex={ 3 }>
                  <PaymentMethodCard />
                </TabVerticalPanel>
                {/* END Payment Method */ }

                {/* Change Poassword */ }
                <TabVerticalPanel value={ values } verticalIndex={ 4 }>
                  <ChangePassword basicInformationData={ basicInfoData } />
                </TabVerticalPanel>
                {/* END Change Poassword */ }
              </Paper>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </div>
  );
}