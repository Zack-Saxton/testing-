import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { offerTypeData } from "../../../../assets/data/constants";
import CheckLoginStatus from "../../../App/CheckLoginStatus";
import usrAccountDetails from "../../../Controllers/AccountOverviewController";
import { fetchAvailableOffers, submitSelectedOfferAPI } from "../../../Controllers/ApplyForLoanController";
import { ButtonWithIcon } from "../../../FormsUI";
import messages from "../../../lib/Lang/applyForLoan.json";
import ScrollToTopOnMount from "../../ScrollToTop";
import { useStylesApplyForLoan } from "../Style";
import TabPanel from "../TabPanel";
import TabSection from "../TabSection";
import OfferTable from "./offersTable";
import "./SelectOffer.css";

//Initializing functional component Apply for loan
export default function ApplyLoan() {
	//Initializing state variables
	const [ rowData, setRowData ] = useState();
	const [ value, setValue ] = useState(0);
	const [ accountDetails, setAccountDetails ] = useState(null);
	const [ offersToCompare, setOffersToCompare ] = useState([]);
	const [ offersToCompareChart, setOffersToCompareChart ] = useState([]);
	const [ terms, setTerms ] = useState();
	const [ offerFlag, setOfferFlag ] = useState(true);
	const [ loading, setLoading ] = useState(false);
	const [ noOffers, setNoOffers ] = useState(false);
	const [ checkedValue, setCheckedValue ] = useState("");
	const [ selectedTerm, setSelectedTerm ] = useState("");
	const [ selectedIndex, setSelectedIndex ] = useState("");
	const navigate = useNavigate();
	let term;

	const { data: val } = useQuery('available-offers', fetchAvailableOffers);
	const { refetch } = useQuery('loan-data', usrAccountDetails);

	//To change the value to currency formate
	const currencyFormat = (currencyValue) => {
		if (currencyValue) {
			let formatedCurrencyValue = parseFloat(currencyValue);
			let currency = "$";
			return (
				currency + formatedCurrencyValue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
			);
		}
	};

	// Submit the offer selected, It calls the API for select offer and redirecr to sign and review page
	const submitSelectedOffer = async (selTerm, selIndex) => {
		setLoading(true);
		if (accountDetails && selTerm && selIndex >= 0) {
			let selectedOfferResponse = await submitSelectedOfferAPI(accountDetails?.data?.Offers[ selTerm ][ selIndex ]);
			if (selectedOfferResponse?.data?.selected_offer) {
				setLoading(false);
				refetch();
				navigate(offerTypeData[ accountDetails?.data?.Offers[ selTerm ][ selIndex ]?.offerType ], { selectedIndexOffer: selectedOfferResponse?.data?.selected_offer, });
			} else {
				setLoading(false);
				toast.error(messages.unHandledError)
			}
		}
	};

	const classes = useStylesApplyForLoan();

	// To fetch the available offers for the logged in user
	function getAvailableOffers() {
		if (val?.data !== "Access token has expired" && val?.data?.Offers) {
			setAccountDetails(val);
			term = Object.keys(val?.data?.Offers);
			setNoOffers(!(Object.keys(val?.data?.Offers).length) ? true : false);
			setTerms(term);
			if (term[ 0 ]) {
				initialTabLoad(term[ 0 ], 0, val);
			}
		}
	}

	// to call the fetch offers api on page load
	useEffect(() => {
		getAvailableOffers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ val ]);

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
		accountDetails?.data?.Offers[ termNum ].map((item, index) => {
			return structureBuildData(item, termNum, tabIndex, rowsterm);
		});
		setRowData(rowsterm);
	}

	//On Compare offers tab is click
	function onCompareOfferTabClick() {
		setOfferFlag(false);
		setRowData(offersToCompare);
		setOffersToCompareChart([ ...offersToCompareChart, offersToCompare[ 0 ], offersToCompare[ 1 ] ]);
	}

	const structureBuildData = (item, termNum, tabIndex, rowsterm) => {
		let buildData = {
			select: "",
			loanAmount: currencyFormat(item.loan_amount),
			availability: item.offerType,
			apr: (item.apr * 100).toString().match(/^-?\d+(?:\.\d{0,2})?/)[ 0 ],
			monthlyPayment: currencyFormat(item.monthly_payment),
			compare: "",
			_id: item._id,
			termNum: termNum,
			tabIndex: tabIndex,
			checked: "false",
		};
		let formatedBuildData = createData(buildData);
		rowsterm.push(formatedBuildData);
		return null;

	};

	// Call function to load the tab initially
	function initialTabLoad(termNum, tabIndex, accountDetailsData) {
		let rowsterm = [];
		accountDetailsData?.data?.Offers[ termNum ].map((item, index) => {

			return structureBuildData(item, termNum, tabIndex, rowsterm);
		});
		setRowData(rowsterm);
	}

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const [ values, setValues ] = useState(0);
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
				className={classes.centerGrid}
			>
				<Grid
					container
					item
					xs={12}
					direction="row"
					className={classes.fullWidth}
				>
					<Typography className={classes.heading} variant="h3">
						<NavLink
							className={classes.noDecoration}
							to="/customers/accountOverview"
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
					<TabSection value={value} handleChange={handleChange} classes={classes} ay={0} />

					<TabPanel value={value} index={0} className={classes.tabPanelWrap}>
						<Grid container item xs={12}>
							{noOffers ? (
								<Grid item xs={12} className={classes.fullWidth}>
									<Paper className={`${ classes.noOffersWrap } ${ classes.paper }`} >
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
										className={`${ loading ? classes.loadingOnWithoutBlur : classes.loadingOff } ${ classes.fullWidth }`}
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
																			className={classes.monthTerm}
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
															<span className={classes.comparisonChartLabel}>
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
													className={classes.gridInner}
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
							className={classes.bottomTextWrap}
						>
							<Typography
								className={classes.bottomText}
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
								className={classes.bottomText}
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
								className={classes.bottomText}
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
