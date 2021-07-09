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
import TextField1 from '@material-ui/core/TextField';
import { CheckMyOffers } from '../../../contexts/CheckMyOffers';
import {
	TextField,
	EmailTextField,
	TextFieldWithIcon,
	PhoneNumber,
	DatePicker,
	Button,
} from "../../FormsUI";
import { useFormik } from "formik";
import * as yup from "yup";


const validationSchema = yup.object({
	firstName: yup
		.string("Enter your First Name")
		.max(30, "First Name should be of minimum 30 characters")
		.required("First Name is required"),
        lastName: yup
		.string("Enter your Last Name")
		.max(30, "Last Name should be of minimum 30 characters")
		.required("Last Name is required"),
        email: yup
		.string("Enter your Email Address")
		.email("Invalid Email")
		.required("Email Address is required"),
		// 	phone: yup
		// 	.string("Enter your Phone Number")
		// 	.max(10, "Phone Number should be of minimum 10 digits")
		// 	.required("Phone Number is required"),
		
	});

	function PersonalInfo() {
		const { data } = useContext(CheckMyOffers);
		const history = useHistory();
		const formik = useFormik({
			initialValues: {
				firstName: data.firstName ? data.firstName : "",
				lastName: data.lastName ? data.lastName : "",
				dob: data.dob ? data.dob : "",
				email: data.email ? data.email : "",
				// phone: data.phone ? data.phone : "",
			},
			validationSchema: validationSchema,
			onSubmit: (values) => {
				data.firstName = values.firstName;
				data.lastName = values.lastName;
				data.email = values.email;
				data.phone = values.phone;
				data.dob = values.dob;
				console.log("data");
				history.push("/new-user");
			},
		});
		

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
										<Link to="/zipcode"><i class="material-icons dp48 yellowText  ">arrow_back</i></Link>
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
										<Grid justify="center" alignItems="center" item lg={8} md={8} xs={12} className="textBlock" >
											<TextField
												fullWidth
												id="firstName"
												name="firstName"
												label="First Name"
												value={formik.values.firstName}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched.firstName && Boolean(formik.errors.firstName)}
												helperText={formik.touched.firstName && formik.errors.firstName}
											/>
											{/* <TextFieldWithIcon
										name="firstName"
										label="Enter Username"
										icon="cloud"
										iconColor="#595E6E"
										iconPosition="left"
										required={true}
										value={formik.values.firstName}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.firstName && Boolean(formik.errors.firstName)}
										helperText={formik.touched.firstName && formik.errors.firstName}

										// customClass='fa fa-plus-circle'
									/> */}
										</Grid>
                                        <Grid justify="center" alignItems="center" item lg={8} md={8} xs={12} className="textBlock" >
											<TextField
												fullWidth
												id="lastName"
												name="lastName"
												label="Last Name"
												value={formik.values.lastName}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched.lastName && Boolean(formik.errors.lastName)}
												helperText={formik.touched.lastName && formik.errors.lastName}
											/>
											<div className="MuiTypography-alignLeft">
											<Typography className="smallTextLeft" variant="p" align="left">
											Please provide your full legal name.											
											</Typography>
											</div>
											
										</Grid>
										<Grid justify="center" alignItems="center" item lg={8} md={8} xs={12} className="textBlock" >
											{/* Date Picker */}
											<DatePicker name="dob" label="Date of Birth"
											// value={formik.values.dob}
											// onChange={formik.handleChange}
											// onBlur={formik.handleBlur}
											// error={formik.touched.dob && Boolean(formik.errors.dob)}
											// helperText={formik.touched.dob && formik.errors.dob} 
											// defaultDate={new Date("2021-06-29T21:11:54")}
											/>
										</Grid>
                                        <Grid justify="center" alignItems="center" item lg={8} md={8} xs={12} className="textBlock" >
											<EmailTextField
												fullWidth
												id="email"
												name="email"
												label="Email"
												value={formik.values.email}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched.email && Boolean(formik.errors.email)}
												helperText={formik.touched.email && formik.errors.email}
											/>
										</Grid>
                                        <Grid justify="center" alignItems="center" item lg={8} md={8} xs={12} className="textBlock" >
											<PhoneNumber
												fullWidth
												id="phone"
												name="phone"

												// label="Phone Number"
												// value={formik.values.phone}
												// onChange={formik.handleChange}
												// onBlur={formik.handleBlur}
												// error={formik.touched.phone && Boolean(formik.errors.phone)}
												// helperText={formik.touched.phone && formik.errors.phone}
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
											<Button
												type="submit"
												stylebutton='{"background": "#0F4EB3", "height": "inherit", "color": "white"}'
											>
												<Typography
													align="center"
													className="textCSS whiteText"
												>
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
