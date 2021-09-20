import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {useStylesAccountOverview} from "./Style";
import adBanner from "../../../assets/images/adbanner.jpg";
import MortgageBanner from "../../../assets/images/Mortgage-Banner.jpg";

export default function LimitedOffer() {
  const classes = useStylesAccountOverview();
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={8}
        style={{ padding: "5px" }}
      >
        <Paper className={classes.paper} style={{ height: "85%" }}>
          <img
            src={adBanner}
            data-testid="background"
            style={{height:"96%"}}
            alt="ad_banner"
          />
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        style={{ padding: "5px" }}
      >
        <Paper className={classes.paper} style={{ height: "85%" }}>
          <img
            src={MortgageBanner}
            data-testid="background"
            style={{height:"96%"}}
            alt="mortgage_banner"
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
