import React, {useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {ButtonPrimary, TextField} from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import AnnualIncomeLogo from "../../../../assets/icon/I-Annual-Income.png";
import {useFormik} from "formik";
import {CheckMyOffers} from "../../../../contexts/CheckMyOffers";
import ScrollToTopOnMount from '../scrollToTop';
import "./AnnualIncome.css";


//Initializing functional component Active duty
function NewUser() {
	const { data } = useContext(CheckMyOffers);
	const [errorAnnual, setErrorAnnual] = useState('');
	const [errorPersonal, setErrorPersonal] = useState('');

	//Retrieving Context values
	const history = useHistory();
	const validate = (personal, household) => {

		if (!isNaN(personal) && !isNaN(household)) {
			if (personal <= household) {
				setErrorAnnual('');
				setErrorPersonal('');
				return true;
			} else {
				setErrorAnnual("Annual household income must be greater than or equal to annual personal income");
				return false;
			}

		} else if(isNaN(personal)) {
            setErrorPersonal("Annual household income is required");
            return false;
        } else {
            // setErrorPersonal(isNaN(personal) ? "Annual household income is required" : '');
            setErrorAnnual(isNaN(household) ? "Annual personal income is required" : '');
            return false;
        }
	}

	//initializing formik
	const formik = useFormik({
		initialValues: {
			personalIncome: data.annualIncome ? '$' + parseFloat(data.annualIncome).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0, -3) : "",
			householdIncome: data.householdAnnualIncome ? '$' + parseFloat(data.householdAnnualIncome).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0, -3) : "",
		},

		//On submit functionality
		onSubmit: (values) => {
			const modPersonalIncome = parseInt(values.personalIncome.replace(/\$/g, "").replace(/,/g, ""));
			const modHouseholdIncome = parseInt(values.householdIncome.replace(/\$/g, "").replace(/,/g, ""));


			if (validate(modPersonalIncome, modHouseholdIncome)) {
				data.annualIncome = modPersonalIncome ? modPersonalIncome : '0';
				data.householdAnnualIncome = modHouseholdIncome ? modHouseholdIncome : '0';
				data.completedPage = data.completedPage > data.page.annualIncome ? data.completedPage : data.page.annualIncome;
				history.push("/living-place");
			}

		},
	});

	//Restrict alphabets

	const onHandleChangePersonal = (event) => {
		const reg = /^[0-9.,$\b]+$/;
		let acc = event.target.value;

		if (acc === "" || reg.test(acc)) {
			setErrorPersonal('');
			formik.handleChange(event);
		}
	};
	const onHandleChange = (event) => {
		const reg = /^[0-9.,$\b]+$/;
		let acc = event.target.value;

		if (acc === "" || reg.test(acc)) {
			setErrorAnnual('');
			formik.handleChange(event);
		}
	};

	const currencyFormat = (event) => {
        const n = event.target.value.replace(/\$/g, "").replace(/,/g, "").substr(0, 7);
        const formated = parseFloat(n);
        const currency = '$';
        const forCur = currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        formik.setFieldValue(event.target.name, forCur.slice(0, -3));
        const modPersonalIncome = parseInt(formik.values.personalIncome.replace(/\$/g, "").replace(/,/g, ""));
        const modHouseholdIncome = parseInt(formik.values.householdIncome.replace(/\$/g, "").replace(/,/g, ""));
        validate(modPersonalIncome, modHouseholdIncome);
    }

	const preventUnwanted = (event) => {
		if (event.keyCode === 190 || event.keyCode === 188) {
			event.preventDefault();
		}
	};

		if (data.completedPage < data.page.employmentStatus  || data.formStatus === 'completed'){
		history.push("/select-amount");
	}

	//JSX part

	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid container item xs={12} justifyContent="center" alignItems="center" style={{ paddingTop:"70px",paddingBottom:"70px"}}>
						<Grid container item
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6}
							className="cardWrapper"
							justifyContent="center"
							alignItems="center"
						>
							<Paper className="cardWOPadding" style={{ justify: "center", alignItems: "center" }}>
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det50  determinate slantDiv"
									/>
									<span className="floatLeft detNum50">50%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/employment-status">
										<i className="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img
										alt="AnnualIncome"
										src={AnnualIncomeLogo}
										className="spinAnimation"
									/>
								</Grid>

								<Typography variant="h4" style={{ align: "center", justify: "center", alignItems: "center" }} className="borrowCSSLP">
									Tell us about your income
								</Typography>

								<form onSubmit={formik.handleSubmit}>
									<Grid item
										md={12}
										className="blockDiv"
										container
										justifyContent="center"
										alignItems="center"
									>
										<Grid container
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
												autoFocus
												label="Annual Personal Income"
												value={formik.values.personalIncome}
												onChange={onHandleChangePersonal}
												materialProps={{
													"data-testid": "personalIncome",
													maxLength: "10",
												}}
												autoComplete='off'
												onBlur={currencyFormat}
												onKeyDown={preventUnwanted}
												error={
													errorPersonal !== ''
												}
												helperText={
													errorPersonal !== '' ? errorPersonal : ''
												}

											/>


											<p className="subText">
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
												label="Annual Household Income"
												value={formik.values.householdIncome}
												// startAdornment={<InputAdornment position="start">$</InputAdornment>}
												materialProps={{
													"data-testid": "annualIncome",
													maxLength: "10",
												}}
												autoComplete='off'
												onChange={onHandleChange}
												onBlur={currencyFormat}
												onKeyDown={preventUnwanted}
												error={
													errorAnnual !== ''
												}
												helperText={
													errorAnnual !== '' ? errorAnnual : ''
												}
											/>

										</Grid>
										<Grid container
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

												stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black","fontSize":"1rem"}'
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
