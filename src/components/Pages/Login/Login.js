import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { EmailTextField, PasswordField, ButtonPrimary } from "../../FormsUI";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { NavLink, useHistory } from "react-router-dom";
import LoginController from "../../Controllers/LoginController";
import { encryptAES } from "../../lib/Crypto";
import { FormValidationRules } from "../../lib/FormValidationRule";
import ScrollToTopOnMount from "../../Pages/ScrollToTop";
import "./Login.css";
import { selectedGridRowsCountSelector } from "@material-ui/data-grid";
var formValidation = new FormValidationRules();
const moment = require("moment");
const moment_timezone = require("moment-timezone");
let addVal = moment_timezone().tz("America/New_York").isDST() ? 4 : 5;

//Styling part
const useStyles = makeStyles((theme) => ({

	root: {
		flexGrow: 1,
	},
	paper: {
		padding: "30px",
		margin: "70px 0px",
		borderRadius: "6px !important",
		display: "flex",
		flexDirection: "column",
		backgroundColor: `rgba(255, 255, 255, .8)`,
		color: theme.palette.text.secondary,
		boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%),
		0 6px 30px 5px rgb(0 0 0 / 12%),
		0 8px 10px -7px rgb(0 0 0 / 20%)`,
	},
	heading: {
		color: "white",
		justify: "center",
	},
	checkbox: {
		textAlign: "initial",
		fontFamily: "'Muli', sans-serif !important",
	},
	title: {
		fontSize: "25px",
		textAlign: "center",
		color: "#171717",
		fontWeight: "400",
	},
	register: {
		fontSize: "0.844rem",
		textDecoration: "none",
		color: "#0F4EB3",
		fontFamily: "'Muli', sans-serif !important",
		marginBottom: "0px",
	},
	mainGrid: {
		boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%),
		0 6px 30px 5px rgb(0 0 0 / 12%),
		0 8px 10px -7px rgb(0 0 0 / 20%)`,
		background: "#f5f2f2",
	},
	mainContentGrid: {
		margin: "auto",
		display: "flex",
		alignItems: "center",
		minHeight: "93vh"
	},
	loginButton: {
		textAlign: "center",
		margin: "50px 0px 0px 0px"
	},
	emailGrid: {
		lineHeight: "2",
		margin: "0px 0px 30px 0px"
	},
	passwordGrid: {
		margin: "0px 0px 30px 0px"
	},
	registerGrid: {
		textAlign: "center",
		width: "100%",
		margin: "40px 0px 0px 0px"
	},
}));

//Yup validations for all the input fields
const validationSchema = formValidation.getFormValidationRule('login');

