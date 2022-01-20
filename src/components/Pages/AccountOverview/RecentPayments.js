import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ButtonPrimary } from "../../FormsUI";
import { NavLink } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStylesAccountOverview } from "./Style";
import Moment from "moment";
import NumberFormat from 'react-number-format';
import "./Style.css";

export default function RecentPayments(userRecentPaymentData) {
  //Material UI css class
  const classes = useStylesAccountOverview();
  //Recentpayments data
  let userRecentPayment = userRecentPaymentData != null ? userRecentPaymentData : null;

  return (
    <Grid item xs={12} style={{ width: "100%", padding: "0px 0px 40px 0px" }}>
      <Paper id="recentPaymentsWrap" className={classes.paper} style={{ height: "85%" }} >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" className={classes.activeLoanHeading}>
              Recent Payments
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <NavLink to="/customers/paymenthistory" style={{ textDecoration: "none" }}>
              <ButtonPrimary stylebutton='{"float": "right","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'>
                Payment History
              </ButtonPrimary>
            </NavLink>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: "10px" }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: "0.938rem", fontWeight: "700" }} className={classes.tablehead} align="center">
                    Date
                  </TableCell>
                  <TableCell style={{ fontSize: "0.938rem", fontWeight: "700" }} className={classes.tablehead} align="center">
                    Description
                  </TableCell>
                  <TableCell style={{ fontSize: "0.938rem", fontWeight: "700" }} className={classes.tablehead} align="center">
                    Principal
                  </TableCell>
                  <TableCell style={{ fontSize: "0.938rem", fontWeight: "700" }} className={classes.tablehead} align="center">
                    Interest
                  </TableCell>
                  <TableCell style={{ fontSize: "0.938rem", fontWeight: "700" }} className={classes.tablehead} align="center">
                    Other
                  </TableCell>
                  <TableCell style={{ fontSize: "0.938rem", fontWeight: "700" }} className={classes.tablehead} align="center">
                    Total Amount
                  </TableCell>
                  <TableCell style={{ fontSize: "0.938rem", fontWeight: "700" }} className={classes.tablehead} align="center">
                    Balance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userRecentPayment?.userRecentPaymentData === null ? (
                  <TableRow>
                    <TableCell colSpan="7" align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : userRecentPayment?.userRecentPaymentData?.length ? (
                  userRecentPayment?.userRecentPaymentData.slice(0, 1).map((val) => (
                    <>
                      {val.loanHistory?.AppAccountHistory?.slice(0, 3).map((row, index) => (
                        <>
                          <TableRow key={index}>
                            <TableCell
                              className={classes.tableHeadRow}
                              align="left"
                            >
                              {Moment(row.TransactionDate).format("MM/DD/YYYY")}
                            </TableCell>
                            <TableCell
                              className={classes.tableHeadRow}
                              align="left"
                            >
                              {row.TransactionDescription}
                            </TableCell>
                            <TableCell
                              className={classes.tableHeadRow}
                              align="right"
                            >
                              <NumberFormat value={Math.abs(row.PrincipalAmount)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                            </TableCell>
                            <TableCell
                              className={classes.tableHeadRow}
                              align="right"
                            >
                              <NumberFormat value={Math.abs(row.InterestAmount)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                            </TableCell>
                            <TableCell
                              className={classes.tableHeadRow}
                              align="right"
                            >
                              <NumberFormat value={row.OtherAmount} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                            </TableCell>
                            <TableCell
                              className={classes.tableheadrow}
                              align="right"
                            >
                              <NumberFormat value={Math.abs(row.InterestAmount) + Math.abs(row.PrincipalAmount) + Math.abs(row.OtherAmount)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                            </TableCell>
                            <TableCell
                              className={classes.tableheadrow}
                              align="right"
                            >
                              <NumberFormat value={row.RunningPrincipalBalance} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                    </>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="7" align="center">
                      You do not have any payments to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Paper>
    </Grid>
  );
}
