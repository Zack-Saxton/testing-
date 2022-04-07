import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { useStylesEmailVerification } from "./Style";
import UploadDocument from "./UploadDocument";

function VehiclePhotos(props) {
  const classes = useStylesEmailVerification();
  return (
    <Grid>
      <span>
        Click Below To Take Vehicle Pictures If Discussed With Your Loan
        Officer. Please take clear, wide angle photos from 6 feet away for
        exterior pictures.
      </span>
      <Grid  item sm={12} md={6}  className={classes.nextButton}>
        <UploadDocument 
          title="Select Vehicle Photo" 
          applicationNumber={ props.applicationNumber }
          customerEmail={ props.customerEmail }
          documentType="other_verification_doc" />
      </Grid>
    </Grid>
  );
}

export default VehiclePhotos;

VehiclePhotos.propTypes = {
  applicationNumber: PropTypes.string,
  customerEmail: PropTypes.string
};