//Begin: Login page
export default function Login(props) {
	const classes = useStyles();
	const history = useHistory();
	const [ loginFailed, setLoginFailed ] = useState("");
	const [ loading, setLoading ] = useState(false);
	const [counter,setCounter] = useState(0);
	const queryClient = useQueryClient();

	//Form Submission
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		// On login submit
		onSubmit: async (values) => {
			setLoading(true);

			//Sending value to  login controller
			let retVal = await LoginController(
				values.email,
				values.password,
				props.setToken
			);
			if (retVal?.data?.user && retVal?.data?.userFound === true) {
				let login_date = (retVal?.data?.user.extensionattributes?.login?.last_timestamp_date) ? moment(retVal?.data?.user.extensionattributes.login.last_timestamp_date).subtract(addVal, 'hours').format('MM/DD/YYYY') : '';
				var now = new Date().getTime();
				// On login success storing the needed data in the local storage
				Cookies.set("token", JSON.stringify({ isLoggedIn: true, apiKey: retVal?.data?.user?.extensionattributes?.login?.jwt_token, setupTime: now, applicantGuid: retVal?.data?.user?.attributes?.sor_data?.applicant_guid }));
				Cookies.set("cred", encryptAES(JSON.stringify({ email: values.email, password: values.password })));
				Cookies.set("email", values.email);
				Cookies.set("profile_picture", retVal?.data?.user?.mobile?.profile_picture ? retVal?.data?.user?.mobile?.profile_picture : "");
				Cookies.set('login_date', login_date);
				Cookies.set('userToken', retVal?.data?.user?.attributes?.UserToken);
				queryClient.removeQueries();
				setLoading(false);
				history.push({
					pathname: props.location.state?.redirect
						? props.location.state?.redirect
						: "/customers/accountoverview",
				});
				if (props.location.state?.activationToken) {
					history.go(0);
				}
			} else if (
				retVal?.data?.result === "error" ||
				retVal?.data?.hasError === true
			) {
				Cookies.set(
					"token",
					JSON.stringify({
						isLoggedIn: false,
						apiKey: "",
						setupTime: "",
						applicantGuid: "",
					})
				);
				setCounter(counter + 1)
				setLoading(false);
				setLoginFailed(retVal?.data?.errorMessage);
                if(counter >= 1){
                    history.push('/register');
                }
            } else {
				setLoading(false);
				alert("Network error");
			}
		},
	});

	const passwordOnChange = (event) => {
		setLoginFailed("");
		formik.handleChange(event);
	};

	//Preventing space key
	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};

	//View Part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className={ classes.mainContentBackground } id="mainContentBackground">
				<Box>
					<Grid
						className={ classes.mainContentGrid }
						item xl={ 4 } lg={ 4 } md={ 4 } sm={ 10 } xs={ 12 }
					>
						<Grid
							id="main-content"

							style={ {
								opacity: loading ? 0.55 : 1,
								pointerEvents: loading ? "none" : "initial",
							} }
						>
							<Paper className={ classes.paper }>
								<Typography
									className={ classes.title }
									data-testid="title"
									color="textSecondary"
								>
									Sign in
								</Typography>

								<form onSubmit={ formik.handleSubmit }>
									<Grid style={ { paddingTop: "30px" } }>
										<Grid

											style={ { width: "100%" } }

											// direction="row"
											className={ classes.emailGrid }
										>
											<EmailTextField
												id="email"
												name="email"
												type="email"
												testid="email-input"
												placeholder="Enter your email address"
												label="Email Address *"
												materialProps={ { maxLength: "100" } }
												onKeyDown={ preventSpace }
												value={ formik.values.email }
												onChange={ passwordOnChange }
												onBlur={ formik.handleBlur }
												error={
													formik.touched.email && Boolean(formik.errors.email)
												}
												helperText={ formik.touched.email && formik.errors.email }
											/>
										</Grid>

										<Grid

											style={ { width: "100%" } }

										// direction="row"
										>
											<PasswordField
												name="password"
												label="Password *"
												placeholder="Enter your password"
												id="password"
												type="password"
												onKeyDown={ preventSpace }
												materialProps={ { maxLength: "100" } }
												value={ formik.values.password }
												onChange={ passwordOnChange }
												onBlur={ formik.handleBlur }
												error={
													formik.touched.password &&
													Boolean(formik.errors.password)
												}
												helperText={
													formik.touched.password && formik.errors.password
												}
											/>
											<p
												className={
													loginFailed !== "" ? "showError add Pad" : "hideError"
												}
												data-testid="subtitle"
											>
												{ " " }
												Invalid email or password. Please try again or click on
												Sign In help/Register for help signing in.
											</p>
										</Grid>

										<Grid item xs={ 12 } className={ classes.loginButton }>
											<ButtonPrimary
												type="submit"
												data-testid="submit"
												stylebutton='{"background": "", "color":"" , "fontSize" : "15px", "padding" : "0px 30px"}'
												disabled={ loading }
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
										<Grid className={ classes.registerGrid }>
											<NavLink
												to="/register"
												style={ { textDecoration: "none" } }
											>
												<p className={ classes.register }>
													Sign in Help / Register
												</p>
											</NavLink>
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
