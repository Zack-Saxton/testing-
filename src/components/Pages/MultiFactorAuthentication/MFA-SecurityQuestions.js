import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useStylesMFA } from "./Style";
import "./MultiFactorAuthentication.css";
import { ButtonPrimary } from "../../FormsUI";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Typography, TextField } from "@mui/material";

const MFASecurityQuestions = () => {
  const classes = useStylesMFA();

  return (
    <div>
      <Grid>
        <Grid
          spacing={1}
          container
          item
          md={6}
          lg={6}
          xl={6}
          className={classes.twoStepWrap}
        >
          <Paper className={classes.twoStepPaper}>
            <Grid className={classes.headingTextWrap}>
              <Typography className={classes.twoStepHeading} variant="h5">
                Security Questions
              </Typography>
              <Typography className={classes.securityCubText} variant="h6">
                Answers are not case sensitive
              </Typography>
              <IconButton className={classes.backArrow}>
                <ArrowBackIcon className={classes.yellowBackArrow} />
              </IconButton>
            </Grid>

            <Grid className={classes.otpWrap} container>
              <Grid
                className={classes.securityQuestionsInput}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <TextField
                  id="questionsOne"
                  name="What was the name of your favorite pet?"
                  label="What was the name of your favorite pet?"
                  type="text"
                  variant="standard"
                  fullWidth
                />
              </Grid>

              <Grid
                className={classes.securityQuestionsInput}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <TextField
                  id="questionsTwo"
                  name="What was the name of your favorite teacher?"
                  label="What was the name of your favorite teacher?"
                  type="text"
                  variant="standard"
                  fullWidth
                />
              </Grid>

              <Grid
                className={classes.securityQuestionsInput}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <TextField
                  id="questionsThree"
                  name="What city did you meet your current spouse?"
                  label="What city did you meet your current spouse?"
                  type="text"
                  variant="standard"
                  fullWidth
                />
              </Grid>

              <Grid
                className={classes.securityQuestionsInput}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <TextField
                  id="questionsFour"
                  name="What is your favorite vacation destination?"
                  label="What is your favorite vacation destination?"
                  type="text"
                  variant="standard"
                  fullWidth
                />
              </Grid>

              <Grid
                className={classes.securityQuestionsInput}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <TextField
                  id="questionsFive"
                  name="Where did you and your spouse marry?"
                  label="Where did you and your spouse marry?"
                  type="text"
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid className={classes.nextButtonGrid} container>
              <ButtonPrimary stylebutton='{"color":""}'>
                Verify Now
              </ButtonPrimary>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MFASecurityQuestions;
