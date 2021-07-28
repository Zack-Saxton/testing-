import "../checkMyOffer.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Select, Button, TextField, Zipcode } from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import MarriedStatusLogo from "../../../assets/icon/married-status.png";
import { CheckMyOffers } from "../../../contexts/CheckMyOffers";
import { add } from "date-fns";

const validationSchema = yup.object({
	martialStatus: yup
		.string("Enter your Martial Status")
		.required("Select Martial Status"),
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
			then: yup.string().required("Zipcode is required"),
		})
		.when("martialStatus", {
			is: "Separated, under decree of legal separation",
			then: yup.string().required("Zipcode is required"),
		}),
	spouseState: yup
		.string()
		.when("martialStatus", {
			is: "Married",
			then: yup.string().required("City is required"),
		})
		.when("martialStatus", {
			is: "Separated, under decree of legal separation",
			then: yup.string().required("City is required"),
		}),
	spouseSelectState: yup
		.string()
		.when("martialStatus", {
			is: "Married",
			then: yup.string().required("State is required"),
		})
		.when("martialStatus", {
			is: "Separated, under decree of legal separation",
			then: yup.string().required("State is required"),
		}),
});

function MarriedStatus() {
	const { data, setData } = useContext(CheckMyOffers);
	const [livingPlace, setLivingPlace] = useState(data.maritalStatus ?? "");
	const [stateShort, setStateShort] = useState('');
	const [validZip, setValidZip] = useState(true);
	const [open, setOpen] = useState(false);
	const [openOhio, setOpenOhio] = useState(false);
	const history = useHistory();
	const handleRoute = () => {
		data.maritalStatus = livingPlace;
		history.push("/zipcode");
	};
	const formik = useFormik({
		initialValues: {
			martialStatus: data.maritalStatus ?? "",
			add: data.spouse_address_street ?? "",
			spouseZipcode: data.spouse_address_postal_code ?? "",
			spouseState: data.spouse_address_state ?? "",
			spouseSelectState: data.spouse_address_city ?? "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(data);
			// data.activeDuty = values.martialStatus;
			setData({
				...data,
				["maritalStatus"]: values.martialStatus,
				["spouse_address_street"]: values.add,
				["spouse_address_city"]: values.spouseSelectState,
				["spouse_address_state"]: values.spouseState,
				["spouse_address_postal_code"]: values.spouseZipcode,
			});
			history.push("/ssn");
		},
	});

	const fetchAddress = (e) => {
		console.log("im calling");
		fetch("https://api.zippopotam.us/us/" + e.target.value)
			.then((res) => res.json())
			.then(
				(result) => {
					if (result.places) {
						// console.log("result", result.places[0]["place name"]);
						formik.setFieldValue("spouseSelectState", result.places[0]["place name"]);
						formik.setFieldValue("spouseState", result.places[0]["state"]);
						setStateShort(result.places[0]['state abbreviation']);
						setValidZip(true);
					}
					else
					{
						formik.setFieldValue("spouseSelectState", '');
						formik.setFieldValue("spouseState", '');
						setStateShort('');
						setValidZip(false);
					}
				},
				(error) => {
					console.log("error:", error);
					formik.setFieldValue("spouseSelectState", '');
					formik.setFieldValue("spouseState", '');
					setStateShort('');
					setValidZip(false);
				}
			);
		formik.handleChange(e);
	};

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
										className="det92 determinate slantDiv"
									></div>
									<span class="floatLeft detNum92">92%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/living-place">
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid>
									<img src={MarriedStatusLogo} className="spinAnimation" />
								</Grid>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSS"
								>
									Are you married?*
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
										>
											{/* Code Here */}
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
										<Grid
											justify="center"
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
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched.add && Boolean(formik.errors.add)}
												helperText={formik.touched.add && formik.errors.add}
											/>
										</Grid>
										<Grid
											justify="left"
											alignItems="left"
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
											
											<p class="left-align MarginUpDown10">
												<b>Location</b>
											</p>
										</Grid>
										<Grid
											justify="left"
											alignItems="left"
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
													Boolean(formik.errors.spouseZipcode)) || !validZip
												}
												helperText={ validZip ? 
													(formik.touched.spouseZipcode &&
													formik.errors.spouseZipcode) : "Invalid Zipcode"
												}
											/>
										</Grid>
										<Grid
											justify="left"
											alignItems="left"
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
										<Grid
											justify="center"
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
											{/* <Select
											fullWidth={true}
											name="spouseSelectState"
											labelform="State"
											select='[{"value":"Alaska"}, {"value":"Alabama"}, {"value":"Arkansas"}]'
											value={formik.values.spouseSelectState}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.spouseSelectState && Boolean(formik.errors.spouseSelectState)}
											helperText={formik.touched.spouseSelectState && formik.errors.spouseSelectState}
										/> */}
											{/* <TextField name="yearsAtEmployer" label="Years at employer" /> */}
										</Grid>
										{/* <p class="left-align"><b>Location</b></p> */}

										<Grid item lg={8} md={8} xs={12} className="alignButton">
											<Button
												// onClick={handleRoute}
												type="submit"
												disabled={validZip ? false : true}
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

export default MarriedStatus;
