import "../CheckMyOffer.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ButtonPrimary, TextField } from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CitizenshipStatusLogo from "../../../../assets/icon/I-Own-Rent-Property.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import ScrollToTopOnMount from "../ScrollToTop";
import "../LivingPlace/LivingPlace.css";

//Living place component initialization
function LivingPlace() {
	const { data, setData } = useContext(CheckMyOffers);
	const [ error, setError ] = useState();
	const [ helperText, setHelperText ] = useState();
	let [ livingPlace, setLivingPlace ] = useState(data.homeOwnership ?? "");
	const history = useHistory();
	//set data state on continue
	const setDataState = (val) => {
		if (data.state === "NC") {
			data.completedPage = data.page.livingPlace;
			setData({ ...data, rentMortgageAmount: 0, homeOwnership: val });
			livingPlace = val;
			history.push("/active-duty");
		} else if (data.state === "WI") {
			data.completedPage = data.page.livingPlace;
			history.push("/marital-status");
		} else {
			data.completedPage = data.page.activeDuty;
			history.push("/ssn");
		}
	};

	//validating user input and proceeds
	const handleRoute = () => {
		if (livingPlace === "Renting" || livingPlace === "Own a Home with Mortgage") {
			if (data.rentMortgageAmount !== "" && data.rentMortgageAmount !== 0 && data.rentMortgageAmount >= 100) {
				setError(false);
				setHelperText("");
				data.homeOwnership = livingPlace;
				if (data.state === "NC") {
					data.completedPage = data.page.livingPlace;
					history.push("/active-duty");
				} else if (data.state === "WI") {
					data.completedPage = data.page.livingPlace;
					history.push("/marital-status");
				} else {
					data.completedPage = data.page.activeDuty;
					history.push("/ssn");
				}
			} else {
				setError(true);
				setHelperText("Enter valid rent/Mortgage amount");
			}
		} else {
			setError(false);
			setHelperText("");
			data.homeOwnership = livingPlace;
			if (data.state === "NC") {
				data.completedPage = data.page.livingPlace;
				history.push("/active-duty");
			} else if (data.state === "WI") {
				data.completedPage = data.page.livingPlace;
				history.push("/marital-status");
			} else {
				data.completedPage = data.page.activeDuty;
				history.push("/ssn");
			}
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
		history.push("/select-amount");
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
						style={ { paddingTop: "70px", paddingBottom: "70px" } }
					>
						<Grid
							container
							item
							xs={ 11 }
							sm={ 10 }
							md={ 6 }
							lg={ 6 }
							xl={ 6 }
							className="cardWrapper"
							justifyContent="center"
							alignItems="center"
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
									<Link to="/annual-income">
										<i className="material-icons dp48 yellowText  ">
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
									className="borrowCSSLP"
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
											data-testid="Renting"
											className={
												livingPlace === "Renting"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={ () => {
												setLivingPlace("Renting");
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
												livingPlace === "Own a Home with Mortgage"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={ () => {
												setLivingPlace("Own a Home with Mortgage");
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
												livingPlace === "Own a Home with no Mortgage"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={ () => {
												setLivingPlace("Own a Home with no Mortgage");
												data.rentMortgageAmount = 0;
												data.homeOwnership = "Own a Home with no Mortgage";
												if (data.completedPage < data.page.livingPlace) {
													setDataState("Own a Home with no Mortgage");
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
												livingPlace === "Own a Mobile Home"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={ () => {
												setLivingPlace("Own a Mobile Home");
												data.rentMortgageAmount = 0;
												data.homeOwnership = "Own a Mobile Home";
												if (data.completedPage < data.page.livingPlace) {
													setDataState("Own a Mobile Home");
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
												livingPlace === "Living with Relatives"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={ () => {
												setLivingPlace("Living with Relatives");
												data.rentMortgageAmount = 0;
												data.homeOwnership = "Living with Relatives";

												if (data.completedPage < data.page.livingPlace) {
													setDataState("Living with Relatives");
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
												livingPlace === "Renting" ||
													livingPlace === "Own a Home with Mortgage"
													? "showMsg"
													: "hideMsg"
											}
											name="RentOrMortgageAmount"
											label="Monthly Rent / Mortgage Amount"
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

									<Grid item lg={ 8 } md={ 8 } xs={ 12 } className="alignButton">
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
