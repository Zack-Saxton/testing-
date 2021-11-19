import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";
import { ButtonWithIcon } from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import ScrollToTopOnMount from '../../ScrollToTop';
import CheckLoginStatus from "../../../App/CheckLoginStatus";

//Initializing the Tab panel section
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
          <div>{children}</div>
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

//Styling part
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
    fontSize: "1.64rem",
  },
  tabLabel: {
    background: "white",
    margin: "10px",
    color: "#3f51b5",
    fontFamily: "'Muli', sans-serif !important",
    fontSize: "1rem",
    textTransform: "none",
    fontWeight: "600",
  },

  table: {
    minWidth: 650,
  },
  columnColor: {
    lineHeight: 0,
    color: "#0f4eb3",
    fontSize: 25,
    fontWeight: 400,
  },

  rightBorder: {
    padding: "0px 15px",
    borderRight: "1px solid",
    lineHeight: 1,
  },
  columnHeading: {
    fontSize: "14px",
    color: "#171717",
  },
}));

// Initializing Recive your money component
export default function ReceiveYourMoney() {
  const classes = useStyles();

  //Initializing state variables
  const [value, setValue] = React.useState(3);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  //JSX part
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
        }}
      >
        <Grid
          item
          xs={12} container
          direction="row"
          style={{ width: "100%", marginBottom: "20px" }}
        >
          <Typography className={classes.heading} variant="h3" >
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
            Apply for a Loan
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab
              label="1. Select Offer"
              disabled={true}
              className={classes.tabLabel}
            />
            <Tab
              label="2. Review & Sign"
              className={classes.tabLabel}
              disabled={true}
            />
            <Tab
              label="3. Final Verification"
              disabled={true}
              className={classes.tabLabel}
            />
            <Tab
              label="4. Receive your money"
              {...a11yProps(3)}
              className={classes.tabLabel}
            />
          </Tabs>

          <TabPanel value={value} index={3} style={{ paddingBottom: "300px" }}>
            <Grid item xs={12} style={{ width: "100%" }} container direction="row">
              <Paper className={classes.paper}>
                <div>
                  <h3>Your Application is Complete</h3>
                  <p style={{ textAlign: "justify" }}>
                    <b>
                      Thank you for submitting your verification information!
                    </b>
                    <br />
                    You should receive an email regarding the funds by the end
                    of the next business day provided that we require no
                    additional information, in which case we will reach out to
                    you.
                  </p>
                </div>
              </Paper>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}