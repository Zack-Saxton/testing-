import "./existingUser.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import React, {useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import PasswordLogo from "../../../../assets/icon/I-Password.png";
import {ButtonPrimary, PasswordField} from "../../../FormsUI";
import {useFormik} from "formik";
import * as yup from "yup";
import ScrollToTopOnMount from '../scrollToTop';
import {CheckMyOffers} from "../../../../contexts/CheckMyOffers";
import loginSubmit from "../../../controllers/LoginController";

const validationSchema = yup.object({
	password: yup
    .string("Enter your password")
    .max(30, "Password can be upto 30 characters length")
    .min(8, "Password should be minimum of 8 characters length")
    .required("Your password is required"),
});

function ExistingUser() {
	const { data, setData } = useContext(CheckMyOffers);
	const [loginFailed, setLoginFailed] = useState('');
	const [loading, setLoading] = useState(false);
	
	const history = useHistory();

	const formik = useFormik({
		initialValues: {
			password: "",

			// newPassword: data.zip ? data.zip : '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			setData({
				...data,
				"password": values.password,
				"confirmPassword": values.password,
				"completedPage": data.page.existingUser,
			});
			let retVal = await loginSubmit(data.email, values.password);
			 if(retVal?.data?.data?.user && !retVal?.data?.data?.result ){
			   localStorage.setItem('token', JSON.stringify({isLoggedIn: true}));
			   setLoading(false);
			   history.push({
				 pathname: "/employment-status",
			   });
			 }
			 else if (retVal?.data?.data?.result === "error" || retVal?.data?.data?.hasError === true){
			   localStorage.setItem('token', JSON.stringify({isLoggedIn: false}));
			   setLoading(false);
			   setLoginFailed(retVal?.data?.data?.errorMessage);
			 }
			 else{
			   alert("Network error");
			   setLoading(false);
			 }
			// history.push("/employment-status");
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
					<Grid item xs={12} container justifyContent="center" alignItems="center">
						<Grid container item
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6}
							className="cardWrapper"
							justifyContent="center"
							alignItems="center"
						>
							<Paper className="cardWOPadding" style={{justify:"center",alignItems:"center",width:"inherit",marginBottom:"10%",marginTop:"10%"}}>
								{/* <div className="progress"> */}
									{/* <div
										id="determinate"
										className="det5  determinate "
									/> */}
									<span className="floatLeft detNum5"/>
								{/* </div> */}
								<Grid className="floatLeft">
									<Link to="/personal-info">
										<i className="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid className="liftImage" style={{marginTop:"-4%"}}>
									<img src={PasswordLogo} alt="password" className="spinAnimation" />
								</Grid>
								<Typography style={{align:"center",justify:"center",alignItems:"center",marginBottom:"1%",marginTop:"1%"}}>
									We have detected you already have an account with us.
								</Typography>

								<Typography variant="h5" style={{align:"center",justify:"center",alignItems:"center",marginBottom:"1%",marginTop:"1%"}}>
									Please enter your password and continue.
								</Typography>

								<form onSubmit={formik.handleSubmit}>
									<Grid container item
										md={12}
										className="blockDiv"
										justifyContent="center"
										alignItems="center"
									>
										<Grid container
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
													<p className={ loginFailed !== '' ? "showError add-pad" : "hideError" } data-testid="subtitle">
												{" "}
												{loginFailed === "Invalid Email or Password" ? "Invalid Password" : loginFailed}                 
											</p>
										</Grid>
										<Grid container
											justifyContent="center"
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
												stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
												disabled = { loading }
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
										<Grid container
											justifyContent="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="linkBlock"
										>
											<Link to="/register" className="link">
											<p >Sign in Help / Register</p>
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
