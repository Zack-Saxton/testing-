import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { SocialSecurityNumber, Button, Checkbox } from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import SSNLogo from "../../../assets/icon/I-SSN.png";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import { CheckMyOffers } from "../../../contexts/CheckMyOffers";
import "../checkMyOffer.css";
import {
	checkMyOfferSubmit,
	testing,
} from "../../controllers/checkMyOffersController";

const validationSchema = yup.object({
	zip: yup.boolean().required("Zipcode is required"),
}); 

function SSN() {
	const { data } = useContext(CheckMyOffers);
	const history = useHistory();

	const formik = useFormik({
		initialValues: {
			zip: data.zip ? data.zip : "",
		},
		// validationSchema: validationSchema,
		onSubmit: (values) => {
			// data.zip = values.zip;
			console.log("finalData:", data);
			console.log(checkMyOfferSubmit(data));
			// history.push("/no-offers-available");
		},
	});

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
									<div id="determinate" className="det100  determinate "></div>
									<span class="floatLeft detNum3"></span>
								</div>
								<Grid className="floatLeft">
									
									<Link to= {data.state === 'Wisconsin' ? "/marital-status" : data.state === 'North Carolina' ? '/active-duty' : 'living-place'}>
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img alt="ssn" src={SSNLogo} className="spinAnimation" />
								</Grid>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSS"
								>
									One last step
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
												{/* <SocialSecurityNumber
													disabled={true}
													value={data.ssn}
													name="ssn"
												/> */}
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
												{/* <p className="subText">
													Your social security number is required to pull your
													credit information
												</p> */}
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
													label={
														<p className="agreeText">
															By clicking this box you acknowledge that you have
															received, reviewed and agree to the
															<a
																className="formatURL"
																href={
																	"https://loans.marinerfinance.com/application/form"
																}
															>
																{" "}
																E-Signature Disclosure and Consent,{" "}
															</a>
															<a
																className="formatURL"
																href={
																	"https://loans.marinerfinance.com/application/form"
																}
															>
																Credit and Contact Authorization,{" "}
															</a>
															<a
																className="formatURL"
																href={
																	"https://loans.marinerfinance.com/application/form"
																}
															>
																Website Terms of Use,{" "}
															</a>
															<a
																className="formatURL"
																href={
																	"https://loans.marinerfinance.com/application/form"
																}
															>
																Website Privacy Statement.
															</a>
														</p>
													}
													required={true}
													stylelabelform='{ "color":"" }'
													stylecheckbox='{ "color":"blue" }'
													stylecheckboxlabel='{ "color":"" }'
												/>
												<div className={
												data.state === "Delaware" 
												
													
													? "showMsg space"
													: "hideMsg space"
											}>
												{/* <Checkbox 
													name="termsOfService"
													labelform="Terms & Service"
													label={
														<p className="agreeText">
															By clicking this box you acknowledge that you have received and reviewed the
															<a
																className="formatURL"
																href={
																	"https://loans.marinerfinance.com/application/form"
																}
															>
																{" "}
																Delaware Itemized Schedule Of Charges.,{" "}
															</a>
															
															
															
														</p>
													}
													required={true}
													stylelabelform='{ "color":"" }'
													stylecheckbox='{ "color":"blue" }'
													stylecheckboxlabel='{ "color":"" }'
												/> */}
												</div>
											</Grid>

											<Grid
												justify="center"
												alignItems="center"
												item
												lg={8}
												md={8}
												xs={12}
												className="textBlockWithLessMargin alignButtonExtra alignButton"
											>
												<Button
													type="submit"
													stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
												>
													<Typography align="center" className="textCSS ">
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
