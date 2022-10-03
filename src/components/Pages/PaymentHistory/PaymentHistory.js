import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { CircularProgress } from '@mui/material';
import Grid from "@mui/material/Grid";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useQuery } from 'react-query';
import { NavLink, useLocation } from "react-router-dom";
import { LoanAccount } from "../../../contexts/LoanAccount";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import { ButtonPrimary, ButtonWithIcon } from "../../FormsUI";
import ScrollToTop from "../ScrollToTop";
import PaymentHistoryTable from "./PaymentHistoryTable.js";
import { useStylesPaymenthistory } from "./Style";
import "./Style.css";
import GenerateTableHeader from "./GenerateTableHeader";


//Main function
export default function PaymentHistory() {
  //Material UI css class
  const classes = useStylesPaymenthistory();
  const { selectedLoanAccount } = useContext(LoanAccount);
  const { data: accountDetails } = useQuery('loan-data', usrAccountDetails);
  const [ anchorEl, setAnchorEl ] = useState(null);
  const location = useLocation()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Api implementation for table
  const [ historyOfLoans, setHistoryOfLoans ] = useState();
  const [ tableData, setTableData ] = useState([])

  useEffect(() => {
    if (accountDetails?.data?.loanHistory?.length) {
      let respectiveList = accountDetails.data.loanHistory.find((loan) => loan.accountNumber === (selectedLoanAccount || location?.state?.selectedLoanAccount))
      setHistoryOfLoans(respectiveList);
    }
    // eslint-disable-next-line
  }, [ selectedLoanAccount, accountDetails ]);

  useEffect(() => {
    if (historyOfLoans?.AppAccountHistory?.length) {
      setTableData(historyOfLoans.AppAccountHistory);
    }
  }, [ historyOfLoans ])

  const headersCSV = [
    { label: "Date", key: "TransactionDate" },
    { label: "Description", key: "TransactionDescription" },
    { label: "Principal", key: "PrincipalAmount" },
    { label: "Interest", key: "InterestAmount" },
    { label: "Other", key: "OtherAmount" },
    { label: "Total", key: "Total" },
    { label: "Balance", key: "RunningPrincipalBalance" },
  ];
  let headingLabel = ["Date","Description","Principal","Interest","Other","Total","Balance"];
  let columnAlignment = ["left","left","right","right","right","right","right"];
  const currencyFormat = (amount) => {
    const formated = parseFloat(amount);
    const currency = "$";
    return currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  };

  //Download pdf
  const downloadPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const document = new jsPDF(orientation, unit, size);
    const headerPDF = [
      [
        "Date",
        "Description",
        "Principal",
        "Interest",
        "Other",
        "Total",
        "Balance",
      ],
    ];
    const data = historyOfLoans?.AppAccountHistory?.map((dataItem) => [
      Moment(dataItem.TransactionDate).format("MM-DD-YYYY"),
      dataItem.TransactionDescription,
      currencyFormat(Math.abs(dataItem.PrincipalAmount)),
      currencyFormat(Math.abs(dataItem.InterestAmount)),
      currencyFormat(Math.abs(dataItem.OtherAmount)),
      currencyFormat(
        Math.abs(
          dataItem.InterestAmount +
          dataItem.OtherAmount +
          dataItem.PrincipalAmount
        )
      ),
      currencyFormat(Math.abs(dataItem.RunningPrincipalBalance)),
    ]);
    document.setFontSize(15);
    document.text(`Active Loan / Payment History(${ selectedLoanAccount || location?.state?.selectedLoanAccount })`, 40, 30);
    let content = {
      startY: 50,
      head: headerPDF,
      body: data,
      theme: "plain",
    };
    document.autoTable(content);
    document.save("" + `${selectedLoanAccount || location?.state?.selectedLoanAccount }` + ".pdf");
    setAnchorEl(null);
  };

  //Data for csv file
  const dataCSV = historyOfLoans?.AppAccountHistory?.length
    ? historyOfLoans.AppAccountHistory.map((item) => {
      return {
        ...item,
        ...{
          TransactionDate: Moment(item.TransactionDate).format("MM-DD-YYYY"),
        },
        ...{
          Total: currencyFormat(
            Math.abs(item.InterestAmount) +
            Math.abs(item.OtherAmount) +
            Math.abs(item.PrincipalAmount)
          ),
        },
        ...{
          PrincipalAmount: currencyFormat(Math.abs(item.PrincipalAmount)),
        },
        ...{ InterestAmount: currencyFormat(Math.abs(item.InterestAmount)) },
        ...{ TransactionDescription: item.TransactionDescription },
        ...{ OtherAmount: currencyFormat(Math.abs(item.OtherAmount)) },
        ...{
          RunningPrincipalBalance: currencyFormat(
            Math.abs(item.RunningPrincipalBalance)
          ),
        },
      };
    })
    : [];

  //View part
  return (
    <div data-testid="paymentHistoryDiv">
      <CheckLoginStatus />
      <ScrollToTop />
      <Grid container className={classes.centerGrid} data-testid="payment_History">
        <Grid className={classes.gridStyle} container>
          <Grid item xs={12} sm={8}>
            <Typography data-testid="historyHeading" variant="h3" className={classes.heading}>
              <NavLink
                to="/customers/accountOverview"
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
                  data-testid = "buttonIcon"
                />
              </NavLink>{" "}
              Active Loan{" "}
              {selectedLoanAccount || location?.state?.selectedLoanAccount ? (
                <span className={classes.spanStyle}>
                  ({selectedLoanAccount || location?.state?.selectedLoanAccount})
                </span>
              ) : ("")}
              {" "}
              / Payment History
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ButtonPrimary
              aria-controls="simple-menu"
              anchorel={anchorEl}
              aria-haspopup="true"
              stylebutton='{"float": "right", "color":"" }'
              onClick={handleClick}
              data-testid = "downloadButton"
            >
              Download
            </ButtonPrimary>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              data-testid = "downloadOption"
            >
              <MenuItem key={"csv"} >
                <CSVLink
                  className={`${ classes.linkStyle } ${ classes.menuColor }`}
                  onClick={handleClose}
                  headers={headersCSV}
                  filename={"" + `${selectedLoanAccount || location?.state?.selectedLoanAccount }` + ".csv"}
                  data={dataCSV}
                  data-testid = "csvOption"
                >
                  <InsertDriveFileIcon className={classes.csvStyle} />{" "}
                  CSV
                </CSVLink>
              </MenuItem>
              <MenuItem
                key={"pdf"}
                onClick={downloadPDF}
                className={classes.menuColor}
                data-testid = "pdfOption"
              >
                <PictureAsPdfIcon className={classes.pdfStyle} /> PDF
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
        {!historyOfLoans ? (
          <Grid item xs={12}>
            <TableContainer data-testid = "pdfDiv" id="pdfdiv" component={Paper}>
              <Table className={classes.table} aria-label="simple table">
              <GenerateTableHeader headingLabel={ headingLabel } columnAlignment={ columnAlignment } />                
                <TableBody>
                  <TableRow>
                    <TableCell colSpan="7" align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          <PaymentHistoryTable userRecentPaymentData={tableData} />
        )}
      </Grid>
    </div>
  );
}
