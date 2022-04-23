import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import applicationStatusRedirectPage from "../../../assets/data/applicationStatusRedirectPage.json";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import { useStylesLoanHistory } from "./Style";
import "./Style.css";

export default function LoanHistoryCard(historyOfLoans) {

  const navigate = useNavigate();
  //Material UI css class
  const classes = useStylesLoanHistory();

  const { data: dataAccountOverview } = useQuery('loan-data', usrAccountDetails);
  const [ checkPresenceOfLoan, setCheckPresenceOfLoan ] = useState(false);
  const [ checkPresenceOfLoanStatus, setCheckPresenceOfLoanStatus ] = useState('');
  const [ currentLoan, setCurrentLoan ] = useState(true);

  useEffect(() => {
    let activeLoan = dataAccountOverview?.data?.applicants;

    const presenceOfLoan = activeLoan?.some((applicant) => applicant?.isActive && applicant?.status !== "referred" && applicant?.status !== "contact_branch");
    const presenceOfLoanStatus = activeLoan?.find((applicant) => applicant?.isActive);
    const userAccountStatus = dataAccountOverview?.data?.customer?.user_account?.status;

    setCurrentLoan(presenceOfLoan || userAccountStatus === "closed" ? true : false);
    setCheckPresenceOfLoanStatus(presenceOfLoanStatus?.status);
    setCheckPresenceOfLoan(presenceOfLoan);
  }, [ dataAccountOverview ]);

  const redirectToApplyForLoan = () => {
    navigate("/customers/applyForLoan", { state: { from: "user" } });
  };
  const redirectToMakeAPayment = () => {
    navigate("/customers/makePayment", { state: { from: "user" } });
  };
  const redirectToResumeApplication = () => {
    navigate(applicationStatusRedirectPage[ checkPresenceOfLoanStatus ], { state: { from: "user" } });

  };

  //  view part
  return (
    <Grid item xs={12} className={classes.gridCardContent}>
      <Paper className={classes.paper}>
        <Grid container direction="row">
          <Grid item xs={12} sm={4} className={classes.cardLoanHistory}>
            <Paper className={classes.papertotal} id="cardLoanHistory-bg">
              <div className={classes.cardContentLoanHistory}>
                Total Number of Loans
                {!historyOfLoans?.userLoanHistoryCard ? (
                  <p>0</p>
                ) : (
                  <p id="numberOfLoans" className={classes.cardAmountLoanHistory}>
                    {historyOfLoans?.userLoanHistoryCard?.length
                      ? ('0' + historyOfLoans.userLoanHistoryCard.length).slice(-2)
                      : 0}
                  </p>
                )}
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4} className={classes.cardLoanHistory}>
            <Paper className={classes.paperPointer} onClick={redirectToMakeAPayment} >
              <Grid className={classes.gridCenter} >
                <AccountBalanceWalletIcon id="dolor-icon_loan-history" className="material-icons background-round mt-5 yelloWBG" />
                <p className={classes.cardApplyLoan}>Make a Payment</p>
              </Grid>
            </Paper>
          </Grid>
          {checkPresenceOfLoan ?
            <Grid item xs={12} sm={4} className={classes.cardLoanHistory}>
              <Paper className={classes.paperPointer} onClick={redirectToResumeApplication} >
                <Grid className={classes.gridCenter} >
                  <MonetizationOnRoundedIcon id="dolor-icon_loan-history" className="material-icons background-round mt-5 yelloWBG" />
                  <p className={classes.cardApplyLoan}>Resume Application</p>
                </Grid>
              </Paper>
            </Grid>
            :
            <Grid item xs={12} sm={4} className={!currentLoan ? "cardLoanHistory" : "disableCardLoanHistory"} >
              <Paper className={classes.paperPointer} onClick={redirectToApplyForLoan} >
                <Grid className={classes.gridCenter} >
                  <MonetizationOnRoundedIcon id="dolor-icon_loan-history" className="material-icons background-round mt-5 yelloWBG" />
                  <p className={classes.cardApplyLoan}>Apply for a Loan</p>
                </Grid>
              </Paper>
            </Grid>}
        </Grid>
      </Paper>
    </Grid>
  );
}
