import React from 'react'
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ButtonPrimary } from "../../FormsUI";
import { useStylesMFA } from "./Style";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const KbaQuestions = () => {
  const classes = useStylesMFA();
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('clicked');
  }

  return (
    <div>
      {/* className={isLoading ? classes.loadingOn : classes.loadingOff} */}
      <Grid>
        <Grid
          spacing={1}
          container
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          className={classes.twoStepWrap}
        >
          <Paper className={classes.twoStepPaper}>
            <Typography className={classes.twoStepHeading} variant="h5">
              2-Step Verification
            </Typography>
            <Typography className={classes.twoStepParagraph}>
            Please answer the questions below to help verify your identity. Please
            provide your response within 5 minutes.
            </Typography>



            <Grid className={classes.nextButtonGrid} container>
              <ButtonPrimary stylebutton='{"color":""}' disabled onClick={handleClick}>Next</ButtonPrimary>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      </div>
  )
}

export default KbaQuestions