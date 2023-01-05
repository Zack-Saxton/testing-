import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import {
  ButtonPrimary
} from "../../../components/FormsUI";
import { useStylesEmailVerification } from "./Style";

function VehiclePhotos(props) {
  const classes = useStylesEmailVerification();
  return (
    <Grid data-testid = "vehiclePhotos_component">
      <span className={classes.exampleText}>
        Click Below To Upload Vehicle Documents and Photos If Discussed With Your Loan Officer
      </span>
      <Grid item sm={12} md={6} className={classes.nextButton}>
        <ButtonPrimary
          id="uploadInformation"
          stylebutton='{"margin":""}'
          target="_blank" href={`${ process.env.REACT_APP_GOLDPOINT_HOST_NAME}/?applicationNumber=${ props.applicationNumber }`}
          data-testid = "UploadVehicle_photo"
        >
          Upload Vehicle Information
        </ButtonPrimary>
      </Grid>
    </Grid>
  );
}

export default VehiclePhotos;

VehiclePhotos.propTypes = {
  applicationNumber: PropTypes.string,
  customerEmail: PropTypes.string,
  next: PropTypes.func,
  prev: PropTypes.func,
};