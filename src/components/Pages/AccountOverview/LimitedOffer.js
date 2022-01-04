import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import { useStylesAccountOverview } from "./Style";
import adBanner from "../../../assets/gallery/Ad_Banner.jpg";
import MortgageBanner from "../../../assets/images/Mortgage-Banner.jpg";
import "./Style.css";
import { ButtonPrimary } from "../../FormsUI";
import CircularProgress from '@material-ui/core/CircularProgress';
import NumberFormat from "react-number-format";



export default function LimitedOffer(userOfferData) {
  //Material UI css class
  const classes = useStylesAccountOverview();

  // Get offers details
  let userOfferAmount = (userOfferData.userOffers != null) ? userOfferData.userOffers.offerAmount : 0;

  //View
  return (
    <div id="mainContainer">
      <Grid container spacing={2} style={{paddingBottom: "10px"}}>
        <Grid
          id="LimitedOfferGrid"
          item
          xs={12}
          sm={8}
        >
          <Paper id="paperProperties"  style={{ height: "100%" }} className={classes.paperPropertiesLimitedOffer}>
            <div id="yellowBg">
              <div id="Wrapp">
              <img
                src={adBanner}
                data-testid="background"
                style={{ textDecoration: "none",  height: "100%" }}
                alt="ad_banner"
              />
              </div>
              {userOfferData.userOffers === null ? (<CircularProgress />) : (
                (userOfferAmount) ? (
                  <div id="offerText">
                    <p id="loanText">Personal Loan of</p>
                    <p id="loanPercent">
                      <NumberFormat value={userOfferAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </p>
                    <NavLink
                      to="/customers/selectOffer"
                      style={{ textDecoration: "none" }}
                    >
                      <ButtonPrimary id="claimButton" stylebutton='{"color":""}'>
                        Claim the Offer
                      </ButtonPrimary>
                    </NavLink>
                  </div>
                ) : (
                  <div id="offerText">
                    <NavLink
                      to={{ pathname:'/customers/applyForLoan', state: {from: "user"}  }}
                      style={{ textDecoration: "none" }}
                    >
                      <ButtonPrimary id="claimButton" stylebutton='{"color":"", "text-transform": "none"}'>
                        Apply for a Loan
                      </ButtonPrimary>
                    </NavLink>
                  </div>
                )
              )}
            </div>
          </Paper>
        </Grid>
        <Grid
          id="offerTwo"
          item
          xs={12}
          sm={4}
        >
          <Paper id="paperPropertiesOfferTwo" style={{ height: "100%" }} className={classes.paperPropertiesOfferTwo}>
            <a
              target="_blank" 
              rel="noreferrer"
              href="https://www.marinerfinance.com/apply-home-loan/?utm_source=CAC&utm_medium=panel&utm_campaign=Mrktoffer_Mortgage"
              style={{ textDecoration: "none",  height: "100%" }}
            >
              <img
                src={MortgageBanner}
                data-testid="background"
                alt="mortgage_banner"
                style={{ width:"100%",  height: "100%" }}
              />
            </a>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
