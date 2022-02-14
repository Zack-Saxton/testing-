import React from "react";
import Typography from "@material-ui/core/Typography";
import { useStylesAccountOverview } from "./Style";
import Grid from "@material-ui/core/Grid";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import { NavLink } from "react-router-dom";
import { ButtonWithIcon } from "../../FormsUI";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import NumberFormat from 'react-number-format';
import ScrollToTopOnMount from "../ScrollToTop";
import Cookies from "js-cookie";

function TabPanelViewApplication(props) {
  const { children, value, verticalIndex, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== verticalIndex}
      id={`scrollable-auto-tab-panel-${verticalIndex}`}
      aria-labelledby={`scrollable-auto-tab-${verticalIndex}`}
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
    id: `scrollable-auto-tab-vertical-viewApplication-${verticalIndex}`,
    "aria-controls": `scrollable-auto-tab-panel-${verticalIndex}`,
  };
}

export default function ViewAccountDetails() {
  const classes = useStylesAccountOverview();
  const [values, setValues] = React.useState(0);

  const handleTabChange = (event, newValues) => {
    setValues(newValues);
  };

  var viewAppContact = Cookies.get("viewAppContact") ? Cookies.get("viewAppContact") : '{ }';
  var viewApplicationContact = JSON.parse(viewAppContact);
  var viewAppApplicant = Cookies.get("viewAppApplicant") ? Cookies.get("viewAppApplicant") : '{ }';
  var viewAppApplicantInfo = JSON.parse(viewAppApplicant);

  //View part
  return (
    <div>
      <CheckLoginStatus />
      <ScrollToTopOnMount />
      <Grid
        container
        justifyContent={"center"}
        style={{
          marginTop: "-150px",
          paddingRight: "30px",
          paddingLeft: "30px",
          paddingBottom: "30px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.titleHeading}>
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
                      "marginRight": "5px", "marginTop":"unset" }'
                  styleicon='{ "color":"" }'
                />
              </NavLink>{" "}
              Application Details
            </Typography>
          </Grid>
        </Grid>

        {/* Left Side Nav */}
        <Grid item xs={12} style={{ paddingTop: "20px" }}>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={4} style={{ padding: "5px", width: "100%" }}>
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
                  style={{ paddingTop: "5px" }}
                  aria-label="scrollable auto tabs example"
                >
                  <Tab
                 
                    label={
                      <span style={{ float: "left", textTransform: "none" }}>
                        Status
                      </span>
                    }
                    className={classes.tabVerticalLabel}
                    {...tabVerticalProps(0)}
                  />

                  <Tab
                    label={
                      <span style={{ float: "left", textTransform: "none" }}>
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
            <Grid item xs={12} sm={8} style={{ padding: "5px", width: "100%" }}>
              <Paper className={classes.paper}  style={values===0 ? {marginBottom: "500px"} : {marginBottom:"0px" }}>
                <TabPanelViewApplication value={values} verticalIndex={0} >
                 { viewAppApplicantInfo?.status ? (viewAppApplicantInfo?.status === "rejected") ? 
                 <> 
                 <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      className={classes.viewAppStatusHeading}
                    >
                      We are Sorry! {viewAppApplicantInfo?.status}
                    </Typography>
                  </Grid>
                  <Grid>
                    <p className={classes.viewAppStatusDisplay}>
                      Unfortunately, we could not provide an offer for you at
                      this time. However, you may reapply in 30 days if you feel
                      that your circumstances have changed. Feel free to read
                      our blog articles to understand how you can increase your
                      credit score.
                    </p>
                  </Grid>
                  </>  :
                  
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
                     <NavLink to="'/customers/myBranch'" style={{textDecoration: "none", color:"#0F4EB3",cursor:"pointer"}}>
                     Please click here to contact us!
                     </NavLink>
                     <br></br> <br></br>
                     <NavLink to="/customers/applyForLoan" state = { {from: "user"} } style={{textDecoration: "none", color:"#0F4EB3",cursor:"pointer"}}>
                     Please click here to start a new application.
                     </NavLink>
                    </p>
                  </Grid> </>  : 
                  
                   (viewAppApplicantInfo?.status === "refered" || viewAppApplicantInfo?.status === "contact_branch" ) ? 
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
                     "Let's get on a call" -  <NavLink to="/customers/myBranch" style={{textDecoration: "none", color:"#0F4EB3",cursor:"pointer"}}>
                     Please click here to contact us!
                     </NavLink>
                    </p>
                  </Grid> </>  :

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
                     <NavLink to="/customers/myBranch" style={{textDecoration: "none", color:"#0F4EB3",cursor:"pointer"}}>
                     Please click here to contact us!
                     </NavLink>
                    </p>
                  </Grid> </>   :  <Grid/>   }

                </TabPanelViewApplication>
                <TabPanelViewApplication value={values} verticalIndex={1}>
                  <Grid item xs={12}>
                    <Typography variant="h6" className={classes.viewAppHeading}>
                      Application Information
                    </Typography>
                  </Grid>

                  <Grid className={classes.viewAppInputGrid}>
                    <h4 className={classes.viewAppInputDisplay}>First Name</h4>
                    <h4 className={classes.viewAppInputDisplay}>
                      {viewApplicationContact?.first_name}{" "}
                    </h4>
                  </Grid>

                  <Grid className={classes.viewAppInputGrid}>
                    <h4 className={classes.viewAppInputDisplay}>Last Name</h4>
                    <h4 className={classes.viewAppInputDisplay}>
                      {" "}
                      {viewApplicationContact?.last_name}
                    </h4>
                  </Grid>

                  <Grid className={classes.viewAppInputGrid}>
                    <h4 className={classes.viewAppInputDisplay}>
                      Street Address
                    </h4>
                    <h4 className={classes.viewAppInputDisplay}>
                      {" "}
                      {viewApplicationContact?.address_street}
                    </h4>
                  </Grid>

                  <Grid className={classes.viewAppInputGrid}>
                    <h4 className={classes.viewAppInputDisplay}>City</h4>
                    <h4 className={classes.viewAppInputDisplay}>
                      {" "}
                      {viewApplicationContact?.address_city}
                    </h4>
                  </Grid>

                  <Grid className={classes.viewAppInputGrid}>
                    <h4 className={classes.viewAppInputDisplay}>State</h4>
                    <h4 className={classes.viewAppInputDisplay}>
                      {" "}
                      {viewApplicationContact?.address_state}
                    </h4>
                  </Grid>

                  <Grid className={classes.viewAppInputGrid}>
                    <h4 className={classes.viewAppInputDisplay}>Zip</h4>
                    <h4 className={classes.viewAppInputDisplay}>
                      {" "}
                      {viewApplicationContact?.address_postal_code}
                    </h4>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    style={{ paddingBottom: "5px", paddingTop: "40px" }}
                  >
                    <Typography variant="h6" className={classes.viewAppHeading}>
                      Loan Requested
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
