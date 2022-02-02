import { CircularProgress } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import { ButtonPrimary, ButtonWithIcon } from "../../FormsUI";
import ScrollToTopOnMount from "../ScrollToTop";
import PaymentHistoryTable from "./PaymentRecords";
import { useStylesPaymenthistory } from "./Style";
import "./Style.css";

//Main function
export default function PaymentHistory() {

  //Material UI css class
  const classes = useStylesPaymenthistory();
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ fileName, setfileName ] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Api implementation for table
  const [ paymentHistoryStatus, setpaymentHistoryStatus ] = useState(null);

  async function AsyncEffect_paymentHistory() {
    let responseData = await (usrAccountDetails());
    setpaymentHistoryStatus(responseData);
    setfileName(responseData?.data?.activeLoans.length ? responseData?.data?.activeLoans[ 0 ].loanDetails.AccountNumber : null);
  }
  useEffect(() => {
    AsyncEffect_paymentHistory();
  }, []);

  const headersCSV = [
    { label: "Date", key: "TransactionDate" },
    { label: "Description", key: "TransactionDescription" },
    { label: "Principal", key: "PrincipalAmount" },
    { label: "Interest", key: "InterestAmount" },
    { label: "Other", key: "OtherAmount" },
    { label: "Total", key: "Total" },
    { label: "Balance", key: "RunningPrincipalBalance" }
  ];

  const currencyFormat = (n) => {
    const formated = parseFloat(n);
    const currency = '$';
    return currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  };

  //Download pdf
  const downloadPDF = () => {
    let pdfData = recentPaymentData != null ? recentPaymentData[ 0 ].loanHistory.AppAccountHistory : [];
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);
    const headerPDF = [ [ "Date", "Description", "Principal", "Interest", "Other", "Total", "Balance" ] ];
    const data = pdfData.map(data => [ Moment(data.TransactionDate).format("MM-DD-YYYY"), data.TransactionDescription, currencyFormat(Math.abs(data.PrincipalAmount)), currencyFormat(Math.abs(data.InterestAmount)), currencyFormat(Math.abs(data.OtherAmount)), currencyFormat(Math.abs(data.InterestAmount + data.OtherAmount + data.PrincipalAmount)), currencyFormat(Math.abs(data.RunningPrincipalBalance)) ]);
    doc.setFontSize(15);
    doc.text("Active Loan / Payment History(" + fileName + ")", 40, 30);
    let content = {
      startY: 50,
      head: headerPDF,
      body: data,
      theme: 'plain'
    };
    doc.autoTable(content);
    doc.save("" + fileName + ".pdf");
    setAnchorEl(null);
  };

  //Payment history data from API
  let recentPaymentData =
    paymentHistoryStatus != null
      ? paymentHistoryStatus?.data?.activeLoans
      : null;

  //Data for csv file
  const dataCSV = recentPaymentData != null ? recentPaymentData.length ? recentPaymentData[ 0 ].loanHistory.AppAccountHistory.map(item => {
    return {
      ...item,
      ...{ TransactionDate: Moment(item.TransactionDate).format('MM-DD-YYYY') },
      ...{ Total: currencyFormat(Math.abs(item.InterestAmount) + Math.abs(item.OtherAmount) + Math.abs(item.PrincipalAmount)) },
      ...{ PrincipalAmount: currencyFormat(Math.abs(item.PrincipalAmount)) },
      ...{ InterestAmount: currencyFormat(Math.abs(item.InterestAmount)) },
      ...{ TransactionDescription: item.TransactionDescription },
      ...{ OtherAmount: currencyFormat(Math.abs(item.OtherAmount)) },
      ...{ RunningPrincipalBalance: currencyFormat(Math.abs(item.RunningPrincipalBalance)) },
    };
  }) : [] : [];

  //View part
  return (
    <div>
      <CheckLoginStatus />
      <ScrollToTopOnMount />
      <Grid
        container
        justifyContent={ "center" }
        style={ {
          marginTop: "-150px",
          paddingRight: "23px",
          paddingLeft: "23px",
        } }
      >
        <Grid style={ { paddingBottom: "10px" } } container>
          <Grid item xs={ 12 } sm={ 8 }>
            <Typography variant="h3" className={ classes.heading }>
              <NavLink
                to="/customers/accountOverview"
                style={ { textDecoration: "none" } }
              >
                <ButtonWithIcon
                  icon="arrow_backwardIcon"
                  iconposition="left"
                  stylebutton='{"background": "#fff", "color":"#214476",
                        "minWidth": "0px",
                        "width": "36px",
                        "padding": "0px",
                        "marginRight": "5px", "marginTop":"unset" }'
                  styleicon='{ "color":"" }'
                />
              </NavLink>{ " " }
              Active Loan { fileName != null ? (<span style={ { fontSize: "70%", fontWeight: "100" } }>({ fileName })</span>) : '' } / Payment History

            </Typography>
          </Grid>
          <Grid item xs={ 12 } sm={ 4 }>
            <ButtonPrimary aria-controls="simple-menu" anchorel={ anchorEl } aria-haspopup="true" stylebutton='{"float": "right", "color":"" }' onClick={ handleClick }>
              Download
            </ButtonPrimary>
            <Menu
              id="simple-menu"
              anchorEl={ anchorEl }
              keepMounted
              open={ Boolean(anchorEl) }
              onClose={ handleClose }
            >
              <MenuItem style={ { color: "#757575" } } ><CSVLink style={ { textDecoration: "none", color: "#757575" } } onClick={ handleClose } headers={ headersCSV } filename={ "" + fileName + ".csv" } data={ dataCSV }><InsertDriveFileIcon style={ { paddingRight: '7px', marginBottom: '-4px' } } /> CSV</CSVLink></MenuItem>
              <MenuItem onClick={ downloadPDF } style={ { color: "#757575" } }><PictureAsPdfIcon style={ { paddingRight: '12px' } } /> PDF</MenuItem>
            </Menu>
          </Grid>
        </Grid>
        { recentPaymentData === null ? (
          <Grid item xs={ 12 } style={ { paddingTop: "10px", paddingBottom: "30px" } }>
            <TableContainer id="pdfdiv" component={ Paper }>
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
                  <TableRow>
                    <TableCell colSpan="7" align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>)
          : <PaymentHistoryTable userRecentPaymentData={ recentPaymentData } />
        }

      </Grid>
    </div>
  );
}
