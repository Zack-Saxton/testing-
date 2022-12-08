import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Moment from "moment";
import React from "react";
import NumberFormat from "react-number-format";
import { NavLink } from "react-router-dom";
import { ButtonPrimary } from "../../FormsUI";
import { useAccountOverview } from "../../../hooks/useAccountOverview";
import AutoPayStatus from "./AutoPayStatus.js";
import { useStylesAccountOverview } from "./Style";
import "./Style.css";

export default function ActiveLoans() {
  //Material UI css class
  const classes = useStylesAccountOverview();
  const { isLoading, data : accountDetails } = useAccountOverview();

  let today = Moment(new Date());
  // If the customer's payment is due within 10 days of current date, highlight the 'Make a Payment' button on the Account Overview page
  let numberDaysForDueDate = (appData) => {
    let numberOfDays = (appData?.loanDetails?.NextPaymentDate ? Math.ceil(Moment.duration(Moment(appData.loanDetails.NextPaymentDate).diff(today)).asDays()) : 11);
    return (numberOfDays <= 10);
  };
  const getAPRWithTwoDecimal = (number) => {
    return number?.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
  }
  //View
  return (
    <>
      {isLoading ? (
        <>
          <Grid
            container
            item
            direction="row"
            xs={12}
            className={classes.activeLoanWrap}
          >
            <Typography
              variant="h5"
              className={classes.subheading}
              data-testid="active loans"
            >
              Active Loan
            </Typography>
          </Grid>
          <Grid className={classes.activeLoanTable} container data-testid="loanGridWithoutData">
            <Paper className="recentPaymentPaper">
              <CircularProgress />
            </Paper>
          </Grid>
        </>
      ) : (
        <>
          {accountDetails?.data?.activeLoans?.length ? (
            <>
              <Grid item xs={12} container direction="row">
                <Typography
                  variant="h5"
                  className={classes.subheading}
                  data-testid="active loans"
                >
                  Active Loans
                </Typography>
              </Grid>
              <Grid container>
                {accountDetails.data.activeLoans.map(
                  (appData, index) => (
                    <Grid className={classes.activeLoancardwrap}
                      container
                      key={`active-loan-details1-${index}`}
                    >
                      <Grid
                        id="activeLoanWrap"
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={9}
                      >
                        <Paper
                          className={classes.paper}
                          id="activeLoanGrid"
                          data-testid={`loanGridWithData_${index}`}
                        >
                          <Grid container className={classes.activeLoanHeadingWrap}>
                            <Grid item xs={12} sm={6}>
                              <Typography
                                variant="h5"
                                className={classes.activeLoanHeading}
                                data-testid="active loans"
                              >
                                Next Payment Details
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} data-testid="button_Class">
                              <NavLink
                                to={`/customers/makePayment/?accNo=${ window.btoa(appData.loanDetails.AccountNumber) }`}
                                key={`active-loan-details2-${index}`}
                              >
                                <ButtonPrimary
                                  id="makeAPaymentButtonStyle"
                                  data-testid={`make_A_Payment_Button_${index}`}
                                  stylebutton='{"float": "right","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
                                  className={
                                    today.isBefore(appData.loanDetails.NextDueDate)
                                      ? numberDaysForDueDate(appData)
                                        ? `${ classes.normalButton } pulse`
                                        : classes.normalButton
                                      : `${ classes.buttonColorPastDate } pulse`
                                  }
                                >
                                  Make a Payment
                                </ButtonPrimary>
                              </NavLink>
                            </Grid>
                          </Grid>

                          <Grid container className="paymentDetailsWrap">
                            <Grid item xs={12} sm={3}>
                              <AutoPayStatus
                                isAutoPay={appData?.loanPaymentInformation?.appRecurringACHPayment ? true : false}
                                accountNumber={appData?.loanDetails?.AccountNumber}
                                dataTestid={appData?.loanPaymentInformation?.appRecurringACHPayment ? `autoPayEnabled_${index}` : `enableAutoPay_${index}`}
                              />
                            </Grid>

                            <Grid id="regularAmountGrid" item xs={12} sm={3}>
                              <p
                                id="RegularAmmountText"
                                className={classes.cardContent}
                              >
                                {" "}
                                Regular Amount
                              </p>
                              <h5
                                id="nextPaymentItems"
                                className={classes.brandColor}
                              >
                                <span className="addCommaAmount">
                                  <NumberFormat
                                    value={appData?.loanDetails?.RegularPaymentAmount}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    prefix={"$"}
                                  />
                                </span>
                              </h5>
                              <p id="cardContentText" className={classes.cardContent}>
                                <span> * Amount may not</span> <span> include all fees</span>
                              </p>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                              <p id="dueDate" className={classes.cardcontent}>
                                Due Date
                              </p>
                              <h5
                                id="nextPaymentItems"
                                className={classes.brandColor}
                              >
                                {Moment(appData?.loanDetails?.NextPaymentDate).format("MM/DD/YYYY")}
                              </h5>

                              {today.isBefore(
                                appData.loanDetails.NextPaymentDate
                              ) ? (
                                <p className={classes.cardcontent}>
                                  {" "}
                                  Due in{" "}
                                  {Math.ceil(Moment.duration(Moment(appData?.loanDetails?.NextPaymentDate).diff(today)).asDays())}{" "}
                                  days
                                </p>
                              ) : (
                                <p className={classes.cardcontent}>
                                  Your payment is <br></br> overdue
                                </p>
                              )}
                            </Grid>
                            {appData.loanPaymentInformation
                              .hasScheduledPayment ? (
                              <Grid
                                id="scheduledPaymentGrid"
                                item
                                xs={12}
                                sm={3}
                                data-testid="hasScheduledPayment"
                              >
                                <p
                                  id="ScheduledPaymentText"
                                  className={classes.cardcontent}
                                >
                                  Scheduled Payment
                                </p>
                                <h5
                                  id="nextPaymentItems"
                                  className={classes.brandColor}
                                >
                                  {Moment(appData?.loanPaymentInformation?.scheduledPayments[ 0 ]?.PaymentDate).format("MM/DD/YYYY")}
                                </h5>
                                <p className={classes.cardcontent}>
                                  Future payment is scheduled
                                </p>
                              </Grid>
                            ) : (
                              <Grid item xs={12} sm={3} data-testid="noScheduledPayment">
                                <p
                                  id="ScheduledPaymentText"
                                  className={classes.cardcontent}
                                >
                                  Scheduled Payment
                                </p>
                                <h5
                                  id="nextPaymentItems"
                                  className={classes.brandColor}
                                >
                                  NONE
                                </h5>
                                <p className={classes.cardcontent}>
                                  No future payment is scheduled
                                </p>
                              </Grid>
                            )}
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid
                        id="overviewContainer"
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={3}
                      >
                        <Paper id="activeLoanOverviewWrap" className={classes.paper}>
                          <Grid container item xs={12} className={classes.overviewGrid}>
                            <Typography
                              variant="h5"
                              className={classes.activeLoanSubHeading}
                            >
                              Overview
                            </Typography>
                            <div className="OverviewAccountNumberText">
                              <p
                                className={classes.activeLoanSubHeading_content}
                              >
                                Account Number
                              </p>
                              <p
                              >
                                <b>{appData.loanDetails.AccountNumber}</b>
                              </p>

                              <p
                                className={classes.activeLoanSubHeading_content}
                              >
                                Opened On
                              </p>
                              <p >
                                <b>
                                  {Moment(appData.loanDetails.LoanOriginationDate).format("MM/DD/YYYY")}
                                </b>
                              </p>
                              <p className={classes.activeLoanSubHeading_content}>APR</p>
                              <b>{`${ getAPRWithTwoDecimal(appData.loanDetails.OriginalAPR) }%`}</b>
                            </div>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  )
                )}
              </Grid>
            </>
          ) : (
            <> </>
          )}
        </>
      )}
    </>
  );
}
