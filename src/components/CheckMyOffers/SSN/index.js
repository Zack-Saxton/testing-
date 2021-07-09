import Header from "../../Layout/NormalHeader/NormalHeader";
import Footer from "../../Layout/NormalFooter/NormalFooter";
import "../checkMyOffer.css";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Slider, SocialSecurityNumber, Button, Checkbox } from "../../FormsUI";
// import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import SSNLogo from "../../../assets/icon/I-SSN.png";
import { Zipcode as ZipcodeField } from "../../FormsUI";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import { TextField } from "@material-ui/core";
import { CheckMyOffers } from '../../../contexts/CheckMyOffers';



const validationSchema = yup.object({
	zip: yup
		.boolean()
		.required("Zipcode is required"),
});
 
function SSN() {
	const { data } = useContext(CheckMyOffers);
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
			zip: data.zip ? data.zip : '',
		  },
		// validationSchema: validationSchema,
		onSubmit: (values) => {
			data.zip = values.zip;
			history.push("/marital-status");
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
										className="det3  determinate slantDiv"
									></div>
									<span class="floatLeft detNum3">25%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/citizenship-status">
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img src={SSNLogo} className="spinAnimation" />
								</Grid>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSS"
								>
									One last question
								</Typography>
							<Formik>
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
											className="textBlockWithLessMargin"
										>
											<SocialSecurityNumber name="ssn" />
										</Grid>
										<Grid
											justify="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlockWithLessMargin"
										>
											<p className="subText" >
											Your social security number is required to pull your credit information
											</p>
										</Grid>
										<Grid
											justify="left"
											alignItems="left"
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlockWithLessMargin"
										>
											<Checkbox
										name="termsOfService"
										labelform="Terms & Service"
										label={<p className="agreeText">By clicking this box you acknowledge that you have received, reviewed and agree to the 
											<a href={'https://loans.marinerfinance.com/application/form'}> E-Signature Disclosure and Consent, </a>
											<a href={'https://loans.marinerfinance.com/application/form'}>Credit and Contact Authorization, </a>
											<a href={'https://loans.marinerfinance.com/application/form'}>Website Terms of Use, </a>
											<a href={'https://loans.marinerfinance.com/application/form'}>Website Privacy Statement.</a>
											</p>}
										required={true}
										stylelabelform='{ "color":"" }'
										stylecheckbox='{ "color":"blue" }'
										stylecheckboxlabel='{ "color":"" }'
									/>
										</Grid>
										
										<Grid
											justify="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlockWithLessMargin"
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
								</Formik>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</div>
		</div>
	);
}

export default SSN;
