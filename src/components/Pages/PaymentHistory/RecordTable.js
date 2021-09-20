import React from "react";
import {useStylesPaymenthistory} from "./Style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./Style.css";
import Moment from "moment";

export default function PaymentHistoryTable(userRecentPaymentData) {
  const classes = useStylesPaymenthistory();

  let userRecentPayment =
    userRecentPaymentData != null ? userRecentPaymentData : null;

  //View part

  return (
    <Grid item xs={12} style={{ paddingTop: "10px", paddingBottom: "20px" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>Date</TableCell>
              <TableCell className={classes.tableHead} align="center">
                Description
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                Principal
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                Interest
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                Other
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                Total
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                Balance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userRecentPayment.userRecentPaymentData === null ? (
              <TableRow>
                <TableCell colSpan="7" align="center">
                  Please wait...
                </TableCell>
              </TableRow>
            ) : userRecentPayment.userRecentPaymentData.length ? (
              userRecentPayment.userRecentPaymentData.map((val) => (
                <>
                  {val.loanHistory.AppAccountHistory.map((row) => (
                    <>
                      <TableRow key={row.index}>
                        <TableCell
                          component="th"
                          className={classes.tableHeadRow}
                          scope="row"
                        >
                          {Moment(row.TransactionDate).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadRow}
                          align="center"
                        >
                          {row.TransactionDescription}
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadRow}
                          align="center"
                        >
                          {row.PrincipalAmount}
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadRow}
                          align="center"
                        >
                          {row.InterestAmount}
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadRow}
                          align="center"
                        >
                          {row.OtherAmount}
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadRow}
                          align="center"
                        >
                          -
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadRow}
                          align="center"
                        >
                          {row.RunningPrincipalBalance}
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </>
              ))
            ) : (
              // :
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
