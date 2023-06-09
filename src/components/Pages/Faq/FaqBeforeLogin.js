import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import Faq from "./Faq";
import { useStylesFaq } from "./Style";
import "./Style.css";

export default function FaqBeforeLogin() {

  //Material UI css class
  const classes = useStylesFaq();

  //view part
  return (
    <div>
      <div className="mainFaqDiv">
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
