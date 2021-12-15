import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Stepper from "../Stepper/Stepper";
import { NavLink } from "react-router-dom";
import { ButtonWithIcon } from "../../../FormsUI";
import ScrollToTopOnMount from '../../ScrollToTop';
import CheckLoginStatus from "../../../App/CheckLoginStatus";


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

//Styling
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
}));

//Initializing Final verification functional component 
export default function FinalVerification() {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  //JSX part
  return (
    <div>
      <CheckLoginStatus  term="final" />
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
        <Grid item xs={12} container direction="row"
          style={{ width: "100%", marginBottom: "20px" }}
        >
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
                        "marginRight": "5px", "marginTop":"unset" }'
                styleicon='{ "color":"" }'
              />
            </NavLink>{" "}
            Apply for a Loan
          </Typography>
        </Grid>

        {/* Tab section started */}
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
              {...a11yProps(2)}
              className={classes.tabLabel}
            />
            <Tab
              label="4. Receive your money"
              disabled={true}
              className={classes.tabLabel}
            />
          </Tabs>

          <TabPanel value={value} index={2} style={{ paddingBottom: "30px" }}>
            <Stepper />

            <Grid item style={{ width: "100%" }}>
              <p
                style={{
                  textAlign: "justify",
                  fontSize: ".8rem",
                  color: "#6b6f82",
                }}
              >
                Loan funding and disbursement is conditioned upon our
                satisfactory review of any documents and other information that
                we require from you to verity your loan application and/or your
                identity. This loan may not be consummated if you obtain another
                loan from us to our disbursing funds for this loan. It you
                have any questions. please contact us.
              </p>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
