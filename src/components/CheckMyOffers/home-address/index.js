import Header from "../../Layout/NormalHeader/NormalHeader";
import Footer from "../../Layout/NormalFooter/NormalFooter";
import "../checkMyOffer.css";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Slider, TextField, Button } from "../../FormsUI";
// import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import AddressLogo from "../../../assets/icon/I-Address.png";
import { Zipcode as ZipcodeField } from "../../FormsUI";
import { useFormik } from "formik";
import * as yup from "yup";
import { CheckMyOffers } from '../../../contexts/CheckMyOffers';



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
});
 
function HomeAddress() {
	const { data } = useContext(CheckMyOffers);
	const [citizenship, setCitizenship] = useState( '');
	// data[0].zip = citizenship;
	const history = useHistory();
	console.log(data);
    const handSub = () => {
		console.log("data submited");
	}
	const handleRoute = (val) => {
		history.push("/personal-info");
	};

	const formik = useFormik({
		initialValues: {
			// streetAddress: data.zip ? data.zip : '',
			streetAddress: data.streetAddress ? data.streetAddress : '',
			city: data.city ? data.city : '',
			state: data.state ? data.state : ''
		  },
		validationSchema: validationSchema,
		onSubmit: (values) => {
			data.streetAddress = values.streetAddress;
			data.city = values.city;
			data.state = values.state;
			history.push("/living-place");
		},
	});
    // formik.values.zip = '34';
	// formik.setFieldValue('hello');
	
	// console.log("formik data",formik.values);


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
										className="det67  determinate slantDiv"
									></div>
									<span class="floatLeft detNum67">67%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/annual-income">
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img src={AddressLogo} className="spinAnimation" />
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
											className="textBlock"
										>
											<TextField
												fullWidth
												id="streetAddress"
												name="streetAddress"
												label="Street Address"
												value={formik.values.streetAddress}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
												helperText={formik.touched.streetAddress && formik.errors.streetAddress}
											/>
										</Grid>
										<Grid justify="center" alignItems="center" container  md={8} lg={8} xs={12} className="textBlock">
										<Grid justify="center" alignItems="center" item lg={6} md={6} xs={6}className="textBlock padding-right-1">
											<TextField
												fullWidth
												id="city"
												name="city"
												label="City"
												value={formik.values.city}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched.city && Boolean(formik.errors.city)}
												helperText={formik.touched.city && formik.errors.city}
											/>
										</Grid>
										<Grid justify="center" alignItems="center" item lg={6} md={6} xs={6}className="textBlock padding-left-1">
											<TextField
												fullWidth
												id="state"
												name="state"
												label="State"
												value={formik.values.state}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched.state && Boolean(formik.errors.state)}
												helperText={formik.touched.state && formik.errors.state}
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
												stylebutton='{"background": "#0F4EB3", "height": "inherit", "color": "white"}'
											>
												<Typography
													align="center"
													className="textCSS whiteText"
												>
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

export default HomeAddress;
