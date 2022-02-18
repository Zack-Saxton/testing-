import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../../App/CheckLoginStatus";
import { ButtonWithIcon } from "../../../FormsUI";
import ScrollToTopOnMount from "../../ScrollToTop";
import "../SelectOffer/SelectOffer.css";
import Stepper from "../Stepper/Stepper";
import TabSection from "../TabSection";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={ value !== index }
      id={ `scrollable-auto-tab-panel-${ index }` }
      aria-labelledby={ `scrollable-auto-tab-${ index }` }
      { ...other }
    >
      { value === index && (
        <Box>
          <div>{ children }</div>
        </Box>
      ) }
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
    color: "#214476",
    fontWeight: "400",
    fontSize: "1.64rem",
  },
  tabLabel: {
    background: "white",
    margin: "0px 20px 0px 0px",
    color: "#3f51b5",
    fontFamily: "'Muli', sans-serif !important",
    fontSize: "0.938rem !importnat",
    textTransform: "none",
    fontWeight: "700",
  },
  table: {
    minWidth: 650,
  },
  centerGrid:{
    marginTop: "20px",
    paddingRight: "23px",
    paddingLeft: "23px",
    },
}));

//Initializing Final verification functional component
export default function FinalVerification() {
  const classes = useStyles();
  const [ value, setValue ] = React.useState(2);
  window.zeShow();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //JSX part
  return (
    <div>
      <CheckLoginStatus term="final" />
      <ScrollToTopOnMount />
      <Grid
        container
        justifyContent={ "center" }
        className={ classes.centerGrid }
      >
        <Grid
          item
          xs={ 12 }
          container
          direction="row"
          style={ { width: "100%", marginBottom: "20px" } }
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
												"marginRight": "5px", "marginTop":"unset" }'
                styleicon='{ "color":"" }'
              />
            </NavLink>{ " " }
            Apply for a Loan
          </Typography>
        </Grid>

        {/* Tab section started */ }
        <Grid item xs={ 12 }>
          <TabSection value={ value } handleChange={ handleChange } classes={ classes } ay={ 2 } />

          <TabPanel
            value={ value }
            index={ 2 }
            style={ { paddingBottom: "30px", marginTop: "10px" } }
          >
            <Stepper />

            <Grid item style={ { width: "100%" } }>
              <p
                style={ {
                  textAlign: "justify",
                  fontSize: "0.938rem",
                  color: "#6b6f82",
                } }
              >
                Loan funding and disbursement is conditioned upon our
                satisfactory review of any documents and other information that
                we require from you to verity your loan application and/or your
                identity. This loan may not be consummated if you obtain another
                loan from us to our disbursing funds for this loan. It you have
                any questions. please contact us.
              </p>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
