import React from "react";
import {ButtonPrimary} from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  content_grid: {
    marginTop: "15px",
  },
}));

//View Part
export default function IncomeVerification()
{
  const classes = useStyles();

  return (
    <div>
      <div>
        <p style={{textAlign: "justify"}}>
          To finalize our review, we need to verify the income that you have
          stated.
          <li>
            Please upload your most recent, complete pay statement (dated inside
            of 30 days) or your most recent benefits statement from the current
            calendar year if you are retired or not employed.
          </li>
          if you need to upload multiple documents to verify your stated income,
          you will have the opportunity to upload additional documents from your
          My Account Page &gt; Loan Application after you complete the
          verification steps.
        </p>

        <p style={{textAlign: "justify"}}>
          Acceptable ﬁle Formats are PDF, JPG, JPEG, GIF, 81 PNG (please note
          that we are unable to accept screenshots or photos of a computer
          screen).
        </p>

        <p style={{textAlign: "justify"}}>
          Feel Free to chat with us or give us a call at 833-421-3184 if you
          have a question about what is an acceptable form of proof of income!
        </p>
      </div>

      <Grid className={classes.content_grid}>
        <ButtonPrimary stylebutton='{"background": "", "color":"" }'>
          Upload Your Document
        </ButtonPrimary>
      </Grid>
    </div>
  );
}
