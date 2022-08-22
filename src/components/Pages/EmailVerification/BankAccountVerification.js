import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useStylesEmailVerification } from "./Style";
import UploadDocument from "./UploadDocument";

function BankAccountVerification(props) {
  const classes = useStylesEmailVerification();

  return (
    <Grid data-testid = "BankAccountVerification_component">
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
      <Grid item sm={12} md={6} >
        <UploadDocument
          title="Upload Document"
          applicationNumber={props.applicationNumber}
          customerEmail={props.customerEmail}
          documentType="proof_of_income"
          prev={props.prev}
          next={props.next}
        />
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
};