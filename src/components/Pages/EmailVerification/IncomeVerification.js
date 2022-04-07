import React from "react";
import { Grid } from "@mui/material";
import { ButtonPrimary, ButtonSecondary } from "../../../components/FormsUI";
import { useStylesEmailVerification } from "./Style";
import PropTypes from "prop-types";
import UploadDocument from "./UploadDocument";

function IncomeVerification(props) {
  const classes = useStylesEmailVerification();
  return (
    <Grid>
      <ul className={classes.ulText}>
        <li>
          Recent Pay Statements (your most recent), or most recent Benefits
          Statement from current calendar year (if you are retired or not
          employed), or 1099 Income Statement as discussed with your loan
          officer.
        </li>
      </ul>
      <Grid  item sm={12} md={6} >
        <UploadDocument 
          title="Select Your Document" 
          applicationNumber={ props.applicationNumber }
          customerEmail={ props.customerEmail }
          documentType="proof_of_income"/>
        <Grid className={classes.nextButton} container>
          <ButtonSecondary
            id="buttonMarginRight"
            stylebutton='{"color": "black","padding":"0px 30px"}'
          >
            Reset
          </ButtonSecondary>
          <ButtonSecondary
            id="buttonMarginRight"
            stylebutton='{"color": "black", "borderRadius": "50px"}'
            onClick={ props.prev }
          >
            Prev
          </ButtonSecondary>

          <ButtonPrimary stylebutton='{"color": ""}'  onClick={ props.next }>Next</ButtonPrimary>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default IncomeVerification;

IncomeVerification.propTypes = {
  applicationNumber: PropTypes.string,
  customerEmail: PropTypes.string,
	next: PropTypes.func,
  prev: PropTypes.func,
};
