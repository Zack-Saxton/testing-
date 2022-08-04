import CircularProgress from '@mui/material/CircularProgress';
import Table from "@mui/material/Table";
import PropTypes from "prop-types";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Moment from "moment";
import React from "react";
import NumberFormat from 'react-number-format';
import "./MakePayment.css";
import { useStylesMakePayment } from "./Style";

export default function PaymentOverview(props) {
    //Material UI css class
    const classes = useStylesMakePayment();
    return (
        <Table data-testid="paymentOverviewTable" id="paymentTableWrap" className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell className={classes.tableHead}>
                        Account Number
                    </TableCell>
                    <TableCell className={classes.tableHead} align="right">
                        Today&apos;s Payoff
                    </TableCell>
                    <TableCell className={classes.tableHead} align="right">
                        Amount Due
                    </TableCell>
                    <TableCell className={classes.tableHead} align="right">
                        Interest Rate
                    </TableCell>
                    <TableCell className={classes.tableHead} align="right">
                        Loan Fees
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                        Due Date
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                        Scheduled Payment
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                        Auto Pay
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {(props.status)
                    ?
                    <TableRow data-testid='spinner_Table'>
                        <TableCell
                            colSpan="7"
                            component="th"
                            className={classes.tableHeadRow}
                            scope="row"
                            align="center"
                        >
                            <CircularProgress />
                        </TableCell>
                    </TableRow>
                    :
                    (props?.overview && props?.overview.length && !props?.overview[ 0 ].loanPaymentInformation?.errorMessage)
                        ?
                        props.overview.map((row) => (
                            <TableRow key={(Math.random() * 1000)}>
                                <TableCell
                                    component="th"
                                    className={classes.tableHeadRow}
                                    scope="row"
                                >
                                    {row.loanDetails.AccountNumber}
                                </TableCell>
                                <TableCell className={`${ classes.tableHeadRow } ${ classes.tableHead }`} align="right">
                                    <NumberFormat value={Math.abs(row.loanPaymentInformation.accountDetails.CurrentPayOffAmount)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} suffix = {'*'} />
                                </TableCell>
                                <TableCell className={`${ classes.tableHeadRow } ${ classes.tableHead }`} align="right">
                                    <NumberFormat value={Math.abs(row.loanData.amountDue)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                                </TableCell>
                                <TableCell className={`${ classes.tableHeadRow } ${ classes.tableHead }`} align="right">
                                    <NumberFormat value={Math.abs(row.loanPaymentInformation.accountDetails.InterestRate)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} suffix={'%'} />
                                </TableCell>
                                <TableCell className={`${ classes.tableHeadRow } ${ classes.tableHead }`} align="right">
                                    <NumberFormat value={Math.abs(row.loanPaymentInformation.accountDetails.LoanFeesAndCharges)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                                </TableCell>
                                <TableCell className={classes.tableHeadRow} align="left">
                                    {Moment(row.loanPaymentInformation.accountDetails.NextDueDate).format("MM/DD/YYYY")}
                                </TableCell>
                                <TableCell className={classes.tableHeadRow} align="left">
                                    {(row.loanPaymentInformation.hasScheduledPayment) ? Moment(row.loanPaymentInformation.scheduledPayments[ 0 ].PaymentDate).format("MM/DD/YYYY") : "NONE"}
                                </TableCell>
                                <TableCell className={`${ classes.tableHeadRow } ${ classes.tableHead }`} align="left">
                                    {(row.loanPaymentInformation.appRecurringACHPayment) ? "On Due Date" : "Disabled"}
                                </TableCell>
                            </TableRow>
                        ))
                        :
                        <TableRow>
                            <TableCell
                                colSpan="7"
                                align="center"
                            >
                                You do not have any active loans
                            </TableCell>
                        </TableRow>
                }
            </TableBody>
        </Table>
    );
}

PaymentOverview.propTypes = {
    paymentData: PropTypes.object,
    status: PropTypes.bool,
    overview: PropTypes.array
  };