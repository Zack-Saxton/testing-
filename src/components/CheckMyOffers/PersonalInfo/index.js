import Header from "../../Layout/NormalHeader/NormalHeader";
import Footer from "../../Layout/NormalFooter/NormalFooter";
import "./personalinfo.css";
import "../checkMyOffer.css";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import React, { useState, useContext } from "react";
import PersonLogo from "../../../assets/icon/I-Personal-Info.png";
import { useHistory, Link } from "react-router-dom";
import TextField1 from "@material-ui/core/TextField";
import { format } from "date-fns";
import { CheckMyOffers } from "../../../contexts/CheckMyOffers";
import {
	TextField,
	EmailTextField,
	TextFieldWithIcon,
	PhoneNumber,
	DatePicker,
	Button,
	SocialSecurityNumber,
} from "../../FormsUI";
import { useFormik } from "formik";
import * as yup from "yup";

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
			/^(([^<>()[\]\\.,;:@\"]+(\.[^<>()[\]\\.,;:@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Invalid Email"
		)
		.required("Your email address is required"),
	ssn: yup
		.string("Enter a SSN")
		.required("Your SSN is required")
		.transform((value) => value.replace(/[^\d]/g, ""))
		.min(9, "Name must contain at least 9 digits"),

	phone: yup
		.string("Enter a name")
		.required("Your Phone number is required")
		.transform((value) => value.replace(/[^\d]/g, ""))
		.matches(	
			/^1[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
			"Invalid Phone"
		)
		
		
		.min(11, "Name must contain at least 10 digits"),

	date: yup
	.date("Please enter valid date")
    .nullable()
    .required("Your date of birth is required")
    .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
	.typeError('Please enter a valid date'),
});

function PersonalInfo() {
	const { data, setData } = useContext(CheckMyOffers);
	const [tempDate, setTempDate] = useState(null);
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
		onSubmit: (values) => {
			data.firstName = values.firstName;
			data.lastName = values.lastName;
			data.email = values.email;
			data.phone = values.phone;
			data.date = format(values.date, "dd-MM-yyyy"); 
			data.ssn = values.ssn.replace(/-/g, "").replace(/ /g, "") || "";
			var phone = values.phone.replace(/-/g, "").replace(/\)/g, "").replace(/\(/g, "").replace(/ /g, "") || "";
			data.phone = phone.slice(1);
			data.dob = values.date;
			console.log(data);

			history.push("/employment-status");
		},
	});
	
	var myDate = new Date();
	myDate.setDate(myDate.getDate() - 6571);

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

			console.log(formik.values);
	return (
		<div>
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
										className="det4 determinate slantDiv"
									></div>
									<span class="floatLeft detNum4">33%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/home-address">
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid>
									<img src={PersonLogo} className="spinAnimation" />
								</Grid>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSS"
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
											<EmailTextField
												fullWidth
												id="email"
												name="email"
												label="Email *"
												onKeyDown={preventSpace}
												value={formik.values.email}
												materialProps={{"maxLength": "100"}}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.email && Boolean(formik.errors.email)
												}
												helperText={formik.touched.email && formik.errors.email}
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
											<Button
												type="submit"
												stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
											>
												<Typography align="center" className="textCSS ">
													Continue
												</Typography>
											</Button>
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
