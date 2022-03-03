import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import React from "react";
import { useQuery } from 'react-query';
import CheckLoginStatus from "../../App/CheckLoginStatus";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import ScrollToTopOnMount from "../ScrollToTop";
import ActiveLoans from "./ActiveLoans";
import LimitedOffer from "./LimitedOffer";
import RecentApplications from "./RecentApplications";
import RecentPayments from "./RecentPayments";
import { useStylesAccountOverview } from "./Style";
import "./Style.css";

export default function AccountOverview() {
  const classes = useStylesAccountOverview();
  //API Call
  const { isLoading, data: accountDetails } = useQuery('loan-data', usrAccountDetails);
  //Load data
  let offerData = accountDetails?.data?.offerData;
  let applicationsData = accountDetails?.data?.applicants;
  let applicantData = accountDetails?.data?.applicant?.contact;
  let status = accountDetails?.data?.status;
  let activeLoansData = accountDetails?.data?.activeLoans;
  let recentPaymentData = accountDetails?.data?.loanHistory;
  Cookies.set("hasActiveLoan", true);
  if (Array.isArray(activeLoansData) && activeLoansData.length === 0) {
    Cookies.set("hasActiveLoan", false);
  }
  Cookies.set("hasApplicationStatus", accountDetails?.data?.applicant?.processing?.status);

  return (
    <div>
      <ScrollToTopOnMount />
      <CheckLoginStatus />
      <Grid
        container
        justifyContent="center"
        className={ classes.centerGrid }
      >
        <Grid
          item
          xs={ 12 }
          style={ { width: "100%", paddingBottom: "10px" } }
          container
          direction="row"
        >
          <Typography variant="h5" className={ classes.heading } data-testid="subtitle">
            Account Overview
          </Typography>
        </Grid>
        {/* ****************components************ */ }
        <LimitedOffer isLoading={ isLoading } userOffers={ offerData } />
        <ActiveLoans isLoading={ isLoading } userActiveLoanData={ activeLoansData } />
        <RecentPayments isLoading={ isLoading } userRecentPaymentData={ recentPaymentData } />
        <RecentApplications isLoading={ isLoading } userApplicationsData={ applicationsData } UserAccountStatus={ status } userApplicantData={ applicantData } />
      </Grid>
    </div>
  );
}