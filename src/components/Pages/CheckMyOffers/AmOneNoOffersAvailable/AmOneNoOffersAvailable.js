import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import amOneLogo from "../../../../assets/icon/amOne.png";
import React from "react";
import { ButtonPrimary } from "../../../FormsUI";
import { AmOneNoOffersStyle } from "./Style";
import "./AmOneNoOffersAvailable.css";

const AmOneNoOffersAvailable = () => {
  const classes = AmOneNoOffersStyle();

  return (
    <div>
      <Grid className={classes.greyBackGround}>
        <Grid className={classes.AmOneGrid} item md={6} lg={6} xl={6}>
          <Paper className={classes.AmOnePaper}>
            <Typography
              id="amOneTypography"
              className={classes.amOneMainTypography}
              variant="h6"
            >
              We don{"'"}t have an offer for you based on your
              <br /> application at this time, but our partners at
              <br /> AmOne may be able to help!
            </Typography>
            <Typography className={classes.amOneTypography}>
              If you still wish to obtain a loan please consider our partner
              Amone who provides a free service matching you with other loan
              options that may fit your credit situation.
            </Typography>
            <Grid className={classes.getMoreOptionGrid}>
              <Typography id="getMoreOptionHeading" variant="h6">
                Get More Loan Options. Get Started!
              </Typography>

              <Grid className={classes.getMoreOptionWrap} item md={6} lg={6}>
                <Typography className={classes.getMoreOption}>
                  <CheckIcon />
                  Unsecured options for almost any credit situation
                </Typography>
                <Typography className={classes.getMoreOption}>
                  <CheckIcon />
                  More Loan options that may fit your needs
                </Typography>
                <Typography className={classes.getMoreOption}>
                  <CheckIcon />
                  Checking your rates will not impact your credit score
                </Typography>
              </Grid>
              <Grid className={classes.checkMyOption}>
                <ButtonPrimary
                  id="checkMyOptions"
                  stylebutton='{"background": "#fc9505", "color": "#fff", "borderRadius": "50px"}'
                >
                  <span>
                    <LockIcon />
                  </span>
                  Check My Options <ArrowForwardIosIcon />
                </ButtonPrimary>
              </Grid>
              <Grid className="amOneLogo">
                <img src={amOneLogo} alt="amOneLogo" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default AmOneNoOffersAvailable;
