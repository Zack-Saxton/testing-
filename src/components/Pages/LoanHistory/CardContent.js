import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useStylesLoanHistory } from "./Style";
import "./Style.css";

export default function LoanHistoryCard(userLoanHistoryCard) {
  window.zeHide();
  const history = useHistory();
  //Material UI css class
  const classes = useStylesLoanHistory();
  //Loan history data from API
  let userLoanHistory = userLoanHistoryCard != null ? userLoanHistoryCard : null;
  const redirectToApplyForLoan = () => {
    history.push({ pathname: "/customers/applyForLoan", state: { from: "user" } });
  };

  //  view part
  return (
    <Grid item xs={ 12 } style={ { paddingBottom: "20px", paddingTop: "10px" } }>
      <Paper className={ classes.paper }>
        <Grid container direction="row">
          <Grid item xs={ 12 } sm={ 4 } className={ classes.cardLoanHistory }>
            <Paper className={ classes.papertotal } id="cardLoanHistory-bg">
              <div className={ classes.cardContentLoanHistory }>
                Total Number of Loans
                { userLoanHistory?.userLoanHistoryCard === null ? (
                  <p>0</p>
                ) : (
                  <p id="numberOfLoans" className={ classes.cardAmountLoanHistory }>
                    { userLoanHistory?.userLoanHistoryCard?.length
                      ? ('0' + userLoanHistory.userLoanHistoryCard.length).slice(-2)
                      : 0 }
                  </p>
                ) }
              </div>
            </Paper>
          </Grid>

          <Grid item xs={ 12 } sm={ 4 } className={ classes.cardLoanHistory }>
            <Paper className={ classes.paperPointer } style={ { height: "70%" } }>
              <Grid style={ { textAlign: "center" } }>
                <NavLink to="/customers/makePayment" style={ { textDecoration: "none" } } >
                  <AccountBalanceWalletIcon id="dolor-icon_loan-history" className="material-icons background-round mt-5 yelloWBG" />
                  <p className={ classes.cardApplyLoan }>Make a Payment</p>
                </NavLink>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={ 12 } sm={ 4 } className={ classes.cardLoanHistory }>
            <Paper className={ classes.paperPointer } onClick={ redirectToApplyForLoan } style={ { height: "70%" } }>
              <Grid style={ { textAlign: "center" } }>
                <MonetizationOnRoundedIcon id="dolor-icon_loan-history" className="material-icons background-round mt-5 yelloWBG" />
                <p className={ classes.cardApplyLoan }>Apply for a Loan</p>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
