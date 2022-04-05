import React from "react";
import { Grid } from "@material-ui/core";
import { useStylesEmailVerification } from "./Style";
import UploadDocument from "./UploadDocument";

function VehiclePhotos() {
  const classes = useStylesEmailVerification();
  return (
    <Grid>
      <span>
        Click Below To Take Vehicle Pictures If Discussed With Your Loan
        Officer. Please take clear, wide angle photos from 6 feet away for
        exterior pictures.
      </span>
      <Grid  item sm={12} md={6}  className={classes.nextButton}>
        <UploadDocument title="Upload Vehicle Photo" documentType="vehiclePhoto" />
      </Grid>
    </Grid>
  );
}

export default VehiclePhotos;
