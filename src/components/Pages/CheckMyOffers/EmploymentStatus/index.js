import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import EmploymentStatusPNG from "../../../../assets/icon/I-Employment-Status.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary, PhoneNumber, Select } from "../../../FormsUI";
import ScrollToTopOnMount from "../ScrollToTop";
import "./EmploymentStatus.css";

//Initializing functional component CitizenshipStatus
function EmploymentStatus() {
	//Retrieving Context values
	const { data, setData } = useContext(CheckMyOffers);
	const [ employmentStatus, setEmploymentStatus ] = useState(data.employmentStatus ? data.employmentStatus : "");
	const history = useHistory();

	//initializing formik
	const validationSchema = yup.object({
		phone: yup
			.string("Enter a name")
			.nullable()
			.transform((value) => value.replace(/[^\d]/g, ""))
			.matches(/^$|^[1-9]{1}\d{2}\d{3}\d{4}$/, "Please enter a valid phone number")
			.matches(/^$|^(\d)(?!\1+$)\d{9}$/, "Please enter a valid phone number"),

		yearsAtEmployers: yup
			.string()
			.when("employStatus", {
				is: "Employed - Hourly",
				then: yup.string().required("Years at employer is required"),
			})
			.when("employStatus", {
				is: "Salary",
				then: yup.string().required("Years at employer is required"),
			})
			.when("employStatus", {
				is: "selfEmployed",
				then: yup.string().required("Years at employer is required"),
			}),
	});
	const formik = useFormik({
		initialValues: {
			phone: data.EmployerPhone ? "1" + data.EmployerPhone : "",
			yearsAtEmployers: data.yearsAtEmployers ? data.yearsAtEmployers : "",
			employStatus: "",
		},
		validationSchema: validationSchema,
		//On submit functionality
		onSubmit: (values) => {
			data.yearsAtEmployers = values.yearsAtEmployers;
			const phone =
				values.phone
					.replace(/-/g, "")
					.replace(/\)/g, "")
					.replace(/\(/g, "")
					.replace(/ /g, "") || "";
			data.EmployerPhone = phone.slice(1);
			data.completedPage = data.page.employmentStatus;

			if (employmentStatus === "Employed - Hourly" || employmentStatus === "Salary" || employmentStatus === "selfEmployed") {
				if (data.yearsAtEmployers !== "" && data.yearsAtEmployers !== 0 && data.yearsAtEmployers !== null) {
					data.employmentStatus = employmentStatus;
					history.push("/annual-income");
				}
			} else {
				data.employmentStatus = employmentStatus;
				history.push("/annual-income");
			}
		},
	});

	// prevent keyboard space
	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};

	if (data.completedPage < data.page.existingUser || data.formStatus === "completed") {
		history.push("/select-amount");
	}
	// JSX part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid
						item
						xs={ 12 }
						container
						justifyContent="center"
						alignItems="center"
						style={ { padding: "4% 0px 4% 0px" } }
					>
						<Grid
							container
							item
							xs={ 11 }
							sm={ 10 }
							md={ 6 }
							lg={ 6 }
							xl={ 6 }
						>
							<Paper
								id="employmentStatusWrap"
								className="cardWOPadding"
								style={ { justify: "center", alignItems: "center" } }
							>
								<form onSubmit={ formik.handleSubmit }>
									<div className="progress mt-0">
										<div
											id="determinate"
											className="det42 determinate slantDiv"
										/>
										<span className="floatLeft detNum42">42%</span>
									</div>
									<Grid className="floatLeft">
										<Link className="arrowBack" to="/personal-info">
											<i className="material-icons dp48 yellowText floatingButton">
												arrow_back
											</i>
										</Link>
									</Grid>
									<Grid>
										<img
											alt="Employment"
											src={ EmploymentStatusPNG }
											className="spinAnimation"
										/>
									</Grid>

									<Typography
										variant="h5"
										style={ {
											align: "center",
											justify: "center",
											alignItems: "center",
										} }
										className="checkMyOfferText borrowCSSLP"
									>
										Tell us about your employment status
									</Typography>
									<Grid
										item
										md={ 12 }
										className="blockDiv"
										container
										justifyContent="center"
										alignItems="center"
									>
										<Grid
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
										>
											<Paper
												id="employedHourly"
												elevation={ 3 }
												data-testid="Hourly"
												className={
													employmentStatus === "Employed - Hourly"
														? "activeBorder radioBlocked"
														: "radioBlocked"
												}
												onClick={ () => {
													setEmploymentStatus("Employed - Hourly");
													formik.setFieldValue(
														"employStatus",
														"Employed - Hourly"
													);
												} }
											>
												Employed - Hourly
											</Paper>
										</Grid>
										<Grid item lg={ 8 } md={ 8 } xs={ 12 }>
											<Paper
												id="employedSalaried"
												elevation={ 3 }
												data-testid="Salary"
												className={
													employmentStatus === "Salary"
														? "activeBorder radioBlocked"
														: "radioBlocked"
												}
												onClick={ () => {
													setEmploymentStatus("Salary");
													formik.setFieldValue("employStatus", "Salary");
												} }
											>
												Employed - Salaried
											</Paper>
										</Grid>
										<Grid item lg={ 8 } md={ 8 } xs={ 12 }>
											<Paper
												id="selfEmployed"
												elevation={ 3 }
												data-testid="selfEmployed"
												className={
													employmentStatus === "selfEmployed"
														? "activeBorder radioBlocked"
														: "radioBlocked"
												}
												onClick={ () => {
													setEmploymentStatus("selfEmployed");
													formik.setFieldValue("employStatus", "selfEmployed");
												} }
											>
												Self Employed / 1099
											</Paper>
										</Grid>
										<Grid item lg={ 8 } md={ 8 } xs={ 12 }>
											<Paper
												id="Unemployed"
												elevation={ 3 }
												data-testid="Unemployed"
												className={
													employmentStatus === "Unemployed"
														? "activeBorder radioBlocked"
														: "radioBlocked"
												}
												onClick={ () => {
													setEmploymentStatus("Unemployed");
													setData({ ...data, yearsAtEmployers: 0 });
													formik.setFieldValue("employStatus", "Unemployed");
													formik.values.employStatus = "Unemployed";
													if (data.completedPage < data.page.employmentStatus) {
														formik.submitForm();
													}
												} }
											>
												Unemployed
											</Paper>
										</Grid>
										<Grid item lg={ 8 } md={ 8 } xs={ 12 }>
											<Paper
												id="Retired"
												elevation={ 3 }
												data-testid="Retired"
												className={
													employmentStatus === "Retired"
														? "activeBorder radioBlocked"
														: "radioBlocked"
												}
												onClick={ () => {
													setEmploymentStatus("Retired");
													setData({ ...data, yearsAtEmployers: 0 });
													formik.setFieldValue("employStatus", "Retired");
													formik.values.employStatus = "Retired";
													if (data.completedPage < data.page.employmentStatus) {
														formik.submitForm();
													}
												} }
											>
												Retired
											</Paper>
										</Grid>
										<Grid item lg={ 8 } md={ 8 } xs={ 12 }>
											<div
												id="employementWrap"
												className={
													employmentStatus === "Employed - Hourly" ||
														employmentStatus === "Salary" ||
														employmentStatus === "selfEmployed"
														? "showMsg"
														: "hideMsg"
												}
											>
												<Select
													fullWidth={ true }
													name="yearsAtEmployers"
													labelform="Years at Employer *"
													value={ formik.values.yearsAtEmployers }
													onChange={ formik.handleChange }
													onBlur={ formik.handleBlur }
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
													inputTestID="AD-input"
													selectTestID="AD-select"
												/>
											</div>
										</Grid>
										<Grid
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											name="phone"
											id="employerPhoneWrap"
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
												onKeyDown={ preventSpace }
												value={ formik.values.phone }
												onChange={ formik.handleChange }
												onBlur={ formik.handleBlur }
												error={
													formik.touched.phone && Boolean(formik.errors.phone)
												}
												helperText={ formik.touched.phone && formik.errors.phone }
											/>
										</Grid>

										<Grid item lg={ 8 } md={ 8 } xs={ 12 } className="alignButton">
											<ButtonPrimary
												data-testid="cntButton"
												type="submit"
												disabled={ employmentStatus === "" }
												stylebutton='{"background": "#FFBC23", "color": "black","fontSize":"0.938rem","padding": "0px 30px"}'
											>
												Continue
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

export default EmploymentStatus;
