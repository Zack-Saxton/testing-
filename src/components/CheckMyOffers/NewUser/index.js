import Header from "../../Layout/NormalHeader/NormalHeader";
import Footer from "../../Layout/NormalFooter/NormalFooter";
import "./newUser.css";
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
	newPassword: yup.string("Enter your password")
	.matches(
	  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
	  "Invalid Password"
	)
	.required("Password is required"),
	
   
	confirmPassword: yup
	.string()
	.required("Please confirm your password")
	.when("newPassword", {
	  is: newPassword => (newPassword && newPassword.length > 0 ? true : false),
	  then: yup.string().oneOf([yup.ref("newPassword")], "Password doesn't match")
	}),
});



function NewUser() {
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
			newPassword: "",
			confirmPassword: ""
			// newPassword: data.zip ? data.zip : '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			history.push("/existing-user");
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
									<Link to="/personal-info">
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
									We have detected you are a new customer.
								</Typography>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSS"
								>
									Please create a secure account with us.
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
												name="newPassword"
												label="Create Password"
												type="password"
												data-testid="password"
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
												required={true}
											/>
											<p className="subText" >
												Please ensure your password meets the following
												criteria: between 8 and 30 characters in length, at
												least 1 uppercase letter, at least 1 lowercase letter,
												and at least 1 number
											</p>
											<PasswordField
												name="confirmPassword"
												label="Confirm Password"
												type="confirmPassword"
												data-testid="confirmpassword"
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
