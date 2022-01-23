import React, { useContext, useState } from "react";
import "./NewUser.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ButtonPrimary, PasswordField } from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import { Link, useHistory } from "react-router-dom";
import PasswordLogo from "../../../../assets/icon/I-Password.png";
import { useFormik } from "formik";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import * as yup from "yup";
import axios from "axios";
import ScrollToTopOnMount from "../ScrollToTop";
import LoginController from "../../../Controllers/LoginController";
import Cookies from "js-cookie";
import { encryptAES } from "../../../lib/Crypto";

//YUP validation schema
const validationSchema = yup.object({
	newPassword: yup
		.string("Enter your password")
		.matches(
			/^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
			"Your password doesn't meet the criteria"
		)
		.max(30, "Password can be upto 30 characters length")
		.min(8, "Password should be minimum of 8 characters length")
		.required("Your Password is required"),

	confirmPassword: yup
		.string()
		.required("Your password confirmation is required")
		.max(30, "Password can be upto 30 characters length")
		.min(8, "Password should be minimum of 8 characters length")
		.when("newPassword", {
			is: (newPassword) => newPassword && newPassword.length > 0,
			then: yup
				.string()
				.oneOf(
					[yup.ref("newPassword")],
					"Your confirmation password must match your password"
				),
		}),
});

//  New user functional component

function NewUser() {
	const history = useHistory();
	const { data, setData } = useContext(CheckMyOffers);
	const [failed, setFailed] = useState(false);
	const [loading, setLoading] = useState(false);

	//configuring formik
	const formik = useFormik({
		initialValues: {
			newPassword: "",
			confirmPassword: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			//register the new user and procceds
			setLoading(true);
			setData({
				...data,
				password: values.newPassword,
				confirmPassword: values.confirmPassword,
				completedPage: data.page.newUser,
			});
			let body = {
				fname: data.firstName,
				lname: data.lastName,
				email: data.email,
				ssn: data.ssn,
				zip_code: data.zip,
				password: values.newPassword,
				birth_year: data.dob.getFullYear().toString(),
				birth_month: ("0" + (data.dob.getMonth() + 1)).slice(-2),
				birth_day: ("0" + (data.dob.getDate() + 1)).slice(-2),
				address_street: data.streetAddress,
				address_city: data.city,
				address_state: data.state,
			};
			try {
				let customerStatus = await axios({
					method: "POST",
					url: "/customer/register_new_user",
					data: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
					},
					transformRequest: (request, headers) => {
						delete headers.common["Content-Type"];
						return request;
					},
				});
				//login the user if registerd successfully and stores the JWT token
				if (
					customerStatus.data?.customerFound === false &&
					customerStatus.data?.userFound === false &&
					customerStatus.data?.is_registration_failed === false
				) {
					let retVal = await LoginController(
						data.email,
						values.newPassword,
						""
					);
					if (
						retVal?.data?.data?.user &&
						retVal?.data?.data?.userFound === true
					) {
						let rememberMe = false;
						var now = new Date().getTime();
						// localStorage.clear();
						Cookies.set(
							"token",
							JSON.stringify({
								isLoggedIn: true,
								apiKey:
									retVal?.data?.data?.user?.extensionattributes?.login
										?.jwt_token,
								setupTime: now,
							})
						);
						Cookies.set(
							"cred",
							encryptAES(
								JSON.stringify({
									email: data.email,
									password: values.newPassword,
								})
							)
						);

						rememberMe === true
							? Cookies.set(
								"rememberMe",
								JSON.stringify({
									selected: true,
									email: values.email,
									password: values.password,
								})
							)
							: Cookies.set(
								"rememberMe",
								JSON.stringify({ selected: false, email: "", password: "" })
							);

						setLoading(false);
						history.push({
							pathname: "employment-status",
						});
					} else if (
						retVal?.data?.data?.result === "error" ||
						retVal?.data?.data?.hasError === true
					) {
						Cookies.set(
							"token",
							JSON.stringify({ isLoggedIn: false, apiKey: "", setupTime: "" })
						);
						setLoading(false);
					} else {
						setLoading(false);
						alert("Network error");
					}
					// history.push("employment-status");
				} else if (
					customerStatus.data?.result === "error" &&
					customerStatus.data?.statusCode === 400
				) {
					setFailed(true);
					setLoading(false);
				} else {
					alert("network error from register api");
					setFailed(false);
					setLoading(false);
				}
			} catch (error) {
				alert("network error from catch");
				setLoading(false);
			}
		},
	});

	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};

	//redirects to select amount on direct call
	if (
		data.completedPage < data.page.personalInfo ||
		data.formStatus === "completed"
	) {
		history.push("/select-amount");
	}

	//View part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid
						item
						xs={12}
						container
						justifyContent="center"
						style={{ width: "100%", paddingTop: "70px", paddingBottom: "70px" }}
					>
						<Grid
							container
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6}
							item
							className="cardWrapper"
							justifyContent="center"
							style={{ width: "100%" }}
						>
							<Paper
								className="cardWOPadding"
								id="securePasswordWrap"
								justify="center"
								alignitems="center"
							>
								<div className="progress mt-0">
									<span className="floatLeft detNum5" />
								</div>
								<Grid className="floatLeft">
									<Link to="/personal-info">
										<i className="material-icons dp48 yellowText  ">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img
										src={PasswordLogo}
										alt="passwordlogo"
										className="spinAnimation"
									/>
								</Grid>
								<Typography
									align="center"
									justify="center"
									alignitems="center"
									className="borrowCSS"
								>
									We have detected you are a new customer.
								</Typography>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignitems="center"
									className="borrowCSSLP"
								>
									Please create a secure account with us.
								</Typography>

								<form onSubmit={formik.handleSubmit}>
									<Grid
										md={12}
										item
										className="blockDiv"
										container
										justifyContent="center"
										style={{ width: "100%" }}
									>
										<Grid
											container
											justifyContent="center"
											style={{ width: "100%" }}
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlock"
										>
											<PasswordField
												id="createPasswordWrap"
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
											<p className="subText passwordMeetTxt">
												Please ensure your password meets the following
												criteria: between 8 and 30 characters in length, at
												least 1 uppercase letter, at least 1 lowercase letter,
												and at least 1 number
											</p>
											<PasswordField
												id="confirmPasswordWrap"
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
											<p
												className={failed ? "showError" : "hideError"}
												data-testid="subtitle"
											>
												{" "}
												Account not created. For help please contact us at (844)
												306-7300
											</p>
										</Grid>
										<Grid
											justifyContent="center"
											style={{ width: "100%" }}
											item
											container
											lg={8}
											md={8}
											xs={12}
											className="textBlock alignButton"
										>
											<ButtonPrimary
												type="submit"
												data-testid="contButton"
												disabled={loading}
												stylebutton='{"background": "#FFBC23", "fontSize": "0.938rem", "padding": "0px 30px", "color": "black"}'
											>
												Sign In
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

export default NewUser;
