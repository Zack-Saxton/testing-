import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useStylesEmailVerification } from "./Style";
import UploadDocument from "./UploadDocument";

function OtherDocument(props) {
  const classes = useStylesEmailVerification();
  return (
    <Grid data-testid = "other_verification_doc_component">
      <ul className={classes.ulText}>
        <li className={classes.exampleText}>
        Please upload any other files, with the same camera/file options as the other sections on the page
        </li>
      </ul>
      <Grid item sm={12} md={6} >
        <UploadDocument
       
          title="Upload Document"
          applicationNumber={props.applicationNumber}
          customerEmail={props.customerEmail}
          documentType="other_verification_doc"
          prev={props.prev}
          next={props.next}
          showUploadButton={true}
        />
      </Grid>
    </Grid>
  );
}

export default OtherDocument;

OtherDocument.propTypes = {
  applicationNumber: PropTypes.string,
  customerEmail: PropTypes.string,
  next: PropTypes.func,
  prev: PropTypes.func,
};
