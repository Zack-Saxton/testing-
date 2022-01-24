import React, { useEffect, useState } from "react";
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

export default function AccountOverview() {
  const classes = useStylesAccountOverview();
  window.zeHide();
  //API Call
  const [accountDetails, setAccountDetails] = useState(null);
  async function getUserAccountDetails() {
    setAccountDetails(await usrAccountDetails());
  }

  useEffect(() => {
    getUserAccountDetails();
    return () => {
      setAccountDetails({}); // This worked for me
    };

  }, []);

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
  Cookies.set(
    "hasApplicationStatus",
    accountDetails?.data?.applicant?.processing?.status
  );

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

        <LimitedOffer userOffers={offerData} />
        <ActiveLoans userActiveLoanData={activeLoansData} />
        <RecentApplications userApplicationsData={applicationsData} UserAccountStatus={status} />
        <RecentPayments userRecentPaymentData={recentPaymentData} />

      </Grid>
    </div>
  );
}
