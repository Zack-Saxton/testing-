import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { ButtonPrimary, ButtonSecondary } from "../../../components/FormsUI";
import { useStylesEmailVerification } from "./Style";
import UploadDocument from "./UploadDocument";

function BankAccountVerification(props) {
  const classes = useStylesEmailVerification();

  return (
    <Grid>
      <ul className={classes.ulText}>
        <li className={classes.exampleText}>
          Please upload a voided personal check for the bank account you
          provided. If you do not have a personal check, please upload your most
          recent bank statement.
        </li>
      </ul>
      <span className={classes.exampleText}>Please ensure:</span>
      <ul className={classes.ulText}>
        <li className={classes.exampleText}>Your full account number and name are visible.</li>
        <li className={classes.exampleText}>Acceptable file formats are PDF, JPG, JPEG and PNG.</li>
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
          { props.isLastStep ? ""
            :
            <ButtonPrimary 
              stylebutton='{"color": ""}' 
              onClick={ props.next }
              >
              Next
            </ButtonPrimary>
          }
          
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BankAccountVerification;
BankAccountVerification.propTypes = {
  applicationNumber: PropTypes.string,
  customerEmail: PropTypes.string,
	next: PropTypes.func,
  prev: PropTypes.func,
  isLastStep: PropTypes.bool
};