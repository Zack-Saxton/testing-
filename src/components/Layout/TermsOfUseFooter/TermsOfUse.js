import React from "react";
import "./Style.css";
import { useStylesTermsOfUse } from "./Style";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";


export default function TermsOfUse() {
    const classes = useStylesTermsOfUse();
  //View part
  return (
    <div >
      <div className="mainDiv">
      <Grid
          item
          xs={ 12 }
          style={ { width: "100%", paddingBottom: "10px" } }
          container
          direction="row"
        >
          <Typography variant="h5" className={ classes.heading }>
            Terms Of Use
          </Typography>
        </Grid>

        <Grid  item xs={ 12 }>
        <Paper  className={ classes.paper }>
        <Typography >
            Under development
          </Typography>
            </Paper>

        </Grid>
        
      </div>
    </div>
  );
}