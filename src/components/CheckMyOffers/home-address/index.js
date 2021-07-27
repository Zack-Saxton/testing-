import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField, Button, ZipcodeField, Zipcode } from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import AddressLogo from "../../../assets/icon/I-Address.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { CheckMyOffers } from "../../../contexts/CheckMyOffers";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import "../checkMyOffer.css";

const validationSchema = yup.object({
	streetAddress: yup
		.string("Enter Street Address")
		.max(100, "Should be less than 100 characters")
		.required("Street Address is required"),
	city: yup
		.string("Enter City")
		.max(30, "Should be less than 30 characters")
		.required("City is required"),
	state: yup
		.string("Enter State")
		.max(30, "Should be less than 30 characters")
		.required("State is required"),
	zip: yup
		.string("Enter your Zip")
		.min(5, "Zipcode should be of minimum 5 characters length")
		.required("Zipcode is required"),
});

function HomeAddress() {
	const { data, setData } = useContext(CheckMyOffers);
	const [stateShort, setStateShort] = useState('');
	const [validZip, setValidZip] = useState(true);
	const [open, setOpen] = React.useState(false);
	const [openOhio, setOpenOhio] = React.useState(false);

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


	const formik = useFormik({
		initialValues: {
			// streetAddress: data.zip ? data.zip : '',
			streetAddress: data.streetAddress ? data.streetAddress : "",
			city: data.city ? data.city : "",
			state: data.state ? data.state : "",
			zip: data.zip ? data.zip : "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			data.streetAddress = values.streetAddress;
			data.city = values.city;
			data.state = stateShort;
			data.zip = values.zip;
			history.push("/personal-info");
		},
	});

	const fetchAddress = (e) => {
		fetch("https://api.zippopotam.us/us/" + e.target.value)
			.then((res) => res.json())
			.then(
				(result) => {
					if (result.places) {
						console.log("result", result.places[0]["place name"]);
						formik.setFieldValue("city", result.places[0]["place name"]);
						formik.setFieldValue("state", result.places[0]["state"]);
						setStateShort(result.places[0]['state abbreviation']);
						setValidZip(true);
						if(result.places[0]["state"] === 'California')
						{
							handleClickOpen()
						}
						if(result.places[0]["state"] === 'Ohio')
						{
							handleClickOpenOhio()
						}
					}
					else
					{
						formik.setFieldValue("city", '');
						formik.setFieldValue("state", '');
						setStateShort('');
						// formik.setErrors("zip", " zip not working");
						setValidZip(false);
					}
				},
				(error) => {
					console.log("error:", error);
				}
			);
		formik.handleChange(e);
	};

	console.log("Formik values:", formik);

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
										className="det25  determinate slantDiv"
									></div>
									<span class="floatLeft detNum25">25%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/citizenship-status">
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img
										alt="Address"
										src={AddressLogo}
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
									Where do you live?
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
											className="textBlockShort"
										>
											<TextField
												fullWidth
												id="streetAddress"
												name="streetAddress"
												label="Street Address *"
												materialProps={{ "data-testid": "streetAddress", "maxLength": "100" }}
												value={formik.values.streetAddress}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
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
											justify="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlockShort"
										>
											<Zipcode
												fullWidth
												id="zip"
												name="zip"
												label="Zipcode *"
												materialProps={{ "data-testid": "zipcode" }}
												value={formik.values.zip}
												onChange={fetchAddress}
												onBlur={formik.handleBlur}
												error={formik.touched.zip && Boolean(formik.errors.zip)}
												// helperText={formik.touched.zip && formik.errors.zip}
												helperText={formik.touched.zip && formik.errors.zip }
											/>
											<p className={validZip ? "hideError" : "showError"}>Invalid Zipcode</p>

											
										</Grid>
										<Grid
											justify="center"
											alignItems="center"
											container
											md={8}
											lg={8}
											xs={12}
											className="textBlockShort"
										>
											<Grid
												justify="center"
												alignItems="center"
												item
												lg={6}
												md={6}
												xs={6}
												className=" padding-right-1"
											>
												<TextField
													fullWidth
													id="city"
													name="city"
													label="City"
													disabled={true}
													materialProps={{ "data-testid": "city" }}
													value={formik.values.city}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													error={
														formik.touched.city && Boolean(formik.errors.city)
													}
													helperText={formik.touched.city && formik.errors.city}
												/>
											</Grid>
											<Grid
												justify="center"
												alignItems="center"
												item
												lg={6}
												md={6}
												xs={6}
												className=" padding-left-1"
											>
												<TextField
													fullWidth
													id="state"
													name="state"
													label="State"
													disabled={true}
													materialProps={{ "data-testid": "state" }}
													value={formik.values.state}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
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
												stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
												disabled={validZip ? false : true}
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
			<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
				Notice to CA Residents
				</DialogTitle>
				<DialogContent dividers>
				<Typography gutterBottom>
					If you are married, you may apply for a seperate account.
				</Typography>
				
				</DialogContent>
				<DialogActions className="modalAction">
				<Button
					stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
					onClick={handleClose}
					className="modalButton"
				>
					<Typography align="center">
						Ok
					</Typography>
				</Button>
				</DialogActions>
			</Dialog>


			{/* Pop up for Ohio */}

			<Dialog onClose={handleCloseOhio} aria-labelledby="customized-dialog-title" open={openOhio}>
				<DialogTitle id="customized-dialog-title" onClose={handleCloseOhio}>
				Notice to OH Residents
				</DialogTitle>
				<DialogContent dividers>
				<Typography gutterBottom>
					The Ohio laws against discrimination require that all creditors make credit equally available to all credit worthy customers, and that credit reporting agencies maintain seperate credit histories on each individual upon request. The Ohio civil rights commission administers compliance with this law. 
				</Typography>
				
				</DialogContent>
				<DialogActions className="modalAction">
				<Button
					stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
					onClick={handleCloseOhio}
					className="modalButton"
				>
					<Typography align="center">
						Ok
					</Typography>
				</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default HomeAddress;
