import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStylesAccountOverview } from "./Style";
import Moment from "moment";
import NumberFormat from 'react-number-format';

export default function RecentPayments(userRecentPaymentData) {
  const classes = useStylesAccountOverview();
  let userRecentPayment = userRecentPaymentData != null ? userRecentPaymentData : null;

  return (
    <Grid item xs={12} style={{ paddingBottom: "10px" }}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablehead} align="center">
                Date
              </TableCell>
              <TableCell className={classes.tablehead} align="center">
                Description
              </TableCell>
              <TableCell className={classes.tablehead} align="center">
                Principal
              </TableCell>
              <TableCell className={classes.tablehead} align="center">
                Interest
              </TableCell>
              <TableCell className={classes.tablehead} align="center">
                Other
              </TableCell>
              <TableCell className={classes.tablehead} align="center">
                Total Amount
              </TableCell>
              <TableCell className={classes.tablehead} align="center">
                Balance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userRecentPayment.userRecentPaymentData === null ? (
              <TableRow>
                <TableCell colSpan="7" align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : userRecentPayment.userRecentPaymentData.length ? (
              userRecentPayment.userRecentPaymentData.slice(0, 1).map((val) => (
                <>
                  {val.loanHistory.AppAccountHistory.slice(0, 3).map((row, index) => (
                    <>
                      <TableRow key={index}>
                        <TableCell
                          className={classes.tableHeadRow}
                          align="center"
                        >
                          {Moment(row.TransactionDate).format("MM/DD/YYYY")}
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadRow}
                          align="center"
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
                  You do not have any recent applications
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
