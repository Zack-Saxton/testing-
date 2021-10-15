import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useStylesFaq } from "./Style";
import "./Style.css";
import Faq from "./Faq";

export default function FaqBeforeLogin() {
  //Material UI css class
  const classes = useStylesFaq();

  //view part
  return (
    <div>
      <div className="mainDiv">
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.titleHeading}>
            Frequently Asked Questions
          </Typography>
        </Grid>

        <Faq />
      </div>
    </div>
  );
}
