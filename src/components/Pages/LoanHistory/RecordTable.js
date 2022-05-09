import FindInPageIcon from "@mui/icons-material/FindInPage";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Moment from "moment";
import React from "react";
import { useQuery } from 'react-query';
import NumberFormat from 'react-number-format';
import { NavLink } from "react-router-dom";
import { useStylesLoanHistory } from "./Style";
import usrAccountDetails from "../../Controllers/AccountOverviewController"
import "./Style.css";

export default function LoanHistoryTable() {

  //Material UI css class
  const classes = useStylesLoanHistory();
  const { isLoading, data: loanHistoryStatus } = useQuery('loan-data', usrAccountDetails);

  //View part
  return (
    <Grid item xs={12} className={classes.gridRecordTable}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead} align="left" >Account Number</TableCell>
              <TableCell className={classes.tableHead} align="left" >Date Opened</TableCell>
              <TableCell className={classes.tableHead} align="left" >Date Closed</TableCell>
              <TableCell className={classes.tableHeadLast} align="right" >Amount Financed</TableCell>
              <TableCell className={classes.tableHeadLast2} align="center" >Documents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan="7" align="center"><CircularProgress /></TableCell>
              </TableRow>
            )}  
            { loanHistoryStatus?.data?.activeLoans?.length && (
              loanHistoryStatus?.data?.activeLoans.map((row) => (
                <TableRow key={row.loanData.accountNumber}>
                  <TableCell component="th" className={classes.tableHeadRow} scope="row" align="left">{row.loanData.accountNumber}</TableCell>
                  <TableCell className={classes.tableHeadRow} align="left" >{row.loanData?.loanOriginationDate ? Moment(row.loanData.loanOriginationDate).format("MM/DD/YYYY") : ''}</TableCell>
                  <TableCell className={classes.tableHeadRow} align="left" >{row.loanData.dueDate ? Moment(row.loanData.dueDate).format("MM/DD/YYYY") : ''}</TableCell>
                  <TableCell className={classes.tableHeadRowLast} align="right" >
                    {
                      <NumberFormat value={row.loanPaymentInformation?.accountDetails?.OriginalFinancedAmount ? Math.abs(row.loanPaymentInformation.accountDetails.OriginalFinancedAmount) : ''} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                    }
                  </TableCell>
                  <TableCell className={classes.loanDocumentsTableCell} align="center">
                    <NavLink to="/customers/loanDocument" state={{ accNo: row.loanData.accountNumber }} className={classes.textDecoration}>
                      <Tooltip title="View Loan Documents" placement="top">
                        <FindInPageIcon className={classes.findInPageIcon} />
                      </Tooltip>
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))
            )} 
            { !isLoading && !loanHistoryStatus?.data?.activeLoans?.length && (
              <TableRow>
                <TableCell colSpan="7" align="center">You do not have an active loan</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
