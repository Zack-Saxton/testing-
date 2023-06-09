import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { useState } from "react";
import NumberFormat from 'react-number-format';
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import globalMessages from "../../../assets/data/globalMessages.json"
import { ButtonWithIcon } from "../../FormsUI";
import ScrollToTop from "../ScrollToTop";
import { useStylesAccountOverview } from "./Style";
function TabPanelViewApplication(props) {
  const { children, value, verticalIndex, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== verticalIndex}
      id={`scrollable-auto-tab-panel-${ verticalIndex }`}
      aria-labelledby={`scrollable-auto-tab-${ verticalIndex }`}
      {...other}
    >
      {value === verticalIndex && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanelViewApplication.propTypes = {
  children: PropTypes.node,
  verticalIndex: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function tabVerticalProps(verticalIndex) {
  return {
    id: `scrollable-auto-tab-vertical-viewApplication-${ verticalIndex }`,
    "aria-controls": `scrollable-auto-tab-panel-${ verticalIndex }`,
  };
}

export default function ViewAccountDetails() {
  const classes = useStylesAccountOverview();
  const [ values, setValues ] = useState(0);
  const handleTabChange = (_event, newValues) => setValues(newValues);
  let viewAppContact = Cookies.get("viewAppContact") ?? '{}';
  let viewApplicationContact = viewAppContact !== "undefined" ? JSON.parse(viewAppContact) : {};
  let viewAppApplicant = Cookies.get("viewAppApplicant") ?? '{}';
  let viewAppApplicantInfo = JSON.parse(viewAppApplicant);
  let appInfoList = {"first_name": "First Name", "last_name": "Last Name", "address_street": "Street Address", "address_city": "City", "address_state": "State", "address_postal_code": "Zip"};
  let appInfoKeyList = ["first_name","last_name", "address_street", "address_city", "address_state", "address_postal_code"];
                    
  //View part
  return (
    <div>
      <CheckLoginStatus />
      <ScrollToTop />
      <Grid
        container
        justifyContent={"center"}
        className={classes.centerGrid}
        data-testid="view_Account"
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.titleHeading}>
              <NavLink
                to="/customers/accountOverview"
              >
                <ButtonWithIcon
                  icon="arrow_backwardIcon"
                  iconposition="left"
                  stylebutton='{"background": "#fff", "color":"#214476",
                      "minWidth": "0px",
                      "width": "36px",
                      "padding": "0px",
                      "marginRight": "5px", "marginTop":"unset" }'
                  styleicon='{ "color":"" }'
                />
              </NavLink>{" "}
              Application Details
            </Typography>
          </Grid>
        </Grid>

        {/* Left Side Nav */}
        <Grid className="applicationDetailsWrap" item xs={12}>
          <Grid container item xs={12}>
            <Grid className="applicationDetailsGrid" item xs={12} sm={4}>
              <Paper className={classes.paperVerticalTabViewDetail}>
                <Tabs
                  value={values}
                  onChange={handleTabChange}
                  classes={{
                    indicator: classes.viewAppindicator,
                  }}
                  textColor="primary"
                  scrollButtons="auto"
                  orientation="vertical"
                  variant="scrollable"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab

                    label={
                      <span >
                        Status
                      </span>
                    }
                    className={classes.tabVerticalLabel}
                    {...tabVerticalProps(0)}
                  />

                  <Tab
                    label={
                      <span>
                        Information
                      </span>
                    }
                    className={classes.tabVerticalLabel}
                    {...tabVerticalProps(1)}
                  />
                </Tabs>
              </Paper>
            </Grid>
            {/* End Left Side Nav */}

            {/* Main Content */}
            <Grid className="weAreSorryWrap" item xs={12} sm={8}>
              <Paper className={classes.paper} style={!values ? { marginBottom: "500px" } : { marginBottom: "0px" }}>
                <TabPanelViewApplication value={values} verticalIndex={0} >
                  {viewAppApplicantInfo?.status ? (viewAppApplicantInfo?.status === "rejected") ?
                    <>
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          className={classes.viewAppStatusHeading}
                        >
                          We are Sorry!
                        </Typography>
                      </Grid>
                      <Grid>
                        <p className={classes.viewAppStatusDisplay}>
                          { globalMessages.Could_Not_Provide_An_Offer }
                        </p>
                      </Grid>
                    </> :

                    (viewAppApplicantInfo?.status === "approved") ?

                      <>  <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          className={classes.viewAppStatusHeading}
                        >
                          Dear {viewApplicationContact?.first_name},
                        </Typography>
                      </Grid>
                        <Grid>
                          <p className={classes.viewAppStatusDisplay}>
                            Congratulations! We have reviewed your information and are happy to inform you
                            that your loan proceeds are on the way.
                            <br></br> <br></br>
                            Borrowers usually receive funds into their bank account within three business days.
                            You will receive additional information regarding your account number and due date shortly.
                            If you signed up for automatic payments they will be deducted on your due date.
                            <br></br> <br></br>
                            <NavLink to="'/customers/myBranch'" className={classes.loanDetailsLink} >
                              Please click here to contact us!
                            </NavLink>
                            <br></br> <br></br>
                            <NavLink to="/customers/applyForLoan" className={classes.loanDetailsLink} state={{ from: "user" }} >
                              Please click here to start a new application.
                            </NavLink>
                          </p>
                        </Grid> </> :

                      (viewAppApplicantInfo?.status === "refered" || viewAppApplicantInfo?.status === "contact_branch") ?
                        <> <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            className={classes.viewAppStatusHeading}
                          >
                            Congratulations! {viewApplicationContact?.first_name},
                          </Typography>
                        </Grid>
                          <Grid>
                            <p className={classes.viewAppStatusDisplay}>
                              We believe we have a solution for you.
                              <br></br><br></br>
                              Upon completion of your application and verification of your information,
                              we may be able to extend your final offer as soon as today!
                              <br></br> <br></br>
                              {`"Let's get on a call"`} -  <NavLink to="/customers/myBranch" className={classes.loanDetailsLink} >
                                Please click here to contact us!
                              </NavLink>
                            </p>
                          </Grid> </> :

                        <> <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            className={classes.viewAppStatusHeading}
                          >
                            Dear {viewApplicationContact?.first_name},
                          </Typography>
                        </Grid>
                          <Grid>
                            <p className={classes.viewAppStatusDisplay}>
                              <NavLink to="/customers/myBranch" className={classes.loanDetailsLink}>
                                Please click here to contact us!
                              </NavLink>
                            </p>
                          </Grid> </> : <Grid />}

                </TabPanelViewApplication>
                <TabPanelViewApplication value={values} verticalIndex={1}>
                  <Grid item xs={12}>
                    <Typography variant="h6" className={classes.viewAppHeading}>
                      User Information
                    </Typography>
                  </Grid>
                  {                   
                  appInfoKeyList.map((key, index) => (
                    <Grid className={classes.viewAppInputGrid} key={`view-account-details-${index}`}>
                      <h4 className={classes.viewAppInputDisplay}>{appInfoList[key]}</h4>
                      <h4 className={classes.viewAppInputDisplay}>
                        {viewApplicationContact[key] ?? ""}{" "}
                      </h4>
                    </Grid>
                  ))
                  }

                  <Grid
                    className="loanRequestedText"
                    item
                    xs={12}
                  >
                    <Typography variant="h6" className={classes.viewAppHeading}>
                      Loan Information
                    </Typography>
                  </Grid>

                  <Grid className={classes.viewAppInputGrid}>
                    <h4 className={classes.viewAppInputDisplay}>
                      Application Date
                    </h4>
                    <h4 className={classes.viewAppInputDisplay}>
                      {" "}
                      {viewAppApplicantInfo?.submissionDate}
                    </h4>
                  </Grid>
                  <Grid className={classes.viewAppInputGrid}>
                    <h4 className={classes.viewAppInputDisplay}>
                      Product Type
                    </h4>
                    <h4 className={classes.viewAppInputDisplay}>
                      {" "}
                      {viewAppApplicantInfo?.product}
                    </h4>
                  </Grid>
                  <Grid className={classes.viewAppInputGrid}>
                    <h4 className={classes.viewAppInputDisplay}>
                      Requested Amount
                    </h4>
                    <h4 className={classes.viewAppInputDisplay}>
                      {" "}
                      <NumberFormat value={viewAppApplicantInfo?.amountRequested} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                    </h4>
                  </Grid>
                </TabPanelViewApplication>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}