import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { useQueryClient } from 'react-query';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import globalMessages from "../../../../assets/data/globalMessages.json";
import PasswordLogo from "../../../../assets/icon/I-Password.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import usrAccountDetails from "../../../Controllers/AccountOverviewController";
import LoginController from "../../../Controllers/LoginController";
import { ButtonPrimary, PasswordField } from "../../../FormsUI";
import { encryptAES } from "../../../lib/Crypto";
import ScrollToTopOnMount from "../ScrollToTop";
import "./ExistingUser.css";

//YUP validation schema
const validationSchema = yup.object({
	password: yup
		.string(globalMessages.PasswordEnter)
		.max(30, globalMessages.PasswordMax)
		.required(globalMessages.PasswordRequired),
});

const useStyles = makeStyles((Theme) => ({

	typoStyle: {
		align: "center",
		justify: "center",
		alignItems: "center",
		marginBottom: "1%",
		marginTop: "1%",
	},
	negativeMargin: {
		marginTop: "-4%"
	},
	paperStyle: {
		justify: "center",
		alignItems: "center",
		width: "inherit",
		marginBottom: "10%",
		marginTop: "10%",
		textAlign: "center"
	}
})
);

// Existing user functional component initiallization
function ExistingUser() {
	const { data, setData } = useContext(CheckMyOffers);
	const [ loginFailed, setLoginFailed ] = useState("");
	const [ loading, setLoading ] = useState(false);
	const navigate = useNavigate();
	const classes = preLoginStyle();
	const innerClasses = useStyles();

	const queryClient = useQueryClient();
	useEffect(() => {
		//redirects to select amount on directr page call
		if (data.completedPage < data.page.personalInfo || data.formStatus === "completed") {
			navigate("/select-amount");
		}
		return null;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// Formik configuraion
	const formik = useFormik({
		initialValues: {
			password: "",
		},
		validationSchema: validationSchema,
		// handle submit to login the user
		onSubmit: async (values) => {
			setLoading(true);
			setData({
				...data,
				password: values.password,
				confirmPassword: values.password,
				completedPage: data.page.existingUser,
			});
			let retVal = await LoginController(data.email, values.password);
			if (retVal?.data?.user && !retVal?.data?.result) {
				let now = new Date().getTime();
				Cookies.set(
					"token",
					JSON.stringify({
						isLoggedIn: true,
						apiKey:
							retVal?.data?.user?.extensionattributes?.login?.jwt_token,
						setupTime: now,
					})
				);
				Cookies.set(
					"cred",
					encryptAES(
						JSON.stringify({ email: data.email, password: values.password })
					)
				);
				queryClient.removeQueries();
				setLoading(false);
				let accountDetail = await usrAccountDetails();

				if (accountDetail?.data?.customer?.user_account?.status === "closed") {
					data.isActiveUser = false;
					toast.error(globalMessages.Account_Closed_New_Apps);
					navigate("/customers/accountOverview");
				} else {
					navigate("/employment-status");
				}
			} else if (retVal?.data?.result === "error" || retVal?.data?.hasError) {
				Cookies.set("token", JSON.stringify({ isLoggedIn: false, apiKey: "", setupTime: "" }));
				setLoading(false);
				setLoginFailed(retVal?.data?.errorMessage);
			} else {
				alert("Network error");
				setLoading(false);
			}
		},
	});

	const passwordOnChange = (event) => {
		setLoginFailed("");
		formik.handleChange(event);
	};

	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};

	// View part
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
						alignItems="center"
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
							justifyContent="center"
							alignItems="center"
						>
							<Paper
								className={ innerClasses.paperStyle }
							>
								<span className="floatLeft detNum5" />
								<Grid className="floatLeft">
									<Link to="/personal-info">
										<i className="material-icons dp48 yellowText  ">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid className={ innerClasses.negativeMargin }>
									<img
										src={ PasswordLogo }
										alt="password"
										className="spinAnimation"
									/>
								</Grid>
								<Typography

									className={ innerClasses.typoStyle }
								>
									We have detected you already have an account with us.
								</Typography>

								<Typography
									variant="h5"
									className={ innerClasses.typoStyle }
								>
									Please enter a password and continue.
								</Typography>

								<form onSubmit={ formik.handleSubmit }>
									<Grid
										container
										item
										md={ 12 }
										className="blockDiv"
										justifyContent="center"
										alignItems="center"
									>
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
											<PasswordField
												name="password"
												label="Password *"
												type="password"
												data-testid="password"
												onKeyDown={ preventSpace }
												materialProps={ { maxLength: "30" } }
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
													loginFailed !== "" ? "showError add-pad" : "hideError"
												}
												data-testid="subtitle"
											>
												{ " " }
												{ loginFailed === "Invalid Email or Password"
													? "Please enter a valid password"
													: loginFailed }
											</p>
										</Grid>
										<Grid
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className="textBlock alignButton"
										>
											<ButtonPrimary
												type="submit"
												data-testid="contButton"
												stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
												disabled={ loading }
											>
												<Typography align="center" className="textCSS ">
													Sign In
												</Typography>
												<i
													className="fa fa-refresh fa-spin customSpinner"
													style={ {
														marginRight: "10px",
														display: loading ? "block" : "none",
													} }
												/>
											</ButtonPrimary>
										</Grid>
										<Grid
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className="linkBlock"
										>
											<Link to="/register" className="link">
												<p>Sign in Help / Register</p>
											</Link>
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

export default ExistingUser;
