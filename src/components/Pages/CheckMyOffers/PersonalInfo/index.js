import React, { useState, useContext } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PersonLogo from "../../../../assets/icon/I-Personal-Info.png";
import { useHistory, Link } from "react-router-dom";
import { format } from "date-fns";
import "./personalinfo.css";
import "../checkMyOffer.css";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import axios from 'axios';
import ScrollToTopOnMount from '../scrollToTop';
import {
	TextField,
	EmailTextField,
	PhoneNumber,
	DatePicker,
	ButtonPrimary,
	SocialSecurityNumber,
} from "../../../FormsUI";
import { useFormik } from "formik";
import * as yup from "yup";

//Yup validation schema
const validationSchema = yup.object({
	firstName: yup
	.string("Enter your firstname")
    .max(30, "Firstname can be upto 30 characters length")
    .min(2,"Firstname should be minimum of 2 letters")
    .required("Your first name is required"),

	lastName: yup
	.string("Enter your Lastname")
	.max(30, "Lastname can be upto 30 characters length")
	.min(2,"Lastname should be minimum of 2 letters")
	.required("Your last name is required"),

	email: yup
		.string("Enter your email")
		.email("Email should be as (you@example.com)")
		.matches(
			// eslint-disable-next-line
			/^[a-zA-Z](?!.*[+/._-][+/._-])(([^<>()|?{}='[\]\\,;:#!$%^&*\s@\"]+(\.[^<>()|?{}=/+'[\]\\.,;_:#!$%^&*-\s@\"]+)*)|(\".+\"))[a-zA-Z0-9]@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,3}))$/,        //eslint-disable-line
			"Invalid Email"
		  )
		.required("Your email address is required"),
		
	ssn: yup
		.string("Enter a SSN")
		.required("Your SSN is required")
		.transform((value) => value.replace(/[^\d]/g, ""))
		//eslint-disable-next-line
		.matches(/^(?!000)[0-8][0-9]{2}(?!00)[0-9]{2}(?!0000)[0-9]{4}$/, "Invalid SSN")
		// .matches(/^(?!000|666)[0-8][0-9]{2}(?!00)[0-9]{2}(?!0000)[0-9]{4}$/, "Invalid SSN")
		.min(9, "Name must contain at least 9 digits"),

	phone: yup
		.string("Enter a name")
		.required("Your Phone number is required")
		.transform((value) => value.replace(/[^\d]/g, ""))
		//eslint-disable-next-line
		.matches(/^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,"Invalid Phone")
		.matches(/^(\d)(?!\1+$)\d{9}$/, "Invalid Phone")
		.min(10, "Name must contain at least 10 digits"),

	date: yup
	.date("Please enter valid date")
    .nullable()
    .required("Your date of birth is required")
    .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
	.min(new Date(1919, 1, 1), "You are too old")
	.typeError('Please enter a valid date'),
});

//Initializing functional component Personal info
function PersonalInfo() {
	const { data } = useContext(CheckMyOffers);
	const [appliedInLast30Days, setAppliedInLast30Days] = useState(false);
	const [ssnEmailMatch, setSsnEmailMatch] = useState(true);
	const [error, setError] = useState(false);
	const [ errorMsg, setErrorMsg] = useState('');
	const history = useHistory();
	const formik = useFormik({
		initialValues: {
			firstName: data.firstName ? data.firstName : "",
			lastName: data.lastName ? data.lastName : "",
			email: data.email ?? "",
			ssn: data.ssn ?? "",
			phone: data.phone ? '1' + data.phone : '',
			date: data.dob ?? null
		},
		validationSchema: validationSchema,

//On submit funcationality updateing context values

		onSubmit: async (values) => {
			data.firstName = values.firstName.trim();
			data.lastName = values.lastName.trim();
			data.email = values.email;
			data.phone = values.phone;
			data.date = format(values.date, "dd-MM-yyyy"); 
			data.ssn = values.ssn.replace(/-/g, "").replace(/ /g, "") || "";
			var phone = values.phone.replace(/-/g, "").replace(/\)/g, "").replace(/\(/g, "").replace(/ /g, "") || "";
			data.phone = phone.slice(1);
			data.dob = values.date;
			data.completedPage = data.page.personalInfo;
			console.log(data);

			if(values.email !== null && values.ssn !== null)
			{
				let body = {
					"email": values.email,
					"ssn": values.ssn.replace(/-/g, "").replace(/ /g, "") || "",
					"isAuthenticated": true
				  }
				let customerStatus  = await axios({
					method: "POST",
					url: "/customer/check_customer_user",
					data: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
						Accept: "*/*",
						Host: "psa-development.marinerfinance.io",
						"Accept-Encoding": "gzip, deflate, br",
						Connection: "keep-alive",
						"Content-Length": "6774",
					},
					transformRequest: (data, headers) => {
						delete headers.common["Content-Type"];
						return data;
					},
				});
				console.log("cuts",customerStatus);
				
				if(customerStatus.data.customerFound === true  ){
					// console.log("res emial", customerStatus.data.useFormik.email);
					// 	console.log("user email", values.email) ;
					if(customerStatus.data.user.email === values.email){
						if (customerStatus.data?.ssnLookupFails === true){
							setSsnEmailMatch(false);
							setError(false);
							setErrorMsg('');
						}
						else {
							setSsnEmailMatch(true);
							history.push({
								pathname: "/existing-user",
							});
							setError(false);
							setErrorMsg('');
						}
						
					} 
					
					else{
						setSsnEmailMatch(false);
						setError(false);
						setErrorMsg('');
					}
					
				}
				else if(customerStatus.data.customerFound === false){
					setError(false);
					setErrorMsg('');
					history.push({
						pathname: "/new-user",
					});
				} 
				else if(customerStatus.data.errorMessage === "More than 1 customer record retrieved "){
					setSsnEmailMatch(true);
					setError(true);
					setErrorMsg("More thatn 1 customer records retrieved for you SSN");
				}     
				
			}
			// history.push("/employment-status");
		},
	});
	
	var myDate = new Date();
	myDate.setDate(myDate.getDate() - 6571);

	const checkApplicationStatus = async (event) => {
		console.log("onload");
		formik.handleBlur(event);
		if(event.target.value !== '' || event.target.value !== null)
		{
			let body = {
				email: event.target.value
			}
			if(event.target.value !== '' ){
				let result = await axios({
					method: "POST",
					url: "/customer/get_customer_by_email",
					data: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
						Accept: "*/*",
						Host: "psa-development.marinerfinance.io",
						"Accept-Encoding": "gzip, deflate, br",
						Connection: "keep-alive",
						"Content-Length": "6774",
					},
					transformRequest: (data, headers) => {
						delete headers.common["Content-Type"];
						return data;
					},
				})
				console.log("raw",result.data.AppSubmittedInLast30Days);
				if(result && result.data.AppSubmittedInLast30Days === true)
				{
					setAppliedInLast30Days(true);
				}
				else{
					setAppliedInLast30Days(false);
				}
			}
		}
		
		
	}

	const onNameChange = (event) => {
		// const reg = /[a-zA-Z]+[ ]{0,1}[']{0,1}/;
		const reg = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
		let acc = event.target.value;
	   
		if (acc === "" || reg.test(acc)) {
		  formik.handleChange(event);
		}
		};
		const preventSpace = (event) => {
			// const reg = /[a-zA-Z]+[ ]{0,1}[']{0,1}/;
			if (event.keyCode === 32) {
				event.preventDefault();
			}
			};

if (data.completedPage < data.page.homeAddress || data.formStatus === 'completed'){
	history.push("/select-amount");
}

//JSX [part]
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
										className="det40 determinate slantDiv"
									></div>
									<span class="floatLeft detNum40">40%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/home-address">
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid>
									<img alt="personlogo" src={PersonLogo} className="spinAnimation" />
								</Grid>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSSLP"
								>
									Tell us about yourself
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
												fullWidth
							 					autoFocus 
												id="firstName"
												name="firstName"
												label="First Name *"
												materialProps={{ "maxlength": "30" }}
												value={formik.values.firstName}
												onChange={onNameChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.firstName &&
													Boolean(formik.errors.firstName)
												}
												helperText={
													formik.touched.firstName && formik.errors.firstName
												}
											/>
										
										</Grid>
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
												fullWidth
												id="lastName"
												name="lastName"
												label="Last Name *"
												materialProps={{ "maxlength": "30" }}
												value={formik.values.lastName}
												onChange={onNameChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.lastName &&
													Boolean(formik.errors.lastName)
												}
												helperText={
													formik.touched.lastName && formik.errors.lastName
												}
											/>
											<div className="MuiTypography-alignLeft">
												<Typography
													className="smallTextLeft"
													variant="p"
													align="left"
												>
													Please provide your full legal name.
												</Typography>
											</div>
										</Grid>
										<Grid
											justify="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlock"
										>
											
											<DatePicker
												name="date"
												label="Date of Birth *"
												id="date"
												placeholder="MM-DD-YYYY"
												format="MM-dd-yyyy"
												maxdate={myDate}
												value={formik.values.date}
												onChange={(values) => {
													formik.setFieldValue("date", values);
												}}
												onBlur={formik.handleBlur}
												error={
													formik.touched.date && Boolean(formik.errors.date)
												}
												helperText={formik.touched.date && formik.errors.date}
											/>

											<div className="MuiTypography-alignLeft">
												<Typography
													className="smallTextLeft"
													variant="p"
													align="left"
												>
													Please ensure your DOB meets the following criteria:
													Your age must be greater than or equal to 18 years.
												</Typography>
											</div>
										</Grid>
										<Grid
											justify="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlock"
										>
											<SocialSecurityNumber
												name="ssn"
												label="Social Security Number *"
												placeholder="Enter your Social Security Number"
												id="ssn"
												type="ssn"	
												value={formik.values.ssn}
												// onChange={onSSNhandleChange}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched.ssn && Boolean(formik.errors.ssn)}
												helperText={formik.touched.ssn && formik.errors.ssn}
											/>
											<div className="MuiTypography-alignLeft">
												<Typography
													className="smallTextLeft"
													variant="p"
													align="left"
												>
													Your SSN is required to pull your credit information.
												</Typography>
											</div>
											<div className="MuiTypography-alignLeft">
												<Typography
													className= { !ssnEmailMatch ? "showError smallTextLeftError" : "hideError " }
													variant="p"
													align="left"
												>
													Your SSN and Email id is not matched.
												</Typography>
												
												{/* <p className= { !ssnEmailMatch ? "showError smallTextLeftError" : "hideError " }>The entered SSN and email id is not matched</p> */}
											</div>
										</Grid>
										<Grid
											justify="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlock"
										>
											<EmailTextField
												fullWidth
												id="email"
												name="email"
												label="Email *"
												onKeyDown={preventSpace}
												value={formik.values.email}
												materialProps={{"maxLength": "100"}}
												onLoad={checkApplicationStatus}
												onChange={formik.handleChange}
												onBlur={checkApplicationStatus}
												error={
													formik.touched.email && Boolean(formik.errors.email)
												}
												helperText={formik.touched.email && formik.errors.email}
											/>
											<p className= { appliedInLast30Days ? "showError smallTextLeftError" : "hideError " }>It looks like you have already submitted an application within the last 30 days.

</p>
										</Grid>
										
										<Grid
											justify="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlock"
										>
											<PhoneNumber
												name="phone"
												label="Phone number *"
												placeholder="Enter your phone number"
												id="phone"
												type="text"
												onKeyDown={preventSpace}
												value={formik.values.phone}
												// onChange={onSSNhandleChange}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.phone && Boolean(formik.errors.phone)
												}
												helperText={formik.touched.phone && formik.errors.phone}
											/>
											<Typography
													className= { error ? "showError smallTextLeftError" : "hideError " }
													variant="p"
													align="left"
												>
													It looks like you already have an account. Please <a href="/login">sign in.</a>
												</Typography>
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
												type="submit"
												stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
												disabled = {appliedInLast30Days || error}
											>
												<Typography align="center" className="textCSS ">
													Continue
												</Typography>
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

export default PersonalInfo;
