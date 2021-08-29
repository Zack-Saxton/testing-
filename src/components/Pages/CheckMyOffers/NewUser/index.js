import React, { useContext, useState } from "react";
import "./newUser.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {  ButtonPrimary, PasswordField } from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import { useHistory, Link } from "react-router-dom";
import PasswordLogo from "../../../../assets/icon/I-Password.png";
import { useFormik } from "formik";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import * as yup from "yup";
import axios from 'axios';
import ScrollToTopOnMount from '../scrollToTop';

const validationSchema = yup.object({
	newPassword: yup
		.string("Enter your password")
		.matches(
			/^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
			"Your password doesn't meet the criteria"
		  )
		.max(30, "Password can be upto 30 characters length")
		.min(8, "Password should be minimum of 8 characters length")
		.required("Password is required"),

	confirmPassword: yup
		.string()
		.required("Please confirm your password")
		.max(30, "Password can be upto 30 characters length")
		.min(8, "Password should be minimum of 8 characters length")
		.when("newPassword", {
			is: (newPassword) =>
				newPassword && newPassword.length > 0 ? true : false,
			then: yup
				.string()
				.oneOf([yup.ref("newPassword")], "Password doesn't match"),
		}),

		
});

function NewUser() {
	const history = useHistory();
	const { data, setData } = useContext(CheckMyOffers);
	const [failed, setFailed] = useState(false);
	const [loading, setLoading] = useState(false);
	const formik = useFormik({
		initialValues: {
			newPassword: "",
			confirmPassword: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			setData({
				...data,
				"password": values.newPassword,
				"confirmPassword": values.confirmPassword,
				"completedPage": data.page.newUser
			});
			let body = {
				"fname": data.firstName,
				"lname": data.lastName,
				"email": data.email,
				"ssn": data.ssn,
				"zip_code": data.zip,
				"password": values.newPassword,
				"birth_year": data.dob.getFullYear().toString(),
				"birth_month": ("0" + (data.dob.getMonth() + 1)).slice(-2),
				"birth_day": ("0" + (data.dob.getDate() + 1)).slice(-2),
				"address_street": data.streetAddress,
				"address_city": data.city,
				"address_state": data.state
			};
try{
	let customerStatus  = await axios({
		method: "POST",
		url: "/customer/register_new_user",
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

	if(customerStatus.data?.customerFound === false && customerStatus.data?.userFound === false && customerStatus.data?.is_registration_failed === false){
      
		history.push("employment-status");
	  }
	  else if(customerStatus.data?.result === 'error' && customerStatus.data?.statusCode === 400){
		// alert("Account already exists. Please use the login page and forgot password function to login");
	   
		setFailed(true);
		setLoading(false);
	  }
	  else{
		alert("network error");
		setFailed(false);
		setLoading(false);
		
  
	  }
}
catch(error){
   
    alert("network error");
    setLoading(false);
  }
			

			// history.push("/employment-status");S
			
		},
	});

	const preventSpace = (event) => {
		if (event.keyCode === 32) {
		  event.preventDefault();
		}
	  };

	  if (data.completedPage < data.page.personalInfo || data.formStatus === 'completed'){
		history.push("/select-amount");
	}

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
									{/* <div
										id="determinate"
										className="det5  determinate slantDiv"
									></div> */}
									<span class="floatLeft detNum5"></span>
								</div>
								<Grid className="floatLeft">
									<Link to="/personal-info">
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img src={PasswordLogo} alt="passwordlogo" className="spinAnimation" />
								</Grid>
								<Typography
									variant="p"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSS"
								>
									We have detected you are a new customer.
								</Typography>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSSLP"
								>
									Please create a secure account with us.
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
											<PasswordField
												name="newPassword"
												label="Create Password *"
												type="password"
												data-testid="password"
												materialProps={{ maxLength: "30" }}
												onKeyDown={preventSpace}
												value={formik.values.newPassword}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.newPassword &&
													Boolean(formik.errors.newPassword)
												}
												helperText={
													formik.touched.newPassword &&
													formik.errors.newPassword
												}
											/>
											<p className="subText">
												Please ensure your password meets the following
												criteria: between 8 and 30 characters in length, at
												least 1 uppercase letter, at least 1 lowercase letter,
												and at least 1 number
											</p>
											<PasswordField
												name="confirmPassword"
												label="Confirm Password *"
												type="confirmPassword"
												data-testid="confirmpassword"
												materialProps={{ maxLength: "30" }}
												onKeyDown={preventSpace}
												value={formik.values.confirmPassword}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.confirmPassword &&
													Boolean(formik.errors.confirmPassword)
												}
												helperText={
													formik.touched.confirmPassword &&
													formik.errors.confirmPassword
												}
											/>
											<p className={ failed ? "showError" : "hideError" } data-testid="subtitle">
                  {" "}
                  Account not created. For help please contact us at (844) 306-7300
                </p>
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
												data-testid="contButton"
												disabled = { loading }
												stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
											>
												<Typography align="center" className="textCSS ">
													Sign In
												</Typography>
												<i
													className="fa fa-refresh fa-spin customSpinner"
													style={{ marginRight: "10px", display: loading ? "block" : "none" }}
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

export default NewUser;
