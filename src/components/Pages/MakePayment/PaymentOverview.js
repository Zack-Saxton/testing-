import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Moment from "moment";
import { useStylesMakePayment } from "./Style";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./makepayment.css";
import NumberFormat from 'react-number-format';


export default function PaymentOverview(paymentData) {
    const classes = useStylesMakePayment();
    let paymentDetails = (paymentData != null) ? paymentData : null;
    return (
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell className={classes.tableHead}>
                        Account Number
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                        Regular Amount
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                        Interest
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                        Loan Fees
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                        Total
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                        Next Due Date
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                        Scheduled Payment
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                        Auto Pay
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {(paymentDetails.overview===null)
                ?
                <TableRow>
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
                (paymentDetails.overview && paymentDetails.overview.length)
                    ?
                    paymentDetails.overview.map((row,index) => (
                        <TableRow key={index}>
                            <TableCell
                                component="th"
                                className={row.tableHeadRow}
                                scope="row"
                            >
                                 {row.loanDetails.AccountNumber}
                            </TableCell>
                            <TableCell className={classes.tableHeadRow} align="center">
                            <NumberFormat value={Math.abs(row.loanPaymentInformation.accountDetails.RegularPaymentAmount)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                            </TableCell>
                            <TableCell className={classes.tableHeadRow} align="center">
                            <NumberFormat value={Math.abs(row.loanPaymentInformation.accountDetails.InterestRate)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                            </TableCell>
                            <TableCell className={classes.tableHeadRow} align="center">
                            <NumberFormat value={Math.abs(row.loanPaymentInformation.accountDetails.LoanFeesAndCharges)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                            </TableCell>
                            <TableCell className={classes.tableHeadRow} align="center">
                            <NumberFormat value={Math.abs(row.loanPaymentInformation.accountDetails.RegularPaymentAmount) + Math.abs(row.loanPaymentInformation.accountDetails.InterestRate) + Math.abs(row.loanPaymentInformation.accountDetails.LoanFeesAndCharges)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                            </TableCell>
                            <TableCell className={classes.tableHeadRow} align="center">
                                {Moment(row.loanPaymentInformation.accountDetails.NextDueDate).format("MM/DD/YYYY")}
                            </TableCell>
                            <TableCell className={classes.tableHeadRow} align="center">
                            {(row.loanPaymentInformation.hasScheduledPayment) ? Moment(row.loanPaymentInformation.scheduledPayments[0].PaymentDate).format("MM/DD/YYYY") : "NONE" }
                            </TableCell>
                            <TableCell className={classes.tableHeadRow} align="center">
                            {(row.loanPaymentInformation.appRecurringACHPayment) ? "On Due Date" : "Disabled" }
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

