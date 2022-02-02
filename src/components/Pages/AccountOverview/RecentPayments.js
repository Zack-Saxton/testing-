import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Moment from "moment";
import React from "react";
import NumberFormat from "react-number-format";
import { NavLink } from "react-router-dom";
import { ButtonPrimary, TableCellWrapper } from "../../FormsUI";
import { useStylesAccountOverview } from "./Style";
import "./Style.css";
export default function RecentPayments(userRecentPaymentData) {
	//Material UI css class
	const classes = useStylesAccountOverview();
	window.zeHide();
	//Recentpayments data
	let userRecentPayment =
		userRecentPaymentData != null ? userRecentPaymentData : null;
	let parData = [];
	if (userRecentPayment?.userRecentPaymentData?.length) {
		userRecentPayment?.userRecentPaymentData.slice(0, 1).forEach(function (arrayItem) {
			arrayItem?.loanHistory?.AppAccountHistory?.slice(0, 3).forEach(function (row) {
				parData.push(
					{
						date: {
							value: Moment(row.TransactionDate).format("MM/DD/YYYY"),
							align: "left",
							className: classes.tableHeadRow
						},
						description: {
							value: row.TransactionDescription,
							align: "left",
							className: classes.tableHeadRow
						},
						principal: {
							value: <NumberFormat
								value={ Math.abs(row.PrincipalAmount) }
								displayType={ "text" }
								thousandSeparator={ true }
								decimalScale={ 2 }
								fixedDecimalScale={ true }
								prefix={ "$" }
							/>,
							align: "right",
							className: classes.tableHeadRow
						},
						interest: {
							value: <NumberFormat
								value={ Math.abs(row.InterestAmount) }
								displayType={ "text" }
								thousandSeparator={ true }
								decimalScale={ 2 }
								fixedDecimalScale={ true }
								prefix={ "$" }
							/>,
							align: "right",
							className: classes.tableHeadRow
						},
						other: {
							value: <NumberFormat
								value={ row.OtherAmount }
								displayType={ "text" }
								thousandSeparator={ true }
								decimalScale={ 2 }
								fixedDecimalScale={ true }
								prefix={ "$" }
							/>,
							align: "right",
							className: classes.tableHeadRow
						},
						totalAmount: {
							value: <NumberFormat
								value={
									Math.abs(row.InterestAmount) +
									Math.abs(row.PrincipalAmount) +
									Math.abs(row.OtherAmount)
								}
								displayType={ "text" }
								thousandSeparator={ true }
								decimalScale={ 2 }
								fixedDecimalScale={ true }
								prefix={ "$" }
							/>,
							align: "right",
							className: classes.tableHeadRow
						},
						balance: {
							value: <NumberFormat
								value={ row.RunningPrincipalBalance }
								displayType={ "text" }
								thousandSeparator={ true }
								decimalScale={ 2 }
								fixedDecimalScale={ true }
								prefix={ "$" }
							/>,
							align: "right",
							className: classes.tableHeadRow
						},
					}
				);
			});
		});
	}
	return (
		<Grid item xs={ 12 } className={ classes.recentPaymentMainGrid }>
			<Paper id="recentPaymentsWrap" className={ classes.paperRP } >
				<Grid container spacing={ 3 }>
					<Grid item xs={ 12 } sm={ 6 }>
						<Typography variant="h5" className={ classes.activeLoanHeading }>
							Recent Payments
						</Typography>
					</Grid>
					<Grid item xs={ 12 } sm={ 6 }>
						<NavLink to="/customers/paymenthistory" className={ classes.decorNone } >
							<ButtonPrimary stylebutton='{"float": "right","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'>
								Payment History
							</ButtonPrimary>
						</NavLink>
					</Grid>
				</Grid>
				<Grid item xs={ 12 } className={ classes.mainGrid }>
					<TableContainer>
						<Table id="recentPaymentsTable" aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell
										className={ classes.tablehead }
										align="left"
									>
										Date
									</TableCell>
									<TableCell
										className={ classes.tablehead }
										align="left"
									>
										Description
									</TableCell>
									<TableCell
										className={ classes.tablehead }
										align="right"
									>
										Principal
									</TableCell>
									<TableCell
										className={ classes.tablehead }
										align="right"
									>
										Interest
									</TableCell>
									<TableCell
										className={ classes.tablehead }
										align="right"
									>
										Other
									</TableCell>
									<TableCell
										className={ classes.tablehead }
										align="right"
									>
										Total Amount
									</TableCell>
									<TableCell
										className={ classes.tablehead }
										align="right"
									>
										Balance
									</TableCell>
								</TableRow>
							</TableHead>
							{ userRecentPaymentData?.isLoading ? (
								<TableBody>
									<TableRow>
										<TableCell colSpan="7" align="center">
											<CircularProgress />
										</TableCell>
									</TableRow>
								</TableBody>
							) : userRecentPayment?.userRecentPaymentData?.length ? (
								<TableCellWrapper parseData={ parData } />
							) : (
								<TableBody>
									<TableRow>
										<TableCell colSpan="7" align="center">
											You do not have any payments to display
										</TableCell>
									</TableRow>
								</TableBody>
							) }
						</Table>
					</TableContainer>
				</Grid>
			</Paper>
		</Grid>
	);
}
