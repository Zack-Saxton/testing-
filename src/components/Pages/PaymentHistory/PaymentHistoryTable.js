import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from "@mui/material/TableRow";
import { makeStyles, useTheme } from '@mui/styles';
import Moment from "moment";
import PropTypes from "prop-types";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { useStylesPaymenthistory } from "./Style";
import "./Style.css";
import GenerateTableHeader from "./GenerateTableHeader";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

//Pagination
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  //View part
  return (
    <div className={classes.root}>
      <IconButton
        data-testid="handleFirstPageButtonClick"
        onClick={handleFirstPageButtonClick}
        disabled={!page}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        data-testid="handleBackButtonClick"
        onClick={handleBackButtonClick}
        disabled={!page}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        data-testid="handleNextButtonClick"
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        data-testid="handleLastPageButtonClick"
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function PaymentHistoryTable({ userRecentPaymentData }) {
  const classes = useStylesPaymenthistory();
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value.trim(), 10));
    setPage(0);
  };
  let headingLabel = ["Date","Description","Principal","Interest","Other","Total","Balance"];
  let columnAlignment = ["left","left","right","right","right","right","right"];
  //View part
  return (
    <Grid item xs={12} className={classes.tableStyle}>
      <TableContainer id="pdfdiv" component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <GenerateTableHeader headingLabel={ headingLabel } columnAlignment={ columnAlignment } />
          <TableBody>
            {userRecentPaymentData ? (
              (rowsPerPage > 0
                ? userRecentPaymentData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                : userRecentPaymentData
              ).map((row) => (
                <TableRow key={Math.random() * 1000}>
                  <TableCell
                    component="th"
                    className={classes.tableHeadRow}
                    scope="row"
                    align="left"
                  >
                    {Moment(row.TransactionDate).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell className={classes.tableHeadRow} align="left">
                    {row.TransactionDescription}
                  </TableCell>
                  <TableCell className={classes.tableHeadRow} align="right">
                    <NumberFormat
                      value={Math.abs(row.PrincipalAmount)}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      prefix={"$"}
                    />
                  </TableCell>
                  <TableCell className={classes.tableHeadRow} align="right">
                    <NumberFormat
                      value={Math.abs(row.InterestAmount)}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      prefix={"$"}
                    />
                  </TableCell>
                  <TableCell className={classes.tableHeadRow} align="right">
                    <NumberFormat
                      value={Math.abs(row.OtherAmount)}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      prefix={"$"}
                    />
                  </TableCell>
                  <TableCell className={classes.tableHeadRow} align="right">
                    <NumberFormat
                      value={
                        Math.abs(row.InterestAmount) +
                        Math.abs(row.OtherAmount) +
                        Math.abs(row.PrincipalAmount)
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      prefix={"$"}
                    />
                  </TableCell>
                  <TableCell className={classes.tableHeadRow} align="right">
                    <NumberFormat
                      value={Math.abs(row.RunningPrincipalBalance)}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      prefix={"$"}
                    />
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
          <TableFooter>
            <TableRow>
              <TablePagination
                data-testid="paymentRecordsTablePagination"
                rowsPerPageOptions={[ 5, 10, { label: "All", value: -1 } ]}
                count={userRecentPaymentData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
}

PaymentHistoryTable.propTypes = {
  userRecentPaymentData: PropTypes.array,
};
