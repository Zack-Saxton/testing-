import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useStylesEmailVerification } from "./Style";
import {
  ButtonPrimary
} from "../../../components/FormsUI";

function VehiclePhotos(props) {
  const classes = useStylesEmailVerification();
  return (
    <Grid>
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
          target="_blank" href={ `https://collateralcapturemarinerfinance.goldpointbeta.com/?applicationNumber=${props.applicationNumber}` }
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