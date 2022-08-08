import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import amOneLogo from "../../../../assets/icon/amOneWhite.png";
import PropTypes from "prop-types";
import React from "react";
import { ButtonPrimary } from "../../../FormsUI";
import { AmOneNoOffersStyle } from "./Style";
import "./AmOneNoOffersAvailable.css";

const AmOneNoOffersAvailable = () => {
  const classes = AmOneNoOffersStyle(); 

  return (
    <div>
      <Grid className={classes.blueBackGround}>
        <Grid className={classes.AmOneGrid} item md={6} lg={6} xl={6}>
          <Typography
            data-testid="firstParagraph"
            id="amOneTypography"
            className={classes.amOneMainTypography}
            variant="h6"
          >
            We don{"'"}t have an offer for you based on your
            <br /> application at this time, but our partners at
            <br /> AmOne may be able to help!
          </Typography>
          <Paper className={classes.AmOnePaper}>
            <Typography
              data-testid="secondParagraph"
              className={classes.amOneTypography}
            >
              If you still wish to obtain a loan please consider our partner
              Amone who provides a free service matching you with other loan
              options that may fit your credit situation.
            </Typography>
            <Grid className={classes.getMoreOptionGrid}>
              <Typography
                data-testid="firstSentence"
                id="getMoreOptionHeading"
                variant="h6"
              >
                Get More Loan Options. Get Started!
              </Typography>

              <Grid className={classes.getMoreOptionWrap} item md={6} lg={6}>
                <Typography
                  data-testid="secondSentence"
                  className={classes.getMoreOption}
                >
                  <CheckIcon />
                  Unsecured options for almost any credit situation
                </Typography>
                <Typography
                  data-testid="thirdSentence"
                  className={classes.getMoreOption}
                >
                  <CheckIcon />
                  More Loan options that may fit your needs
                </Typography>
                <Typography
                  data-testid="fourthSentence"
                  className={classes.getMoreOption}
                >
                  <CheckIcon />
                  Checking your rates will not impact your credit score
                </Typography>
              </Grid>
              <Grid className={classes.checkMyOption}>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="checkMyOffersLink"
                  href="https://o1.qnsr.com/cgi/r?;n=203;c=1674838;s=30419;x=7936;f=202012171442020;u=j;z=TIMESTAMP"
                >
                  <ButtonPrimary
                    data-testid="amOnebtn"
                    id="checkMyOptions"
                    stylebutton='{"background": "#fc9505", "color": "#fff"}'
                  >
                    <span>
                      <LockIcon />
                    </span>
                    Check My Options <ArrowForwardIosIcon />
                  </ButtonPrimary>
                </a>
              </Grid>
              <Grid data-testid="amLogo" className="amOneLogo">
                <img src={amOneLogo} alt="amOneLogo" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid className={classes.preFooterWrap}>
          <Grid className={classes.preFooterText}>
            <Typography
              data-testid="thirdParagraph"
              className={classes.preFooterTypography}
            >
              * AmOne is a brand owned and operated by QuinStreet PL, Inc.
              (“Quinstreet”), and Quinstreet owns and operates the website
              https://www.amone.com/ (the “Quinstreet Website”). Please review
              all terms and conditions of using the Quinstreet Website and any
              disclosures contained therein. Quinstreet and/or its partners
              determine the underwriting criteria necessary for approval for any
              financial product or service, and you should review Quinstreet and
              any of its partners’ terms and conditions to determine which loan
              offer, if any, best suits your personal financial situation. All
              rates, fees, and terms on the Quinstreet Website are presented
              without guarantee from Mariner Finance, LLC (“Mariner”) and are
              subject to change pursuant to Quinstreet or its partners’
              discretion. Mariner cannot guarantee that you will be approved for
              credit or that upon approval you will qualify for the advertised
              rates, fees, or terms that were shown. Any offers or information
              that may appear on the Quinstreet Website have not been reviewed
              and/or approved by Mariner. Mariner will not provide any of your
              personal information to Quinstreet, even if you click the shown
              link to the Quinstreet Website. Mariner may be compensated by
              Quinstreet if you click through to the Quinstreet Website, fill
              out the relevant form(s), apply for, and receive a financial
              product from one of Quinstreet’s partners.
            </Typography>
            <br />
            <Typography
              data-testid="fourthParagraph"
              className={classes.preFooterTypography}
            >
              ** Please review the terms and conditions presented on the
              Quinstreet Website to understand when and how your credit score
              may be affected if you choose to submit your personal information
              to the Quinstreet Website. Mariner is not responsible for any
              change in your credit score or any related inquiries resulting
              from your submission of personal information to the Quinstreet
              Website.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default AmOneNoOffersAvailable;

AmOneNoOffersAvailable.propTypes = {
  props: PropTypes.object,
  location: PropTypes.object,
};
