import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { ButtonSecondary, ButtonWithIcon, Checkbox } from "../../../FormsUI";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";
import "./reviewandsign.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
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
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  heading: {
    color: "#fff",
    fontWeight: "400",
    fontSize:"1.64rem"
  },
  tablabel: {
    background: "white",
    margin: "10px",   
    color: "#3f51b5",
    fontFamily: "Segoe UI",
    fontSize: "1rem",
    textTransform: "none",
    fontWeight: "600",
  },
  table: {
    minWidth: 650,
  },
  columncolor: {
    lineHeight: 0,
    color: "#0f4eb3",
    fontSize: 25,
    fontWeight: 400,
    textAlign: "center",
  },

  rightborder: {
    // padding: "0px 15px",
    borderRight: "1px solid",
    lineHeight: 1,
  },
  columnheading: {
   
    fontSize: "14px",
    color: "#171717",
    textAlign: "center",
  },
}));

export default function ReviewAndSign() {
  const classes = useStyles();

  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Grid container justify={"center"} style={{ marginTop: "-150px", paddingRight:"30px", paddingLeft:"30px" }}>
      <Grid item xs={12}  fullWidth={true} direction="row" style={{ marginBottom: "-20px" }}>
            <Typography>
            
              <h3 className={classes.heading} >
              <NavLink
                  to="/customers/accountoverview"
                  style={{ textDecoration: "none" }}
                >
                  <ButtonWithIcon
                        icon="arrow_backwardIcon"
                        iconposition="left"
                        stylebutton='{"background": "#fff", "color":"#214476",
                        "minWidth": "0px",
                        "width": "36px",
                        "padding": "0px",
                        "marginRight": "5px" , "marginTop":"unset"}'
                        styleicon='{ "color":"" }'
                      />
                      </NavLink> Apply for a Loan</h3>
            </Typography>
          </Grid>

        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            //TabIndicatorProps= {{style: {background:'green',width:'100%', color:'white'}}}
            aria-label="scrollable auto tabs example"
          >
            <Tab
              label="1. Select Offer"
              disabled={true}
              className={classes.tablabel}
            />
            <Tab
              label="2. Review & Sign"
              className={classes.tablabel}
              {...a11yProps(1)}
            />
            <Tab
              label="3. Final Verification"
              disabled={true}
              className={classes.tablabel}
            />
            <Tab
              label="4. Receive your money"
              disabled={true}
              className={classes.tablabel}
            />
          </Tabs>

          {/* ##############################################Review And Sign################################################################################################# */}
          <TabPanel value={value} index={1}>
            <Grid item xs={12}  fullWidth={true} direction="row">
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={12} sm={6} fullWidth={true} direction="row">
                    <Typography>
                      <p
                        style={{
                         
                          color: "#171717",
                          fontSize: "18px",
                        }}
                      >
                        Selected Loan Offer
                      </p>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <NavLink
                      to="/customers/applyloan"
                      style={{ textDecoration: "none" }}
                    >
                      <ButtonSecondary
                        stylebutton='{"float": "right", "color":"" }'
                        styleicon='{ "color":"" }'
                        fullWidth={true}
                        id="reselect-button"
                      >
                        Re-Select Offer
                      </ButtonSecondary>
                    </NavLink>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    className={classes.rightborder}
                    id="rightborder"
                  >
                    
                    <p className={classes.columnheading} id="columnheading">
                      Select Amount
                    </p>
                    <h2 className={classes.columncolor} id="columncontent">
                      $10,000{" "}
                    </h2>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={2}
                    className={classes.rightborder}
                    id="rightborder-loanterm"
                  >
                    <p className={classes.columnheading} id="columnheading">
                      Loan Term
                    </p>
                    <h2 className={classes.columncolor} id="columncontent">
                      36M
                    </h2>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={2}
                    className={classes.rightborder}
                    id="rightborder"
                  >
                    <p className={classes.columnheading} id="columnheading">
                      Fee at Origination
                    </p>
                    <h2 className={classes.columncolor} id="columncontent">
                      0.00%
                    </h2>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={2}
                    className={classes.rightborder}
                    id="rightborder"
                  >
                    <p className={classes.columnheading} id="columnheading">
                      Loan Proceeds
                    </p>
                    <h2 className={classes.columncolor} id="columncontent">
                      $10,000
                    </h2>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    className={classes.rightborder}
                    id="rightborder-apr"
                  >
                    <p className={classes.columnheading} id="columnheading">
                      APR
                    </p>
                    <h2 className={classes.columncolor} id="columncontent">
                      23.99
                    </h2>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    style={{ lineHeight:"1" }}
                    id="rightborder"
                  >
                    <p className={classes.columnheading} id="columnheading">
                      Monthly Payment
                    </p>
                    <h2 className={classes.columncolor} id="columncontent">
                      $392.28
                    </h2>
                  </Grid>
                </Grid>
              </Paper>

              <Grid item fullWidth={true}>
                <p
                  style={{
                    textAlign: "justify",
                    fontSize: "13px",
                    color: "#6b6f82",
                    
                  }}
                >
                  Please confirm your selected loan before proceeding. Please
                  note that if you wish to change your loan amount after you
                  continue beyond this step, you will need to contact us to
                  re-apply.
                </p>
                <p
                  style={{
                    textAlign: "justify",
                    fontSize: "13px",
                    color: "#6b6f82",
                    
                  }}
                >
                  To accept your loan offer, please complete the following:
                </p>
                <ol
                  style={{
                    textAlign: "justify",
                    fontSize: "13px",
                    color: "#6b6f82",
                   
                  }}
                >
                  <li>
                    Review all presented disclosures and loan terms in detail.
                  </li>
                  <li>
                    Electronically sign the loan agreement using our digital
                    signature process.
                  </li>
                  <li>After signing, click the ‘Submit’ button.</li>
                </ol>
              </Grid>

              <Grid item xs={12} fullWidth={true} direction="row">
                <Paper
                  className={classes.paper}
                  style={{ height: "250px" }}
                ></Paper>
                <Paper className={classes.paper}>
                  <Grid item xs={12}>
                    <Checkbox
                      name="rememberme"
                      label={
                        <span
                          style={{
                            fontSize: "14px",
                            lineHeight: 1,
                            
                          }}
                        >
                          {" "}
                          Please click this box to confirm you would like to
                          submit your application. Please note that we will make
                          a ‘hard’ credit inquiry as part of this process, and
                          that credit inquiry may affect your credit.
                        </span>
                      }
                      labelid="rememberme"
                      testid="checkbox"
                      stylelabelform='{ "font-size":"12px" }'
                      stylecheckbox='{ "margin-bottom":"15px" }'
                      stylecheckboxlabel='{ "font-size":"12px" }'
                    />
                  </Grid>

                  <Grid item xs={12} style={{ lineHeight: 6 }}>
                    <NavLink
                      to="/customers/finalverification"
                      style={{ textDecoration: "none" }}
                    >
                      <ButtonWithIcon
                        stylebutton='{ "color":"" }'
                        styleicon='{ "color":"" }'
                        fullWidth={true}
                        id="reviewsubmit-button"
                      >
                        Submit
                      </ButtonWithIcon>
                    </NavLink>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item fullWidth={true}>
                <p
                  style={{
                    textAlign: "justify",
                    fontSize: "13px",
                    color: "#6b6f82",
                   
                  }}
                >
                  After you accept your loan, you will be required to provide
                  your bank information and verify information that you have
                  provided throughout the application process. Loan funding and
                  disbursement is conditioned upon our satisfactory review of
                  any documents and other information that we require from you
                  to verify your loan application and/or your identity. This
                  loan may not be consummated if you obtain another loan from us
                  prior to our disbursing funds for this loan.
                </p>
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
