import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { NavLink } from "react-router-dom";
import { LoanAccount } from "../../../contexts/LoanAccount";
import { ButtonPrimary, Select, TableCellWrapper } from "../../FormsUI";
import { useAccountOverview } from "./AccountOverviewHook/useAccountOverview";
import { useStylesAccountOverview } from "./Style";
import "./Style.css";
export default function RecentPayments() {
	//Material UI css class
	const classes = useStylesAccountOverview();
	const { isLoading, accountDetails } = useAccountOverview();
	const { selectedLoanAccount, setSelectedLoanAccount } = useContext(LoanAccount);
	const [ defaultLoanAccount, setDefaultLoanAccount ] = useState();
	const [ loanAccountsList, setLoanAccountsList ] = useState([]);
	const [ paymentList, setPaymentList ] = useState();

	useEffect(() => {
		if (accountDetails?.data?.loanHistory?.length) {
			let respectiveList = accountDetails.data.loanHistory.find((loan) => loan.accountNumber === defaultLoanAccount)
			setPaymentList(respectiveList);
		}
	}, [ accountDetails, defaultLoanAccount ])

	useEffect(() => {
		if (accountDetails?.data?.loanHistory?.length) {
			setDefaultLoanAccount(selectedLoanAccount ?? accountDetails.data.loanHistory[ 0 ].accountNumber)
			setSelectedLoanAccount(selectedLoanAccount ?? accountDetails.data.loanHistory[ 0 ].accountNumber)
			setLoanAccountsList(accountDetails.data.loanHistory);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ accountDetails, selectedLoanAccount, setSelectedLoanAccount ]);

	let loanOptions = loanAccountsList
		? loanAccountsList.map((loanAccount) => ({
			value: loanAccount.accountNumber,
		}))
		: [];
	let loanMenu = loanOptions ? JSON.stringify(loanOptions) : '[]';

	const handleChange = (event) => {
		setDefaultLoanAccount(event.target.value);
		setSelectedLoanAccount(event.target.value);
	}

	//Recentpayments data
	let parData = [];
	if (paymentList?.AppAccountHistory?.length) {
		paymentList.AppAccountHistory.slice(0, 3).forEach(function (row) {
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
							value={Math.abs(row.PrincipalAmount)}
							displayType={"text"}
							thousandSeparator={true}
							decimalScale={2}
							fixedDecimalScale={true}
							prefix={"$"}
						/>,
						align: "right",
						className: classes.tableHeadRow
					},
					interest: {
						value: <NumberFormat
							value={Math.abs(row.InterestAmount)}
							displayType={"text"}
							thousandSeparator={true}
							decimalScale={2}
							fixedDecimalScale={true}
							prefix={"$"}
						/>,
						align: "right",
						className: classes.tableHeadRow
					},
					other: {
						value: <NumberFormat
							value={row.OtherAmount}
							displayType={"text"}
							thousandSeparator={true}
							decimalScale={2}
							fixedDecimalScale={true}
							prefix={"$"}
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
							displayType={"text"}
							thousandSeparator={true}
							decimalScale={2}
							fixedDecimalScale={true}
							prefix={"$"}
						/>,
						align: "right",
						className: classes.tableHeadRow
					},
					balance: {
						value: <NumberFormat
							value={row.RunningPrincipalBalance}
							displayType={"text"}
							thousandSeparator={true}
							decimalScale={2}
							fixedDecimalScale={true}
							prefix={"$"}
						/>,
						align: "right",
						className: classes.tableHeadRow
					},
				}
			);
		});
	}

	return (
		<Grid item xs={12} className={classes.recentPaymentMainGrid} data-testid="recent payments">
			<Paper id="recentPaymentsWrap" className={classes.paperRP}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<Typography variant="h5" className={classes.activeLoanHeading}>
							Recent Payments
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<NavLink
							to="/customers/paymenthistory"
							className={classes.decorNone}
						>
							<ButtonPrimary data-testid="payment_history_button" stylebutton='{"float": "right","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'>
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
							value={defaultLoanAccount ?? ''}
						/>
					</Grid>
				</Grid>
				<Grid item xs={12} className={classes.mainGrid}>
					<TableContainer>
						<Table id="recentPaymentsTable" aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell className={classes.tablehead} align="left">
										Date
									</TableCell>
									<TableCell className={classes.tablehead} align="left">
										Description
									</TableCell>
									<TableCell className={classes.tablehead} align="right">
										Principal
									</TableCell>
									<TableCell className={classes.tablehead} align="right">
										Interest
									</TableCell>
									<TableCell className={classes.tablehead} align="right">
										Other
									</TableCell>
									<TableCell className={classes.tablehead} align="right">
										Total Amount
									</TableCell>
									<TableCell className={classes.tablehead} align="right">
										Balance
									</TableCell>
								</TableRow>
							</TableHead>
							{isLoading ? (
								<TableBody data-testid="loading_Recent_Payments">
									<TableRow>
										<TableCell colSpan="7" align="center">
											<CircularProgress />
										</TableCell>
									</TableRow>
								</TableBody>)
								:
								accountDetails?.data?.loanHistory?.length ? (
									<TableCellWrapper parseData={parData} />
								) : (
									<TableBody data-testid="error_Recent_Payments">
										<TableRow>
											<TableCell colSpan="7" align="center">
												You do not have any payments to display
											</TableCell>
										</TableRow>
									</TableBody>
								)}
						</Table>
					</TableContainer>
				</Grid>
			</Paper>
		</Grid>
	);
}
