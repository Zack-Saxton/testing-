import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Moment from "moment";
import React from "react";
import { useStylesPaymenthistory } from "./Style";
import "./Style.css";

export default function PaymentHistoryTable(userRecentPaymentData) {

  //Material UI css class
  const classes = useStylesPaymenthistory();

  //Payment history data from API
  let userRecentPayment = userRecentPaymentData ?? null;

  //View part
  return (
    <Grid item xs={ 12 } style={ { paddingTop: "10px", paddingBottom: "20px" } }>
      <TableContainer component={ Paper }>
        <Table className={ classes.table } aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={ classes.tableHead } align="left">Date</TableCell>
              <TableCell className={ classes.tableHead } align="left">Description</TableCell>
              <TableCell className={ classes.tableHead } align="right">Principal</TableCell>
              <TableCell className={ classes.tableHead } align="right">Interest</TableCell>
              <TableCell className={ classes.tableHead } align="right">Other</TableCell>
              <TableCell className={ classes.tableHead } align="right">Total</TableCell>
              <TableCell className={ classes.tableHead } align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { userRecentPayment?.userRecentPaymentData === null ? (
              <TableRow>
                <TableCell colSpan="7" align="center">
                  Please wait...
                </TableCell>
              </TableRow>
            ) : userRecentPayment?.userRecentPaymentData?.length ? (
              userRecentPayment?.userRecentPaymentData.map((val) => (
                <div key={ (Math.random() * 1000) }>
                  { val?.loanHistory[0]?.AppAccountHistory.map((row) => (
                    <>
                      <TableRow key={ (Math.random() * 1000) }>
                        <TableCell
                          component="th"
                          className={ classes.tableHeadRow }
                          scope="row"
                        >
                          { Moment(row.TransactionDate).format("MM/DD/YYYY") }
                        </TableCell>
                        <TableCell
                          className={ classes.tableHeadRow }
                          align="center"
                        >
                          { row.TransactionDescription }
                        </TableCell>
                        <TableCell
                          className={ classes.tableHeadRow }
                          align="center"
                        >
                          { row.PrincipalAmount }
                        </TableCell>
                        <TableCell
                          className={ classes.tableHeadRow }
                          align="center"
                        >
                          { row.InterestAmount }
                        </TableCell>
                        <TableCell
                          className={ classes.tableHeadRow }
                          align="center"
                        >
                          { row.OtherAmount }
                        </TableCell>
                        <TableCell
                          className={ classes.tableHeadRow }
                          align="center"
                        >
                          -
                        </TableCell>
                        <TableCell
                          className={ classes.tableHeadRow }
                          align="center"
                        >
                          { row.RunningPrincipalBalance }
                        </TableCell>
                      </TableRow>
                    </>
                  )) }
                </div>
              ))
            ) : (
              // :
              <TableRow>
                <TableCell colSpan="7" align="center">
                  You do not have any recent applications
                </TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
