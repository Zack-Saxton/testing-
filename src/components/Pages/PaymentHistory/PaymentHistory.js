import { CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useQuery } from "react-query";
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
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ fileName, setfileName ] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Api implementation for table
  const { data: paymentHistoryStatus } = useQuery(
    "loan-data",
    usrAccountDetails
  );
  const [ historyOfLoans, setHistoryOfLoans ] = useState([]);

  useEffect(() => {
    if (paymentHistoryStatus) {
      setfileName(
        paymentHistoryStatus?.data?.activeLoans?.length
          ? paymentHistoryStatus.data.activeLoans[ 0 ].loanDetails.AccountNumber
          : null
      );
      setHistoryOfLoans(
        paymentHistoryStatus?.data?.loanHistory?.length
          ? paymentHistoryStatus.data.loanHistory[ 0 ].AppAccountHistory
          : []
      );
    }
    return null;
  }, [ paymentHistoryStatus ]);

  const headersCSV = [
    { label: "Date", key: "TransactionDate" },
    { label: "Description", key: "TransactionDescription" },
    { label: "Principal", key: "PrincipalAmount" },
    { label: "Interest", key: "InterestAmount" },
    { label: "Other", key: "OtherAmount" },
    { label: "Total", key: "Total" },
    { label: "Balance", key: "RunningPrincipalBalance" },
  ];

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
    const data = historyOfLoans?.map((dataItem) => [
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
    document.text(`Active Loan / Payment History(${ fileName })`, 40, 30);
    let content = {
      startY: 50,
      head: headerPDF,
      body: data,
      theme: "plain",
    };
    document.autoTable(content);
    document.save("" + fileName + ".pdf");
    setAnchorEl(null);
  };

  //Data for csv file
  const dataCSV = historyOfLoans
    ? historyOfLoans.map((item) => {
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
    <div>
      <CheckLoginStatus />
      <ScrollToTopOnMount />
      <Grid container justifyContent={ "center" } className={ classes.centerGrid }>
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
              Active Loan{ " " }
              { fileName != null ? (
                <span style={ { fontSize: "70%", fontWeight: "100" } }>
                  ({ fileName })
                </span>
              ) : (
                ""
              ) }{ " " }
              / Payment History
            </Typography>
          </Grid>
          <Grid item xs={ 12 } sm={ 4 }>
            <ButtonPrimary
              aria-controls="simple-menu"
              anchorel={ anchorEl }
              aria-haspopup="true"
              stylebutton='{"float": "right", "color":"" }'
              onClick={ handleClick }
            >
              Download
            </ButtonPrimary>
            <Menu
              id="simple-menu"
              anchorEl={ anchorEl }
              keepMounted
              open={ Boolean(anchorEl) }
              onClose={ handleClose }
            >
              <MenuItem key={ "csv" } style={ { color: "#757575" } }>
                <CSVLink
                  style={ { textDecoration: "none", color: "#757575" } }
                  onClick={ handleClose }
                  headers={ headersCSV }
                  filename={ "" + fileName + ".csv" }
                  data={ dataCSV }
                >
                  <InsertDriveFileIcon
                    style={ { paddingRight: "7px", marginBottom: "-4px" } }
                  />{ " " }
                  CSV
                </CSVLink>
              </MenuItem>
              <MenuItem
                key={ "pdf" }
                onClick={ downloadPDF }
                style={ { color: "#757575" } }
              >
                <PictureAsPdfIcon style={ { paddingRight: "12px" } } /> PDF
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
        { historyOfLoans === null ? (
          <Grid
            item
            xs={ 12 }
            style={ { paddingTop: "10px", paddingBottom: "30px" } }
          >
            <TableContainer id="pdfdiv" component={ Paper }>
              <Table className={ classes.table } aria-label="simple table">
                <TableHead>
                  <TableRow key={ Math.random() * 1000 }>
                    <TableCell className={ classes.tableHead } align="left">
                      Date
                    </TableCell>
                    <TableCell className={ classes.tableHead } align="left">
                      Description
                    </TableCell>
                    <TableCell className={ classes.tableHead } align="right">
                      Principal
                    </TableCell>
                    <TableCell className={ classes.tableHead } align="right">
                      Interest
                    </TableCell>
                    <TableCell className={ classes.tableHead } align="right">
                      Other
                    </TableCell>
                    <TableCell className={ classes.tableHead } align="right">
                      Total
                    </TableCell>
                    <TableCell className={ classes.tableHead } align="right">
                      Balance
                    </TableCell>
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
          </Grid>
        ) : (
          <PaymentHistoryTable userRecentPaymentData={ historyOfLoans } />
        ) }
      </Grid>
    </div>
  );
}
