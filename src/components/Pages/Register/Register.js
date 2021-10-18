import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import axios from "axios";
import { Button, ButtonPrimary, DatePicker, EmailTextField, PasswordField, SocialSecurityNumber, TextField, Zipcode } from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import Logo from "../../../assets/images/loginbg.png";
import loginSubmit from "../../Controllers/LoginController";
import "./Register.css";

//Styling part
const useStyles = makeStyles((theme) => ({
	mainContentBackground: {
		backgroundImage: "url(" + Logo + ")",
	},
	root: {
		flexGrow: 1,
	},

	mainGrid: {
		boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%), 
    0 6px 30px 5px rgb(0 0 0 / 12%), 
    0 8px 10px -7px rgb(0 0 0 / 20%)`,
		background: "#f5f2f2",
	},
	title: {
		fontSize: "20px",
		textAlign: "center",
		fontWeight: 400,
		color: "black",
	},
	subtitle: {
		textAlign: "center",
	},
	passwordTitle: {
		fontSize: "14px",
		textAlign: "justify",
	},
	dobTitle: {
		fontSize: "12px",
		textAlign: "justify",
	},
	paper: {
		// marginTop: theme.spacing(8),
		padding: theme.spacing(3),
		display: "flex",
		flexDirection: "column",
		backgroundColor: `rgba(255, 255, 255, .8)`,
		color: theme.palette.text.secondary,
		boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%), 
  0 6px 30px 5px rgb(0 0 0 / 12%), 
  0 8px 10px -7px rgb(0 0 0 / 20%)`,
	},

	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	signInButtonGrid: {
		textAlign: "center",
		paddingTop: "20px!important",
	},


}));

