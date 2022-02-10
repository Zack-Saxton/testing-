import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
  window.zeHide();
  //API Call

  const { isLoading, data: accountDetails } = useQuery('loan-data', usrAccountDetails);

  //Load data
  let offerData = (accountDetails != null) ? accountDetails?.data?.offerData : null;
  let applicationsData = (accountDetails != null) ? accountDetails?.data?.applicants : null;
  let applicantData = (accountDetails != null) ? accountDetails?.data?.applicant?.contact : null;
  let status = (accountDetails != null) ? accountDetails?.data?.status : null;
  let activeLoansData = (accountDetails != null) ? accountDetails?.data?.activeLoans : null;
  let recentPaymentData = (accountDetails != null) ? accountDetails?.data?.loanHistory : null;
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
        style={ {
          marginTop: "-150px",
          paddingRight: "23px",
          paddingLeft: "23px",
        } }
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
        <RecentApplications isLoading={ isLoading } userApplicationsData={ applicationsData } UserAccountStatus={ status } userApplicantData={ applicantData }/>

      </Grid>
    </div>
  );
}