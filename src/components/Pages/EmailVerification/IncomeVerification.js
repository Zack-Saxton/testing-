import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useStylesEmailVerification } from "./Style";
import UploadDocument from "./UploadDocument";

function IncomeVerification(props) {
  const classes = useStylesEmailVerification();
  return (
    <Grid data-testid = "incomeVerification_component">
      <ul className={classes.ulText}>
        <li className={classes.exampleText}>
          Recent Pay Statements (your most recent), or most recent Benefits
          Statement from current calendar year (if you are retired or not
          employed), or 1099 Income Statement as discussed with your loan
          officer.
        </li>
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

export default IncomeVerification;

IncomeVerification.propTypes = {
  applicationNumber: PropTypes.string,
  customerEmail: PropTypes.string,
  next: PropTypes.func,
  prev: PropTypes.func,
};
