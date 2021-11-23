import React, { useEffect, useState } from "react";
import { useStylesAccountOverview } from "./Style";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { ButtonPrimary } from "../../FormsUI";
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import ScrollToTopOnMount from "../ScrollToTop";
import RecentApplications from "./RecentApplications";
import ActiveLoans from "./ActiveLoans";
import RecentPayments from "./RecentPayments";
import "./Style.css";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import LimitedOffer from "./LimitedOffer"

export default function AccountOverview() {
  const classes = useStylesAccountOverview();

  //API Call
  const [accountDetails, setAccountDetails] = useState(null);
  async function getUserAccountDetails() {
    setAccountDetails(await usrAccountDetails());
  }

  useEffect(() => {
    getUserAccountDetails();
  }, []);


  //Load data
  let offerData = (accountDetails != null) ? accountDetails?.data?.data?.offerData : null;
  let applicationsData = (accountDetails != null) ? accountDetails?.data?.data?.applicants : null;
  let applicantData = (accountDetails != null) ? accountDetails?.data?.data?.applicant?.contact : null;
  let status = (accountDetails != null) ? accountDetails?.data?.status : null;
  let activeLoansData = (accountDetails != null) ? accountDetails?.data?.data?.activeLoans : null;
  let recentPaymentData = (accountDetails != null) ? accountDetails?.data?.data?.activeLoans : null;


  //View
  return (
    <div>
      <ScrollToTopOnMount />
      <CheckLoginStatus />
      <Grid
        container
        justifyContent="center"
        style={{
          marginTop: "-150px",
          paddingRight: "30px",
          paddingLeft: "30px",
        }}
      >

        <Grid item xs={12} style={{ width: "100%" }} container direction="row">
          <Typography variant="h5" className={classes.heading} data-testid="subtitle">
            Account Overview
          </Typography>
        </Grid>
        <LimitedOffer userOffers={offerData} />

        <Grid item xs={12} style={{ width: "100%", paddingTop: "30px" }} container direction="row">
          <Typography variant="h5" className={classes.subheading} data-testid="subtitle">
            Summary of applications
          </Typography>
        </Grid>
        <RecentApplications userApplicationsData={applicationsData} UserAccountStatus={status} userApplicantData={applicantData} />


        <Grid item xs={12} style={{ width: "100%" }} container direction="row">
          <Typography variant="h5" className={classes.subheading} data-testid="subtitle">
            Active Loan
          </Typography>
        </Grid>
        <ActiveLoans userActiveLoanData={activeLoansData} />


        <Grid
          item
          xs={12}
          style={{ width: "100%", padding: "5px", paddingTop: "20px", paddingBottom: "25px" }}
        >
          <Paper className={classes.paper} style={{ height: "85%" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" className={classes.activeLoanHeading} >
                  Recent Payments
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <NavLink
                  to="/customers/paymenthistory"
                  style={{ textDecoration: "none" }}
                >
                  <ButtonPrimary stylebutton='{"float": "right", "color":"" }'>
                    Payment History
                  </ButtonPrimary>
                </NavLink>
              </Grid>
            </Grid>
            <RecentPayments userRecentPaymentData={recentPaymentData} />

          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
