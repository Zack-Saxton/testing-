import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ButtonPrimary, TextField, Zipcode } from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import AddressLogo from "../../../../assets/icon/I-Address.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import ScrollToTopOnMount from "../ScrollToTop";
import "../CheckMyOffer.css";
import "../HomeAddress/HomeAdress.css";
import ZipCodeLookup from "../../../Controllers/ZipCodeLookup";
import { toast } from "react-toastify";
import ErrorLogger from "../../../lib/ErrorLogger";
//yup validation schema
const validationSchema = yup.object({
	streetAddress: yup
		.string("Enter Street Address")
		.trim()
		.max(100, "Should be less than 100 characters")
		.matches(/^(?!\s+$).*/g, "* This field cannot contain only backspaces")
		.required("Your Street Address is required"),
	city: yup
		.string("Enter City")
		.max(30, "Should be less than 30 characters")
		.required(
			"Your home city is required. Please re-enter your zip code to populate your city"
		),
	state: yup
		.string("Enter State")
		.max(30, "Should be less than 30 characters")
		.required("Your home state is required."),
	zip: yup
		.string("Enter your Zip")
		.min(5, "Zipcode should be of minimum 5 characters length")
		.required("Your home ZIP Code is required"),
});

// Home address component initialization
function HomeAddress() {
	//Context data
	const { data } = useContext(CheckMyOffers);
	//state variables
	const [ stateShort, setStateShort ] = useState(data.state ?? "");
	const [ validZip, setValidZip ] = useState(true);
	const [ open, setOpen ] = useState(false);
	const [ openOhio, setOpenOhio ] = useState(false);
	const [ errorMsg, setErrorMsg ] = useState("");

	//Handle modal open and close
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleClickOpenOhio = () => {
		setOpenOhio(true);
	};
	const handleCloseOhio = () => {
		setOpenOhio(false);
	};
	const history = useHistory();

	// Formik configutration
	const formik = useFormik({
		initialValues: {
			streetAddress: data.streetAddress ? data.streetAddress : "",
			city: data.city ? data.city : "",
			state: data.stateFullform ? data.stateFullform : "",
			zip: data.zip ? data.zip : "",
		},
		validationSchema: validationSchema,
		// Submit value - store the values to context and proceeds next pages
		onSubmit: (values) => {
			data.streetAddress = values.streetAddress;
			data.city = values.city;
			data.state = stateShort;
			data.zip = values.zip;
			data.stateFullform = values.state;
			data.completedPage = data.page.homeAddress;
			history.push("/personal-info");
		},
	});

	const preventSpace = (event) => {
		if (event.keyCode === 32 && formik.values.streetAddress === "") {
			event.preventDefault();
		}
	};

	const fetchAddress = async (event) => {
		try {
			setErrorMsg(event.target.value === "" ? "Please enter a zipcode" : errorMsg);
			if (event.target.value !== "" && event.target.value.length === 5) {
				let result = await ZipCodeLookup(event.target.value);
				if (result) {
					formik.setFieldValue("city", result?.data.cityName);
					formik.setFieldValue("state", result?.data.stateCode);
					setStateShort(result?.data?.stateCode);
					setValidZip(true);
					if (result?.data?.stateCode === "California") {
						handleClickOpen();
					}
					if (result?.data?.stateCode === "Ohio") {
						handleClickOpenOhio();
					}
				} else {
					formik.setFieldValue("city", "");
					formik.setFieldValue("state", "");
					setStateShort("");
					setValidZip(false);
					setErrorMsg("Please enter a valid Zipcode");
				}
			} else {
				formik.setFieldValue("city", "");
				formik.setFieldValue("state", "");
				setStateShort("");
				setValidZip(true);
			}
			formik.handleChange(event);
		} catch (error) {
			ErrorLogger('Error from fetchAddress', error);
		}
	};
	const onBlurAddress = (event) => {
		formik.setFieldValue("streetAddress", event.target.value.trim());
	};
	if (data.completedPage < data.page.citizenship || data.formStatus === "completed") {
		history.push("/select-amount");
	}
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid
						item xs={ 12 } sm={ 10 } md={ 6 } lg={ 6 }
						justifyContent="center"
						alignItems="center"
						style={ { paddingTop: "70px", paddingBottom: "70px", margin: "auto" } }
					>
						<Grid
							// container
							// item
							// xs={ 11 }
							// sm={ 10 }
							// md={ 6 }
							// lg={ 6 }
							// xl={ 6 }
							// className="cardWrapper"
							justifyContent="center"
							alignItems="center"
						>
							<Paper
								id="enterZipWrap"
								className="cardWOPadding"
								style={ { justify: "center", alignItems: "center" } }
							>
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det30  determinate slantDiv"
									/>
									<span className="floatLeft detNum30">30%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/citizenship-status">
										<i className="material-icons dp48 yellowText  ">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img
										alt="Address"
										src={ AddressLogo }
										className="spinAnimation"
									/>
								</Grid>

								<Typography
									variant="h5"
									id="homeAddressTxt"
									className="borrowCSSLP"
									style={ {

									} }
								>
									Enter your home address
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
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className="textBlockShort"
										>
											<TextField
												fullWidth
												autoFocus
												id="streetAddress"
												name="streetAddress"
												label="Street Address *"
												materialProps={ {
													"data-test-id": "streetAddress",
													maxLength: "100",
												} }
												onKeyDown={ preventSpace }
												value={ formik.values.streetAddress }
												onChange={ formik.handleChange }
												onBlur={ onBlurAddress }
												error={
													formik.touched.streetAddress &&
													Boolean(formik.errors.streetAddress)
												}
												helperText={
													formik.touched.streetAddress &&
													formik.errors.streetAddress
												}
											/>
										</Grid>
										<Grid
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className="textBlockShort"
										>
											<Zipcode
												fullWidth
												id="zip"
												name="zip"
												label="Zipcode *"
												materialProps={ { "data-test-id": "zipcode" } }
												value={ formik.values.zip }
												onChange={ fetchAddress }
												onBlur={ formik.handleBlur }
												error={
													(formik.touched.zip && Boolean(formik.errors.zip)) ||
													!validZip
												}
												helperText={
													validZip
														? formik.touched.zip && formik.errors.zip
														: "Please enter a valid ZIP Code"
												}
											/>
										</Grid>
										<Grid
											item
											justifyContent="flex-start"
											alignItems="flex-start"
											container
											md={ 8 }
											lg={ 8 }
											xs={ 12 }
											className="textBlockShort"
										>
											<Grid
												container
												justifyContent="center"
												alignItems="center"
												item
												lg={ 6 }
												md={ 6 }
												xs={ 6 }
												className=" padding-right-1"
											>
												<TextField
													fullWidth
													id="city"
													name="city"
													label="City"
													disabled={ true }
													materialProps={ { "data-test-id": "city" } }
													value={ formik.values.city }
													onChange={ formik.handleChange }
													onBlur={ formik.handleBlur }
													error={
														formik.touched.city && Boolean(formik.errors.city)
													}
													helperText={ formik.touched.city && formik.errors.city }
												/>
											</Grid>
											<Grid
												container
												justifyContent="center"
												alignItems="center"
												item
												lg={ 6 }
												md={ 6 }
												xs={ 6 }
												className=" padding-left-1"
											>
												<TextField
													fullWidth
													id="state"
													name="state"
													label="State"
													disabled={ true }
													materialProps={ { "data-test-id": "state" } }
													value={ formik.values.state }
													onChange={ formik.handleChange }
													onBlur={ formik.handleBlur }
													error={
														formik.touched.state && Boolean(formik.errors.state)
													}
													helperText={
														formik.touched.state && formik.errors.state
													}
												/>
											</Grid>
										</Grid>

										<Grid
											container
											justifyContent="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											alignItems="center"
											className="textBlock alignButton"
										>
											<ButtonPrimary
												type="submit"
												stylebutton='{"fontSize":"0.938rem","background": "#FFBC23", "padding": "0px 30px", "color": "black"}'
												disabled={ !validZip }
												data-test-id="homeAddressCntBtn"
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
			<Dialog
				onClose={ handleClose }
				aria-labelledby="customized-dialog-title"
				open={ open }
			>
				<DialogTitle id="customized-dialog-title" onClose={ handleClose }>
					Notice to CA Residents
				</DialogTitle>
				<DialogContent dividers>
					<Typography align="justify" gutterBottom>
						If you are married, you may apply for a separate account.
					</Typography>
				</DialogContent>
				<DialogActions className="modalAction">
					<ButtonPrimary
						stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
						onClick={ handleClose }
						className="modalButton"
					>
						<Typography align="center">Ok</Typography>
					</ButtonPrimary>
				</DialogActions>
			</Dialog>

			<Dialog
				onClose={ handleCloseOhio }
				aria-labelledby="customized-dialog-title"
				open={ openOhio }
			>
				<DialogTitle id="customized-dialog-title" onClose={ handleCloseOhio }>
					Notice to OH Residents
				</DialogTitle>
				<DialogContent dividers>
					<Typography align="justify" gutterBottom>
						The Ohio laws against discrimination require that all creditors make
						credit equally available to all credit worthy customers, and that
						credit reporting agencies maintain separate credit histories on each
						individual upon request. The Ohio civil rights commission
						administers compliance with this law.
					</Typography>
				</DialogContent>
				<DialogActions className="modalAction">
					<ButtonPrimary
						stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
						onClick={ handleCloseOhio }
						className="modalButton"
					>
						<Typography align="center">Ok</Typography>
					</ButtonPrimary>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default HomeAddress;
