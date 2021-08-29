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
import { ButtonSecondary, ButtonWithIcon, Checkbox } from "../../../FormsUI";

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
  },

  rightborder: {
    padding: "0px 15px",
    borderRight: "1px solid",
    lineHeight: 1,
  },
  columnheading: {
   
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
      <Grid container justify={"center"}style={{ marginTop: "-150px", paddingRight:"30px", paddingLeft:"30px" }}>
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
                        "marginRight": "5px", "marginTop":"unset" }'
                        styleicon='{ "color":"" }'
                      />
                      </NavLink> Apply for a Loan</h3>
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

          <TabPanel value={value} index={2}  style={{paddingBottom:"30px"}}>
            <Stepper />

            <Grid item fullWidth={true}>
                            <p style={{
                  textAlign: "justify",
                  fontSize: ".8rem",
                  color: "#6b6f82",
                }}>
                                
                                    Loan funding and disbursement is conditioned upon our satisfactory review of any documents and other information that we require from you to verity your loan application and/or your identity. This loan
                                    may not be consummated if you obtain another loan from us pnor to our disbursing funds for this loan. It you have any questions. please contact us.
                               
                            </p>
                        </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
