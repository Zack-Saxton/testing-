import "../CheckMyOffer.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {ButtonPrimary, Select, TextField, Zipcode} from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, {useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";
import MarriedStatusLogo from "../../../../assets/icon/married-status.png";
import {CheckMyOffers} from "../../../../contexts/CheckMyOffers";
import ScrollToTopOnMount from "../ScrollToTop";


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
	spouseState: yup
		.string()
		.when("martialStatus", {
			is: "Married",
			then: yup.string().required("Your home city is required. Please re-enter your zip code to populate your city"),
		})
		.when("martialStatus", {
			is: "Separated, under decree of legal separation",
			then: yup.string().required("Your home city is required. Please re-enter your zip code to populate your city"),
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
			add: data.spouse_address_street ?? "",
			spouseZipcode: data.spouse_address_postal_code ?? "",
			spouseState: data.spouse_address_state_full_form ? data.spouse_address_state_full_form : "",
			spouseSelectState: data.spouse_address_city ?? "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			//onsubmit store the data to context and procceds
			setData({
				...data,
				maritalStatus: values.martialStatus,
				spouse_address_street: values.add,
				spouse_address_city: values.spouseSelectState,
				spouse_address_state: stateShort,
				spouse_address_state_full_form: values.spouseState,
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
	const fetchAddress = (e) => {
		if (e.target.value !== "" && e.target.value.length === 5) {
			fetch("https://api.zippopotam.us/us/" + e.target.value)
				.then((res) => res.json())
				.then(
					(result) => {
						if (result.places) {
							formik.setFieldValue(
								"spouseSelectState",
								result.places[0]["place name"]
							);
							formik.setFieldValue("spouseState", result.places[0]["state"]);
							setStateShort(result.places[0]["state abbreviation"]); 
							setValidZip(true);
						} else {
							formik.setFieldValue("spouseSelectState", "");
							formik.setFieldValue("spouseState", "");
							setStateShort(""); 
							setValidZip(false);
						}
					},
					(error) => {
						formik.setFieldValue("spouseSelectState", "");
						formik.setFieldValue("spouseState", "");
						setStateShort(""); 
						setValidZip(false);
					}
				);
		} else {
			formik.setFieldValue("spouseSelectState", "");
			formik.setFieldValue("spouseState", "");
			setStateShort("");
		}

		formik.handleChange(e);
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
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det92 determinate slantDiv"
									/>
									<span className="floatLeft detNum92">92%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/living-place">
										<i className="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid style={{marginTop:"-4%"}}>
									<img
										alt="marriedlogo"
										src={MarriedStatusLogo}
										className="spinAnimation"
									/>
								</Grid>

								<Typography variant="h5" style={{align:"center",justify:"center",alignItems:"center"}} className="borrowCSS">
									Are you married?*
								</Typography>
								<form onSubmit={formik.handleSubmit}>
									<Grid item
										md={12}
										className="blockDiv"
										container
										justifyContent="center"
										alignItems="center"
									>
										<Grid container
											justifyContent="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
										>
											<Select
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
										<Grid container
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
										<Grid container
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
										<Grid container
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
														: "Please enter your valid Zip code"
												}
											/>
										</Grid>
										<Grid container
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
												name="spouseState"
												label="City"
												value={formik.values.spouseState}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												disabled={true}
												error={
													formik.touched.spouseState &&
													Boolean(formik.errors.spouseState)
												}
												helperText={
													formik.touched.spouseState &&
													formik.errors.spouseState
												}
											/>
										</Grid>
										<Grid container
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
												stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black","fontSize":"1rem"}'
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

export default MarriedStatus;
