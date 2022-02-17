import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useStylesLoanHistory } from "./Style";
import "./Style.css";
import { useQuery } from "react-query";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import applicationStatusRedirectPage from "../../../assets/data/applicationStatusRedirectPage.json"

export default function LoanHistoryCard(historyOfLoans) {
  window.zeHide();
  const navigate = useNavigate();
  //Material UI css class
  const classes = useStylesLoanHistory();

  const { data: dataAccountOverview } = useQuery('loan-data', usrAccountDetails);
  const [ checkPresenceOfLoan, setCheckPresenceOfLoan ] = useState(false);
  const [ checkPresenceOfLoanStatus, setCheckPresenceOfLoanStatus ] = useState('');

  useEffect(() => {
  let activeLoan = dataAccountOverview?.data?.applicants;

  const presenceOfLoan = activeLoan?.some((applicant) => applicant.isActive === true && applicant?.status !== "referred" && applicant?.status !== "contact_branch");
  const presenceOfLoanStatus = activeLoan?.find((applicant) => applicant.isActive === true);

  setCheckPresenceOfLoanStatus(presenceOfLoanStatus?.status);
    setCheckPresenceOfLoan(presenceOfLoan);
  }, [dataAccountOverview]);

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
    <Grid item xs={ 12 } style={ { paddingBottom: "20px", paddingTop: "10px" } }>
      <Paper className={ classes.paper }>
        <Grid container direction="row">
          <Grid item xs={ 12 } sm={ 4 } className={ classes.cardLoanHistory }>
            <Paper className={ classes.papertotal } id="cardLoanHistory-bg">
              <div className={ classes.cardContentLoanHistory }>
                Total Number of Loans
                { historyOfLoans?.userLoanHistoryCard === null ? (
                  <p>0</p>
                ) : (
                  <p id="numberOfLoans" className={ classes.cardAmountLoanHistory }>
                    { historyOfLoans?.userLoanHistoryCard?.length
                      ? ('0' + historyOfLoans.userLoanHistoryCard.length).slice(-2)
                      : 0 }
                  </p>
                ) }
              </div>
            </Paper>
          </Grid>

          <Grid item xs={ 12 } sm={ 4 } className={ classes.cardLoanHistory }>
            <Paper className={ classes.paperPointer } onClick={ redirectToMakeAPayment } style={ { height: "70%" } }>
              <Grid style={ { textAlign: "center" } }>
                <AccountBalanceWalletIcon id="dolor-icon_loan-history" className="material-icons background-round mt-5 yelloWBG" />
                <p className={ classes.cardApplyLoan }>Make a Payment</p>
              </Grid>
            </Paper>
          </Grid>
          { checkPresenceOfLoan === true ?
          <Grid item xs={ 12 } sm={ 4 } className={ classes.cardLoanHistory }>
            <Paper className={ classes.paperPointer } onClick={ redirectToResumeApplication } style={ { height: "70%" } }>
              <Grid style={ { textAlign: "center" } }>
                <MonetizationOnRoundedIcon id="dolor-icon_loan-history" className="material-icons background-round mt-5 yelloWBG" />
                <p className={ classes.cardApplyLoan }>Resume Application</p>
              </Grid>
            </Paper>
          </Grid>
          :
          <Grid item xs={ 12 } sm={ 4 } className={ classes.cardLoanHistory }>
            <Paper className={ classes.paperPointer } onClick={ redirectToApplyForLoan } style={ { height: "70%" } }>
              <Grid style={ { textAlign: "center" } }>
                <MonetizationOnRoundedIcon id="dolor-icon_loan-history" className="material-icons background-round mt-5 yelloWBG" />
                <p className={ classes.cardApplyLoan }>Apply for a Loan</p>
              </Grid>
            </Paper>
          </Grid> }
        </Grid>
      </Paper>
    </Grid>
  );
}

