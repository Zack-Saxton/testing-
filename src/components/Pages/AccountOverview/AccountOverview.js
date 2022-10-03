import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import React from "react";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import ScrollToTop from "../ScrollToTop";
import { useAccountOverview } from "./AccountOverviewHook/useAccountOverview";
import ActiveLoans from "./ActiveLoans";
import LimitedOffer from "./LimitedOffer";
import RecentApplications from "./RecentApplications";
import RecentPayments from "./RecentPayments";
import { useStylesAccountOverview } from "./Style";
import "./Style.css";

export default function AccountOverview() {
  const classes = useStylesAccountOverview();
  //API Call
  const { isLoading, accountDetails } = useAccountOverview();
  //Load data
  let offerData = accountDetails?.data?.offerData;
  let activeLoansData = accountDetails?.data?.activeLoans;
  let activeApplication = accountDetails?.data?.applicants
  Cookies.set("hasActiveLoan", true);
  if (Array.isArray(activeLoansData) && !(activeLoansData.length)) Cookies.set("hasActiveLoan", false);  
  Cookies.set("hasApplicationStatus", accountDetails?.data?.applicant?.processing?.status);
  if (Array.isArray(activeApplication) && !(activeApplication.length)) Cookies.set("hasApplicationStatus", "rejected");

  return (
    <div>
      <ScrollToTop />
      <CheckLoginStatus />
      <Grid
        container
        justifyContent="center"
        className={classes.centerGrid}
      >
        <Grid
          item
          xs={12}
          className={classes.accountOverviewWrap}
          container
          direction="row"
        >
          <Typography variant="h5" className={classes.heading} data-testid="subtitle_Title">
            Account Overview
          </Typography>
        </Grid>
        {/* ****************components************ */}
        <LimitedOffer isLoading={isLoading} userOffers={offerData} />
        <ActiveLoans />
        <RecentPayments />
        <RecentApplications />
      </Grid>
    </div>
  );
}