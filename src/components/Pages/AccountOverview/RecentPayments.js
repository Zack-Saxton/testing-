import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import Moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { NavLink } from "react-router-dom";
import { LoanAccount } from "../../../contexts/LoanAccount";
import { ButtonPrimary, Select, TableCellWrapper } from "../../FormsUI";
import { useAccountOverview } from "../../../hooks/useAccountOverview";
import { useStylesAccountOverview } from "./Style";
import "./Style.css";
import GenerateTableHeader from "./../PaymentHistory/GenerateTableHeader";

export default function RecentPayments() {
  //Material UI css class
  const classes = useStylesAccountOverview();
  const { isLoading, data : accountDetails } = useAccountOverview();
  const { selectedLoanAccount, setSelectedLoanAccount } =
    useContext(LoanAccount);
  const [defaultLoanAccount, setDefaultLoanAccount] = useState();
  const [loanAccountsList, setLoanAccountsList] = useState([]);
  const [paymentList, setPaymentList] = useState();

  useEffect(() => {
    if (accountDetails?.data?.loanHistory?.length) {
      let respectiveList = accountDetails.data.loanHistory.find(
        (loan) => loan.accountNumber === defaultLoanAccount
      );
      setPaymentList(respectiveList);
    }
  }, [accountDetails, defaultLoanAccount]);

  useEffect(() => {
    if (accountDetails?.data?.loanHistory?.length) {
      setDefaultLoanAccount(
        selectedLoanAccount
          ? selectedLoanAccount
          : accountDetails.data.loanHistory[0].accountNumber
      );
      setSelectedLoanAccount(
        selectedLoanAccount
          ? selectedLoanAccount
          : accountDetails.data.loanHistory[0].accountNumber
      );
      setLoanAccountsList(accountDetails.data.loanHistory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountDetails, selectedLoanAccount, setSelectedLoanAccount]);

  let loanOptions = loanAccountsList
    ? loanAccountsList.map((loanAccount) => ({
        value: loanAccount.accountNumber,
      }))
    : [];
  let loanMenu = loanOptions ? JSON.stringify(loanOptions) : "[]";

  const handleChange = (event) => {
    setDefaultLoanAccount(event.target.value);
    setSelectedLoanAccount(event.target.value);
  };

  //Recentpayments data
  let parData = [];
  if (paymentList?.AppAccountHistory?.length) {
    paymentList.AppAccountHistory.slice(0, 3).forEach(function (row) {
      parData.push({
        date: {
          value: Moment(row.TransactionDate).format("MM/DD/YYYY"),
          align: "left",
          className: classes.tableHeadRow,
        },
        description: {
          value: row.TransactionDescription,
          align: "left",
          className: classes.tableHeadRow,
        },
        principal: {
          value: (
            <NumberFormat
              value={Math.abs(row.PrincipalAmount)}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={"$"}
            />
          ),
          align: "right",
          className: classes.tableHeadRow,
        },
        interest: {
          value: (
            <NumberFormat
              value={Math.abs(row.InterestAmount)}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={"$"}
            />
          ),
          align: "right",
          className: classes.tableHeadRow,
        },
        other: {
          value: (
            <NumberFormat
              value={row.OtherAmount}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={"$"}
            />
          ),
          align: "right",
          className: classes.tableHeadRow,
        },
        totalAmount: {
          value: (
            <NumberFormat
              value={
                Math.abs(row.InterestAmount) +
                Math.abs(row.PrincipalAmount) +
                Math.abs(row.OtherAmount)
              }
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={"$"}
            />
          ),
          align: "right",
          className: classes.tableHeadRow,
        },
        balance: {
          value: (
            <NumberFormat
              value={row.RunningPrincipalBalance}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={"$"}
            />
          ),
          align: "right",
          className: classes.tableHeadRow,
        },
      });
    });
  }
  let headingLabel = ["Date","Description","Principal","Interest","Other","Total Amount","Balance"];
  let columnAlignment = ["left","left","right","right","right","right","right"];
  return (
    <>
      {isLoading ? (
        <>
          <Grid
            container
            item
            direction="row"
            xs={12}
            className={classes.activeLoanWrap}
          >
            <Typography variant="h5" className={classes.subheading}>
              Recent Payments
            </Typography>
          </Grid>
          <Grid
            className={classes.activeLoanTable}
            container
            data-testid="loading_Recent_Payments"
          >
            <Paper className="recentPaymentPaper">
              <CircularProgress />
            </Paper>
          </Grid>
        </>
      ) : (
        <>
          {accountDetails?.data?.loanHistory?.length ? (
            <>
              <Grid
                item
                xs={12}
                className={classes.recentPaymentMainGrid}
                data-testid="recent payments"
              >
                <Paper id="recentPaymentsWrap" className={classes.paperRP}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="h5"
                        className={classes.activeLoanHeading}
                      >
                        Recent Payments
                      </Typography>
                    </Grid>
                    <Grid className="paymentHistoryButtonWrap" item xs={12} sm={6}>
                      <NavLink
                        to="/customers/paymenthistory"
                        className={classes.decorNone}
                        state={{ selectedLoanAccount: selectedLoanAccount }}
                      >
                        <ButtonPrimary
                          data-testid="payment_history_button"
                          stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
                        >
                          Payment History
                        </ButtonPrimary>
                      </NavLink>
                    </Grid>
                    <Grid id="selectLoanAccountsGrid" item xs={12} sm={4}>
                      <Select
                        id="loans"
                        fullWidth={true}
                        name="loans"
                        labelform="Select Loan Accounts"
                        select={loanMenu}
                        onChange={handleChange}
                        value={defaultLoanAccount ?? ""}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.mainGrid}>
                    <TableContainer>
                      <Table id="recentPaymentsTable" aria-label="simple table">                        
                        <GenerateTableHeader headingLabel={ headingLabel } columnAlignment={ columnAlignment } />
                        <TableCellWrapper parseData={parData} />
                      </Table>
                    </TableContainer>
                  </Grid>
                </Paper>
              </Grid>
            </>
          ) : (
            <> </>
          )}
        </>
      )}
    </>
  );
}
