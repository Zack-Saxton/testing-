import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { ButtonPrimary, ButtonSecondary, ButtonWithIcon, Checkbox, Radio } from "../../../FormsUI";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { NavLink, useHistory } from "react-router-dom";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import ScrollToTopOnMount from "../../ScrollToTop";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./SelectOffer.css";
import { fetchAvailableOffers, submitSelectedOfferAPI } from "../../../Controllers/ApplyForLoanController";
import { errorMessage } from "../../../../helpers/ErrorMessage";
import CheckLoginStatus from "../../../App/CheckLoginStatus";

//Initializing functional component Apply for loan
export default function ApplyLoan() {

	//Initializing state variables
	const [rowData, setRowData] = useState();
	const [checkedValue, setCheckedValue] = useState("");
	const [selectedTerm, setSelectedTerm] = useState("");
	const [selectedIndex, setSelectedIndex] = useState("");
	const [value, setValue] = React.useState(0);
	const [accountDetails, setAccountDetails] = useState(null);
	const [offersToCompare, setOffersToCompare] = useState([]);
	const [terms, setTerms] = useState();
	const [offerFlag, setOfferFlag] = useState(true);
	const [loading, setLoading] = useState(false);
	const [noOffers, setNoOffers] = useState(false);
	let offersComp = offersToCompare ? offersToCompare : [];

	const history = useHistory();
	let term;

	//To change the value to currency formate
	const currencyFormat = (val) => {
		if (val) {
			var formated = parseFloat(val);
			var currency = "$";
			var forCur = currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			return forCur;
		}
	};

	// Submit the offer selected, It calls the API for select offer and redirecr to sign and review page
	const submitSelectedOffer = async (selTerm, selIndex) => {
		setLoading(true);
		if (accountDetails && selTerm !== "" && selIndex !== "") {
			let selectedOfferResponse = await submitSelectedOfferAPI(
				accountDetails.data.data.Offers[selTerm][selIndex]
			);

			if (selectedOfferResponse.data.data.status === "success") {
				setLoading(false);
				history.push({
					pathname: "/customers/reviewAndSign",
					selectedIndexOffer:
						selectedOfferResponse.data.data.data.selected_offer,
				});
			} else {
				setLoading(false);
				alert("Network Error");
			}
		}
	};

	// Styling part
	const useStyles = makeStyles((theme) => ({
		paper: {
			padding: theme.spacing(2),
			display: "flex",
			flexDirection: "column",
			color: theme.palette.text.secondary,
		},
		paperVerticalTab: {
			paddingTop: "20px",
			paddingBottom: "20px",
			display: "flex",
			flexDirection: "column",
			color: theme.palette.text.secondary,
		},
		heading: {
			color: "#fff",
			fontWeight: "400",
			fontSize: "1.64rem",
			paddingLeft: "7px",
			paddingBottom: "25px",
		},
		tabLabel: {
			background: "white",
			margin: "10px",
			color: "#3f51b5",
			fontFamily: "'Muli', sans-serif !important",
			fontSize: "1rem",
			textTransform: "none",
			fontWeight: "600",
		},
		tabVerticalLabel: {
			color: "#3f51b5",
			textTransform: "none",
			fontWeight: "600",
			fontFamily: "'Muli', sans-serif !important",
			fontSize: "1rem",
			textAlign: "start",
		},

		table: {
			minWidth: 650,
		},
		tableHead: {
			color: "#171717!important",
			fontWeight: "600",
			fontSize: "1rem",
		},
		tableHeadRow: {
			color: "#171717!important",
			fontSize: "15px",
		},
		indicator: {
			left: "0px",
			background: "unset",
		},
	}));

	const classes = useStyles();

	// To fetch the available offers for the logged in user
	async function getAvailableOffers() {
		let val = await fetchAvailableOffers();
		if (val?.data?.data !== "Access token has expired" && val?.data) {
			setAccountDetails(val);
			term = Object.keys(val?.data?.data?.Offers);
			setNoOffers(
				Object.keys(val?.data?.data?.Offers).length === 0 ? true : false
			);

			setTerms(term);
			if (term[0] !== undefined) {
				initialTabLoad(term[0], 0, val);
			}
		}
	}

	// to call the fetch offers api on page load
	useEffect(() => {
		getAvailableOffers();
	}, []);

	//Initializing the tab implementation
	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		// Returns the JSX part depends on parameter value
		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`scrollable-auto-tab-panel-${ index }`}
				aria-labelledby={`scrollable-auto-tab-${ index }`}
				{...other}
			>
				{value === index && (
					<Box>
						<div>{children}</div>
					</Box>
				)}
			</div>
		);
	}

	TabPanel.propTypes = {
		children: PropTypes.node,
		index: PropTypes.any.isRequired,
		value: PropTypes.any.isRequired,
	};

	function a11yProps(index) {
		return {
			id: `scrollable-auto-tab-${ index }`,
			"aria-controls": `scrollable-auto-tab-panel-${ index }`,
		};
	}

	// Select the offers to compare : will push the selected offer value into array
	const selectOfferToCompare = (row) => {
		if (offersComp.indexOf(row) === -1) {
			offersComp.push(row);
		} else {
			offersComp.indexOf(row) === -1
				? offersComp.push(row)
				: offersComp.splice(offersComp.indexOf(row), 1);
		}

		setOffersToCompare(offersComp);
	};

	function TabVerticalPanel(props) {
		const { children, value, verticalIndex, ...other } = props;

		return (
			<div
				hidden={value !== verticalIndex}
				id={`scrollable-auto-tab-panel-${ verticalIndex }`}
				aria-labelledby={`scrollable-auto-tab-${ verticalIndex }`}
				{...other}
			>
				{value === verticalIndex && (
					<Box>
						<div>{children}</div>
					</Box>
				)}
			</div>
		);
	}

	TabVerticalPanel.propTypes = {
		children: PropTypes.node,
		verticalIndex: PropTypes.any.isRequired,
		value: PropTypes.any.isRequired,
	};

	function tabVerticalProps(verticalIndex) {
		return {
			id: `scrollable-auto-tab-vertical-${ verticalIndex }`,
			"aria-controls": `scrollable-auto-tab-panel-${ verticalIndex }`,
		};
	}

	// Create the data structured to populate the offes for user
	function createData(
		select,
		loanAmount,
		availability,
		apr,
		monthlyPayment,
		compare,
		_id,
		termNum,
		tabIndex
	) {
		return {
			select,
			loanAmount,
			availability,
			apr,
			monthlyPayment,
			compare,
			_id,
			termNum,
			tabIndex,
		};
	}

	// Shows the Brnach icon
	const branch = (
		<Grid container direction="row" alignItems="center">
			<AccountBalanceIcon /> In branch
		</Grid>
	);

	//Shows the Online icon
	const online = (
		<Grid container direction="row" alignItems="center">
			<DesktopMacIcon /> Online
		</Grid>
	);

	// Load the data depends of tab selected
	function tabOnChange(termNum, tabIndex) {
		setOfferFlag(true);

		let rowsterm = [];
		accountDetails.data.data.Offers[termNum].map((item, index) => {
			let temp = createData(
				"",
				currencyFormat(item.loan_amount).slice(0, -3),
				item.offerType,
				item.apr.toFixed(2),
				currencyFormat(item.monthly_payment),
				"",
				item._id,
				termNum,
				tabIndex
			);
			rowsterm.push(temp);
			return null;
		});
		setRowData(rowsterm);
	}

	//On Compare offers tab is click
	function onCompareOfferTabClick() {
		setOfferFlag(false);
		setRowData(offersToCompare);
	}

	// Call function to load the tab initially
	function initialTabLoad(termNum, tabIndex, accountDetailsData) {
		let rowsterm = [];
		accountDetailsData.data.data.Offers[termNum].map((item, index) => {
			let temp = createData(
				"",
				currencyFormat(item.loan_amount).slice(0, -3),
				item.offerType,
				item.apr.toFixed(2),
				currencyFormat(item.monthly_payment),
				"",
				item._id,
				termNum,
				tabIndex
			);
			rowsterm.push(temp);
			return null;
		});
		setRowData(rowsterm);
	}

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const [values, setValues] = React.useState(0);
	const handleTabChange = (event, newValues) => {
		setValues(newValues);
	};

	//JSX part
	return (
		<div>
			<ScrollToTopOnMount />
			<CheckLoginStatus />
			<Grid
				container
				justifyContent={"center"}
				style={{
					marginTop: "-150px",
					paddingRight: "30px",
					paddingLeft: "30px",
				}}
			>
				<Grid
					container
					item
					xs={12}
					direction="row"
					style={{ marginBottom: "-20px", width: "100%" }}
				>
					<Typography className={classes.heading} variant="h3">
						<NavLink
							to="/customers/accountOverview"
							style={{ textDecoration: "none" }}
						>
							<ButtonWithIcon
								icon="arrow_backwardIcon"
								iconposition="left"
								stylebutton='{"background": "#fff", "color":"#214476",
                        "minWidth": "0px",
                        "width": "36px",
                        "padding": "0px",
                        "marginRight": "5px",
                      "marginTop":"unset" }'
								styleicon='{ "color":"" }'
							/>
						</NavLink>{" "}
						Apply for a Loan
					</Typography>
				</Grid>

				{/* Tab section */}

				<Grid item xs={12}>
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						style={{ paddingTop: "10px" }}
						aria-label="scrollable auto tabs example"
					>
						<Tab
							label="1. Select Offer"
							className={classes.tabLabel}
							{...a11yProps(0)}
						/>
						<Tab
							label="2. Review & Sign"
							disabled={true}
							className={classes.tabLabel}
						/>
						<Tab
							label="3. Final Verification"
							disabled={true}
							className={classes.tabLabel}
						/>
						<Tab
							label="4. Receive your money"
							disabled={true}
							className={classes.tabLabel}
						/>
					</Tabs>

					<TabPanel value={value} index={0}>
						<Grid container item xs={12}>
							{noOffers ? (
								<Grid item xs={12} style={{ padding: "5px", width: "100%" }}>
									<Paper style={{ padding: "20px" }} className={classes.paper}>
										<Typography>
											{errorMessage.applyForLoan.selectAmount.noOffersAvailable}
										</Typography>
									</Paper>
								</Grid>
							) : (
								<>
									<Grid
										item
										xs={12}
										sm={3}
										style={{ padding: "5px", width: "100%" }}
									>
										<Paper className={classes.paperVerticalTab}>
											{terms ? (
												<Tabs
													value={values}
													onChange={handleTabChange}
													classes={{
														indicator: classes.indicator,
													}}
													textColor="primary"
													scrollButtons="auto"
													orientation="vertical"
													variant="scrollable"
													style={{ paddingTop: "5px" }}
													aria-label="scrollable auto tabs example"
													className={classes.tabsvertical}
												>
													{/* {terms ? null : <CircularProgress /> } */}
													{terms &&
														accountDetails.data.data !==
														"Access token has expired"
														? terms.map((item, index) => {
															return (
																<Tab
																	key={index}
																	label={
																		<span
																			style={{ float: "left", width: "100%" }}
																		>
																			{item + " Month Term"}
																		</span>
																	}
																	className={classes.tabVerticalLabel}
																	onClick={() => tabOnChange(item, index)}
																	{...tabVerticalProps(index)}
																/>
															);
														})
														: "null"}
													<Tab
														label={
															<span style={{ float: "left", width: "100%" }}>
																{" "}
																Comparison Chart
															</span>
														}
														className={classes.tabVerticalLabel}
														onClick={() => onCompareOfferTabClick()}
														{...tabVerticalProps(4)}
													/>
												</Tabs>
											) : (
												<Grid
													className="circleprog"
													style={{ width: "100%", textAlign: "center" }}
												>
													<CircularProgress />
												</Grid>
											)}
										</Paper>
									</Grid>
									<Grid
										item
										xs={12}
										sm={9}
										style={{ padding: "5px", width: "100%" }}
									>
										<Paper className={classes.paper}>
											{rowData ? (
												<TabVerticalPanel value={value} verticalIndex={value}>
													<Grid
														item
														xs={12}
														style={{ paddingBottom: "10px", width: "100%" }}
													>
														<TableContainer>
															<Table
																className={classes.table}
																aria-label="simple table"
															>
																<TableHead>
																	<TableRow>
																		<TableCell className={classes.tableHead}>
																			Select
																		</TableCell>
																		<TableCell
																			className={classes.tableHead}
																			align="right"
																		>
																			Loan Amount
																		</TableCell>
																		<TableCell
																			className={classes.tableHead}
																			align="left"
																		>
																			Availability
																		</TableCell>
																		<TableCell
																			className={classes.tableHead}
																			align="left"
																		>
																			<Grid
																				container
																				direction="row"
																				alignItems="center"
																			>
																				{" "}
																				APR &nbsp;
																				<Tooltip
																					title="APR"
																					placement="top-start"
																					enterTouchDelay={200}
																				>
																					<InfoOutlinedIcon
																						style={{
																							fontSize: "small",
																							color: "blue",
																						}}
																					/>
																				</Tooltip>
																			</Grid>
																		</TableCell>
																		<TableCell
																			className={classes.tableHead}
																			align="right"
																		>
																			Monthly Payment
																		</TableCell>
																		<TableCell
																			className={classes.tableHead}
																			align="left"
																		>
																			{offerFlag === true ? "Compare" : "Term"}
																		</TableCell>
																	</TableRow>
																</TableHead>

																{rowData ? (
																	<TableBody>
																		{rowData.map((row, ind) => (
																			<TableRow key={ind}>
																				<TableCell
																					component="th"
																					className={classes.tableHeadRow}
																					scope="row"
																				>
																					<Radio
																						name="select"
																						radiolabel={
																							'[{ "value":"' + row._id + '"}]'
																						}
																						checked={checkedValue}
																						value={row._id}
																						onClick={() => {
																							setCheckedValue(row._id);
																							setSelectedIndex(ind);
																							setSelectedTerm(row.termNum);
																						}}
																					/>
																				</TableCell>
																				<TableCell
																					className={classes.tableHeadRow}
																					align="right"
																				>
																					{row.loanAmount}
																				</TableCell>
																				<TableCell
																					className={classes.tableHeadRow}
																					align="left"
																				>
																					{row.availability === "online"
																						? online
																						: branch}
																				</TableCell>
																				<TableCell
																					className={classes.tableHeadRow}
																					align="left"
																				>
																					{row.apr + " %"}
																				</TableCell>
																				<TableCell
																					className={classes.tableHeadRow}
																					align="right"
																				>
																					{row.monthlyPayment}
																				</TableCell>
																				<TableCell
																					className={classes.tableHeadRow}
																					align="left"
																				>
																					{offerFlag === true ? (
																						<Checkbox
																							name="rememberme"
																							label="Add"
																							labelid="remember-me"
																							testid="checkbox"
																							onClick={() => {
																								selectOfferToCompare(row);
																							}}
																							stylelabelform='{ "color":"" }'
																							stylecheckbox='{ "color":"" }'
																							stylecheckboxlabel='{ "color":"" }'
																						/>
																					) : (
																						row.termNum
																					)}
																				</TableCell>
																			</TableRow>
																		))}
																	</TableBody>
																) : (
																	<Typography>No Offers Available </Typography>
																)}
															</Table>
														</TableContainer>
													</Grid>
													<Grid container direction="row">
														<Grid
															className="circleprog"
															style={{
																display: loading ? "block" : "none",
																width: "100%",
																textAlign: "center",
															}}
														>
															<CircularProgress />
														</Grid>
													</Grid>
													<Grid container direction="row">
														<Grid
															container
															item
															xs={1}
															sm={1}
															direction="row"
															style={{ paddingTop: "10px", float: "left" }}
														>
															<ButtonSecondary
																stylebutton='{"marginRight": "" }'
																styleicon='{ "color":"" }'
																id="apply-loan-reset-button"
																onClick={() => {
																	setCheckedValue("");
																	setSelectedTerm("");
																	setSelectedIndex("");
																}}
															>
																Reset
															</ButtonSecondary>
														</Grid>

														<Grid
															container
															item
															xs={10}
															sm={3}
															direction="row"
															style={{ padding: "10px", float: "left" }}
															id="apply-loan-continue-button-grid"
														>
															<ButtonPrimary
																stylebutton='{"marginLeft": "10px" ,"fontSize":"1rem"}'
																id="apply-loan-continue-button"
																onClick={() => {
																	submitSelectedOffer(
																		selectedTerm,
																		selectedIndex
																	);
																}}
																disabled={
																	selectedTerm && selectedIndex
																		? loading
																			? true
																			: false
																		: true
																}
															>
																Continue
																<i
																	className="fa fa-refresh fa-spin customSpinner"
																	style={{
																		marginRight: "10px",
																		display: loading ? "block" : "none",
																	}}
																/>
															</ButtonPrimary>
														</Grid>

														<Grid
															container
															item
															xs={8}
															sm={8}
															direction="row"
															style={{
																padding: "10px",
																width: "100%",
																float: "right",
																justifyContent: "end",
															}}
															id="apply-loan-comparison-button-grid"
														>
															<ButtonSecondary
																fullWidth={true}
																stylebutton='{"background": "", "float":"right"  }'
																styleicon='{ "color":"" }'
																id="apply-loan-comparison-button"
																onClick={() => onCompareOfferTabClick()}
																{...tabVerticalProps(4)}
															>
																View Comparison
															</ButtonSecondary>
														</Grid>
													</Grid>
												</TabVerticalPanel>
											) : (
												<Grid
													className="circleprog"
													style={{ width: "100%", textAlign: "center" }}
												>
													<CircularProgress />
												</Grid>
											)}
										</Paper>
									</Grid>
								</>
							)}
						</Grid>

						<Grid
							item
							style={{
								width: "100%",
								paddingTop: "25px",
								paddingBottom: "70px",
							}}
						>
							<Typography
								style={{
									textAlign: "justify",
									fontSize: ".8rem",
									color: "#6b6f82",
									lineHeight: "20px",
									paddingBottom: "20px",
								}}
							>
								*Loan funding subject to normal lending requirements, including,
								but not limited to, verification of applicant identity,
								submission of any required supporting documentation, and review
								of credit information. You must not have opened a loan account
								with Mariner Finance, LLC or one of its affiliates in the last
								60 days. Loan proceeds may not be used for business or
								commercial purposes, to finance direct post secondary education
								expenses, for the purchase of securities, for gambling, or for
								any illegal purpose.
							</Typography>
							<Typography
								style={{
									textAlign: "justify",
									fontSize: ".8rem",
									color: "#6b6f82",
									lineHeight: "20px",
									paddingBottom: "20px",
								}}
							>
								†The stated APR represents the cost of credit as a yearly rate
								and will be determined based upon the applicant’s credit at the
								time of application, subject to state law limits and individual
								underwriting. APR’s are generally higher on loans not secured by
								a vehicle, and the lowest rates typically apply to the most
								creditworthy borrowers. All terms and conditions of a loan
								offer, including the APR, will be disclosed during the
								application process.
							</Typography>
							<Typography
								style={{
									textAlign: "justify",
									fontSize: ".8rem",
									color: "#6b6f82",
									lineHeight: "20px",
									paddingBottom: "20px",
								}}
							>
								*The process uses a “soft” credit inquiry to determine whether a
								loan offer is available, which does not impact your credit
								score. If you continue with the application process online and
								accept a loan offer, or are referred to a branch and continue
								your application there, we will pull your credit report and
								credit score again using a “hard” credit inquiry. This “hard”
								credit inquiry may impact your credit score.
							</Typography>
						</Grid>
					</TabPanel>
				</Grid>
			</Grid>
		</div>
	);
}
