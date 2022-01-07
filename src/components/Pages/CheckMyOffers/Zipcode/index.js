import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ZipcodeLogo from "../../../../assets/icon/I-Zip-Code.png";
import { ButtonPrimary, Zipcode as ZipcodeField } from "../../../FormsUI";
import { useFormik } from "formik";
import * as yup from "yup";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import ScrollToTopOnMount from "../ScrollToTop";
import "./Zipcode.css";

// Yup validation
const validationSchema = yup.object({
	zip: yup
		.string("Enter your Zip")
		.min(5, "Zipcode should be of minimum 5 characters length")
		.required("Zipcode is required"),
});

//start of functional components
function Zipcode() {
	const { data } = useContext(CheckMyOffers);
	const history = useHistory();

	//initializing formik
	const formik = useFormik({
		initialValues: {
			zip: data.zip ? data.zip : "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			data.zip = values.zip;
			history.push("/personal-info");
		},
	});

	//JSX part
	return (
		<div>
			<ScrollToTopOnMount />
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
									/>
									<span className="floatLeft detNum3">25%</span>
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
										alt="Zipcode"
										src={ZipcodeLogo}
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
									Enter your zip code
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
											<ZipcodeField
												fullWidth
												id="zip"
												name="zip"
												label="zip"
												materialProps={{ "data-testid": "zipcode" }}
												value={formik.values.zip}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched.zip && Boolean(formik.errors.zip)}
												helperText={formik.touched.zip && formik.errors.zip}
											/>
										</Grid>
										<Grid
											justify="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="alignButton"
										>
											<ButtonPrimary
												type="submit"
												data-testid="zipcodeCntuButton"
												stylebutton='{"background": "#FFBC23", "color": "black","fontSize":"0.938rem", "padding": "0px 30px"}'
												disabled={
													Boolean(formik.errors.zip) || formik.values.zip === ""
												}
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

export default Zipcode;
