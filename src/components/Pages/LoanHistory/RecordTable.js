import React from "react";
import { useStylesLoanHistory } from "./Style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { NavLink } from "react-router-dom";
import "./Style.css";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Moment from "moment";
import { loanDocumentController as loanDocument } from "../../Controllers/LoanDocumentController";
import CircularProgress from "@material-ui/core/CircularProgress";
import NumberFormat from 'react-number-format';

export default function LoanHistoryTable(userLoanHistoryData) {

//Material UI css class
  const classes = useStylesLoanHistory();

//Loan history data from API
  let userLoanHistory =  userLoanHistoryData != null ? userLoanHistoryData : null;

//Download loan document  
  const downloadDoc = (accNo) => {
    loanDocument(accNo);
  };

  //View part
  return (
    <Grid item xs={12} style={{ paddingBottom: "30%" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead} align="left" >
                Account Number
              </TableCell>
              <TableCell className={classes.tableHead} align="left" >
                Date Opened
              </TableCell>
              <TableCell className={classes.tableHead} align="left" >
                Date Closed
              </TableCell>
              <TableCell className={classes.tableHead} align="center" >
                Amount Financed
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                Documents
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userLoanHistory.userLoanHistoryData === null ? (
              <TableRow>
                <TableCell colSpan="7" align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : userLoanHistory.userLoanHistoryData.length ? (
              userLoanHistory.userLoanHistoryData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    className={classes.tableHeadRow}
                    scope="row"
                    align="left"
                  >
                    {row.loanData.accountNumber}
                  </TableCell>
                  <TableCell className={classes.tableHeadRow} align="left" >
                    {Moment(row.loanData.loanOriginationDate).format(
                      "MM/DD/YYYY"
                    )}
                  </TableCell>
                  <TableCell className={classes.tableHeadRow} align="left" >
                    {Moment(row.loanData.dueDate).format("MM/DD/YYYY")}
                  </TableCell>

                  <TableCell className={classes.tableHeadRow} align="center" >
                    {
                      <NumberFormat value={Math.abs(row.loanPaymentInformation.accountDetails
                        .OriginalFinancedAmount)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                    }
                  </TableCell>

                  <TableCell align="center">
                    <NavLink
                      to={{
                        pathname: "/customers/loanDocument",

                        state: { accNo: row.loanData.accountNumber },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <FindInPageIcon
                        onClick={() => downloadDoc(row.loanData.accountNumber)}
                      />
                    </NavLink>
                  </TableCell>
                </TableRow>
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
