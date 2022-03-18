import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Moment from "moment";
import PropTypes from "prop-types";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { useStylesPaymenthistory } from "./Style";
import "./Style.css";

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
        onClick={handleFirstPageButtonClick}
        disabled={!page}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value.trim(), 10));
    setPage(0);
  };

  //View part
  return (
    <Grid item xs={12} style={{ paddingTop: "10px", paddingBottom: "30px" }}>
      <TableContainer id="pdfdiv" component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead} align="left">
                Date
              </TableCell>
              <TableCell className={classes.tableHead} align="left">
                Description
              </TableCell>
              <TableCell className={classes.tableHead} align="right">
                Principal
              </TableCell>
              <TableCell className={classes.tableHead} align="right">
                Interest
              </TableCell>
              <TableCell className={classes.tableHead} align="right">
                Other
              </TableCell>
              <TableCell className={classes.tableHead} align="right">
                Total
              </TableCell>
              <TableCell className={classes.tableHead} align="right">
                Balance
              </TableCell>
            </TableRow>
          </TableHead>
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
                rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
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
