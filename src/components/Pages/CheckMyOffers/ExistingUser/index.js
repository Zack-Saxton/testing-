import "./existingUser.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import PasswordLogo from "../../../../assets/icon/I-Password.png";
import { PasswordField, Button } from "../../../FormsUI";
import { useFormik } from "formik";
import * as yup from "yup";
import ScrollToTopOnMount from '../scrollToTop';
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";

const validationSchema = yup.object({
	password: yup
    .string("Enter your password")
    .max(30, "Password can be upto 30 characters length")
    .min(8, "Password should be minimum of 8 characters length")
    .required("Your password is required"),
});

function ExistingUser() {
	const { data, setData } = useContext(CheckMyOffers);
	const history = useHistory();

	const formik = useFormik({
		initialValues: {
			password: "",

			// newPassword: data.zip ? data.zip : '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			setData({
				...data,
				"password": values.password,
				"confirmPassword": values.password,
			});
			history.push("/employment-status");
		},
	});

	const preventSpace = (event) => {
		if (event.keyCode === 32) {
		  event.preventDefault();
		}
	  };
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
										className="det5  determinate "
									></div> */}
									<span class="floatLeft detNum5"></span>
								</div>
								<Grid className="floatLeft">
									<Link to="/personal-info">
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img src={PasswordLogo} alt="password" className="spinAnimation" />
								</Grid>
								<Typography
									variant="p"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSS"
								>
									We have detected you already have an account with us.
								</Typography>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSS"
								>
									Please enter your password and continue.
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
												data-testid="contButton"
												stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
											>
												<Typography align="center" className="textCSS ">
													Sign In
												</Typography>
											</Button>
										</Grid>
										<Grid
											justify="left"
											alignItems="left"
											item
											lg={8}
											md={8}
											xs={12}
											className="linkBlock"
										>
											<Link to="/register" className="link">
											<p className="link">Sign in Help / Register</p>
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
