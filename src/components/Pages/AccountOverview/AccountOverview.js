import React from "react";
import { useStylesAccountOverview } from "./Style";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import ScrollToTopOnMount from "../ScrollToTop";
import RecentApplications from "./RecentApplications";
import ActiveLoans from "./ActiveLoans";
import RecentPayments from "./RecentPayments";
import "./Style.css";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import LimitedOffer from "./LimitedOffer";
import Cookies from "js-cookie";
import {useQuery} from 'react-query'

export default function AccountOverview() {
  const classes = useStylesAccountOverview();
  window.zeHide();
  //API Call

  const {isLoading, data : accountDetails} = useQuery('loan-data', usrAccountDetails )
 
  //Load data
  let offerData = (accountDetails != null) ? accountDetails?.data?.offerData : null;
  let applicationsData = (accountDetails != null) ? accountDetails?.data?.applicants : null;
  let status = (accountDetails != null) ? accountDetails?.data?.status : null;
  let activeLoansData = (accountDetails != null) ? accountDetails?.data?.activeLoans : null;
  let recentPaymentData = (accountDetails != null) ? accountDetails?.data?.activeLoans : null;
  if (Array.isArray(activeLoansData) && activeLoansData.length === 0) {
    Cookies.set("hasActiveLoan", false);
  } else {
    Cookies.set("hasActiveLoan", true);
  }
  Cookies.set("hasApplicationStatus", accountDetails?.data?.applicant?.processing?.status);

  return (
    <div>
      <ScrollToTopOnMount />
      <CheckLoginStatus />
      <Grid
        container
        justifyContent="center"
        style={{
          marginTop: "-150px",
          paddingRight: "23px",
          paddingLeft: "23px",
        }}
      >
        <Grid
          item
          xs={12}
          style={{ width: "100%", paddingBottom: "10px" }}
          container
          direction="row"
        >
          <Typography variant="h5" className={classes.heading} data-testid="subtitle">
            Account Overview
          </Typography>
        </Grid>

        {/* ****************components************ */}

        <LimitedOffer isLoading={isLoading} userOffers={offerData} />
        <ActiveLoans isLoading={isLoading} userActiveLoanData={activeLoansData} />
        <RecentApplications isLoading={isLoading} userApplicationsData={applicationsData} UserAccountStatus={status} />
        <RecentPayments isLoading={isLoading} userRecentPaymentData={recentPaymentData} />

      </Grid>
    </div>
  );
}