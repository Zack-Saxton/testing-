import Header from "../../Layout/NormalHeader/NormalHeader";
import Footer from "../../Layout/NormalFooter/NormalFooter";
import "./existingUser.css";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Slider, TextField1, Button } from "../../FormsUI";
// import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import PasswordLogo from "../../../assets/icon/I-Password.png";
import { PasswordField } from "../../FormsUI";
import { useFormik } from "formik";
import * as yup from "yup";
import { CheckMyOffers } from "../../../contexts/CheckMyOffers";
import IconButton from '@material-ui/core/IconButton'

const validationSchema = yup.object({
	password: yup.string("Enter your password")
	// .matches(
	//   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
	//   "Must Contain 8 to 30 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
	// )
	.required("Password is required"),
});

function ExistingUser() {
	const { data } = useContext(CheckMyOffers);
	const [citizenship, setCitizenship] = useState("");
	// data[0].zip = citizenship;
	const history = useHistory();
	console.log(data);
	const handSub = () => {
		console.log("data submited");
	};
	const handleRoute = (val) => {
		history.push("/personal-info");
	};

	const formik = useFormik({
		initialValues: {
			password: "",
			
			// newPassword: data.zip ? data.zip : '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			data.zip = values.zip;
			history.push("/employment-status");
		},
	});
	// formik.values.zip = '34';
	// formik.setFieldValue('hello');

	// console.log("formik data",formik.values);

	return (
		<div>
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
									<div
										id="determinate"
										className="det5  determinate slantDiv"
									></div>
									<span class="floatLeft detNum5">42%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/new-user">
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img src={PasswordLogo} className="spinAnimation" />
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
												label="Password"
												type="password"
												data-testid="password"
												value={formik.values.password}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.password &&
													Boolean(formik.errors.password)
												}
												helperText={
													formik.touched.password &&
													formik.errors.password
												}
												required={true}
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
												stylebutton='{"background": "#0F4EB3", "height": "inherit", "color": "white"}'
											>
												<Typography
													align="center"
													className="textCSS whiteText"
												>
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
											<p className="link">Sign in Help / Register</p>
											{/* <Link className="link" to="/personal-info">
												
											</Link> */}
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
