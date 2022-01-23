import "../CheckMyOffer.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ButtonPrimary, Select, TextField, Zipcode } from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import MarriedStatusLogo from "../../../../assets/icon/married-status.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import ScrollToTopOnMount from "../ScrollToTop";
import ZipCodeLookup from "../../../Controllers/ZipCodeLookup";
import { Error} from "../../../toast/toast";
//Yup validation schema
const validationSchema = yup.object({
	martialStatus: yup
		.string("Enter your Martial Status")
		.required("Please select your martial status"),
	add: yup
		.string()
		.when("martialStatus", {
			is: "Married",
			then: yup.string().required("Spouse Address is required"),
		})
		.when("martialStatus", {
			is: "Separated, under decree of legal separation",
			then: yup.string().required("Spouse Address is required"),
		}),
	spouseZipcode: yup
		.string()
		.when("martialStatus", {
			is: "Married",
			then: yup.string().required("Your home ZIP Code is required"),
		})
		.when("martialStatus", {
			is: "Separated, under decree of legal separation",
			then: yup.string().required("Your home ZIP Code is required"),
		}),
	spousecity: yup
		.string()
		.when("martialStatus", {
			is: "Married",
			then: yup
				.string()
				.required(
					"Your home city is required. Please re-enter your zip code to populate your city"
				),
		})
		.when("martialStatus", {
			is: "Separated, under decree of legal separation",
			then: yup
				.string()
				.required(
					"Your home city is required. Please re-enter your zip code to populate your city"
				),
		}),
	spouseSelectState: yup
		.string()
		.when("martialStatus", {
			is: "Married",
			then: yup.string().required("Your home state is required"),
		})
		.when("martialStatus", {
			is: "Separated, under decree of legal separation",
			then: yup.string().required("Your home state is required"),
		}),
});