//Yup validations for all the input fields
const validationSchema = yup.object({
	firstname: yup
		.string("Enter your firstname")
		.max(30, "Firstname can be upto 30 characters length")
		.min(2, "Firstname should be minimum of 2 letters")
		.required("Your first name is required"),
	lastname: yup
		.string("Enter your Lastname")
		.max(30, "Lastname can be upto 30 characters length")
		.min(2, "Lastname should be minimum of 2 letters")
		.required("Your last name is required"),
	email: yup
		.string("Enter your email")
		.email("A valid email address is required")
		.matches(
			/^[a-zA-Z](?!.*[+/._-][+/._-])(([^<>()|?{}='[\]\\,;:#!$%^&*\s@\"]+(\.[^<>()|?{}=/+'[\]\\.,;_:#!$%^&*-\s@\"]+)*)|(\".+\"))[a-zA-Z0-9]@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,3}))$/, //eslint-disable-line
			"A valid email address is required"
		)
		.required("Your email address is required"),
	date: yup
		.date("Please enter valid date")
		.nullable()
		.required("Your date of birth is required")
		.max(new Date(((new Date(new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+new Date().getDate())).getTime()) - 567650000000), "You must be at least 18 years")
		.min(new Date(1919, 1, 1), "You are too old")
		.typeError("Please enter a valid date"),
	password: yup
		.string("Enter your password")
		.matches(
			/^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
			"Your password doesn't meet the criteria"
		)
		.max(30, "Password can be upto 30 characters length")
		.min(8, "Password should be minimum of 8 characters length")
		.required("Your password is required"),
	confirmPassword: yup
		.string()
		.max(30, "Password can be upto 30 characters length")
		.min(8, "Password should be minimum of 8 characters length")
		.required("Your password confirmation is required")
		.when("password", {
			is: (password) => (password && password.length > 0),
			then: yup.string().oneOf([yup.ref("password")], "Your confirmation password must match your password"),
		}),
	zip: yup
		.string("Enter your Zip")
		.max(5, "Zipcode should be of maximum 5 characters length")
		.required("Your home ZIP code is required"),
	ssn: yup
		.string("Enter a SSN")
		.required("Your SSN is required")
		.transform((value) => value.replace(/[^\d]/g, ""))
		.matches(
			/^(?!000)[0-8][0-9]{2}(?!00)[0-9]{2}(?!0000)[0-9]{4}$/,
			"Please enter your valid SSN"
		)
		.matches(/^(\d)(?!\1+$)\d{8}$/, "Please enter your valid SSN")
		.min(9, "Name must contain at least 9 digits"),
});

//Begin: Login page
export default function Register() {
	const classes = useStyles();
	const [validZip, setValidZip] = useState(true);
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [success, setSuccess] = useState(false);
	const [failed, setFailed] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

  //Date implementation for verifying 18 years
    const myDate = new Date();
    myDate.setDate(myDate.getDate() - 6571);

	//Form Submission
	const formik = useFormik({
		initialValues: {
			firstname: "",
			lastname: "",
			email: "",
			password: "",
			confirmPassword: "",
			zip: "",
			ssn: "",

			date: null,
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			setFailed("");
			//structuring the data for api call
      let body = {
        "fname": values.firstname,
        "lname": values.lastname,
        "email": values.email,
        "ssn": values.ssn,
        "zip_code": values.zip,
        "password": values.password,
        "birth_year": values.date.getFullYear().toString(),
        "birth_month": ("0" + (values.date.getMonth() + 1)).slice(-2),
        "birth_day": ("0" + (values.date.getDate() + 1)).slice(-2),
        "address_street": '',
        "address_city": city,
        "address_state": state
      }
			//API call
			try {
				let customerStatus = await axios({
					method: "POST",
					url: "/customer/register_new_user",
					data: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
					},
					transformRequest: (data, headers) => {
						delete headers.common["Content-Type"];
						return data;
					},
				});

				if (
					(customerStatus.data?.customerFound === false &&
						customerStatus.data?.userFound === false &&
						customerStatus.data?.is_registration_failed === false) ||
					(customerStatus.data?.result === "success" &&
						customerStatus.data?.hasError === false)
				) {
					//On succes, calls the login API to the JWT token and save it in storage, and make the user logged in and redirecting to home page 
					let retVal = await loginSubmit(values.email, values.password, '');
					if (retVal?.data?.data?.user && retVal?.data?.data?.userFound === true) {
						let rememberMe = false;
						var now = new Date().getTime();
						localStorage.clear();
						localStorage.setItem("token", JSON.stringify({ isLoggedIn: true, apiKey: retVal?.data?.data?.user?.extensionattributes?.login?.jwt_token, setupTime: now }));
		
						rememberMe === true ?
							localStorage.setItem("rememberMe", JSON.stringify({ selected: true, email: values.email, password: values.password })) :
							localStorage.setItem("rememberMe", JSON.stringify({ selected: false, email: '', password: '' }));
		
						setLoading(false);
						history.push({
							pathname: "/customers/accountoverview",
						});
					}
					else if (retVal?.data?.data?.result === "error" || retVal?.data?.data?.hasError === true) {
						localStorage.setItem('token', JSON.stringify({ isLoggedIn: false, apiKey: '', setupTime: '' }));
						setLoading(false);
					}
					else {
						setLoading(false);
						alert("Network error");
					}
					// localStorage.setItem("token", JSON.stringify({ isLoggedIn: true }));

					// history.push("customers/accountOverview");
				} else if (
					customerStatus.data?.result === "error" &&
					customerStatus.data?.hasError === true
				) {
					setFailed(customerStatus.data?.errorMessage);
					setSuccess(false);
					setLoading(false);
				} else {
					alert("network error");
					setFailed("Network error, Please try again.");
					setSuccess(false);
					setLoading(false);
				}
			} catch (error) {
				setFailed("Please contact us at (844) 306-7300");
				setLoading(false);
			}
		},
	});

	const NameChange = (event) => {
		const reg = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
		let acc = event.target.value;
		if (acc === "" || reg.test(acc)) {
			formik.handleChange(event);
		}
	};

	const handleCloseFailed = () => {
		setFailed("");
	};

	const handleCloseSuccess = () => {
		setSuccess(false);
		history.push("customers/accountOverview");
	};

	//Preventing space key
	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};

//Auto focus on name field if it has any error on submit 	
	function autoFocus() {
		var firstname = document.getElementById("firstname").value
		var lastname = document.getElementById("lastname").value
		if (firstname === '') {
			document.getElementById("firstname").focus();
		}
		if (lastname === '') {
			if (firstname === '') {
				document.getElementById("firstname").focus();
			} else {
				document.getElementById("lastname").focus();
			}
		}
	}

	//Fetching valid zipcode
	const fetchAddress = (e) => {
		formik.handleChange(e);
		if (e.target.value !== "" && e.target.value.length === 5) {
			fetch("https://api.zippopotam.us/us/" + e.target.value)
				.then((res) => res.json())
				.then(
					(result) => {
						if (result.places) {
							setValidZip(true);
							setState(result.places[0]["state abbreviation"]);
							setCity(result.places[0]["place name"]);
						} else {
							setValidZip(false);
							setState("");
							setCity("");
						}
					},
					(error) => {
						setValidZip(false);
						setState("");
						setCity("");
					}
				);
		}
	};

	//View Part
	return (
		<div>
			<div
				className={classes.mainContentBackground}
				id="mainContentBackground"
			>
				<Box>
					<Grid xs={12}  item container justifyContent="center" alignItems="center" style={{paddingTop:"30px",paddingBottom:"40px"}}>
						<Grid
							xs={11}
							sm={10}
							md={8}
							lg={6} 
							xl={7}
							className="cardWrapper"
                            justifyContent="center"
							alignItems="center" container item
						>
							<Paper className={classes.paper}>
								<Typography
									className={classes.title}
									data-testid="title"
									color="textSecondary"
								>
									Sign in help / register
								</Typography>
								<p className={classes.subtitle} data-testid="subtitle">
									{" "}
									Let us help you get signed in another way
								</p>

								<form onSubmit={formik.handleSubmit}>
									<Grid
										container
                                        justifyContent="center"
										alignItems="center"
										spacing={4}
									>
										<Grid item xs={12} sm={6} style={{ width:"100%" }}  container direction ="row">
											<TextField
												name="firstname"
												id="firstname"
												label="First Name *"
												placeholder="Enter your firstname"
												materialProps={{ maxLength: "30" }}
												value={formik.values.firstname}
												onChange={(e) => NameChange(e)}
												onBlur={formik.handleBlur}
												error={
													formik.touched.firstname &&
													Boolean(formik.errors.firstname)
												}
												helperText={
													formik.touched.firstname && formik.errors.firstname
												}
											/>
										</Grid>

										<Grid item xs={12} sm={6} style={{ width:"100%" }}  container direction ="row">
											<TextField
												name="lastname"
												id="lastname"
												label="Last Name *"
												placeholder="Enter your lastname"
												materialProps={{ maxLength: "30" }}
												value={formik.values.lastname}
												onChange={NameChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.lastname &&
													Boolean(formik.errors.lastname)
												}
												helperText={
													formik.touched.lastname && formik.errors.lastname
												}
											/>
										</Grid>

										<Grid item xs={12} style={{ width:"100%" }}  container direction ="row">
											<EmailTextField
												id="email"
												name="email"
												label="Email *"
												placeholder="Enter your email address"
												materialProps={{ maxLength: "100" }}
												onKeyDown={preventSpace}
												value={formik.values.email}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.email && Boolean(formik.errors.email)
												}
												helperText={formik.touched.email && formik.errors.email}
											/>
										</Grid>

										<Grid id="socialNum" item xs={12} sm={4}  container direction ="row">
											<SocialSecurityNumber
												className={classes.socialNum}
												name="ssn"
												label="Social Security Number *"
												placeholder="Enter your SSN"
												id="ssn"
												type="ssn"
												value={formik.values.ssn}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched.ssn && Boolean(formik.errors.ssn)}
												helperText={formik.touched.ssn && formik.errors.ssn}
											/>
										</Grid>
										<Grid id="ZipcodeWrap" item xs={12} sm={4}  container direction ="row">
											<Zipcode
												fullWidth
												id="zip"
												name="zip"
												label="Zipcode *"
												placeholder="Enter your zipcode"
												value={formik.values.zip}
												onChange={fetchAddress}
												onBlur={formik.handleBlur}
												error={
													(formik.touched.zip && Boolean(formik.errors.zip)) ||
													!validZip
												}
												helperText={
													validZip
														? formik.touched.zip && formik.errors.zip
														: "Please enter your valid zipcode"
												}
											/>
										</Grid>

										<Grid id="dateWrap" item xs={12} sm={4}  container direction ="row">
											<DatePicker
												name="date"
												label="Date of Birth *"
												id="date"
												placeholder="MM/DD/YYYY"
												format="MM/dd/yyyy"
												maxdate={myDate}
												minyear={102}
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
										</Grid>

										<Grid item xs={12} style={{ width:"100%" }}  container direction ="row">
											<PasswordField
												name="password"
												label="Create New Password *"
												placeholder="Enter your password"
												id="password"
												type="password"
												onKeyDown={preventSpace}
												materialProps={{ maxLength: "30" }}
												value={formik.values.password}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.password &&
													Boolean(formik.errors.password)
												}
												helperText={
													formik.touched.password && formik.errors.password
												}
											/>
											<p id="passwordTitle" className={classes.passwordTitle}>
												Please ensure your password meets the following
												criteria: between 8 and 30 characters in length, at
												least 1 uppercase letter, at least 1 lowercase letter,
												at least 1 symbol and at least 1 number.
											</p>
										</Grid>
										<Grid item xs={12} style={{ width:"100%" }}  container direction ="row">
											<PasswordField
												name="confirmPassword"
												label="Re-enter Your Password *"
												placeholder="Enter your confirm password"
												id="cpass"
												type="password"
												onKeyDown={preventSpace}
												materialProps={{ maxLength: "30" }}
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
											<br />
											<p
												className={
													failed !== "" || failed !== undefined
														? "showError add Pad"
														: "hideError"
												}
												data-testid="subtitle"
											>
												{" "}
												{failed}
											</p>
										</Grid>

										<Grid item xs={12} className={classes.signInButtonGrid}>
											<ButtonPrimary												
												onClick={autoFocus}
												type="submit"
												data-testid="submit"
												stylebutton='{"background": "", "color":"" }'
												disabled={loading}
											>
											<Typography align="center" className="textCSS ">
												Sign in
											</Typography>
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
			<Dialog
				onClose={handleCloseFailed}
				aria-labelledby="customized-dialog-title"
				open={false}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleCloseFailed}>
					Notice
				</DialogTitle>
				<DialogContent dividers>
					<Typography align="justify" gutterBottom>
						Account already exists. Please use the login page and forgot
						password function to login
					</Typography>
				</DialogContent>
				<DialogActions className="modalAction">
					<Button
						stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
						onClick={handleCloseFailed}
						className="modalButton"
					>
						<Typography align="center">Ok</Typography>
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				onClose={handleCloseSuccess}
				aria-labelledby="customized-dialog-title"
				open={success}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleCloseSuccess}>
					Notice
				</DialogTitle>
				<DialogContent dividers>
					<Typography align="justify" gutterBottom>
						Account created Successfully!
					</Typography>
				</DialogContent>
				<DialogActions className="modalAction">
					<Button
						stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
						onClick={handleCloseSuccess}
						className="modalButton"
					>
						<Typography align="center">Ok</Typography>
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
