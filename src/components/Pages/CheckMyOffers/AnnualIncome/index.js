import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField, ButtonPrimary } from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import AnnualIncomeLogo from "../../../../assets/icon/I-Annual-Income.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import ScrollToTopOnMount from '../scrollToTop';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import "./annulaIncome.css";

//Yup validation schema
const validationSchema = yup.object({
	personalIncome: yup.number()
		.required("Personal Income is required")
		.moreThan(0, "Please enter a valid amount")
		.min(1000, "Minimum annual income should be $1000"),
	householdIncome: yup
		.number()
		.moreThan(0, "Please enter a valid amount")
		.min(yup.ref("personalIncome"), "Annual household income must be greater than or equal to annual personal income")
		.required("Household Income is required"),
});

//Initializing functional component Activeduty
function NewUser() {
	const { data } = useContext(CheckMyOffers);
	const [errorAnnual, setErrorAnnual] = useState('');
	const [errorPersonal, setErrorPersonal] = useState('');
	const [valid, setValid]  = useState(false);

//Retriving Context values
	const history = useHistory();
	const validate = (personal, household) =>{
		console.log("personal", personal);
		console.log("household", household);
		if(!isNaN(personal) && !isNaN(household))
		{
			if(  personal <= household){
				setErrorAnnual('');
				setErrorPersonal('');
				setValid(true);
			
			} else {
				setErrorAnnual("Annual household income must be greater than or equal to annual personal income");
				setValid(false);
			}
			
		}else{
			setErrorAnnual(isNaN(personal) ? "Annual household income is required" : '');
			setErrorPersonal(isNaN(household) ? "Annual personal income is required" : '');
			setValid(false);

		}
	}

//initializing formik
	const formik = useFormik({
		initialValues: {
			personalIncome: data.annualIncome ? '$' + parseFloat(data.annualIncome).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') :  "",
			householdIncome: data.householdAnnualIncome ? '$' +parseFloat( data.householdAnnualIncome).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : "",
		},
		// validationSchema: validationSchema,

//On submit funcationality
		onSubmit: (values) => {
			var modPersonalIncome = parseInt(values.personalIncome.replace(/\$/g, "").replace(/,/g, ""));
			var modHouseholdIncome = parseInt(values.householdIncome.replace(/\$/g, "").replace(/,/g, ""));
			// console.log("mod", modHouseholdIncome);
		
			 validate(modPersonalIncome, modHouseholdIncome);

			if(valid){
				data.annualIncome = modPersonalIncome ?  modPersonalIncome : '0';
				data.householdAnnualIncome =  modHouseholdIncome ?  modHouseholdIncome : '0' ;
				 data.completedPage = data.completedPage > data.page.annualIncome ? data.completedPage : data.page.annualIncome ;
				history.push("/living-place");
			}
			

			
			
			// if(isNaN(modPersonalIncome) ){
			// 	setErrorPersonal("Annual personal income is required");
			// }

			// if()
			// data.annualIncome = parseInt( values.personalIncome ?  values.personalIncome : '0');
			// data.householdAnnualIncome = parseInt( values.householdIncome ?  values.householdIncome : '0') ;
			// data.completedPage = data.page.annualIncome;
			// history.push("/living-place");
		},
	});

//Restrict alphabets
	const onHandleChange = (event) => {
		const reg = /^[0-9.,$\b]+$/;
		let acc = event.target.value;

		if (acc === "" || reg.test(acc)) {
			formik.handleChange(event);
		}
	};

	const currencyFormat = (event) => {
		// console.log("event", event.target.name);
		var n = event.target.value.replace(/\$/g, "").replace(/,/g, "");
		var formated = parseFloat(n);
		var currency = '$';
		var forCur = currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		formik.setFieldValue(event.target.name, forCur.slice(0, -3));
	}

	const preventUnwanted = (event) => {
		// const reg = /[a-zA-Z]+[ ]{0,1}[']{0,1}/;
		if (event.keyCode === 190 || event.keyCode === 188) {
			event.preventDefault();
		}
	};

	// 	if (data.completedPage < data.page.employmentStatus  || data.formStatus === 'completed'){
	// 	history.push("/select-amount");
	// }

	

	
//JSX part
// console.log(formik.values);
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid xs={12} container justify="center" alignItems="center">
						<Grid
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6}
							className="cardWrapper"
							justify="center"
							alignItems="center"
						>
							<Paper
								className="cardWOPadding"
								justify="center"
								alignItems="center"
							>
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det50  determinate slantDiv"
									></div>
									<span class="floatLeft detNum50">50%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/employment-status">
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
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
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSSLP"
								>
									Tell us about your income
								</Typography>

								<form onSubmit={formik.handleSubmit}>
									<Grid
										md={12}
										className="blockDiv"
										container
										justify="center"
										alignItems="center"
									>
										<Grid
											justify="center"
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
												onChange={onHandleChange}	
												materialProps={{
													"data-testid": "personalIncome",
													maxLength: "7",
												}}
												onBlur={currencyFormat}
												onKeyDown={preventUnwanted}
												error={
													errorPersonal !== '' ? true : false
												}
												helperText={
													errorPersonal !== '' ? errorPersonal : ''
												}
												// error={
												// 	formik.touched.personalIncome &&
												// 	Boolean(formik.errors.personalIncome)
												// }
												// helperText={
												// 	formik.touched.personalIncome &&
												// 	formik.errors.personalIncome
												// }
											/>
											{/* <CurrencyTextField
												unselectable
												currencySymbol="$"
												name="personalIncome"
												autoFocus
												fullWidth 
												// minimumValue={1000}
												label="Annual Personal Income"
												value={formik.values.personalIncome}
												onChange={formik.handleChange}
												materialProps={{
													"data-testid": "personalIncome",
													// maxLength: "7",
												}}
												onBlur={formik.handleBlur}
												error={
													formik.touched.personalIncome &&
													Boolean(formik.errors.personalIncome)
												}
												helperText={
													formik.touched.personalIncome &&
													formik.errors.personalIncome
												} */}
												{/* <CurrencyTextField
												label="Annual Personal Income"
												name="personalIncome"
												value={formik.values.personalIncome}
												currencySymbol="$"
												fullWidth
												// minimumValue={1000}
												// onChange={formik.handleChange}
												// onChange={onHandleChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.personalIncome &&
													Boolean(formik.errors.personalIncome)
												}
												helperText={
													formik.touched.personalIncome &&
													formik.errors.personalIncome
												}
												// onBlur={formik.handleBlur}
												decimalCharacter="."
												digitGroupSeparator=","
												/>	 */}
											{/* /> */}
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
													maxLength: "7",
												}}
												onChange={onHandleChange}
												onBlur={currencyFormat}
												onKeyDown={preventUnwanted}
												error={
													errorAnnual !== '' ? true : false
												}
												helperText={
													errorAnnual !== '' ? errorAnnual : ''
												}
											/>
											{/* <CurrencyTextField
												label="Annual Household Income"
												name="householdIncome"
												value={formik.values.householdIncome}
												currencySymbol="$"
												fullWidth
												// minimumValue={1000}
												// onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												decimalCharacter="."
												digitGroupSeparator=","
												/> */}
										</Grid>
										<Grid
											justify="center"
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
												
												stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
											>
												{/* <Typography align="center" className="textCSS "> */}
													Continue
												{/* </Typography> */}
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
