import React from "react";
import {useStylesLoanHistory} from "./Style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {NavLink} from "react-router-dom";
import "./Style.css";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet"

export default function LoanHistoryCard(userLoanHistoryCard) {
  
//Material UI css class
  const classes = useStylesLoanHistory();

//Loan history data from API
  let userLoanHistory = userLoanHistoryCard != null ? userLoanHistoryCard : null;

//  view part
  return (
    <Grid item xs={12} style={{ paddingBottom: "20px" }}>
      <Paper className={classes.paper}>
        <Grid container direction="row">
          <Grid item xs={12} sm={4} className={classes.cardLoanHistory}>
            <Paper className={classes.papertotal} id="cardLoanHistory-bg">
              <div className={classes.cardContentLoanHistory}>
                Total Number of Loans
                {userLoanHistory.userLoanHistoryCard === null ? (
                  <p>0</p>
                ) : (
                  <p className={classes.cardAmountLoanHistory}>
                    {userLoanHistory.userLoanHistoryCard.length
                      ? userLoanHistory.userLoanHistoryCard.length
                      : 0}
                  </p>
                )}
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4} className={classes.cardLoanHistory}>
            <Paper className={classes.paper} style={{ height: "70%" }}>
              <Grid style={{ textAlign: "center" }}>
                <NavLink to="/customers/makePayment" style={{ textDecoration: "none" }} >
                  <AccountBalanceWalletIcon id="dolor-icon_loan-history" className="material-icons background-round mt-5 yelloWBG" />
                  <p className={classes.cardApplyLoan}>Make a Payment</p>
                </NavLink>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4} className={classes.cardLoanHistory}>
            <Paper className={classes.paper} style={{ height: "70%" }}>
              <Grid style={{ textAlign: "center" }}>
                <NavLink to="/select-amount" style={{ textDecoration: "none" }} >
                  <MonetizationOnRoundedIcon id="dolor-icon_loan-history" className="material-icons background-round mt-5 yelloWBG"/>
                  <p className={classes.cardApplyLoan}>Apply for loan</p>
                </NavLink>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
