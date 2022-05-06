import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import React from "react";
import { ButtonPrimary } from "../../FormsUI";
import "./MultiFactorAuthentication.css";
import { useStylesMFA } from "./Style";


const MultiFactorAuthenticationOTP = () => {
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
                Security Code
              </Typography>
              <IconButton className={classes.backArrow}>
                <ArrowBackIcon className={classes.yellowBackArrow} />
              </IconButton>
            </Grid>
            <Typography className={classes.twoStepParagraph}>
              Enter the 6 digit passcode received on your mobile{" "}
              <span>(**) ** 1234</span>. Code is valid for 15 minutes.
            </Typography>

            <Grid container>
              <Typography className={classes.twoStepParagraph}>
                Enter 6 digit security code
              </Typography>

              <Grid className={classes.otpWrap} container>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <TextField
                    id="otpNumberOne"
                    // inputProps={{ style: { textAlign: 'center' }}}
                    className={classes.otpNumber}
                    lable="OTP"
                    type="number"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <TextField
                    id="otpNumberTwo"
                    className={classes.otpNumber}
                    lable="OTP"
                    type="number"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <TextField
                    id="otpNumberThree"
                    className={classes.otpNumber}
                    lable="OTP"
                    type="number"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <TextField
                    id="otpNumberFour"
                    className={classes.otpNumber}
                    lable="OTP"
                    type="number"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <TextField
                    id="otpNumberFive"
                    className={classes.otpNumber}
                    lable="OTP"
                    type="number"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <TextField
                    id="otpNumberSix"
                    className={classes.otpNumber}
                    lable="email"
                    type="number"
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid className={classes.nextButtonGrid} container>
              <ButtonPrimary stylebutton='{"color":""}'>
                Verify Now
              </ButtonPrimary>
            </Grid>
            <Typography className={classes.resetText}>
              Didnt receive code?{" "}
              <Link href="#" className="blueColorLink">
                Resend
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MultiFactorAuthenticationOTP;
