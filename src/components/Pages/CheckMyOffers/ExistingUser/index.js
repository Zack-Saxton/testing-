import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AutorenewIcon from '@mui/icons-material/Autorenew';
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
import ScrollToTop from "../ScrollToTop";
import "./ExistingUser.css";

//YUP validation schema
const validationSchema = yup.object({
	password: yup
		.string(globalMessages.PasswordEnter)
		.max(30, globalMessages.PasswordMax)
		.required(globalMessages.PasswordRequired),
});

// Existing user functional component initiallization
function ExistingUser() {
	const { data, setData } = useContext(CheckMyOffers);
	const [ loginFailed, setLoginFailed ] = useState("");
	const [ loading, setLoading ] = useState(false);
	const navigate = useNavigate();
	const classes = preLoginStyle();

	const queryClient = useQueryClient();
	useEffect(() => {
		// redirects to select amount on directr page call
		if (data.completedPage < data?.page?.personalInfo || data?.formStatus?.toLowerCase() === "completed") {
			navigate("/select-amount");
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
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
				Cookies.set("email", data.email);
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
				let accountDetail = await usrAccountDetails();

				if (accountDetail?.data?.customer?.user_account?.status?.toLowerCase() === "closed") {
					data.isActiveUser = false;
					toast.error(globalMessages.Account_Closed_New_Apps);
					navigate("/customers/accountOverview");
				} else {
					navigate("/employment-status");
				}
				setLoading(false);
			} else if (retVal?.data?.result?.toLowerCase() === "error" || retVal?.data?.hasError) {
				Cookies.set("token", JSON.stringify({ isLoggedIn: false, apiKey: "", setupTime: "" }));
				setLoading(false);
				toast.error(retVal?.data?.errorMessage);
			} else {
				toast.error(globalMessages.Network_Error_Please_Try_Again);
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
			<ScrollToTop />
			<div className={classes.mainDiv}>
				<Box>
					<Grid
						item
						xs={12}
						container
						justifyContent="center"
						alignItems="center"
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
							justifyContent="center"
							alignItems="center"
						>
							<Paper
								className={classes.exsistingUserPaperStyle}
							>
								<span className="floatLeft detNum5" />
								<Grid className="floatLeft">
									<Link to="/personal-info">
										<i className="material-icons dp48 yellowText  ">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid className={classes.negativeMargin}>
									<img
										src={PasswordLogo}
										alt="password"
										className="spinAnimation"
									/>
								</Grid>
								<Typography

									className={classes.exsistingUserTypoStyle}
								>
									We have detected you already have an account with us.
								</Typography>

								<Typography
									variant="h5"
									className={classes.exsistingUserTypoStyle}
								>
									Please enter a password and continue.
								</Typography>

								<form onSubmit={formik.handleSubmit}>
									<Grid
										container
										item
										md={12}
										className="blockDiv"
										justifyContent="center"
										alignItems="center"
									>
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
											<PasswordField
												name="password"
												label="Password *"
												type="password"
												data-testid="password"
												id="textBlock"
												onKeyDown={preventSpace}
												materialProps={{ maxLength: "30" }}
												value={formik.values.password}
												onChange={passwordOnChange}
												onBlur={formik.handleBlur}
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
												{" "}
												{loginFailed === "Invalid Email or Password"
													? "Please enter a valid password"
													: loginFailed}
											</p>
										</Grid>
										<Grid
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlock alignButton"
										>

											<ButtonPrimary
												data-testid="SignInButton"
												type="submit"
												stylebutton='{"background": "#FFBC23", "color": "black", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
												disabled={loading}
											>
													Sign In
												<AutorenewIcon className="rotatingIcon"
                        style={{
                        display: loading ? "block" : "none",
                    }}/>
											</ButtonPrimary>
										</Grid>
										<Grid
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
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
