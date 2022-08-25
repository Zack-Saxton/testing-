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
        Click Below To Take Vehicle Pictures If Discussed With Your Loan
        Officer.
        <br />
        Please take clear, wide angle photos from 6 feet away for
        exterior pictures.
      </span>
      <Grid item sm={12} md={6} className={classes.nextButton}>

        <ButtonPrimary
          stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "margin":"10px 0px"}'
          target="_blank" href={`https://${ process.env.REACT_APP_GOLDPOINT_HOST_NAME}/?applicationNumber=${ props.applicationNumber }`}
          data-testid = "UploadVehicle_photo"
        >
          Upload Vehicle Photo
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