// custom component - MarriedStatus
function MarriedStatus() {
	const { data, setData } = useContext(CheckMyOffers);
	const [stateShort, setStateShort] = useState("");
	const [validZip, setValidZip] = useState(true);
	const history = useHistory();

	//Configuring formik 
	const formik = useFormik({
		initialValues: {
			martialStatus: data.maritalStatus ?? "",
			add: data.spouse_address_street ? data.spouse_address_street : ( data.streetAddress ? data.streetAddress : ""),
			spouseZipcode: data.spouse_address_postal_code ? data.spouse_address_postal_code : ( data.zip ? data.zip : ""),
			spouseSelectState: data.spouse_address_state_full_form ? data.spouse_address_state_full_form : ( data.stateFullform ? data.stateFullform : ""),
			spousecity: data.spouse_address_city ? data.spouse_address_city : ( data.city ? data.city : ""),
		},
		validationSchema: validationSchema,

		onSubmit: (values) => {
			//onsubmit store the data to context and procceds
			setData({
				...data,
				maritalStatus: values.martialStatus,
				spouse_address_street: values.add,
				spouse_address_city: values.spousecity,
				spouse_address_state: stateShort,
				spouse_address_state_full_form: values.spouseSelectState,
				spouse_address_postal_code: values.spouseZipcode,
				completedPage: data.page.activeDuty,
			});
			history.push("/ssn");
		},
	});

	//prevent the space in key down
	const preventSpace = (event) => {
		if (event.keyCode === 32 && formik.values.streetAddress === "") {
			event.preventDefault();
		}
	};

	//fetch the state and city based in zip code
const fetchAddress = async(e) => {
	try {
		if (e.target.value !== "" && e.target.value.length === 5) {
			let result = await ZipCodeLookup(e.target.value);
			if (result) {
				formik.setFieldValue("spouseSelectState",result.data.data.data.stateCode);
				formik.setFieldValue("spousecity", result.data.data.data.cityName);
				setStateShort(result.data.data.data.stateCode);
				setValidZip(true);
			} else {
				formik.setFieldValue("spouseSelectState", "");
				formik.setFieldValue("spousecity", "");
				setStateShort("");
				setValidZip(false);
			}
		} else {
			formik.setFieldValue("spouseSelectState", "");
			formik.setFieldValue("spousecity", "");
			setStateShort("");
		}
		formik.handleChange(e);
	} catch (error) {
		Error(' Error from [fetchAddress].')
	}
	};

	//redirect to select amount if page accessed directly
	if (
		data.completedPage < data.page.livingPlace ||
		data.formStatus === "completed"
	) {
		history.push("/select-amount");
	}

	//JSX part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
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
								id="maritalStatusWrap"
								className="cardWOPadding"
								style={{
									justify: "center",
									alignItems: "center",
									width: "inherit",
									marginBottom: "10%",
									marginTop: "10%",
								}}
							>
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det92 determinate slantDiv"
									/>
									<span className="floatLeft detNum92">92%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/living-place">
										<i className="material-icons dp48 yellowText  ">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid style={{ marginTop: "-4%" }}>
									<img
										alt="marriedlogo"
										src={MarriedStatusLogo}
										className="spinAnimation"
									/>
								</Grid>

								<Typography
									variant="h5"
									style={{
										align: "center",
										justify: "center",
										alignItems: "center",
									}}
									className="borrowCSS"
								>
									Are you married?*
								</Typography>
								<form onSubmit={formik.handleSubmit}>
									<Grid
										item
										md={12}
										className="blockDiv"
										container
										justifyContent="center"
										alignItems="center"
									>
										<Grid
											id="selectMaritalStatus"
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
										>
											<Select
												id="selectMaritalStatusWrap"
												fullWidth={true}
												name="martialStatus"
												labelform="Marital Status *"
												select='[{"value":"Married"}, {"value":"Unmarried"}, {"value":"Separated, under decree of legal separation"}]'
												value={formik.values.martialStatus}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={
													formik.touched.martialStatus &&
													Boolean(formik.errors.martialStatus)
												}
												helperText={
													formik.touched.martialStatus &&
													formik.errors.martialStatus
												}
											/>
										</Grid>
										<Grid
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className={
												formik.values.martialStatus === "Married" ||
													formik.values.martialStatus ===
													"Separated, under decree of legal separation"
													? "showMsg space"
													: "hideMsg space"
											}
										>
											<TextField
												id="spouseAddressWrap"
												name="add"
												label="Spouse's Address (if different) *"
												value={formik.values.add}
												onKeyDown={preventSpace}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched.add && Boolean(formik.errors.add)}
												helperText={formik.touched.add && formik.errors.add}
											/>
										</Grid>
										<Grid
											container
											justifyContent="flex-start"
											alignItems="flex-start"
											item
											lg={8}
											md={8}
											xs={12}
											className={
												formik.values.martialStatus === "Married" ||
													formik.values.martialStatus ===
													"Separated, under decree of legal separation"
													? "showMsg "
													: "hideMsg "
											}
										>
											<p className="left-align MarginUpDown10">
												<b>Location</b>
											</p>
										</Grid>
										<Grid
											container
											justifyContent="flex-start"
											alignItems="flex-start"
											item
											lg={8}
											md={8}
											xs={12}
											className={
												formik.values.martialStatus === "Married" ||
													formik.values.martialStatus ===
													"Separated, under decree of legal separation"
													? "showMsg space"
													: "hideMsg space"
											}
										>
											<Zipcode
												fullWidth
												id="zip"
												name="spouseZipcode"
												label="Zipcode *"
												value={formik.values.spouseZipcode}
												onChange={fetchAddress}
												onBlur={formik.handleBlur}
												error={
													(formik.touched.spouseZipcode &&
														Boolean(formik.errors.spouseZipcode)) ||
													!validZip
												}
												helperText={
													validZip
														? formik.touched.spouseZipcode &&
														formik.errors.spouseZipcode
														: "Please enter a valid Zip code"
												}
											/>
										</Grid>
										<Grid
											container
											justifyContent="flex-start"
											alignItems="flex-start"
											item
											lg={8}
											md={8}
											xs={12}
											className={
												formik.values.martialStatus === "Married" ||
													formik.values.martialStatus ===
													"Separated, under decree of legal separation"
													? "showMsg space"
													: "hideMsg space"
											}
										>
											<TextField
												id="cityWrap"
												name="spouseCity"
												label="City"
												value={formik.values.spousecity}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												disabled={true}
												error={
													formik.touched.spousecity &&
													Boolean(formik.errors.spousecity)
												}
												helperText={
													formik.touched.spousecity &&
													formik.errors.spousecity
												}
											/>
										</Grid>
										<Grid
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className={
												formik.values.martialStatus === "Married" ||
													formik.values.martialStatus ===
													"Separated, under decree of legal separation"
													? "showMsg space"
													: "hideMsg space"
											}
										>
											<TextField
												id="stateWrap"
												name="spouseSelectState"
												label="State"
												value={formik.values.spouseSelectState}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												disabled={true}
												error={
													formik.touched.spouseSelectState &&
													Boolean(formik.errors.spouseSelectState)
												}
												helperText={
													formik.touched.spouseSelectState &&
													formik.errors.spouseSelectState
												}
											/>
										</Grid>

										<Grid item lg={8} md={8} xs={12} className="alignButton">
											<ButtonPrimary
												type="submit"
												disabled={!validZip}
												stylebutton='{"background": "#FFBC23", "padding": "0px 30px", "color": "black","fontSize":"0.938rem"}'
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

export default MarriedStatus;
