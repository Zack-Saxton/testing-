import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import globalMessages from "../../../../assets/data/globalMessages.json";
import AnnualIncomeLogo from "../../../../assets/icon/I-Annual-Income.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary, Popup, TextField } from "../../../FormsUI";
import ScrollToTopOnMount from "../ScrollToTop";
import "./AnnualIncome.css";
import Income from "./Income";

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
	linkDesign: {
		textDecoration: "underline !important",
		color: "#0F4EB3 !important",
		display: "block !important",
		cursor: "pointer",
	},
})
);
//Initializing functional component Active duty
function NewUser() {
	const { data } = useContext(CheckMyOffers);
	const [ errorAnnual, setErrorAnnual ] = useState("");
	const [ errorPersonal, setErrorPersonal ] = useState("");
	const [ moreInformation, setMoreInformation ] = useState(false);
	const classes = preLoginStyle();
	const innerClasses = useStyles();

	//Retrieving Context values
	const navigate = useNavigate();

	//Redirect to select offer is the page hit direclty
	useEffect(() => {
		if (data?.completedPage < data?.page?.employmentStatus || data?.formStatus?.toLowerCase() === "completed") {
			navigate("/select-amount");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const validate = (personal, household) => {
		if(!personal){
			setErrorPersonal(globalMessages.Annual_Personal_Income_4_digits);
		}else if (!isNaN(personal) && !isNaN(household)) {
			if (personal <= household) {
				setErrorAnnual("");
				setErrorPersonal("");
				return true;
			} else {
				setErrorAnnual(globalMessages.Annual_Household_Equal_Personal);
				return false;
			}
		} else {
			setErrorPersonal(isNaN(personal) ? globalMessages.Annual_Personal_Income_Required : "");
			setErrorAnnual(isNaN(household) ? globalMessages.Annual_Household_Income_Required : "");
			return false;
		}
	};

	//initializing formik
	const formik = useFormik({
		initialValues: {
			personalIncome: data.annualIncome
				? "$" +
				parseFloat(data.annualIncome)
					.toFixed(2)
					.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
					.slice(0, -3)
				: "",
			householdIncome: data.householdAnnualIncome
				? "$" +
				parseFloat(data.householdAnnualIncome)
					.toFixed(2)
					.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
					.slice(0, -3)
				: "",
		},

		//On submit functionality
		onSubmit: (values) => {
			const modPersonalIncome = parseInt(values.personalIncome.replace(/\$|\,/g, ""));
			const modHouseholdIncome = parseInt(values.householdIncome.replace(/\$|\,/g, ""));
			if (!errorPersonal && !errorAnnual) {
				if (validate(modPersonalIncome, modHouseholdIncome)) {
					data.annualIncome = modPersonalIncome ? modPersonalIncome : "0";
					data.householdAnnualIncome = modHouseholdIncome ? modHouseholdIncome : "0";
					data.completedPage = data.completedPage > data.page.annualIncome ? data.completedPage : data.page.annualIncome;
					navigate("/living-place");
				}
			}
		},
	});

   
	//Restrict alphabets
	const onHandleChangePersonal = (event) => {
		const pattern = /^[0-9.,$\b]+$/;
		let annualPersonalIncome = event.target.value.trim();
		if (!annualPersonalIncome || pattern.test(annualPersonalIncome)) {
			setErrorPersonal("");
			formik.setFieldValue(event.target.name, annualPersonalIncome.replace(/^0+/, ''));
		}
	};
	const onHandleChange = (event) => {
		const pattern = /^[0-9.,$\b]+$/;
		let annualHouseholdIncome = event.target.value.trim();
		if (!annualHouseholdIncome || pattern.test(annualHouseholdIncome)) {
			setErrorAnnual("");
			formik.setFieldValue(event.target.name, annualHouseholdIncome.replace(/^0+/, ''));
		}
	};

	const handleHouseHoldIncomeValue = (event) => {
		const num = event.target.value.trim().replace(/\$|\,/g, "").substr(0, 7);
		const formated = parseFloat(num);
		const currency = "$";
		const forCur = currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		formik.setFieldValue(event.target.name, forCur.slice(0, -3));
		const modPersonalIncome = parseInt(formik.values.personalIncome.replace(/\$|\,/g, ""));
		const modHouseholdIncome = parseInt(formik.values.householdIncome.replace(/\$|\,/g, ""));
		if (isNaN(modHouseholdIncome)) {
			setErrorAnnual(globalMessages?.Annual_Household_Income_Required);
		} else {
			const numNxt = event.target.value.trim()
			    .replace(/\$|\,/g, "")
			    .substr(0, 7);
			if (numNxt.length < 4) {
				setErrorAnnual(globalMessages?.Annual_Household_Income_4_digits);
				return false;
			}
			const perval = document
				.getElementById("personalIncome")
				.value.replace(/\$|\,/g, "").substr(0, 7);
			if (perval.length < 4) {
				setErrorPersonal(globalMessages.Annual_Personal_Income_4_digits);
				return false;
			}
			setcommonError(modPersonalIncome,modHouseholdIncome);
		}
	};
		const setcommonError = (modPersonalIncome,modHouseholdIncome) => {
			if (!isNaN(modPersonalIncome) && !isNaN(modHouseholdIncome)) {
				if (modPersonalIncome <= modHouseholdIncome) {
					setErrorAnnual("");
					setErrorPersonal("");
					return true;
				} else {
					setErrorAnnual(globalMessages?.Annual_Income_Greater_Equal);
					return false;
				}
			}
		}

	const handlePeronalIncomeValue = (event) => {
		const personalIncomeValue = event.target.value.trim()
			.replace(/\$|\,/g, "")
			.substr(0, 7);
		const formated = parseFloat(personalIncomeValue);
		const currency = "$";
		const forCur =
			currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		formik.setFieldValue(event.target.name, forCur.slice(0, -3));
		const modPersonalIncome = parseInt(
			formik.values.personalIncome.replace(/\$|\,/g, "")
		);
		const modHouseholdIncome = parseInt(
			formik.values.householdIncome.replace(/\$|\,/g, "")
		);
		if (isNaN(modPersonalIncome)) {
			setErrorPersonal(globalMessages?.Annual_Personal_Income_Required);
		} else {
			const num = event.target.value.trim()
				.replace(/\$|\,/g, "")
				.substr(0, 7);
			if (num.length < 4) {
				setErrorPersonal(globalMessages?.Annual_Personal_Income_4_digits);
				return false;
			}
			setcommonError(modPersonalIncome,modHouseholdIncome);
		}
	};

	//To Get Pop Up regarding Income Related Information
	const handleOnClickMoreInformation = () => {
		setMoreInformation(true);
	};

	const handleOnClickMoreInformationClose = () => {
		setMoreInformation(false);
	}

	// To change text to currency format and check for validations
	const currencyFormat = (event) => {
		const inputName = event.target.name;
		if (inputName === "personalIncome") {
			handlePeronalIncomeValue(event);
		} else if (inputName === "householdIncome") {
			handleHouseHoldIncomeValue(event);
		}
	};

	// prevent the unwanted character
	const preventUnwanted = (event) => {
		if (event.keyCode === 190 || event.keyCode === 188) {
			event.preventDefault();
		}
	};

	//JSX part

	return (
		<div data-testid="annual-income-component">
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
							container
							item
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6}
							className="cardWrapper"
							justifyContent="center"
							alignItems="center"
						>
							<Paper
								id="incomeWrap"
								className={innerClasses.paperStyle}
							>
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det50  determinate slantDiv"
									/>
									<span className="floatLeft detNum50">50%</span>
								</div>
								<Grid className="floatLeft">
									<Link className="arrowBack" to="/employment-status">
										<i className="material-icons dp48 yellowText floatingButton">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img
										alt="AnnualIncome"
										src={AnnualIncomeLogo}
										className="spinAnimation"
									/>
								</Grid>

								<Typography
									variant="h4"
									className={innerClasses.typoStyle}
								>
									Tell us about your income
								</Typography>

								<form onSubmit={formik.handleSubmit}>
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
											className="textBlock"
										>
											<TextField
												name="personalIncome"
												label="Annual Personal Income *"
												id="personalIncome"
												value={formik.values.personalIncome}
												onChange={onHandleChangePersonal}
												materialProps={{
													"data-testid": "personalIncome",
													maxLength: "10",
												}}
												autoComplete="off"
												onBlur={currencyFormat}
												onKeyDown={preventUnwanted}
												error={errorPersonal !== ""}
												helperText={errorPersonal !== "" ? errorPersonal : ""}
											/>

											<p className="subText incomeText">
												Do not include income from others in your household.
												Stated income will be verified on every application.
												Your personal income must be verifiable via pay stubs,
												bank statements, or other records. Alimony, child
												support, or separate maintenance income need not be
												revealed if you do not wish to have it considered as a
												basis for repaying this loan. <span className={innerClasses.linkDesign} onClick={() => { handleOnClickMoreInformation(); }}>More Information</span>
											</p>
											<TextField
												name="householdIncome"
												label="Annual Household Income *"
												id="householdIncome"
												value={formik.values.householdIncome}
												// startAdornment={<InputAdornment position="start">$</InputAdornment>}
												materialProps={{
													"data-testid": "annualIncome",
													maxLength: "10",
												}}
												autoComplete="off"
												onChange={onHandleChange}
												onBlur={currencyFormat}
												onKeyDown={preventUnwanted}
												error={errorAnnual !== ""}
												helperText={errorAnnual !== "" ? errorAnnual : ""}
											/>
										</Grid>
										<Grid
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlock alignButton"
										>
											<ButtonPrimary
												data-testid="contButton"
												type="submit"
												stylebutton='{"background": "#FFBC23", "color": "black","fontSize":" 0.938rem" , "padding": "0px 30px"}'
											>
												Continue
											</ButtonPrimary>
										</Grid>
									</Grid>
								</form>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</div>
			<Popup popupFlag={moreInformation} closePopup={handleOnClickMoreInformationClose} title='What Is Considered "Income"?'>
				<Income />
			</Popup>
		</div>
	);
}

export default NewUser;
