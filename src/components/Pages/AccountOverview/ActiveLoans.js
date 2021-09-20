import React from "react";
import {useStylesAccountOverview} from "./Style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {ButtonPrimary} from "../../FormsUI";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Moment from "moment";
import AutoPayStatus from "./AutoPayStatus.js";

export default function ActiveLoans(userActiveLoanData) {
    const classes = useStylesAccountOverview();
    let userActiveLoans = (userActiveLoanData != null) ? userActiveLoanData : null;
    let today = Moment(new Date());

    return (
        <Grid container>
            {userActiveLoans.userActiveLoanData === null ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    colSpan="7"
                                    align="center"
                                >
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            ) :
                userActiveLoans.userActiveLoanData.length
                    ?
                    userActiveLoans.userActiveLoanData.map((appData,index) => (
                        <Grid container key={index}>
                            <Grid
                                item
                                xs={12}
                                sm={9}
                                style={{ width: "100%", padding: "5px" }}
                            >
                                <Paper
                                    className={classes.paper}
                                    id="activeLoanGrid"
                                    style={{ height: "80%" }}
                                >
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h5" className={classes.activeLoanHeading} data-testid="subtitle">
                                                Next Payment Details
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <ButtonPrimary stylebutton='{"float": "right", "color":"" }' href="./makePayment">
                                                Make a Payment
                                            </ButtonPrimary>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3} style={{ paddingTop: "20px" }}>
                                        <AutoPayStatus value={appData.loanPaymentInformation.appRecurringACHPayment} />
                                        <Grid item xs={12} sm={3}>
                                            <p className={classes.cardContent}> Regular Amount</p>
                                            <h5 className={classes.brandColor}>
                                                $<span className="addCommaAmount">
                                                    {appData.loanDetails.RegularPaymentAmount}
                                                </span>
                                            </h5>
                                            <p className={classes.cardContent}>
                                                Amount may not include all fees
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <p className={classes.cardcontent}>Due Date</p>
                                            <h5 className={classes.brandColor}>{Moment(appData.loanDetails.LastPaymentDate).format('MM-DD-YYYY')}</h5>
                                            <p className={classes.cardcontent}>Due in {Math.ceil(Moment.duration(today.diff(Moment(appData.loanDetails.LastPaymentDate))).asDays())} days</p>
                                        </Grid>
                                        {(appData.loanPaymentInformation.hasScheduledPayment) ?
                                            (
                                                <Grid item xs={12} sm={3}>
                                                    <p className={classes.cardcontent}>Scheduled Payment</p>
                                                    <h5 className={classes.brandColor}>
                                                        {Moment(appData.loanPaymentInformation.scheduledPayments.PaymentDate).format('MM-DD-YYYY')}
                                                    </h5>
                                                    <p className={classes.cardcontent}>
                                                        Future payment is scheduled
                                                    </p>
                                                </Grid>
                                            )
                                            :
                                            (
                                                <Grid item xs={12} sm={3}>
                                                    <p className={classes.cardcontent}>Scheduled Payment</p>
                                                    <h5 className={classes.brandColor}>NONE</h5>
                                                    <p className={classes.cardcontent}>
                                                        No future payment is scheduled
                                                    </p>
                                                </Grid>
                                            )
                                        }

                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={3}
                                style={{ width: "100%", padding: "5px" }}
                            >
                                <Paper className={classes.paper} style={{ height: "80%" }}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" className={classes.activeLoanSubHeading} >
                                            Overview
                                        </Typography>
                                        <div style={{ paddingTop: "20px" }}>
                                            <p className={classes.activeLoanSubHeading_content}>
                                                Account Number
                                            </p>
                                            <p style={{ margin: "auto" }}>
                                                <b>{appData.loanDetails.AccountNumber}</b>
                                            </p>

                                            <p className={classes.activeLoanSubHeading_content}>
                                                Opened On
                                            </p>
                                            <p style={{ margin: "auto" }}>
                                                <b>{Moment(appData.loanDetails.LoanOriginationDate).format('MM-DD-YYYY')}</b>
                                            </p>

                                        </div>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    ))
                    :
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell
                                        colSpan="7"
                                        align="center"
                                    >
                                        You do not have any Active Loans
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </Grid>
    )
}
