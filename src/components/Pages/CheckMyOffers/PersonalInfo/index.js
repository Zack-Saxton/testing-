import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import PersonLogo from "../../../../assets/icon/I-Personal-Info.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { creatProspect } from "../../../Controllers/CheckMyOffersController";
import globalMessages from '../../../../assets/data/globalMessages.json';
import {
	ButtonPrimary,
	DatePicker,
	EmailTextField,
	PhoneNumber,
	SocialSecurityNumber,
	TextField
} from "../../../FormsUI";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle"
import "../CheckMyOffer.css";
import ScrollToTopOnMount from "../ScrollToTop";
import "./PersonalInfo.css";

//Yup validation schema
const validationSchema = yup.object({
	firstName: yup
		.string(globalMessages.FirstNameEnter)
		.max(30, globalMessages.FirstNameMax)
		.min(2, globalMessages.FirstNameMin)
		.required(globalMessages.FirstNameRequired),
	lastName: yup
		.string(globalMessages.LastNameEnter)
		.max(30, globalMessages.LastNameMax)
		.min(2, globalMessages.LastNameMin)
		.required(globalMessages.LastNameRequired),
	email: yup
		.string(globalMessages.EmailEnter)
		.email(globalMessages.EmailValid)
		.matches(
			// eslint-disable-next-line
			/^[a-zA-Z](?!.*[+/._-][+/._-])(([^<>()|?{}='[\]\\,;:#!$%^&*\s@\"]+(\.[^<>()|?{}=/+'[\]\\.,;_:#!$%^&*-\s@\"]+)*)|(\".+\"))[a-zA-Z0-9]@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,3}))$/, //eslint-disable-line
			globalMessages.EmailValid
		)
		.required(globalMessages.EmailRequired),
	ssn: yup.string().when("checkSSN", {
		is: (checkSSN) => !checkSSN,
		then: yup
			.string(globalMessages.SSNEnter)
			.required(globalMessages.SSNRequired)
			.transform((value) => value.replace(/[^\d]/g, ""))
			//eslint-disable-next-line
			.matches(
				/^(?!000)[0-8]\d{2}(?!00)\d{2}(?!0000)\d{4}$/,
				globalMessages.SSNValid
			)
			.matches(/^(\d)(?!\1+$)\d{8}$/, globalMessages.SSNValid)
			.min(9, globalMessages.SSNMin),
	}),
	phone: yup
		.string(globalMessages.PhoneEnter)
		.required(globalMessages.PhoneRequired)
		.transform((value) => value.replace(/[^\d]/g, ""))
		//eslint-disable-next-line
		.matches(
			/^[1-9]{1}\d{2}\d{3}\d{4}$/,
			globalMessages.PhoneValid
		)
		.matches(/^(\d)(?!\1+$)\d{9}$/, globalMessages.PhoneValid)
		.min(10, globalMessages.PhoneMin),
	dob: yup
		.date(globalMessages.DateOfBirthValid)
		.nullable()
		.required(globalMessages.DateOfBirthRequired)
		.max(
			new Date(
				new Date(
					new Date().getFullYear() +
					"/" +
					(new Date().getMonth() + 1) +
					"/" +
					new Date().getDate()
				).getTime() - 567650000000
			),
			globalMessages.DateOfBirthMinAge
		)
		.min(new Date(1919, 1, 1), globalMessages.DateOfBirthMaxAge)
		.typeError(globalMessages.DateOfBirthValid),
});

const useStyles = makeStyles((Theme) =>({
	gridPadding: {
		justifyContent: "center",
		padding: "4% 0%"
	},
	paperStyle: { 
		justify: "center", 
		alignItems: "center",
		textAlign: "center",
		padding: "0"
	},
	typoStyle:{
		align: "center",
		justify: "center",
		alignItems: "center",
		fontSize: "1.538rem",
		margin: "10px 0px !important",
		color: "#171717",
		fontWeight: "400 !important",
		lineHeight: "110% !important"
	},
	justifyGrid: {
		justifyContent: "center",
		alignItems: "stretch",
		textAlign: "center"
	},
	justifyGridMargin: {
		justifyContent: "center", 
		margin: " 15px 0px 19px 0px"
	},
	gridAlign:{
		justifyContent: "center",
		padding: "4% 0%"
	}
})
);

//Initializing functional component Personal info
function PersonalInfo() {
	const { data } = useContext(CheckMyOffers);
	const [ appliedInLast30Days, setAppliedInLast30Days ] = useState(false);
	const [ ssnEmailMatch, setSsnEmailMatch ] = useState(true);
	const [ error, setError ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const navigate = useNavigate();
	const innerClasses = useStyles();
	const classes = preLoginStyle();

	function phoneNumberMask(values) {
		let phoneNumber = values.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
		values = !phoneNumber[ 2 ] ? phoneNumber[ 1 ] : '(' + phoneNumber[ 1 ] + ') ' + phoneNumber[ 2 ] + (phoneNumber[ 3 ] ? '-' + phoneNumber[ 3 ] : '');
		return (values);
	}

	//configuring formik
	const formik = useFormik({
		initialValues: {
			firstName: data.firstName ? data.firstName : "",
			lastName: data.lastName ? data.lastName : "",
			email: data.email ? data.email : "",
			ssn: data.ssn ? data.ssn : "",
			lastSSN: data.last4SSN ? data.last4SSN : "",
			phone: data.phone ? phoneNumberMask(data.phone) : "",
			dob: data.dob ?? null,
			checkSSN: data.last4SSN ? true : false,
		},
		validationSchema: validationSchema,

		//On submit functionality updating context values
		onSubmit: async (values) => {
			const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : "{ }");
			setLoading(true);
			data.firstName = values.firstName.trim();
			data.lastName = values.lastName.trim();
			data.email = values.email;
			data.phone = values.phone;
			data.ssn = data.last4SSN
				? data.ssn
				: values.ssn.replace(/-/g, "").replace(/ /g, "") || "";
			const phone =
				values.phone
					.replace(/-/g, "")
					.replace(/\)/g, "")
					.replace(/\(/g, "")
					.replace(/ /g, "") || "";
			data.phone = phone;
			data.dob = values.dob;
			data.completedPage = data.page.personalInfo;

			//Prospect
			creatProspect(data);

			if (values.email !== null && values.ssn !== null) {
				let body = {
					email: values.email,
					ssn: data.last4SSN
						? data.ssn
						: values.ssn.replace(/-/g, "").replace(/ /g, "") || "",
					isAuthenticated: true,
				};

				if (loginToken?.isLoggedIn === true) {
					data.completedPage = data.page.existingUser;
					navigate("/employment-status");
					setError(false);
					setLoading(false);
				} else {
					let customerStatus = await axios({
						method: "POST",
						url: "/customer/check_customer_user",
						data: JSON.stringify(body),
						headers: {
							"Content-Type": "application/json",
						},
					});

					if (customerStatus.data.customerFound === true) {
						if (customerStatus.data.user.email === values.email) {
							if (customerStatus.data?.ssnLookupFails === true) {
								setSsnEmailMatch(false);
								setError(false);
								setLoading(false);
							} else {
								setSsnEmailMatch(true);
								navigate("/existing-user");
								setError(false);
								setLoading(false);
							}
						} else {
							setSsnEmailMatch(false);
							setError(false);
							setLoading(false);
						}
					} else if (customerStatus.data.customerFound === false) {
						setError(false);
						setLoading(false);
						navigate("/new-user");
					} else if (
						customerStatus.data.errorMessage ===
						"More than 1 customer record retrieved "
					) {
						setSsnEmailMatch(true);
						setError(true);
						setLoading(false);
					}
				}
			}
		},
	});

	const myDate = new Date();
	myDate.setDate(myDate.getDate() - 6571);

	const checkApplicationStatus = async (event) => {
		formik.handleBlur(event);
		if (event.target.value !== "" || event.target.value !== null) {
			let body = {
				email: event.target.value,
			};
			if (event.target.value !== "") {
				let result = await axios({
					method: "POST",
					url: "/customer/get_customer_by_email",
					data: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (result && result.data.AppSubmittedInLast30Days === true) {
					setAppliedInLast30Days(true);
				} else {
					setAppliedInLast30Days(false);
				}
			}
		}
	};

	//onchange validation
	const onNameChange = (event) => {
		const reg = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
		let acc = event.target.value;

		if (acc === "" || reg.test(acc)) {
			formik.handleChange(event);
		}
	};
	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};

	//on email change call validation
	const emailOnChange = (event) => {
		setSsnEmailMatch(true);
		formik.handleChange(event);
	};

	//set auto focus
	function autoFocus() {
		var firstname = document.getElementById("firstName").value;
		var lastname = document.getElementById("lastName").value;
		if (firstname === "") {
			document.getElementById("firstName").focus();
		}
		if (lastname === "") {
			if (firstname === "") {
				document.getElementById("firstName").focus();
			} else {
				document.getElementById("lastName").focus();
			}
		}
	}

	//redirects to select amount if directly calls
	if (
		data.completedPage < data.page.homeAddress ||
		data.formStatus === "completed"
	) {
		navigate("/select-amount");
	}

	//JSX [part]
	return (
		<div>
			<ScrollToTopOnMount />
			<div className={classes.mainDiv}>
				<Box>
					<Grid
						item
						xs={ 12 }
						container
						alignItems="center"
						className={innerClasses.gridAlign}
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
							alignItems="center"
						>
							<Paper
								id="aboutYourselfWrap"
								className={innerClasses.paperStyle}
							>
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det40 determinate slantDiv"
									/>
									<span className="floatLeft detNum40">40%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/home-address" id="arrowBack">
										<i className="material-icons dp48 yellowText  floatingButton">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid>
									<img
										alt="person logo"
										src={ PersonLogo }
										className="spinAnimation"
									/>
								</Grid>

								<Typography
									variant="h5"
									className={innerClasses.typoStyle}
								>
									Tell us about yourself
								</Typography>
								<form onSubmit={ formik.handleSubmit }>
									<Grid
										item
										md={ 12 }
										className={innerClasses.justifyGrid}
										container
										alignItems="center"
									>
										<Grid
											container
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className="textBlock"
										>
											<TextField
												fullWidth
												autoFocus
												id="firstName"
												name="firstName"
												label="First Name *"
												materialProps={ { maxLength: "30" } }
												value={ formik.values.firstName }
												onChange={ onNameChange }
												onBlur={ formik.handleBlur }
												error={
													formik.touched.firstName &&
													Boolean(formik.errors.firstName)
												}
												helperText={
													formik.touched.firstName && formik.errors.firstName
												}
												disabled={ data.disabled }
											/>
										</Grid>
										<Grid
											container
											justifyContent="flex-start"
											alignItems="flex-start"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className="textBlock"
										>
											<TextField
												fullWidth
												id="lastName"
												name="lastName"
												label="Last Name *"
												materialProps={ { maxLength: "30" } }
												value={ formik.values.lastName }
												onChange={ onNameChange }
												onBlur={ formik.handleBlur }
												error={
													formik.touched.lastName &&
													Boolean(formik.errors.lastName)
												}
												helperText={
													formik.touched.lastName && formik.errors.lastName
												}
												disabled={ data.disabled }
											/>
											<div className="MuiTypography-alignLeft">
												<Typography className="smallTextLeft">
													Please provide your full legal name.
												</Typography>
											</div>
										</Grid>
										<Grid
											container
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className="textBlock"
										>
											<DatePicker
												name="dob"
												label="Date of Birth *"
												id="dob"
												placeholder="MM/DD/YYYY"
												format="MM/dd/yyyy"
												maxdate={ myDate }
												minyear={ 102 }
												value={ formik.values.dob }
												onChange={ (values) => {
													formik.setFieldValue("dob", values);
												} }
												onBlur={ formik.handleBlur }
												error={
													formik.touched.dob && Boolean(formik.errors.dob)
												}
												helperText={ formik.touched.dob && formik.errors.dob }
											/>

											<div className="MuiTypography-alignLeft">
												<Typography className="smallTextLeft" align="left">
													Please ensure your DOB meets the following criteria:
													Your age must be greater than or equal to 18 years.
												</Typography>
											</div>
										</Grid>
										<Grid
											container
											justifyContent="flex-start"
											alignItems="flex-start"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											direction="row"
											className="textBlock"
											id="tellUs"
										>
											{ data.last4SSN ? (
												<TextField
													fullWidth
													id="last4ssn"
													name="last4ssn"
													label="Social Security Number *"
													materialProps={ { maxLength: "30" } }
													value={ formik.values.lastSSN }
													onBlur={ formik.handleBlur }
													error={
														formik.touched.lastSSN &&
														Boolean(formik.errors.lastSSN)
													}
													helperText={
														formik.touched.lastSSN && formik.errors.lastSSN
													}
													disabled={ data.disabled }
												/>
											) : (
												<SocialSecurityNumber
													name="ssn"
													label="Social Security Number *"
													placeholder="Enter your Social Security Number"
													id="ssn"
													type="ssn"
													value={ formik.values.ssn }
													onChange={ emailOnChange }
													onBlur={ formik.handleBlur }
													error={
														formik.touched.ssn && Boolean(formik.errors.ssn)
													}
													helperText={ formik.touched.ssn && formik.errors.ssn }
												/>
											) }

											<div className="MuiTypography-alignLeft">
												<Typography className="smallTextLeft" align="left">
													Your SSN is required to pull your credit information.
												</Typography>
											</div>
										</Grid>
										<Grid
											container
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className="textBlock"
										>
											<EmailTextField
												fullWidth
												id="email"
												name="email"
												label="Email *"
												onKeyDown={ preventSpace }
												value={ formik.values.email }
												materialProps={ { maxLength: "100" } }
												onLoad={ checkApplicationStatus }
												onChange={ emailOnChange }
												onBlur={ checkApplicationStatus }
												error={
													formik.touched.email && Boolean(formik.errors.email)
												}
												helperText={ formik.touched.email && formik.errors.email }
												disabled={ data.disabled }
											/>
											<p
												className={
													appliedInLast30Days
														? "showError smallTextLeftError"
														: "hideError "
												}
											>
												It looks like you have already submitted an application
												within the last 30 days.
											</p>
										</Grid>

										<Grid
											container
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className="textBlock"
											id="phoneInput"
										>
											<PhoneNumber
												name="phone"
												label="Phone number *"
												placeholder="Enter your phone number"
												id="phone"
												type="text"
												onKeyDown={ preventSpace }
												value={ formik.values.phone }
												onChange={ formik.handleChange }
												onBlur={ formik.handleBlur }
												error={
													formik.touched.phone && Boolean(formik.errors.phone)
												}
												helperText={ formik.touched.phone && formik.errors.phone }
											/>
											<div className="alignErrorLeft">
												<Typography
													className={
														error
															? "showError smallTextLeftError pad top"
															: "hideError "
													}
													align="left"
												>
													It looks like you already have an account. Please{ " " }
													<a href="/login">sign in.</a>
												</Typography>
												<Typography
													className={
														!ssnEmailMatch
															? "showError smallTextLeftError pad top"
															: "hideError "
													}
													align="left"
												>
													Please <a href="/login">sign in.</a>
												</Typography>
											</div>
										</Grid>
										<Grid
											container
											className={innerClasses.justifyGridMargin}
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
										>
											<ButtonPrimary
												onClick={ autoFocus }
												type="submit"
												stylebutton='{"background": "#FFBC23", "color": "black","fontSize":"0.938rem", "padding":"0px 30px"}'
												disabled={ appliedInLast30Days || error || loading }
											>
												Continue
												<i
													className="fa fa-refresh fa-spin customSpinner"
													style={ {
														marginRight: "10px",
														display: loading ? "block" : "none",
													} }
												/>
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
