import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Stepper from "../Stepper/Stepper";

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
    color: "white",
    fontWeight: "normal",
    fontFamily: "system-ui",
  },
  tablabel: {
    background: "white",
    marginRight: "10px",
    marginBottom: "10px",
    fontFamily: " system-ui",
    color: "#3f51b5",
    textTransform: "none",
    fontWeight: "700",
  },

  table: {
    minWidth: 650,
  },
  columncolor: {
    lineHeight: 0,
    color: "#0f4eb3",
    fontSize: 25,
    fontWeight: 400,
  },

  rightborder: {
    padding: "0px 15px",
    borderRight: "1px solid",
    lineHeight: 1,
  },
  columnheading: {
    fontFamily: "system-ui",
    fontSize: "14px",
    color: "#171717",
  },
 
}));

export default function FinalVerification() {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const handleTabChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };



  return (
    <div>
      <Grid container justify={"center"} style={{ marginTop: "-150px" }}>
        <Grid item xs={10} fullWidth={true} direction="row">
          <Typography>
            <h3 className={classes.heading} data-testid="title">
              Apply for a loan
            </h3>
          </Typography>
        </Grid>

        <Grid item xs={10}>
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
              className={classes.tablabel}
            />
            <Tab
              label="2. Review & Sign"
              className={classes.tablabel}
              disabled={true}
            />
            <Tab
          
           
              label="3. Final Verification"
              {...a11yProps(2)}
              className={classes.tablabel}
            />
            <Tab
              label="4. Receive your money"
              disabled={true}
              className={classes.tablabel}
            />
          </Tabs>

          <TabPanel value={value} index={2}>
            <Stepper />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
