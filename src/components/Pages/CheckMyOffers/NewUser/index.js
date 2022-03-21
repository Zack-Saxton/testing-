import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { useQueryClient } from 'react-query';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import globalMessages from '../../../../assets/data/globalMessages.json';
import PasswordLogo from "../../../../assets/icon/I-Password.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import LoginController, { RegisterController } from "../../../Controllers/LoginController";
import { ButtonPrimary, PasswordField } from "../../../FormsUI";
import { encryptAES } from "../../../lib/Crypto";
import ErrorLogger from "../../../lib/ErrorLogger";
import ScrollToTopOnMount from "../ScrollToTop";
import "./NewUser.css";
//YUP validation schema
const validationSchema = yup.object({
	newPassword: yup
		.string(globalMessages.PasswordEnter)
		.matches(/^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/, "Your password doesn't meet the criteria")
		.max(30, globalMessages.PasswordMax)
		.min(8, globalMessages.PasswordMin)
		.required(globalMessages.PasswordRequired),
	confirmPassword: yup
		.string()
		.required(globalMessages.PasswordConfirmationRequired)
		.max(30, globalMessages.PasswordMax)
		.min(8, globalMessages.PasswordMin)
		.when("newPassword", {
			is: (newPassword) => newPassword?.length > 0,
			then: yup
				.string()
				.oneOf([ yup.ref("newPassword") ], globalMessages.PasswordConfirmationMatch),
		}),
});

const useStyles = makeStyles((Theme) => ({
	boxGrid: {
		width: "100%",
		paddingTop: "70px",
		paddingBottom: "70px"
	},
	typoStyle: {
		fontSize: "0.938rem",
		color: "595959"
	}
})
);

//  New user functional component

function NewUser() {
	const navigate = useNavigate();
	const { data, setData } = useContext(CheckMyOffers);
	const [ failed, setFailed ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const queryClient = useQueryClient();
	const classes = preLoginStyle();
	const innerClasses = useStyles();

	useEffect(() => {
		//redirects to select amount on direct call
		if (data?.completedPage < data?.page?.personalInfo || data?.formStatus?.toLowerCase() === "completed") {
			navigate("/select-amount");
		}
		return null;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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
				ssn: data.ssn.replace(/-/g, "").replace(/ /g, "") || "",
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
				let customerStatus = await RegisterController(body);
				//login the user if registerd successfully and stores the JWT token
				if ((!customerStatus.data?.customerFound && !customerStatus.data?.userFound && !customerStatus.data?.is_registration_failed) || (customerStatus?.data?.statusCode === 200 && customerStatus?.data?.result === "succcces")) {
					let retVal = await LoginController(data.email, values.newPassword, "");
					if (retVal?.data?.user && retVal?.data?.userFound) {
						let rememberMe = false;
						let now = new Date().getTime();
						Cookies.set(
							"token",
							JSON.stringify({
								isLoggedIn: true,
								apiKey:
									retVal?.data?.user?.extensionattributes?.login
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
						queryClient.removeQueries();

						rememberMe
							? Cookies.set("rememberMe", JSON.stringify({ selected: true, email: values.email, password: values.password, }))
							: Cookies.set("rememberMe", JSON.stringify({ selected: false, email: "", password: "" }));

						setLoading(false);
						navigate("/employment-status");
					} else if (retVal?.data?.result === "error" || retVal?.data?.hasError) {
						Cookies.set("token", JSON.stringify({ isLoggedIn: false, apiKey: "", setupTime: "" }));
						setLoading(false);
					} else {
						setLoading(false);
						alert(globalMessages.Network_Error);
					}
				}
				else if (customerStatus.data?.result === "error" && customerStatus.data?.statusCode === 400) {
					setFailed(true);
					setLoading(false);
				} else {
					toast.error(globalMessages?.Registration_Failed);
					setFailed(false);
					setLoading(false);
				}
			} catch (error) {
				ErrorLogger("network error from catch", error);
				setLoading(false);
			}
		},
	});

	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};

	//View part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className={ classes.mainDiv }>
				<Box>
					<Grid
						item
						xs={ 12 }
						container
						justifyContent="center"
						className={ innerClasses.boxGrid }
					>
						<Grid
							container
							xs={ 11 }
							sm={ 10 }
							md={ 6 }
							lg={ 6 }
							xl={ 6 }
							item
							className="cardWrapper"
							justifyContent="center"
						// style={ { width: "100%" } }
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
									<Link className="arrowBack" to="/personal-info" id="">
										<i className="material-icons dp48 yellowText floatingButton ">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img
										src={ PasswordLogo }
										alt="passwordlogo"
										className="spinAnimation"
									/>
								</Grid>
								<Typography
									align="center"
									justify="center"
									alignitems="center"
									className={ innerClasses.typoStyle }
								>
									We have detected you are a new customer.
								</Typography>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignitems="center"
									className="borrowCSSLP checkMyOfferText "
								>
									Please create a secure account with us.
								</Typography>

								<form onSubmit={ formik.handleSubmit }>
									<Grid
										md={ 12 }
										item
										className="blockDiv"
										container
										justifyContent="center"
									// style={ { width: "100%" } }
									>
										<Grid
											container
											justifyContent="center"
											// style={ { width: "100%" } }
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className="textBlock"
										>
											<PasswordField
												id="createPasswordWrap"
												name="newPassword"
												label="Create Password *"
												type="password"
												data-testid="password"
												materialProps={ { maxLength: "30" } }
												onKeyDown={ preventSpace }
												value={ formik.values.newPassword }
												onChange={ formik.handleChange }
												onBlur={ formik.handleBlur }
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
												Please ensure your password meets the following criteria: between 8 and 30 characters in length,
												at least 1 uppercase letter, at least 1 lowercase letter, at least 1 symbol and at least 1 number.
											</p>
											<PasswordField
												id="confirmPasswordWrap"
												name="confirmPassword"
												label="Confirm Password *"
												type="confirmPassword"
												data-testid="confirmpassword"
												materialProps={ { maxLength: "30" } }
												onKeyDown={ preventSpace }
												value={ formik.values.confirmPassword }
												onChange={ formik.handleChange }
												onBlur={ formik.handleBlur }
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
												className={ failed ? "showError" : "hideError" }
												data-testid="subtitle"
											>
												{ " " }
												Account not created. For help please contact us at (844)
												306-7300
											</p>
										</Grid>
										<Grid
											justifyContent="center"
											// style={ { width: "100%" } }
											item
											container
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className="textBlock alignButton"
										>
											<ButtonPrimary
												type="submit"
												data-testid="contButton"
												disabled={ loading }
												stylebutton='{"background": "#FFBC23", "fontSize": "0.938rem", "padding": "0px 30px", "color": "black"}'
											>
												Sign In
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

export default NewUser;
