import React from "react";
import { useStylesAccountOverview } from "./Style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ButtonPrimary } from "../../FormsUI";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Moment from "moment";
import AutoPayStatus from "./AutoPayStatus.js";
import NumberFormat from "react-number-format";
import "./Style.css";

export default function ActiveLoans(userActiveLoanData) {
  //Material UI css class
  const classes = useStylesAccountOverview();
  window.zeHide();
  //Activeloans data
  let userActiveLoans = userActiveLoanData != null ? userActiveLoanData : null;
  let today = Moment(new Date());

  //View
  return (
    <>
      {userActiveLoanData?.isLoading ? (
        <>
          <Grid
            item
            xs={12}
            style={{ width: "100%", paddingTop: "10px" }}
            container
            direction="row"
          >
            <Typography
              style={{ padding: "0" }}
              variant="h5"
              className={classes.subheading}
              data-testid="subtitle"
            >
              Active Loan
            </Typography>
          </Grid>
          <Grid style={{ paddingTop: "10px" }} container>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan="7" align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </>
      ) : (
        <>
          {userActiveLoans?.userActiveLoanData?.length ? (
            <>
              <Grid
                item
                xs={12}
                style={{ width: "100%" }}
                container
                direction="row"
              >
                <Typography

                  variant="h5"
                  className={classes.subheading}
                  data-testid="subtitle"
                >
                  Active Loan
                </Typography>
              </Grid>
              <Grid
                style={{ paddingTop: "10px" }}
                container
              >
                {userActiveLoans.userActiveLoanData.map((appData, index) => (
                  <Grid style={{ paddingBottom: "10px" }} container key={"key"+index}>
                    <Grid
                      id="activeLoanWrap"
                      item
                      xs={12}
                      sm={9}
                      style={{ width: "100%" }}
                    >
                      <Paper
                        className={classes.paper}
                        id="activeLoanGrid"
                        style={{
                          height: "81.33%",
                          borderRadius: "2px!important",
                        }}
                      >
                        <Grid container style={{ marginBottom: "20px" }}>
                          <Grid item xs={12} sm={6}>
                            <Typography
                              style={{ fontSize: "1.125rem" }}
                              variant="h5"
                              className={classes.activeLoanHeading}
                              data-testid="subtitle"
                            >
                              Next Payment Details
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <ButtonPrimary
                              stylebutton='{"float": "right","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
                              href={
                                "./makePayment/?accNo=" +
                                appData.loanDetails.AccountNumber
                              }
                            >
                              Make a Payment
                            </ButtonPrimary>
                          </Grid>
                        </Grid>

                        <Grid container>
                          <Grid item xs={12} sm={3}>
                            <AutoPayStatus
                              value={
                                appData.loanPaymentInformation
                                  .appRecurringACHPayment
                              }
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
                                  value={
                                    appData.loanDetails.RegularPaymentAmount
                                  }
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  prefix={"$"}
                                />
                              </span>
                            </h5>
                            <p className={classes.cardContent}>
                              Amount may not include all fees
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
                              {Moment(
                                appData.loanDetails.NextPaymentDate
                              ).format("MM/DD/YYYY")}
                            </h5>

                            {today.isBefore(appData.loanDetails.NextPaymentDate) ?
                              <p className={classes.cardcontent}>
                                Due in {" "}
                                {Math.ceil(
                                  Moment.duration(
                                    Moment(
                                      appData.loanDetails.NextPaymentDate
                                    ).diff(today)
                                  ).asDays()
                                )}{" "}
                                days
                              </p>
                              :
                              <p className={classes.cardcontent}>
                                Your payment is overdue
                              </p>}

                          </Grid>
                          {appData.loanPaymentInformation
                            .hasScheduledPayment ? (
                            <Grid id="scheduledPaymentGrid" item xs={12} sm={3}>
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
                                {Moment(
                                  appData.loanPaymentInformation
                                    .scheduledPayments[0].PaymentDate
                                ).format("MM/DD/YYYY")}
                              </h5>
                              <p className={classes.cardcontent}>
                                Future payment is scheduled
                              </p>
                            </Grid>
                          ) : (
                            <Grid item xs={12} sm={3}>
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
                      sm={3}
                      style={{
                        width: "100%",
                        paddingLeft: "15px",
                        borderRadius: "2px",
                      }}
                    >
                      <Paper
                        id="overviewWrap"
                        className={classes.paper}
                        style={{ height: "81.33%", borderRadius: "2px" }}
                      >
                        <Grid item xs={12}>
                          <Typography
                            variant="h5"
                            className={classes.activeLoanSubHeading}
                          >
                            Overview
                          </Typography>
                          <div style={{ paddingTop: "20px" }}>
                            <p
                              style={{ paddingBottom: "2px" }}
                              className={classes.activeLoanSubHeading_content}
                            >
                              Account Number
                            </p>
                            <p style={{ margin: "auto", paddingBottom: "5px" }}>
                              <b>{appData.loanDetails.AccountNumber}</b>
                            </p>

                            <p
                              style={{ paddingBottom: "2px" }}
                              className={classes.activeLoanSubHeading_content}
                            >
                              Opened On
                            </p>
                            <p style={{ margin: "auto" }}>
                              <b>
                                {Moment(
                                  appData.loanDetails.LoanOriginationDate
                                ).format("MM/DD/YYYY")}
                              </b>
                            </p>
                          </div>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                ))}
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
