import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { homeData } from "../../../../assets/data/constants";
import globalMessages from "../../../../assets/data/globalMessages.json";
import CitizenshipStatusLogo from "../../../../assets/icon/I-Own-Rent-Property.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary, TextField } from "../../../FormsUI";
import "../CheckMyOffer.css";
import "../LivingPlace/LivingPlace.css";
import ScrollToTopOnMount from "../ScrollToTop";

const useStyles = makeStyles(() => ({
	boxGrid: {
		padding: "4% 0px 4% 0px"
	},
	paperStyle: {
		justify: "center",
		alignItems: "center",
		textAlign: "center"
	},
	typoStyle: {
		align: "center",
		justify: "center",
		alignItems: "center",
		fontSize: "1.538rem",
		margin: "10px 0px !important",
		color: "#171717",
		fontWeight: "400 !important",
		lineHeight: "110% !important"
	},
})
);
//Living place component initialization
function LivingPlace() {
	const { data, setData } = useContext(CheckMyOffers);
	const classes = preLoginStyle();
	const innerClasses = useStyles();

	const [ error, setError ] = useState();
	const [ helperText, setHelperText ] = useState();
	const [ livingPlace, setLivingPlace ] = useState(data.homeOwnership ?? "");
	const navigate = useNavigate();
	const currencyFormat = (currencyValue) => {
		if (currencyValue) {
			let formated = parseFloat(currencyValue);
			return (`$${ formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").slice(0, -3) }`);
		}
	};

	useEffect(() => {
		if (data?.completedPage < data?.page?.annualIncome || data?.formStatus?.toLowerCase() === "completed") {
			navigate("/select-amount");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	//set data state on continue
	const setDataState = (val) => {
		if (data.state === "NC") {
			data.completedPage = data.page.livingPlace;
			setData({ ...data, rentMortgageAmount: 0, homeOwnership: val });
			navigate("/active-duty");
		} else if (data.state === "WI") {
			data.completedPage = data.page.livingPlace;
			navigate("/marital-status");
		} else {
			data.completedPage = data.page.activeDuty;
			navigate("/oneLastStep");
		}
	};

	const validateUserInput = () => {
		setError(false);
		setHelperText("");
		data.homeOwnership = livingPlace;
		if (data.state === "NC") {
			data.completedPage = data.page.livingPlace;
			navigate("/active-duty");
		} else if (data.state === "WI") {
			data.completedPage = data.page.livingPlace;
			navigate("/marital-status");
		} else {
			data.completedPage = data.page.activeDuty;
			navigate("/oneLastStep");
		}
	};

	//validating user input and proceeds
	const handleRoute = () => {
		if (livingPlace === homeData.renting || livingPlace === homeData.withMortage || livingPlace === homeData.mobile || livingPlace === homeData.withRelative  ) {
			if (data.rentMortgageAmount !== "" && data.rentMortgageAmount !== 0 && data.rentMortgageAmount >= 100) {
				validateUserInput();
			} else {
				setError(true);
				setHelperText(globalMessages.Rent_Mortgage_Valid);
			}
		} else {
			validateUserInput();
		}
	};

	//Mortgage Rent onblur
	const onBlurPayment = (event) => {
		let inputValue = event.target.value.trim().replace("$", "");
		let amountDetails = inputValue.split(".");
		let afterDecimal = amountDetails[ 1 ];
		if (!afterDecimal) {
			inputValue = event.target.value.replace(/[.$,]/g, '');
			setData({
				...data,
				rentMortgageAmount: parseInt(
					inputValue ? inputValue : "0"
				),
			});
		}
	};

	const onHandleChange = (event) => {
		const reg = /^[0-9\b]+$/;
		let inputValue = event.target.value.trim().replace(/[$,]/g, "")
		if (!inputValue || reg.test(inputValue)) {
			inputValue =
				inputValue.indexOf(".") >= 0
					? inputValue.substr(0, inputValue.indexOf(".")) +
					inputValue.substr(inputValue.indexOf("."), 3)
					: inputValue;
			setData({
				...data,
				rentMortgageAmount: parseInt(inputValue),
			});
		}
		if (inputValue && inputValue >= 100) {
			setError(false);
			setHelperText("");
		} else if (!event.target.value.trim()) {
			setError(true);
			setHelperText(globalMessages?.Rent_Mortgage_Zero);
		} else {
			setError(true);
			setHelperText(globalMessages?.Rent_Mortgage_Min);
		}
	};

	//View part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className={classes.mainDiv}>
				<Box>
					<Grid
						container
						item
						xs={12}
						justifyContent="center"
						alignItems="center"
						className={innerClasses.boxGrid}
					>
						<Grid
							// containe
							item
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6}
						>
							<Paper
								id="ownOrRentWrap"
								className={innerClasses.paperStyle}
							>
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det75 determinate slantDiv"
									/>
									<span className="floatLeft detNum75">75%</span>
								</div>
								<Grid className="floatLeft">
									<Link className="arrowBack" to="/annual-income" data-testid="routeBackwardLivingPlace">
										<i className="material-icons dp48 yellowText floatingButton">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid>
									<img
										src={CitizenshipStatusLogo}
										alt="citizenship logo"
										className="spinAnimation"
									/>
								</Grid>

								<Typography
									variant="h5"
									className={innerClasses.typoStyle}
								>
									Do you own or rent?
								</Typography>
								<Grid
									item
									md={12}
									className="blockDiv"
									container
									justifyContent="center"
									alignItems="center"
								>
									<Grid
										container
										justifyContent="center"
										alignItems="center"
										item
										lg={8}
										md={8}
										xs={12}
									>
										<Paper
											id="ownOrRentBoxOne"
											elevation={3}
											data-testid={homeData.renting}
											className={
												livingPlace === homeData.renting
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setLivingPlace(homeData.renting);
											}}
										>
											Renting
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											id="ownOrRentBoxTwo"
											elevation={3}
											data-testid="HomeWithMortgage"
											className={
												livingPlace === homeData.withMortage
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setLivingPlace(homeData.withMortage);
											}}
										>
											Own a home with mortgage
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											id="ownOrRentBoxThree"
											elevation={3}
											data-testid="HomeWithNoMortgage"
											className={
												livingPlace === homeData.noMortage
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setLivingPlace(homeData.noMortage);
												data.rentMortgageAmount = 0;
												data.homeOwnership = homeData.noMortage;
												if (data.completedPage < data.page.livingPlace) {
													setDataState(homeData.noMortage);
												}
											}}
										>
											Own a home with no mortgage
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											id="ownOrRentBoxFour"
											elevation={3}
											data-testid="MobileHome"
											className={
												livingPlace === homeData.mobile
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setLivingPlace(homeData.mobile);
											}}
										>
											Own a mobile home
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											id="ownOrRentBoxFive"
											elevation={3}
											data-testid="LivingWithRelatives"
											className={
												livingPlace === homeData.withRelative
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setLivingPlace(homeData.withRelative);
											}}
										>
											Living with relatives
										</Paper>
									</Grid>

									<Grid item lg={8} md={8} xs={12}>
										<TextField
											data-testid="rentOrMortgage"
											id="rentOrMortage"
											className={
												livingPlace === homeData.renting ||
													livingPlace === homeData.withMortage || livingPlace === homeData.mobile || livingPlace === homeData.withRelative
													? "showMsg"
													: "hideMsg"
											}
											name="RentOrMortgageAmount"
											label="Monthly Rent / Mortgage Amount *"
											error={error}
											helperText={helperText}
											value={(data?.rentMortgageAmount ? currencyFormat(data.rentMortgageAmount) : "")}
											onBlur={onBlurPayment}
											onChange={onHandleChange}
											materialProps={{
												"data-test-id": "rentMortgageAmount",
												maxLength: "7",
											}}
										/>
									</Grid>

									<Grid item lg={8} md={8} xs={12} className="alignButton ContinueButton">
										<ButtonPrimary
											onClick={handleRoute}
											data-testid="cntButton"
											disabled={!livingPlace}
											stylebutton='{"background": "#FFBC23", "black": "white","fontSize":"0.938rem", "padding": "0px 30px"}'
										>
											Continue
										</ButtonPrimary>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</div>
		</div>
	);
}

export default LivingPlace;
