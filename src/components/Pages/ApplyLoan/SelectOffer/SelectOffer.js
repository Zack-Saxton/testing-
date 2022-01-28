import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { ButtonWithIcon } from "../../../FormsUI";
import OfferTable from "./offersTable";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { NavLink, useHistory } from "react-router-dom";
import ScrollToTopOnMount from "../../ScrollToTop";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./SelectOffer.css";
import { fetchAvailableOffers, submitSelectedOfferAPI } from "../../../Controllers/ApplyForLoanController";
import CheckLoginStatus from "../../../App/CheckLoginStatus";
import messages from "../../../lib/Lang/applyForLoan.json"
import TabSection from "../TabSection"

//Initializing functional component Apply for loan
export default function ApplyLoan() {
	//Initializing state variables
	const [rowData, setRowData] = useState();
	const [value, setValue] = React.useState(0);
	const [accountDetails, setAccountDetails] = useState(null);
	const [offersToCompare, setOffersToCompare] = useState([]);
	const [offersToCompareChart, setOffersToCompareChart] = useState([]);
	const [terms, setTerms] = useState();
	const [offerFlag, setOfferFlag] = useState(true);
	const [loading, setLoading] = useState(false);
	const [noOffers, setNoOffers] = useState(false);
	const [checkedValue, setCheckedValue] = useState("");
	const [selectedTerm, setSelectedTerm] = useState("");
	const [selectedIndex, setSelectedIndex] = useState("");
	const history = useHistory();
	let term;

	//To change the value to currency formate
	const currencyFormat = (val) => {
		if (val) {
			var formated = parseFloat(val);
			var currency = "$";
			return (
				currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
			);
		}
	};

	// Submit the offer selected, It calls the API for select offer and redirecr to sign and review page
	const submitSelectedOffer = async (selTerm, selIndex) => {
		setLoading(true);
		if (accountDetails && selTerm !== "" && selIndex !== "") {
			let selectedOfferResponse = await submitSelectedOfferAPI(accountDetails?.data?.Offers[selTerm][selIndex]);
			if (selectedOfferResponse?.data?.status === "success") {
				setLoading(false);
				history.push({
					pathname: "/customers/reviewAndSign",
					selectedIndexOffer:
						selectedOfferResponse?.data?.data.selected_offer,
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
		loadingOn: {
			opacity: 0.55,
			pointerEvents: "none",
		},
		loadingOff: {
			opacity: 1,
			pointerEvents: "initial",
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
			fontSize: "1.563rem",
			paddingBottom: "10px",
		},
		tabLabel: {
			background: "white",
			margin: "0px 20px 10px 0px",
			color: "#3f51b5",
			fontFamily: "'Muli', sans-serif !important",
			fontSize: "0.938rem",
			textTransform: "none",
			fontWeight: "700",
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
		if (val?.data !== "Access token has expired" && val?.data) {
			setAccountDetails(val);
			term = Object.keys(val?.data?.Offers);
			setNoOffers(Object.keys(val?.data?.Offers).length === 0 ? true : false);
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
		const { children, tabPanelValue, index, ...other } = props;

		// Returns the JSX part depends on parameter value
		return (
			<div
				role="tabpanel"
				hidden={tabPanelValue !== index}
				id={`scrollable-auto-tab-panel-${ index }`}
				aria-labelledby={`scrollable-auto-tab-${ index }`}
				{...other}
			>
				{tabPanelValue === index && (
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
		tabPanelValue: PropTypes.any.isRequired,
	};


	function tabVerticalProps(verticalIndex) {
		return {
			id: `scrollable-auto-tab-vertical-${ verticalIndex }`,
			"aria-controls": `scrollable-auto-tab-panel-${ verticalIndex }`,
		};
	}

	// Create the data structured to populate the offes for user
	function createData(buildData) {
		let select = buildData.select,
			loanAmount = buildData.loanAmount,
			availability = buildData.availability,
			apr = buildData.apr,
			monthlyPayment = buildData.monthlyPayment,
			compare = buildData.compare,
			_id = buildData._id,
			termNum = buildData.termNum,
			tabIndex = buildData.tabIndex,
			checked = buildData.checked;
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
			checked,
		};
	}

	// Load the data depends of tab selected
	function tabOnChange(termNum, tabIndex) {
		setOffersToCompareChart([]);
		setOfferFlag(true);

		let rowsterm = [];
		accountDetails?.data?.Offers[termNum].map((item, index) => {
			return structureBuildData(item, termNum, tabIndex, rowsterm)
		});
		setRowData(rowsterm);
	}

	//On Compare offers tab is click
	function onCompareOfferTabClick() {
		setOfferFlag(false);
		setRowData(offersToCompare);
	}

	const structureBuildData = (item, termNum, tabIndex, rowsterm) => {
		let buildData = {
			select: "",
			loanAmount: currencyFormat(item.loan_amount),
			availability: item.offerType,
			apr: (item.apr * 100).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
			monthlyPayment: currencyFormat(item.monthly_payment),
			compare: "",
			_id: item._id,
			termNum: termNum,
			tabIndex: tabIndex,
			checked: "false",
		};
		let temp = createData(buildData);
		rowsterm.push(temp);
		return null;
		
	}

	// Call function to load the tab initially
	function initialTabLoad(termNum, tabIndex, accountDetailsData) {
		let rowsterm = [];
		accountDetailsData?.data?.Offers[termNum].map((item, index) => {
			
			return structureBuildData(item, termNum, tabIndex, rowsterm)
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
					paddingRight: "23px",
					paddingLeft: "23px",
				}}
			>
				<Grid
					container
					item
					xs={12}
					direction="row"
					style={{ width: "100%" }}
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
					<TabSection value={value} handleChange={handleChange} classes={classes} ay={0}/>

					<TabPanel tabPanelValue={value} index={0} style={{ marginTop: "10px" }}>
						<Grid container item xs={12}>
							{noOffers ? (
								<Grid item xs={12} style={{ width: "100%" }}>
									<Paper style={{ padding: "20px" }} className={classes.paper}>
										<Typography>
										{messages.selectAmount.noOffersAvailable}
										</Typography>
									</Paper>
								</Grid>
							) : (
								<>
									<Grid
										item
										xs={12}
										sm={3}
										style={{ width: "100%" }}
										className={loading ? classes.loadingOn : classes.loadingOff}
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
													{terms &&
														accountDetails.data.data !==
														"Access token has expired"
														? terms.map((item, index) => {
															return (
																<Tab
																	key={index}
																	label={
																		<span
																			style={{ float: "left", width: "100%", fontSize: "0.938rem", fontWeight: "700" }}
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

									<OfferTable
										classes={classes}
										value={value}
										offerFlag={offerFlag}
										rowData={rowData}
										loading={loading}
										noOfTerms={terms ? terms.length : 0}
										handleTabChange={handleTabChange}
										offersToCompare={offersToCompare}
										submitSelectedOffer={submitSelectedOffer}
										setOffersToCompare={setOffersToCompare}
										setOffersToCompareChart={setOffersToCompareChart}
										tabVerticalProps={tabVerticalProps}
										onCompareOfferTabClick={onCompareOfferTabClick}
										offersToCompareChart={offersToCompareChart}
										checkedValue={checkedValue}
										setCheckedValue={setCheckedValue}
										selectedTerm={selectedTerm}
										setSelectedTerm={setSelectedTerm}
										selectedIndex={selectedIndex}
										setSelectedIndex={setSelectedIndex}
									/>
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
