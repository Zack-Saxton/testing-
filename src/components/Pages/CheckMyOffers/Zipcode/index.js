import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import globalMessages from '../../../../assets/data/globalMessages.json';
import ZipcodeLogo from "../../../../assets/icon/I-Zip-Code.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary, Zipcode as ZipcodeField } from "../../../FormsUI";
import ScrollToTopOnMount from "../ScrollToTop";
import "./Zipcode.css";

// Yup validation
const validationSchema = yup.object({
	zip: yup
		.string(globalMessages.ZipCodeEnter)
		.min(5, globalMessages.ZipCodeMax)
		.required(globalMessages.ZipCodeRequired),
});

//start of functional components
function Zipcode() {
	const { data } = useContext(CheckMyOffers);
	const navigate = useNavigate();
	//initializing formik
	const formik = useFormik({
		initialValues: {
			zip: data.zip ? data.zip : "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			data.zip = values.zip;
			navigate("/personal-info");
		},
	});

	//JSX part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid xs={ 12 } container justifyContent="center" alignItems="center">
						<Grid
							xs={ 11 }
							sm={ 10 }
							md={ 6 }
							lg={ 6 }
							xl={ 6 }
							className="cardWrapper"
							justifyContent="center"
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
										src={ ZipcodeLogo }
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

								<form onSubmit={ formik.handleSubmit }>
									<Grid
										md={ 12 }
										className="blockDiv"
										container
										justifyContent="center"
										alignItems="center"
									>
										<Grid
											justifyContent="center"
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className="textBlock"
										>
											<ZipcodeField
												fullWidth
												id="zip"
												name="zip"
												label="zip"
												materialProps={ { "data-testid": "zipcode" } }
												value={ formik.values.zip }
												onChange={ formik.handleChange }
												onBlur={ formik.handleBlur }
												error={ formik.touched.zip && Boolean(formik.errors.zip) }
												helperText={ formik.touched.zip && formik.errors.zip }
											/>
										</Grid>
										<Grid
											justifyContent="center"
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className="alignButton"
										>
											<ButtonPrimary
												type="submit"
												data-testid="zipcodeCntuButton"
												stylebutton='{"background": "#FFBC23", "color": "black","fontSize":"0.938rem", "padding": "0px 30px"}'
												disabled={ Boolean(formik.errors.zip) }
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
