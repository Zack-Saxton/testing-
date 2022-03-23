import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Moment from "moment";
import React from "react";
import NumberFormat from 'react-number-format';
import { NavLink } from "react-router-dom";
import { useStylesLoanHistory } from "./Style";
import "./Style.css";

export default function LoanHistoryTable(historyOfLoans) {

  //Material UI css class
  const classes = useStylesLoanHistory();

  //View part
  return (
    <Grid item xs={ 12 } style={ { paddingBottom: "30%" } }>
      <TableContainer component={ Paper }>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell  className={ classes.tableHead } align="left" >Account Number</TableCell>
              <TableCell className={ classes.tableHead } align="left" >Date Opened</TableCell>
              <TableCell  className={ classes.tableHead } align="left" >Date Closed</TableCell>
              <TableCell style={ { padding: "16px 60px 16px 0px" } } className={ classes.tableHead } align="right" >Amount Financed</TableCell>
              <TableCell style={ {padding: "16px 16px 16px 0px" } } className={ classes.tableHead } align="center" >Documents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { !historyOfLoans?.userLoanHistoryData ? (
              <TableRow>
                <TableCell colSpan="7" align="center"><CircularProgress /></TableCell>
              </TableRow>
            ) : historyOfLoans?.userLoanHistoryData?.length ? (
              historyOfLoans?.userLoanHistoryData.map((row) => (
                <TableRow key={ row.loanData.accountNumber }>
                  <TableCell component="th" className={ classes.tableHeadRow } scope="row" align="left">{ row.loanData.accountNumber }</TableCell>
                  <TableCell className={ classes.tableHeadRow } align="left" >{ row.loanData?.loanOriginationDate ? Moment(row.loanData.loanOriginationDate).format("MM/DD/YYYY") : '' }</TableCell>
                  <TableCell className={ classes.tableHeadRow } align="left" >{ row.loanData.dueDate ? Moment(row.loanData.dueDate).format("MM/DD/YYYY") : '' }</TableCell>
                  <TableCell style={ { minWidth: "140px", width: "150px", padding: "16px 60px 16px 0px" } } className={ classes.tableHeadRow } align="right" >
                    {
                      <NumberFormat value={ row.loanPaymentInformation?.accountDetails?.OriginalFinancedAmount ? Math.abs(row.loanPaymentInformation.accountDetails.OriginalFinancedAmount) : '' } displayType={ 'text' } thousandSeparator={ true } decimalScale={ 2 } fixedDecimalScale={ true } prefix={ '$' } />
                    }
                  </TableCell>
                  <TableCell className={loanDocuments} align="center">
                    <NavLink to="/customers/loanDocument" state={ { accNo: row.loanData.accountNumber } } className={textdecoration}>
                      <Tooltip title="View Loan Documents" placement="top">
                        <FindInPageIcon className={findInPageIcon} />
                      </Tooltip>
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="7" align="center">You do not have an active loan</TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
