import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../../App/CheckLoginStatus";
import { ButtonWithIcon } from "../../../FormsUI";
import ScrollToTop from "../../ScrollToTop";
import "../SelectOffer/SelectOffer.css";
import Stepper from "../Stepper/StepperMain";
import { useStylesApplyForLoan } from "../Style";
import TabPanel from "../TabPanel";
import TabSection from "../TabSection";
import globalMessages from "../../../../assets/data/globalMessages.json";


//Initializing Final verification functional component
export default function FinalVerification() {
  const classes = useStylesApplyForLoan();
  const [ value, setValue ] = useState(2);
  const handleChange = (_event, newValue) => setValue(newValue);
   
  const loadZenDesk = () => {
    const existingZenDeskScript = document.getElementById('ze-snippet');
    if (!existingZenDeskScript) {
    const script = document.createElement("script");
    script.src = `https://static.zdassets.com/ekr/snippet.js?key=`+`${process.env.REACT_APP_ZE}`;
    script.async = true;
    script.id="ze-snippet"   
    document.body.appendChild(script);    
    }else if(existingZenDeskScript)
    {
      zE("webWidget", "show")
    }
  };

//Load Zendesk
  useEffect(() => {
    loadZenDesk()
    return () => zE('webWidget', 'hide');
    }, []);

  //JSX part
  return (
    <div>
      <CheckLoginStatus term="final" />
      <ScrollToTop />
      <Grid
        container
        justifyContent={"center"}
        className={classes.centerGrid}
      >
        <Grid
          item
          xs={12}
          container
          direction="row"
          className={classes.gridContainer}
        >
          <Typography className={classes.applyLoanHeadingText} variant="h3">
            <NavLink
              to="/customers/accountOverview"
              className={classes.textDecoration}
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
          <TabSection value={value} handleChange={handleChange} classes={classes} ay={2} />
          <TabPanel
            value={value}
            index={2}
            className={classes.tabPanelStyle}
          >
            <Stepper />
            <Grid item className={classes.fullWidth}>
              <p
                className={classes.paraTagStyle}
              >
                {globalMessages.Loan_Funding}
              </p>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
