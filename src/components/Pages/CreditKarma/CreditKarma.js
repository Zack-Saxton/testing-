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
import {
    Button,
    ButtonPrimary,
    PhoneNumber,
    EmailTextField,
    PasswordField,
    SocialSecurityNumber
} from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import Logo from "../../../assets/images/loginbg.png";
import "./CreditKarma.css";
import creditkarmalogo from "../../../assets/images/ck_logo.png";


//Styling
const useStyles = makeStyles((theme) => ({
	mainContentBackground: {
		backgroundImage: "url(" + Logo + ")",
        backgroundSize:"cover"
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
	email: yup
		.string("Enter your email")
		.email("A valid email address is required")
		.matches(
			/^[a-zA-Z][a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
			// /^[a-zA-Z](?!.*[+/._-][+/._-])(([^<>()|?{}='[\]\\,;:#!$%^&*\s@\"]+(\.[^<>()|?{}=/+'[\]\\.,;_:#!$%^&*-\s@\"]+)*)|(\".+\"))[a-zA-Z0-9]@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,3}))$/, //eslint-disable-line
			"A valid email address is required"
		)
		.required("Your email address is required"),
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
	ssn: yup
		.string("Enter a SSN")
		.required("Your SSN is required")
		.transform((value) => value.replace(/[^\d]/g, ""))
		.matches(
			/^(?!0000)\d{4}$/,
			"Please enter your valid SSN"
		)
		.min(4, "Name must contain at least 4 digits"),

    callPhNo: yup
    .string("Enter a name")
    .required("Your Phone number is required")
    .transform((value) => value?.replace(/[^\d]/g, ""))
    .matches(
      /^[1-9]{1}\d{2}[\d]{3}\d{4}$/,
      "Please enter your valid Phone number"
    )
    .matches(/^(\d)(?!\1+$)\d{9}$/, "Please enter your valid Phone number")
    .min(10, "Name must contain at least 10 digits"),
});

//Begin: Login page
export default function CreditKarma() {
	const classes = useStyles();
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
			callPhNo:"",
			date: null,
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			setFailed("");
            console.log(values)
		},
	});


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

	
	function autoFocus() {
		var email = document.getElementById("email").value 
		if (email === '') {
			document.getElementById("email").focus();
		} 
	}


	//View Part
	return (
		<div>
			<div
				className={classes.mainContentBackground}
				id="mainContentBackground"
			>
				<Box>
					<Grid xs={10}  item  justifyContent="center" alignItems="center" style={{paddingTop:"30px",paddingBottom:"40px",margin:"auto",width:"100%"}}>
						<Grid
							xs={11}
							sm={10}
							md={8}
							lg={6} 
							xl={7}
							className="cardWrapper"
                            justifyContent="center"
							alignItems="center" item
                            style={{margin:"auto"}}
						>
							<Paper className={classes.paper}>
                                  <Typography
									className={classes.title}
									data-testid="title"
									color="textSecondary" >Welcome, <a href="https://www.creditkarma.com/" target="blank"> <img src={creditkarmalogo} style={{height: "20px"}} alt="creditkarmalogo"/></a> member!</Typography>
                                  <p style={{textAlign:"center"}}>Thank you for choosing Mariner Finance. Please provide the following information to view your offers.</p>
                              {/* </div> */}

								<form onSubmit={formik.handleSubmit}>
									<Grid
										container
                                        justifyContent="center"
										alignItems="center"
										spacing={4}
									
>

										<Grid item xs={12} style={{ width:"100%" }} >
											<EmailTextField
												id="email"
												name="email"
												label="Email Address"
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

										<Grid item xs={12}>
											<SocialSecurityNumber
												name="ssn"
												label="Enter your last 4 digits of SSN"
												placeholder="Enter your SSN"
												id="ssn"
												type="ssn"
                                                mask="9999"
												value={formik.values.ssn}
												onChange={formik.handleChange}
                                                materialProps={{ maxLength: "4" }}
												onBlur={formik.handleBlur}
												error={formik.touched.ssn && Boolean(formik.errors.ssn)}
												helperText={formik.touched.ssn && formik.errors.ssn}
											/>
										</Grid>
									
                                        <Grid item xs={12}>
                                        <PhoneNumber
                                            name="callPhNo"
                                            label="Phone Number"
                                            id="phone"
                                            type="text"
                                            onChange={formik.handleChange}
                                            value={formik.values.callPhNo}
                                            onBlur={formik.handleBlur}
                                            error={
                                            formik.touched.callPhNo && Boolean(formik.errors.callPhNo)
                                            }
                                            helperText={formik.touched.callPhNo && formik.errors.callPhNo}
                                        />
                                        </Grid>

										<Grid item xs={12}>
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
										<Grid item xs={12} >
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
												Continue
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
