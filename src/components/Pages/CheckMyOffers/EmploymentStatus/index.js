import React, { useState, useContext } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField, Button, PhoneNumber } from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";
import EmploymenyStatus from "../../../../assets/icon/I-Employment-Status.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import ScrollToTopOnMount from '../scrollToTop';
import "./employmentStatus.css";

//Yup validation schema
const validationSchema = yup.object({
	phone: yup
		.string("Enter a name")
		.nullable()
		.transform((value) => value.replace(/[^\d]/g, "").substring(1))
		.matches(/^$|^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/, "Invalid Phone")
		.matches(/^$|^(\d)(?!\1+$)\d{9}$/, "Invalid Phone"),
});

//Initializing functional component CitizenshipStatus
function CitizenshipStatus() {

//Retriving Context values
	const { data, setData } = useContext(CheckMyOffers);
	const [error, setError] = useState();
	const [helperText, setHelperText] = useState();
	const [employmentStatus, setEmploymentStatus] = useState(
		data.employmentStatus ? data.employmentStatus : ""
	);
	const history = useHistory();

//initializing formik
	const formik = useFormik({
		initialValues: {
			phone: data.EmployerPhone ? "1" + data.EmployerPhone : "",
		},
		validationSchema: validationSchema,
//On submit funcationality
		onSubmit: (values) => {
			var phone =
				values.phone
					.replace(/-/g, "")
					.replace(/\)/g, "")
					.replace(/\(/g, "")
					.replace(/ /g, "") || "";
			data.EmployerPhone = phone.slice(1);

	
			if (
				employmentStatus === "Employed - Hourly" ||
				employmentStatus === "Salary" ||
				employmentStatus === "selfEmployed"
			) {
				console.log(data.yearsAtEmployers);
				if (data.yearsAtEmployers !== "" && data.yearsAtEmployers !== 0 && data.yearsAtEmployers !== null) {
					// alert("nil value");
					setError(false);
					setHelperText("");
					data.employmentStatus = employmentStatus;
					history.push("/annual-income");
				} else {
					// alert("Enter Anual income");
					setError(true);
					setHelperText(
						data.yearsAtEmployers === 0
							? "Tenure at employer should not be zero"
							: "Your tenure at employer is required."
					);
				}
			} else {
				setError(false);
				setHelperText("");
				// alert(employmentStatus);
				data.employmentStatus = employmentStatus;
				history.push("/annual-income");
			}
		},
	});


	const onHandleChange = (event) => {
		const reg = /^[0-9\b]+$/;
		let acc = event.target.value;

		if (acc === "" || reg.test(acc)) {
			setData({
				...data,
				"yearsAtEmployers": parseInt(
					event.target.value ? event.target.value : "0"
				),
			});
		}
		console.log(event.target.value);
		if (event.target.value !== "" && event.target.value > 0) {
			setError(false);
			setHelperText("");
		} else if (event.target.value === "") {
			setError(true);
			setHelperText("Tenure at employer should not be zero");
		}
	};

// prevent keyboard space
	const preventSpace = (event) => {
		// const reg = /[a-zA-Z]+[ ]{0,1}[']{0,1}/;
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};

// JSX part
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
								<form onSubmit={formik.handleSubmit}>
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det42 determinate slantDiv"
									></div>
									<span class="floatLeft detNum42">42%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/personal-info">
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid>
									<img
										alt="Employment"
										src={EmploymenyStatus}
										className="spinAnimation"
									/>
								</Grid>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSS"
								>
									Tell us about your employment status
								</Typography>
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
									>
										<Paper
											elevation={3}
											data-testid="Hourly"
											className={
												employmentStatus === "Employed - Hourly"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setEmploymentStatus("Employed - Hourly");
											}}
										>
											Employed - Hourly
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-testid="Salary"
											className={
												employmentStatus === "Salary"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setEmploymentStatus("Salary");
											}}
										>
											Employed - Salaried
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-testid="selfEmployed"
											className={
												employmentStatus === "selfEmployed"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setEmploymentStatus("selfEmployed");
											}}
										>
											Self Employed / 1099
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-testid="Unemployed"
											className={
												employmentStatus === "Unemployed"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setEmploymentStatus("Unemployed");
												setData({ ...data, "yearsAtEmployers": 0 });
											}}
										>
											Unemployed
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-testid="Retired"
											className={
												employmentStatus === "Retired"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setEmploymentStatus("Retired");
												setData({ ...data, "yearsAtEmployers": 0 });
											}}
										>
											Retired
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<TextField
											name="yearsAtEmployers"
											className={
												employmentStatus === "Employed - Hourly" ||
												employmentStatus === "Salary" ||
												employmentStatus === "selfEmployed"
													? "showMsg"
													: "hideMsg"
											}
											label="Years at Employer"
											form={true}
											error={error}
											helperText={helperText}
											value={data.yearsAtEmployers}
											// onChange= { (event) => {setData({ ...data, ['yearsAtEmployers']: event.target.value })}}
											onChange={onHandleChange}
											materialProps={{
												"data-testid": "yearsAtEmployee",
												maxLength: "2",
											}}
										/>
									</Grid>
									<Grid
										item
										lg={8}
										md={8}
										xs={12}
										name="phone"
										className={
											employmentStatus === "Employed - Hourly" ||
											employmentStatus === "Salary"
												? "showMsg padTop"
												: "hideMsg padTop"
										}
									>
										<PhoneNumber
											name="phone"
											className={
												employmentStatus === "Employed - Hourly" ||
												employmentStatus === "Salary"
													? "showMsg"
													: "hideMsg"
											}
											label="Employer's phone number"
											placeholder="Enter employer's phone number"
											id="phone"
											type="text"
											onKeyDown={preventSpace}
											value={formik.values.phone}
											// onChange={onSSNhandleChange}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={
												formik.touched.phone && Boolean(formik.errors.phone)
											}
											helperText={formik.touched.phone && formik.errors.phone}
										/>
									</Grid>

									<Grid item lg={8} md={8} xs={12} className="alignButton">
										<Button
											// onClick={handleRoute}
											data-testid="cntButton"
											type= "submit"
											disabled={employmentStatus === "" ? true : false}
											stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
										>
											<Typography align="center" className="textCSS ">
												Continue
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

export default CitizenshipStatus;
