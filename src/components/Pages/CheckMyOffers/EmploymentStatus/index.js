import React, { useState, useContext } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField, ButtonPrimary, PhoneNumber, Select } from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";
import EmploymenyStatus from "../../../../assets/icon/I-Employment-Status.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import ScrollToTopOnMount from '../scrollToTop';
import "./employmentStatus.css";

//Yup validation schema


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
const goNext = (val) => {
	// alert(val);
	data.employmentStatus = val;
	data.yearsAtEmployers = 0;			
	console.log("cahnge", data);		
	data.completedPage = data.page.employmentStatus;
	history.push("/annual-income");
}

const validationSchema = yup.object({
	phone: yup
		.string("Enter a name")
		.nullable()
		.transform((value) => value.replace(/[^\d]/g, ""))
		.matches(/^$|^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/, "Invalid Phone")
		.matches(/^$|^(\d)(?!\1+$)\d{9}$/, "Invalid Phone"),

	yearsAtEmployers: yup
	.string()
	// .required("required"),
	// .when("employStatus", {
	// 	is: employStatus === "Employed - Hourly" || [yup.ref("employStatus")] === "Salary" || [yup.ref("employStatus")] === "selfEmployed",
	// 	then: yup.string().required("Years at employer is required")
	// })
	.when('employStatus', {
		is: "Employed - Hourly",
		then: yup.string().required('Years at employers is required'),
	})
	.when('employStatus', {
		is: "Salary",
		then: yup.string().required('Years at employers is required'),
	})
	.when('employStatus', {
		is: "selfEmployed",
		then: yup.string().required('Years at employers is required'),
	}),
	
});
	const formik = useFormik({
		initialValues: {
			phone: data.EmployerPhone ? "1" + data.EmployerPhone : "",
			yearsAtEmployers : '',
			employStatus: ''
		},
		validationSchema: validationSchema,
//On submit funcationality
		onSubmit: (values) => {
			console.log("data",employmentStatus);

			data.yearsAtEmployers = values.yearsAtEmployers;
			var phone =
				values.phone
					.replace(/-/g, "")
					.replace(/\)/g, "")
					.replace(/\(/g, "")
					.replace(/ /g, "") || "";
			data.EmployerPhone = phone.slice(1);
			data.completedPage = data.page.employmentStatus;

	
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
				console.log("unemployed");
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

	// if (data.completedPage < data.page.existingUser  || data.formStatus === 'completed'){
	// 	history.push("/select-amount");
	// }
// JSX part
console.log("error", data);
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
									className="borrowCSSLP"
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
													? "activeBorder radioBlocke "
													: "radioBlocke "
											}
											onClick={() => {
												setEmploymentStatus("Employed - Hourly");
												formik.setFieldValue('employStatus', "Employed - Hourly");
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
													? "activeBorder radioBlocke "
													: "radioBlocke "
											}
											onClick={() => {
												setEmploymentStatus("Salary");
												formik.setFieldValue('employStatus', "Salary");
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
													? "activeBorder radioBlocke "
													: "radioBlocke "
											}
											onClick={() => {
												setEmploymentStatus("selfEmployed");
												formik.setFieldValue('employStatus', "selfEmployed");
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
													? "activeBorder radioBlocke "
													: "radioBlocke "
											}
											onClick={() => {
												setEmploymentStatus("Unemployed");
												setData({ ...data, "yearsAtEmployers": 0 });
												formik.setFieldValue('employStatus', "Unemployed");
												formik.values.employStatus = "Unemployed";
												if(data.completedPage < data.page.employmentStatus){
													formik.submitForm();
												}
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
													? "activeBorder radioBlocke "
													: "radioBlocke "
											}
											onClick={() => {
												setEmploymentStatus("Retired");
												setData({ ...data, "yearsAtEmployers": 0 });
												formik.setFieldValue('employStatus', "Retired");
												formik.values.employStatus = "Retired";
												if(data.completedPage < data.page.employmentStatus){
													formik.submitForm();
												}
											}}
										>
											Retired
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										{/* <TextField
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
										/> */}
										{/* <selectWithLabel
                                       fullWidth= {true}
                                            name="activeDuty"
                                            labelform="Active Duty *"
                                            select='[{"value":"0", "label": "Zero"}, {"value":"1", "label": "One"}]'
                                            value={formik.values.activeDuty}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.activeDuty && Boolean(formik.errors.activeDuty)}
											helperText={formik.touched.activeDuty && formik.errors.activeDuty}
                                            inputTestID = "ADinput"
                                            selectTestID = "ADselect"
                                        /> */}
										<div className={
											employmentStatus === "Employed - Hourly" ||
											employmentStatus === "Salary" ||
											employmentStatus === "selfEmployed"
												? "showMsg"
												: "hideMsg"
										}>
										<Select
										
                                       fullWidth= {true}
                                            name="yearsAtEmployers"
                                            labelform="Years at Employer *"
											value={formik.values.yearsAtEmployers}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.yearsAtEmployers &&
													Boolean(formik.errors.yearsAtEmployers)
												}
												helperText={
													formik.touched.yearsAtEmployers &&
													formik.errors.yearsAtEmployers
												}
                                            select='[{"value":"0", "label": "<1 year"}, 
													{"value":"1", "label": "1 year"},
													{"value":"2", "label": "2 years"},
													{"value":"3", "label": "3 years"},
													{"value":"4", "label": "4 years"},
													{"value":"5", "label": "5 years"},
													{"value":"6", "label": "6 years"},
													{"value":"7", "label": "7 years"},
													{"value":"8", "label": "8 years"},
													{"value":"9", "label": "9 years"},
													{"value":"10", "label": "10 years"},
													{"value":"11", "label": "11 years"},
													{"value":"12", "label": "12 years"},
													{"value":"13", "label": "13 years"},
													{"value":"14", "label": "14 years"},
													{"value":"15", "label": "15 years"},
													{"value":"16", "label": "16 years"},
													{"value":"17", "label": "17 years"},
													{"value":"18", "label": "18 years"},
													{"value":"19", "label": "19 years"},
													 {"value":"20", "label": "20+ years"}]'
                                  
                                            inputTestID = "ADinput"
                                            selectTestID = "ADselect"
                                        />
										</div>
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
										<ButtonPrimary
											// onClick={handleRoute}
											data-testid="cntButton"
											type= "submit"
											disabled={employmentStatus === "" ? true : false}
											stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
										>
											<Typography align="center" className="textCSS ">
												Continue
											</Typography>
										</ButtonPrimary>
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
