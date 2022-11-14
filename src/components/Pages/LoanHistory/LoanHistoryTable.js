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
import Typography from "@mui/material/Typography";

export default function LoanHistoryTable() {

  //Material UI css class
  const classes = useStylesLoanHistory();
  const { isLoading, data: accountDetails } = useQuery('loan-data', usrAccountDetails);
  //View part
  return (
    <div style = {{width : "100%"}}>
      <Grid
            container
            item
            direction="row"
            xs={12}
            className={classes.activeLoanWrap}
            style = {{paddingBottom : "20px"}}
          >
            <Typography
              variant="h5"
              className={classes.subheading}
              data-testid="active loans"
            >
              Active Loan
            </Typography>
          </Grid>
    <Grid item xs={12}  style = {{paddingBottom : "20px"}}  data-testid="with_Data">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead} align="left" >Account Number</TableCell>
              <TableCell className={classes.tableHead} align="left" >Date Opened</TableCell>
              {/* <TableCell className={classes.tableHead} align="left" >Date Closed</TableCell> */}
              <TableCell className={classes.tableHeadLast} align="right" >Amount Financed</TableCell>
              <TableCell className={classes.tableHeadLast2} align="center" >Documents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan="7" align="center" data-testid="while_Loading"><CircularProgress /></TableCell>
              </TableRow>
            )}  
            { accountDetails?.data?.activeLoans?.length && (
              accountDetails?.data?.activeLoans.map((row) => (
                <TableRow key={row.loanData.accountNumber} >
                  <TableCell component="th" className={classes.tableHeadRow} scope="row" align="left">{row.loanData.accountNumber}</TableCell>
                  <TableCell className={classes.tableHeadRow} align="left" >{row.loanData?.loanOriginationDate ? Moment(row.loanData.loanOriginationDate).format("MM/DD/YYYY") : ''}</TableCell>
                  {/* <TableCell className={classes.tableHeadRow} align="left" >{row.loanData.dueDate ? Moment(row.loanData.dueDate).format("MM/DD/YYYY") : ''}</TableCell> */}
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
            { 
           !isLoading && !accountDetails?.data?.activeLoans?.length && (
              <TableRow data-testid="while_Error">
                <TableCell colSpan="7" align="center" >You do not have an active loan</TableCell>
              </TableRow>
           )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>

    <Grid
            container
            item
            direction="row"
            xs={12}
            className={classes.activeLoanWrap}
            style = {{paddingBottom : "20px"}}
          >
            <Typography
              variant="h5"
              className={classes.subheading}
              data-testid="active loans"
            >
              Closed Loan
            </Typography>
          </Grid>
<Grid item xs={12} className={classes.gridRecordTable} data-testid="with_Data">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead} align="left" >Account Number</TableCell>
              <TableCell className={classes.tableHead} align="left" >Date Opened</TableCell>
              <TableCell className={classes.tableHead} align="left" >Date Closed</TableCell>
              {/* <TableCell className={classes.tableHeadLast} align="right" >Amount Financed</TableCell> */}
              <TableCell className={classes.tableHeadLast2} align="center" >Documents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan="7" align="center" data-testid="while_Loading"><CircularProgress /></TableCell>
              </TableRow>
            )}  
            { accountDetails?.data?.loanData?.length && (
              accountDetails?.data?.loanData.map((row) => (
                row.status === "Closed" ?
                <TableRow key={row.accountNumber} >
                  <TableCell component="th" className={classes.tableHeadRow} scope="row" align="left">{row.accountNumber}</TableCell>
                  <TableCell className={classes.tableHeadRow} align="left" >{row?.loanOriginationDate ? Moment(row.loanOriginationDate).format("MM/DD/YYYY") : ''}</TableCell>
                  <TableCell className={classes.tableHeadRow} align="left" >{row.status === "Closed" ? row.dueDate ? Moment(row.dueDate).format("MM/DD/YYYY") : '' : ''}</TableCell>
                  {/* <TableCell className={classes.tableHeadRowLast} align="right" >
                    {
                      <NumberFormat value={row.loanPaymentInformation?.accountDetails?.OriginalFinancedAmount ? Math.abs(row.loanPaymentInformation.accountDetails.OriginalFinancedAmount) : ''} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                    }
                  </TableCell> */}
                  <TableCell className={classes.loanDocumentsTableCell} align="center">
                    <NavLink to="/customers/loanDocument" state={{ accNo: row.accountNumber }} className={classes.textDecoration}>
                      <Tooltip title="View Loan Documents" placement="top">
                        <FindInPageIcon className={classes.findInPageIcon} />
                      </Tooltip>
                    </NavLink>
                  </TableCell>
                </TableRow> : ""
              ))
            )} 
            { 
           !isLoading && !accountDetails?.data?.loanData?.length && (
              <TableRow data-testid="while_Error">
                <TableCell colSpan="7" align="center" >You do not have any Closed loans</TableCell>
              </TableRow>
           )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>

    </div>



  );
}
