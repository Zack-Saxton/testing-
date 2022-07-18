import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import globalMessages from '../../../../assets/data/globalMessages.json';
import PersonLogo from "../../../../assets/icon/I-Personal-Info.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { creatProspect } from "../../../Controllers/CheckMyOffersController";
import {
	ButtonPrimary,
	DatePicker,
	EmailTextField,
	// PhoneNumber,
	SocialSecurityNumber,
	TextField
} from "../../../FormsUI";
import "../CheckMyOffer.css";
import ScrollToTopOnMount from "../ScrollToTop";
import "./PersonalInfo.css";
import {checkCustomeruser,checkApplicationStatus} from "../../../Controllers/PersonalInfoController";

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

const useStyles = makeStyles(() => ({
	gridPadding: {
		justifyContent: "center",
		padding: "4% 0%"
	},
	paperStyle: {
		justify: "center",
		alignItems: "center",
		textAlign: "center",
		// padding: "0% 4%",
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
	justifyGrid: {
		justifyContent: "center",
		alignItems: "stretch",
		textAlign: "center",
		padding: "0% 4%"
	},
	justifyGridMargin: {
		justifyContent: "center",
		margin: " 15px 0px 19px 0px"
	},
	gridAlign: {
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
	const [ phoneNumberValue, setPhoneNumberValue ] = useState("");
  const [ phoneNumberCurrentValue, setPhoneNumberCurrentValue ] = useState("");
	const componentMounted = useRef(true);                                               //
	const navigate = useNavigate();
	const innerClasses = useStyles();
	const classes = preLoginStyle();
	const myDate = new Date();
	myDate.setDate(myDate.getDate() - 6571);
	let refFirstName = useRef();
	let refLastName = useRef();

	const phoneNumberMask = (values) => {
		let phoneNumber = values.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
		values = !phoneNumber[ 2 ] ? phoneNumber[ 1 ] : '(' + phoneNumber[ 1 ] + ') ' + phoneNumber[ 2 ] + (phoneNumber[ 3 ] ? '-' + phoneNumber[ 3 ] : '');
		return (values);
	}

	const maskPhoneNumberWithAsterisk = (phoneNumber) => {
		let firstNumber = phoneNumberMask(phoneNumber).slice(0, 10);		
		return firstNumber.replace(/\d/g, '*') + phoneNumber.slice(10);		
		}

		useEffect(() => {
			setPhoneNumberValue( data?.phone ?? "");
			setPhoneNumberCurrentValue(maskPhoneNumberWithAsterisk(phoneNumberMask( data.phone ?? "")));
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [ data.phone ]);

	
	const ifReducer = (customerStatus, values) => {
		if (customerStatus.data.user.email === values.email) {
			if (customerStatus.data?.ssnLookupFails) {
				setSsnEmailMatch(false);
				setError(false);
				setLoading(false);
			} else {
				setSsnEmailMatch(true);
				setError(false);
				setLoading(false);
				navigate("/existing-user");
			}
		} else {
			setSsnEmailMatch(false);
			setError(false);
			setLoading(false);
		}
	} 

	//configuring formik
	const formik = useFormik({
		initialValues: {
			firstName: data.firstName ? data.firstName : "",
			lastName: data.lastName ? data.lastName : "",
			email: data.email ? data.email : "",
			ssn: data.ssn ? data.ssn : "",
			lastSSN: data.last4SSN ? data.last4SSN : "",
			phone: data.phone ? data.phone : "",
			dob: data.dob ? data.dob : null,
			checkSSN: data.last4SSN ? true : false,
		},
		validationSchema: validationSchema,

		//On submit functionality updating context values
		onSubmit: async (values) => {
			const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : "{ }");
			setLoading(true);
			//To check the component is mounted or not to update the state
			if (componentMounted.current) {
				data.firstName = values.firstName.trim();
				data.lastName = values.lastName.trim();
				data.email = values.email;
				data.phone = values.phone;
				data.ssn = data.last4SSN
					? data.ssn
					: values?.ssn.replace(/\$|\,/g, "")
				data.phone = phoneNumberValue;
				data.dob = values.dob;
				data.completedPage = data.page.personalInfo;

				//Prospect
				creatProspect(data);

				if (values.email && values.ssn) {
					let body = {
						email: values.email,
						ssn: data.last4SSN
							? data.ssn
							: values.ssn,
						isAuthenticated: true,
					};

					if (loginToken?.isLoggedIn) {
						data.completedPage = data.page.existingUser;
						setError(false);
						setLoading(false);
						navigate("/employment-status");
					} else {
						let customerStatus = await checkCustomeruser(body);
                         if (customerStatus.data.customerFound) {
							ifReducer(customerStatus, values)
						
						} else if (!customerStatus.data.customerFound && customerStatus.data.errorMessage !== "More than 1 customer record retrieved ") {
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
			}
		},
	});

	

	const checkApplicationStatus = async (event) => {
		formik.handleBlur(event);
		if (event.target.value) {
			let body = {
				email: event.target.value.trim(),
			};
			if (event.target.value !== "") {
				let result = await checkApplicationStatus(body)
				if (result?.data?.AppSubmittedInLast30Days) {
					setAppliedInLast30Days(true);
				} else {
					setAppliedInLast30Days(false);
				}
			}
		}
	};

	//onchange validation
	const onNameChange = (event) => {
		const pattern = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
		let name = event.target.value.trim();
		if (!name || pattern.test(name)) {
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
		if (!refFirstName.current.value) {
			refFirstName.current.focus();
		} else if (!refLastName.current.value) {
			refLastName.current.focus();
		}
	}
	useEffect(() => {
		//redirects to select amount if directly calls
		if (data.completedPage < data.page.homeAddress || data.formStatus === "completed") {
			navigate("/select-amount");
		}
		return () => { // This code runs when component is unmounted
			componentMounted.current = false; // set it to false when we leave the page
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateActualValue = (_event) => {
	    setPhoneNumberCurrentValue(phoneNumberMask(phoneNumberValue));
  }
  const updateMaskValue = (_event) => {	
    setPhoneNumberCurrentValue(maskPhoneNumberWithAsterisk(phoneNumberMask(phoneNumberValue))) ;
  }
  const updateEnterPhoneNo = (event) =>{
	  setPhoneNumberValue(event.target.value);
    setPhoneNumberCurrentValue(phoneNumberMask(event.target.value));
  }
	const shortANDoperation = (pramOne, pramtwo) => {
		return pramOne && pramtwo
	};

	//JSX [part]
	return (
		<div data-testid="personal_Info_component">
			<ScrollToTopOnMount />
			<div className={classes.mainDiv}>
				<Box>
					<Grid
						item
						xs={12}
						container
						alignItems="center"
						className={innerClasses.gridAlign}
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
										src={PersonLogo}
										className="spinAnimation"
									/>
								</Grid>

								<Typography
									variant="h5"
									className={innerClasses.typoStyle}
								>
									Tell us about yourself
								</Typography>
								<form onSubmit={formik.handleSubmit}>
									<Grid
										item
										md={12}
										className={innerClasses.justifyGrid}
										container
										alignItems="center"
									>
										<Grid
											container
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
												materialProps={{ maxLength: "30", ref: refFirstName, }}
												value={formik.values.firstName}
												onChange={onNameChange}
												onBlur={formik.handleBlur}
												error={shortANDoperation(formik.touched.firstName, Boolean(formik.errors.firstName))}
                        helperText = {shortANDoperation(formik.touched.firstName , formik.errors.firstName)}
												disabled={data.disabled}
											/>
										</Grid>
										<Grid
											container
											justifyContent="flex-start"
											alignItems="flex-start"
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
												materialProps={{ maxLength: "30", ref: refLastName, }}
												value={formik.values.lastName}
												onChange={onNameChange}
												onBlur={formik.handleBlur}
												error={shortANDoperation(formik.touched.lastName, Boolean(formik.errors.lastName))}
                        helperText = {shortANDoperation(formik.touched.lastName, formik.errors.lastName)}
												disabled={data.disabled}
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
											lg={8}
											md={8}
											xs={12}
											className="textBlock"
										>
											<DatePicker
												name="dob"
												label="Date of Birth *"
												placeholder="MM/DD/YYYY"
												id="dob"
												autoComplete="off"
												maxdate={myDate}
												minyear={102}
												value={formik.values.dob}
												onChange={(values) => {
													formik.values.dob = values;
													formik.setFieldValue("dob", values);
												}}
												onBlur={formik.handleBlur}
												error={shortANDoperation(formik.touched.dob, Boolean(formik.errors.dob))}
                        helperText = {shortANDoperation(formik.touched.dob, formik.errors.dob)}
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
											lg={8}
											md={8}
											xs={12}
											direction="row"
											className="textBlock"
											id="tellUs"
										>
											{data.last4SSN ? (
												<TextField
													fullWidth
													id="last4ssn"
													name="last4ssn"
													label="Social Security Number *"
													materialProps={{ maxLength: "30" }}
													value={formik.values.lastSSN}
													onBlur={formik.handleBlur}
													error={shortANDoperation(formik.touched.lastSSN, Boolean(formik.errors.lastSSN))}
													helperText = {shortANDoperation(formik.touched.lastSSN, formik.errors.lastSSN)}
													disabled={data.disabled}
												/>
											) : (
												<SocialSecurityNumber
													name="ssn"
													label="Social Security Number *"
													placeholder="Enter your Social Security Number"
													id="ssn"
													type="ssn"
													value={formik.values.ssn}
													onChange={emailOnChange}
													onBlur={formik.handleBlur}
													error={shortANDoperation(formik.touched.ssn, Boolean(formik.errors.ssn))}
													helperText = {shortANDoperation(formik.touched.ssn, formik.errors.ssn)}
												/>
											)}

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
												materialProps={{ maxLength: "100" }}
												onLoad={checkApplicationStatus}
												onChange={emailOnChange}
												onBlur={checkApplicationStatus}
												error={shortANDoperation(formik.touched.email, Boolean(formik.errors.email))}
												helperText = {shortANDoperation(formik.touched.email, formik.errors.email)}
												disabled={data.disabled}
											/>
											<p
												className={
													appliedInLast30Days
														? "showError smallTextLeftError"
														: "hideError "
												}
											>
												{globalMessages.Application_already_Submitted}
											</p>
										</Grid>

										<Grid
											container
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlock"
											id="phoneInput"
										>
											 <TextField
															name="phone"
															label="Phone number *"
															placeholder="Enter your phone number"
															id="phone"
															type="text"
															onKeyDown={preventSpace}
															onBlur={(event)=>{
																updateMaskValue(event);
																formik.handleBlur(event);
															}}
															value = { phoneNumberCurrentValue }
															onChange={(event)=>{
																updateEnterPhoneNo(event);
																formik.handleChange(event);
															}}
															error={shortANDoperation(formik.touched.phone, Boolean(formik.errors.phone))}
															helperText = {shortANDoperation(formik.touched.phone, formik.errors.phone)}
															onFocus={ updateActualValue }
															disabled={ data.phone }
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
													It looks like you already have an account. Please{" "}
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
											lg={8}
											md={8}
											xs={12}
										>
											<ButtonPrimary
												onClick={autoFocus}
												type="submit"
												stylebutton='{"background": "#FFBC23", "color": "black","fontSize":"0.938rem", "padding":"0px 30px"}'
												disabled={appliedInLast30Days || error || loading}
											>
												Continue
												<i
													className="fa fa-refresh fa-spin customSpinner"
													style={{
														marginRight: "10px",
														display: loading ? "block" : "none",
													}}
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
