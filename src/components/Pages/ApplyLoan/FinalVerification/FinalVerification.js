import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../../App/CheckLoginStatus";
import { ButtonWithIcon } from "../../../FormsUI";
import ScrollToTopOnMount from "../../ScrollToTop";
import "../SelectOffer/SelectOffer.css";
import { useStylesApplyForLoan } from "../Style"
import Stepper from "../Stepper/Stepper";
import TabPanel from "../TabPanel"
import TabSection from "../TabSection";


//Initializing Final verification functional component
export default function FinalVerification() {
  const classes = useStylesApplyForLoan();
  const [ value, setValue ] = useState(2);
  const handleChange = (event, newValue) => setValue(newValue);
  useEffect(() => {
    return () => zE('webWidget', 'hide');
  }, []);
  zE('webWidget', 'show');
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
          className={ classes.gridContainer }
        >
          <Typography className={ classes.applyLoanHeadingText } variant="h3">
            <NavLink
              to="/customers/accountOverview"
              className={ classes.textDecoration }
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
            className={ classes.tabPanelStyle }
          >
            <Stepper />
            <Grid item className={ classes.fullWidth }>
              <p
              className={ classes.paraTagStyle }
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
