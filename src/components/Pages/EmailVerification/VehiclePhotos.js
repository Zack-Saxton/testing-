import React from "react";
import { Grid } from "@mui/material";
import { ButtonPrimary } from "../../../components/FormsUI";
import { useStylesEmailVerification } from "./Style";

function VehiclePhotos() {
  const classes = useStylesEmailVerification();
  return (
    <Grid>
      <span>
        Click Below To Take Vehicle Pictures If Discussed With Your Loan
        Officer. Please take clear, wide angle photos from 6 feet away for
        exterior pictures.
      </span>
      <Grid className={classes.nextButton}>
        <ButtonPrimary stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'>
          Take Vehicle Photo
        </ButtonPrimary>
      </Grid>
    </Grid>
  );
}

export default VehiclePhotos;
