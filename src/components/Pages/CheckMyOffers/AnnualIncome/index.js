import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import globalMessages from "../../../../assets/data/globalMessages.json";
import AnnualIncomeLogo from "../../../../assets/icon/I-Annual-Income.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary, TextField } from "../../../FormsUI";
import ScrollToTopOnMount from "../ScrollToTop";
import "./AnnualIncome.css";

const useStyles = makeStyles((Theme) => ({
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
//Initializing functional component Active duty
function NewUser() {
	const { data } = useContext(CheckMyOffers);
	const [ errorAnnual, setErrorAnnual ] = useState("");
	const [ errorPersonal, setErrorPersonal ] = useState("");
	const classes = preLoginStyle();
	const innerClasses = useStyles();

	//Retrieving Context values
	const navigate = useNavigate();

	//Redirect to select offer is the page hit direclty
	useEffect(() => {
		if (data?.completedPage < data?.page?.employmentStatus || data?.formStatus?.toLowerCase() === "completed") {
			navigate("/select-amount");
		}
		return null;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const validate = (personal, household) => {
		if (!isNaN(personal) && !isNaN(household)) {
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
			const modPersonalIncome = parseInt(values.personalIncome.replace(/\$/g, "").replace(/,/g, ""));
			const modHouseholdIncome = parseInt(values.householdIncome.replace(/\$/g, "").replace(/,/g, ""));
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
		let annualPersonalIncome = event.target.value;
		if (!annualPersonalIncome || pattern.test(annualPersonalIncome)) {
			setErrorPersonal("");
			formik.handleChange(event);
		}
	};
	const onHandleChange = (event) => {
		const pattern = /^[0-9.,$\b]+$/;
		let annualHouseholdIncome = event.target.value;
		if (!annualHouseholdIncome || pattern.test(annualHouseholdIncome)) {
			setErrorAnnual("");
			formik.handleChange(event);
		}
	};

	const handleHouseHoldIncomeValue = (event) => {
		const num = event.target.value
			.replace(/\$/g, "")
			.replace(/,/g, "")
			.substr(0, 7);
		const formated = parseFloat(num);
		const currency = "$";
		const forCur = currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		formik.setFieldValue(event.target.name, forCur.slice(0, -3));
		const modPersonalIncome = parseInt(formik.values.personalIncome.replace(/\$/g, "").replace(/,/g, ""));
		const modHouseholdIncome = parseInt(formik.values.householdIncome.replace(/\$/g, "").replace(/,/g, ""));
		if (isNaN(modHouseholdIncome)) {
			setErrorAnnual(globalMessages?.Annual_Household_Income_Required);
		} else {
			const numNxt = event.target.value
				.replace(/\$/g, "")
				.replace(/,/g, "")
				.substr(0, 7);
			if (numNxt.length < 4) {
				setErrorAnnual(globalMessages?.Annual_Household_Income_4_digits);
				return false;
			}
			const perval = document
				.getElementById("personalIncome")
				.value.replace(/\$/g, "")
				.replace(/,/g, "")
				.substr(0, 7);
			if (perval.length < 4) {
				setErrorPersonal(globalMessages.Annual_Personal_Income_4_digits);
				return false;
			}
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
	};

	const handlePeronalIncomeValue = (event) => {
		const n = event.target.value
			.replace(/\$/g, "")
			.replace(/,/g, "")
			.substr(0, 7);
		const formated = parseFloat(n);
		const currency = "$";
		const forCur =
			currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
		formik.setFieldValue(event.target.name, forCur.slice(0, -3));
		const modPersonalIncome = parseInt(
			formik.values.personalIncome.replace(/\$/g, "").replace(/,/g, "")
		);
		const modHouseholdIncome = parseInt(
			formik.values.householdIncome.replace(/\$/g, "").replace(/,/g, "")
		);
		if (isNaN(modPersonalIncome)) {
			setErrorPersonal(globalMessages?.Annual_Personal_Income_Required);
		} else {
			const num = event.target.value
				.replace(/\$/g, "")
				.replace(/,/g, "")
				.substr(0, 7);
			if (num.length < 4) {
				setErrorPersonal(globalMessages?.Annual_Personal_Income_4_digits);
				return false;
			}

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
	};

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
		<div>
			<ScrollToTopOnMount />
			<div className={ classes.mainDiv }>
				<Box>
					<Grid
						container
						item
						xs={ 12 }
						justifyContent="center"
						alignItems="center"
						className={ innerClasses.boxGrid }
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
								id="incomeWrap"
								className={ innerClasses.paperStyle }
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
										src={ AnnualIncomeLogo }
										className="spinAnimation"
									/>
								</Grid>

								<Typography
									variant="h4"
									className={ innerClasses.typoStyle }
								>
									Tell us about your income
								</Typography>

								<form onSubmit={ formik.handleSubmit }>
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
											className="textBlock"
										>
											<TextField
												name="personalIncome"
												label="Annual Personal Income *"
												id="personalIncome"
												value={ formik.values.personalIncome }
												onChange={ onHandleChangePersonal }
												materialProps={ {
													"data-testid": "personalIncome",
													maxLength: "10",
												} }
												autoComplete="off"
												onBlur={ currencyFormat }
												onKeyDown={ preventUnwanted }
												error={ errorPersonal !== "" }
												helperText={ errorPersonal !== "" ? errorPersonal : "" }
											/>

											<p className="subText incomeText">
												Do not include income from others in your household.
												Stated income will be verified on every application.
												Your personal income must be verifiable via pay stubs,
												bank statements, or other records. Alimony, child
												support, or separate maintenance income need not be
												revealed if you do not wish to have it considered as a
												basis for repaying this loan.
											</p>
											<TextField
												name="householdIncome"
												label="Annual Household Income *"
												id="householdIncome"
												value={ formik.values.householdIncome }
												// startAdornment={<InputAdornment position="start">$</InputAdornment>}
												materialProps={ {
													"data-testid": "annualIncome",
													maxLength: "10",
												} }
												autoComplete="off"
												onChange={ onHandleChange }
												onBlur={ currencyFormat }
												onKeyDown={ preventUnwanted }
												error={ errorAnnual !== "" }
												helperText={ errorAnnual !== "" ? errorAnnual : "" }
											/>
										</Grid>
										<Grid
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
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
		</div>
	);
}

export default NewUser;
