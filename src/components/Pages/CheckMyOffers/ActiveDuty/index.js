import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import ActiveDutyLogo from "../../../../assets/icon/active-duty.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary, Select } from "../../../FormsUI";
import "../CheckMyOffer.css";
import ScrollToTopOnMount from "../ScrollToTop";
import globalMessages from "../../../../assets/data/globalMessages.json";

//Yup validation schema
const validationSchema = yup.object({
	activeDuty: yup
		.string(globalMessages.ZipCodeEnter)
		.required(globalMessages.Select_Active_Duty),
	activeDutyRank: yup.string().when("activeDuty", {
		is: "Active Military",
		then: yup.string().required(globalMessages.Active_Duty_Rank_Required),
	}),
});

//Initializing functional component Activity
function ActiveDuty() {
	//Retrieving Context values
	const { data } = useContext(CheckMyOffers);
	const navigate = useNavigate();
	//initializing formik
	const formik = useFormik({
		initialValues: {
			activeDuty: data.militaryActiveDuty ?? "",
			activeDutyRank: data.militaryActiveDutyRank ?? "",
		},
		validationSchema: validationSchema,
		//On submit functionality
		onSubmit: (values) => {
			data.militaryActiveDuty = values.activeDuty;
			data.militaryActiveDutyRank = values.activeDutyRank;
			data.completedPage = data.page.activeDuty;
			navigate("/ssn");
		},
	});

	if (data.completedPage < data.page.livingPlace || data.formStatus === "completed") {
		navigate("/select-amount");
	}
	let disableLoan = formik.values.activeDutyRank === "E4 and below" && formik.values.activeDuty === "Active Military" ? true : false;
	//JSX part
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
						style={ { padding: "4% 0px" } }
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
						>
							<Paper
								id="activeDutyWrap"
								className="cardWOPadding"
								justify="center"
								style={ {
									width: "inherit",
								} }
							>
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det83 determinate slantDiv"
									/>
									<span className="floatLeft detNum83">83%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/living-place">
										<i className="material-icons dp48 yellowText  ">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid style={ { marginTop: "-3%" } }>
									<img
										alt="Active Duty"
										src={ ActiveDutyLogo }
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
									className="borrowCSS"
								>
									Are you active duty military or <br />
									do you have a future active duty date?
								</Typography>
								<form onSubmit={ formik.handleSubmit }>
									<Grid
										item
										md={ 12 }
										className="blockDiv"
										container
										justifyContent="center"
										alignItems="center"
									>
										<Grid
											id="selectActiveDuty"
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
										>
											<Select
												id="activeDutySelect"
												fullWidth={ true }
												name="activeDuty"
												labelform="Active Duty *"
												select='[{"label":"Yes", "value":"Active Military"}, {"label":"No", "value":"Not Active Military"}]'
												value={ formik.values.activeDuty }
												onChange={ formik.handleChange }
												onBlur={ formik.handleBlur }
												error={
													formik.touched.activeDuty &&
													Boolean(formik.errors.activeDuty)
												}
												helperText={
													formik.touched.activeDuty && formik.errors.activeDuty
												}
												inputTestID="ADinput"
												selectTestID="ADselect"
											/>
										</Grid>
										<Grid
											id="activeDutyRankWrap"
											justifyContent="center"
											className={
												formik.values.activeDuty === "Active Military"
													? "showMsg space"
													: "hideMsg space"
											}
											alignItems="center"
											container
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
										>
											<Select
												id="activeDutyRank"
												fullWidth={ true }
												name="activeDutyRank"
												labelform="Thank you for your service. What is your rank? *"
												select='[{"value":"E4 and below"}, {"value":"E5 and above"}]'
												value={ formik.values.activeDutyRank }
												onChange={ formik.handleChange }
												onBlur={ formik.handleBlur }
												error={
													formik.touched.activeDutyRank &&
													Boolean(formik.errors.activeDutyRank)
												}
												helperText={
													formik.touched.activeDutyRank &&
													formik.errors.activeDutyRank
												}
											/>
										</Grid>
										<h4
											className={ disableLoan ? "showMsg" : "hideMsg" }
										>
											Unfortunately, based on the application information provided, <br />you do not meet our application requirements.
										</h4>
										<Grid item lg={ 8 } md={ 8 } xs={ 12 } className="alignButton">
											<ButtonPrimary
												type="submit"
												data-testid="contButton"
												disabled={ disableLoan }
												stylebutton='{"background": "#FFBC23","fontSize": "0.938rem", "padding": "0px 30px", "color": "black","fontSize":"1rem"}'
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

export default ActiveDuty;
