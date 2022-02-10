import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CitizenshipStatusLogo from "../../../../assets/icon/I-Own-Rent-Property.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary, TextField } from "../../../FormsUI";
import { homeData } from "../../../../assets/data/constants"
import "../CheckMyOffer.css";
import "../LivingPlace/LivingPlace.css";
import ScrollToTopOnMount from "../ScrollToTop";

//Living place component initialization
function LivingPlace() {
	const { data, setData } = useContext(CheckMyOffers);
	const [ error, setError ] = useState();
	const [ helperText, setHelperText ] = useState();
	let [ livingPlace, setLivingPlace ] = useState(data.homeOwnership ?? "");
	const navigate = useNavigate();
	//set data state on continue
	const setDataState = (val) => {
		if (data.state === "NC") {
			data.completedPage = data.page.livingPlace;
			setData({ ...data, rentMortgageAmount: 0, homeOwnership: val });
			livingPlace = val;
			navigate("/active-duty");
		} else if (data.state === "WI") {
			data.completedPage = data.page.livingPlace;
			navigate("/marital-status");
		} else {
			data.completedPage = data.page.activeDuty;
			navigate("/ssn");
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
			navigate("/ssn");
		}
	}

	//validating user input and proceeds
	const handleRoute = () => {
		if (livingPlace === homeData.renting || livingPlace === homeData.withMortage) {
			if (data.rentMortgageAmount !== "" && data.rentMortgageAmount !== 0 && data.rentMortgageAmount >= 100) {
				validateUserInput();
			} else {
				setError(true);
				setHelperText("Enter valid rent/Mortgage amount");
			}
		} else {
			validateUserInput();
		}
	};

	const onHandleChange = (event) => {
		const reg = /^[0-9\b]+$/;
		let acc = event.target.value;
		if (acc === "" || reg.test(acc)) {
			setData({
				...data,
				rentMortgageAmount: parseInt(
					event.target.value ? event.target.value : "0"
				),
			});
		}
		if (event.target.value !== '' && event.target.value >= 100) {
			setError(false);
			setHelperText("");
		} else if (event.target.value === "") {
			setError(true);
			setHelperText("Rent/Mortgage amount should not be zero");
		} else {
			setError(true);
			setHelperText("Amount should be minimum $100");
		}
	};

	//redirect to select amount on direct call
	if (data.completedPage < data.page.annualIncome || data.formStatus === "completed") {
		navigate("/select-amount");
	}

	//View part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid
						container
						item
						xs={ 12 }
						justifyContent="center"
						alignItems="center"
						style={ { padding: "4% 0%" } }
					>
						<Grid
							// containe
							item
							xs={ 11 }
							sm={ 10 }
							md={ 6 }
							lg={ 6 }
							xl={ 6 }
						>
							<Paper
								id="ownOrRentWrap"
								className="cardWOPadding"
								style={ { justify: "center", alignItems: "center" } }
							>
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det75 determinate slantDiv"
									/>
									<span className="floatLeft detNum75">75%</span>
								</div>
								<Grid className="floatLeft">
									<Link className="arrowBack" to="/annual-income">
										<i className="material-icons dp48 yellowText floatingButton">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid>
									<img
										src={ CitizenshipStatusLogo }
										alt="citizenship logo"
										className="spinAnimation"
									/>
								</Grid>

								<Typography
									variant="h5"
									style={ {
										align: "center",
										justify: "center",
										alignItems: "center",
									} }
									className="borrowCSSLP checkMyOfferText"
								>
									Do you own or rent?
								</Typography>
								<Grid
									item
									md={ 12 }
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
										lg={ 8 }
										md={ 8 }
										xs={ 12 }
									>
										<Paper
											id="ownOrRentBoxOne"
											elevation={ 3 }
											data-testid={homeData.renting}
											className={
												livingPlace === homeData.renting
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={ () => {
												setLivingPlace(homeData.renting);
											} }
										>
											Renting
										</Paper>
									</Grid>
									<Grid item lg={ 8 } md={ 8 } xs={ 12 }>
										<Paper
											id="ownOrRentBoxTwo"
											elevation={ 3 }
											data-testid="HomeWithMortgage"
											className={
												livingPlace === homeData.withMortage
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={ () => {
												setLivingPlace(homeData.withMortage);
											} }
										>
											Own a home with mortgage
										</Paper>
									</Grid>
									<Grid item lg={ 8 } md={ 8 } xs={ 12 }>
										<Paper
											id="ownOrRentBoxThree"
											elevation={ 3 }
											data-testid="HomeWithNoMortgage"
											className={
												livingPlace === homeData.noMortage
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={ () => {
												setLivingPlace(homeData.noMortage);
												data.rentMortgageAmount = 0;
												data.homeOwnership = homeData.noMortage;
												if (data.completedPage < data.page.livingPlace) {
													setDataState(homeData.noMortage);
												}
											} }
										>
											Own a home with no mortgage
										</Paper>
									</Grid>
									<Grid item lg={ 8 } md={ 8 } xs={ 12 }>
										<Paper
											id="ownOrRentBoxFour"
											elevation={ 3 }
											data-testid="MobileHome"
											className={
												livingPlace === homeData.mobile
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={ () => {
												setLivingPlace(homeData.mobile);
												data.rentMortgageAmount = 0;
												data.homeOwnership = homeData.mobile;
												if (data.completedPage < data.page.livingPlace) {
													setDataState(homeData.mobile);
												}
											} }
										>
											Own a mobile home
										</Paper>
									</Grid>
									<Grid item lg={ 8 } md={ 8 } xs={ 12 }>
										<Paper
											id="ownOrRentBoxFive"
											elevation={ 3 }
											data-testid="LivingWithRelatives"
											className={
												livingPlace === homeData.withRelative
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={ () => {
												setLivingPlace(homeData.withRelative);
												data.rentMortgageAmount = 0;
												data.homeOwnership = homeData.withRelative;

												if (data.completedPage < data.page.livingPlace) {
													setDataState(homeData.withRelative);
												}
											} }
										>
											Living with relatives
										</Paper>
									</Grid>

									<Grid item lg={ 8 } md={ 8 } xs={ 12 }>
										<TextField
											id="rentOrMortage"
											className={
												livingPlace === homeData.renting ||
													livingPlace === homeData.withMortage
													? "showMsg"
													: "hideMsg"
											}
											name="RentOrMortgageAmount"
											label="Monthly Rent / Mortgage Amount *"
											form={ true }
											error={ error }
											helperText={ helperText }
											value={ data.rentMortgageAmount }
											onChange={ onHandleChange }
											materialProps={ {
												"data-test-id": "rentMortgageAmount",
												maxLength: "5",
											} }
										/>
									</Grid>

									<Grid item lg={ 8 } md={ 8 } xs={ 12 } className="alignButton ContinueButton">
										<ButtonPrimary
											onClick={ handleRoute }
											data-testid="cntButton"
											disabled={ livingPlace === "" }
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
