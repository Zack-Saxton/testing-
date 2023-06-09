import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { employmentStatusData } from "../../../../assets/data/constants";
import globalMessages from "../../../../assets/data/globalMessages.json";
import EmploymentStatusPNG from "../../../../assets/icon/I-Employment-Status.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary, PhoneNumber, Select } from "../../../FormsUI";
import ScrollToTop from "../ScrollToTop";
import "./EmploymentStatus.css";
import { phoneNumberMask, maskPhoneNumberWithAsterisk } from '../../../Controllers/CommonController'
import { usePhoneNumber } from "../../../../hooks/usePhoneNumber";
import { TextField } from "@mui/material";
//Initializing functional component CitizenshipStatus
function EmploymentStatus() {
	//Retrieving Context values
	const { phoneNumberValue, setPhoneNumberValue, phoneNumberCurrentValue, setPhoneNumberCurrentValue, updateActualValue, updateMaskValue, updateEnterPhoneNo } = usePhoneNumber();
	const { data, setData } = useContext(CheckMyOffers);
	const [ employmentStatus, setEmploymentStatus ] = useState(data.employmentStatus ? data.employmentStatus : "");
	const navigate = useNavigate();
	const classes = preLoginStyle();

	useEffect(() => {
		if (data?.completedPage < data?.page?.existingUser || data?.formStatus?.toLowerCase() === "completed") {
			navigate("/select-amount");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	//initializing formik
	const validationSchema = yup.object({
		phone: yup
			.string(globalMessages.NameEnter)
			.nullable()
			.transform((value) => value.replace(/[^\d]/g, ""))
			.matches(/^$|^[1-9]{1}\d{2}\d{3}\d{4}$/, globalMessages.PhoneValid)
			.matches(/^$|^(\d)(?!\1+$)\d{9}$/, globalMessages.PhoneValid),

		yearsAtEmployers: yup
			.string()
			.when("employStatus", {
				is: employmentStatusData.employedHourly,
				then: yup.string().required(globalMessages.Years_At_Employer_Required),
			})
			.when("employStatus", {
				is: employmentStatusData.employedSalaried,
				then: yup.string().required(globalMessages.Years_At_Employer_Required),
			})
			.when("employStatus", {
				is: employmentStatusData.selfEmployed,
				then: yup.string().required(globalMessages.Years_At_Employer_Required),
			}),
	});

	useEffect(() => {
		setPhoneNumberValue( data.EmployerPhone?data.EmployerPhone :"");
		setPhoneNumberCurrentValue(maskPhoneNumberWithAsterisk(phoneNumberMask( data.EmployerPhone ?data.EmployerPhone: "")));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ data.EmployerPhone]);

	const formik = useFormik({
		initialValues: {
			phone: data.EmployerPhone ? data.EmployerPhone : "",
			yearsAtEmployers: data.yearsAtEmployers ? data.yearsAtEmployers : "",
			employStatus: "",
		},
		validationSchema: validationSchema,
		//On submit functionality
		onSubmit: (values) => {
			data.yearsAtEmployers = values.yearsAtEmployers;
			data.EmployerPhone =
				values.phone
				.replace(/[-\(\)\s]/g, "") || ""

			data.completedPage = data.page.employmentStatus;

			if (employmentStatus === employmentStatusData.employedHourly || employmentStatus === employmentStatusData.employedSalaried || employmentStatus === employmentStatusData.selfEmployed) {
				if (data.yearsAtEmployers) {
					data.employmentStatus = employmentStatus;
					navigate("/annual-income");
				}
			} else {
				data.employmentStatus = employmentStatus;
				navigate("/annual-income");
			}
		},
	});

	// prevent keyboard space
	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};
	const shortANDOperation = (pramOne, pramtwo) => {
		return pramOne && pramtwo
	};
let yearsatEmployer = [];
  for(let start=0; start <= 20; start++){
    let labelString = start === 0 ? "<1 year" : (start === 1 ? "1 year" : (start === 20 ? "20+ years": `${start}`))
    yearsatEmployer.push({value: start.toString(), label: labelString});
  }
yearsatEmployer = JSON.stringify(yearsatEmployer);
	// JSX part
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
						className={classes.EmploymentStatusBoxGrid}
					>
						<Grid
							container
							item
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6}
						>
							<Paper
								id="employmentStatusWrap"
								className={classes.checkMyOffersPaperStyle}
							>
								<form onSubmit={formik.handleSubmit}>
									<div className="progress mt-0">
										<div
											id="determinate"
											className="det42 determinate slantDiv"
										/>
										<span className="floatLeft detNum42">42%</span>
									</div>
									<Grid className="floatLeft">
										<Link className="arrowBack" to="/personal-info" data-testid="route backward">
											<i className="material-icons dp48 yellowText floatingButton">
												arrow_back
											</i>
										</Link>
									</Grid>
									<Grid>
										<img
											alt="Employment"
											src={EmploymentStatusPNG}
											className="spinAnimation"
										/>
									</Grid>

									<Typography
										variant="h5"
										className={classes.typoStyle}
									>
										Tell us about your employment status
									</Typography>
									<Grid
										item
										md={12}
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
											lg={8}
											md={8}
											xs={12}
										>
											<Paper
												id="employedHourly"
												elevation={3}
												data-testid="Hourly"
												className={
													employmentStatus === employmentStatusData.employedHourly
														? "activeBorder radioBlocked"
														: "radioBlocked"
												}
												onClick={() => {
													setEmploymentStatus(employmentStatusData.employedHourly);
													formik.setFieldValue(
														"employStatus",
														employmentStatusData.employedHourly
													);
												}}
											>
												Employed - Hourly
											</Paper>
										</Grid>
										<Grid item lg={8} md={8} xs={12}>
											<Paper
												id="employedSalaried"
												elevation={3}
												data-testid={employmentStatusData.employedSalaried}
												className={
													employmentStatus === employmentStatusData.employedSalaried
														? "activeBorder radioBlocked"
														: "radioBlocked"
												}
												onClick={() => {
													setEmploymentStatus(employmentStatusData.employedSalaried);
													formik.setFieldValue("employStatus", employmentStatusData.employedSalaried);
												}}
											>
												Employed - Salaried
											</Paper>
										</Grid>
										<Grid item lg={8} md={8} xs={12}>
											<Paper
												id="selfEmployed"
												elevation={3}
												data-testid={employmentStatusData.selfEmployed}
												className={
													employmentStatus === employmentStatusData.selfEmployed
														? "activeBorder radioBlocked"
														: "radioBlocked"
												}
												onClick={() => {
													setEmploymentStatus(employmentStatusData.selfEmployed);
													formik.setFieldValue("employStatus", employmentStatusData.selfEmployed);
												}}
											>
												Self Employed / 1099
											</Paper>
										</Grid>
										<Grid item lg={8} md={8} xs={12}>
											<Paper
												id="Unemployed"
												elevation={3}
												data-testid={employmentStatusData.unemployed}
												className={
													employmentStatus === employmentStatusData.unemployed
														? "activeBorder radioBlocked"
														: "radioBlocked"
												}
												onClick={() => {
													setEmploymentStatus(employmentStatusData.unemployed);
													setData({ ...data, yearsAtEmployers: 0 });
													formik.setFieldValue("employStatus", employmentStatusData.unemployed);
													formik.values.employStatus = employmentStatusData.unemployed;
													if (data.completedPage < data.page.employmentStatus) {
														formik.submitForm();
													}
												}}
											>
												Unemployed
											</Paper>
										</Grid>
										<Grid item lg={8} md={8} xs={12}>
											<Paper
												id="Retired"
												elevation={3}
												data-testid={employmentStatusData.retired}
												className={
													employmentStatus === employmentStatusData.retired
														? "activeBorder radioBlocked"
														: "radioBlocked"
												}
												onClick={() => {
													setEmploymentStatus(employmentStatusData.retired);
													setData({ ...data, yearsAtEmployers: 0 });
													formik.setFieldValue("employStatus", employmentStatusData.retired);
													formik.values.employStatus = employmentStatusData.retired;
													if (data.completedPage < data.page.employmentStatus) {
														formik.submitForm();
													}
												}}
											>
												Retired
											</Paper>
										</Grid>
										<Grid item lg={8} md={8} xs={12}>
											<div
												id="employementWrap"
												data-testid="select field"
												className={
													employmentStatus === employmentStatusData.employedHourly ||
														employmentStatus === employmentStatusData.employedSalaried ||
														employmentStatus === employmentStatusData.selfEmployed
														? "showMsg"
														: "hideMsg"
												}
											>
												<Select
													id="yearsAtEmployersSelect"
													fullWidth={true}
													data-testid="Select Field"
													name="yearsAtEmployers"
													labelform="Years at Employer *"
													value={formik.values.yearsAtEmployers}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													error = {
														shortANDOperation(formik.touched.yearsAtEmployers,Boolean(formik.errors.yearsAtEmployers))
													}
													helperText = {
														shortANDOperation(formik.touched.yearsAtEmployers,formik.errors.yearsAtEmployers)
													}
													select={yearsatEmployer}
													inputTestID="AD-input"
													selectTestID="AD-select"
												/>
											</div>
										</Grid>
										<Grid
											item
											lg={8}
											md={8}
											xs={12}
											name="phone"
											id="employerPhoneWrap"
											data-testid="phone number field"
											className={
												employmentStatus === employmentStatusData.employedHourly ||
													employmentStatus === employmentStatusData.employedSalaried
													? "showMsg padTop"
													: "hideMsg padTop"
											}
										>
											<PhoneNumber
												name="phone"
												className={
													employmentStatus === employmentStatusData.employedHourly ||
														employmentStatus === employmentStatusData.employedSalaried
														? "showMsg"
														: "hideMsg"
												}
												label="Employer's phone number"
												placeholder="Enter employer's phone number"
												id="phone"
												type="text"
												data-testid="phone_number_field"
												onKeyDown={preventSpace}
												onBlur={(event)=>{
													updateMaskValue(event);
													formik.handleBlur(event);
												}}
												value = { formik.values.phone}
												onChange={(event)=>{
													updateEnterPhoneNo(event);
													formik.handleChange(event);
												}}
												error={shortANDOperation(formik.touched.phone, Boolean(formik.errors.phone))}
												helperText = {shortANDOperation(formik.touched.phone, formik.errors.phone)}
												onFocus={ updateActualValue }
											/>
										</Grid>

										<Grid item lg={8} md={8} xs={12} className="alignButton">
											<ButtonPrimary
												data-testid="cntButton"
												type="submit"
												disabled={!employmentStatus}
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
