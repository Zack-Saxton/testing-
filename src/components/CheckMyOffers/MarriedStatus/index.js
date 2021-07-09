import "../checkMyOffer.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Select, Button, TextField, Zipcode } from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from "yup";
import MarriedStatusLogo from "../../../assets/icon/married-status.png";
import { CheckMyOffers } from "../../../contexts/CheckMyOffers";
import { add } from "date-fns";

const validationSchema = yup.object({
	martialStatus: yup
		.string("Enter your Martial Status")
		.required("Select Martial Status"),
	add: yup.string().when("martialStatus", {
		is: 'Married',
		then: yup.string().required("Spouse Address is required")
		})
		.when("martialStatus", {
			is: 'Separated, under decree of legal separation',
			then: yup.string().required("Spouse Address is required")
			}),
	spouseZipcode: yup.string().when("martialStatus", {
		is: 'Married',
		then: yup.string().required("Zipcode is required")
		})
		.when("martialStatus", {
			is: 'Separated, under decree of legal separation',
			then: yup.string().required("Zipcode is required")
			}),
	spouseState: yup.string().when("martialStatus", {
		is: 'Married',
		then: yup.string().required("State is required")
		}).when("martialStatus", {
			is: 'Separated, under decree of legal separation',
			then: yup.string().required("State is required")
			}),
	spouseSelectState: yup.string().when("martialStatus", {
		is: 'Married',
		then: yup.string().required("State is required")
		}).when("martialStatus", {
			is: 'Separated, under decree of legal separation',
			then: yup.string().required("State is required")
			}),
});

function MarriedStatus() {
	const { data } = useContext(CheckMyOffers);
	const [livingPlace, setLivingPlace] = useState(
		data.citizenship ? data.citizenship : ""
	);
	const history = useHistory();
	const handleRoute = () => {
		data.citizenship = livingPlace;
		history.push("/zipcode");
	};
	const formik = useFormik({
		initialValues: {
			martialStatus: '',
			add: '',
			spouseZipcode: '',
			spouseState: '',
			spouseSelectState: ''
			},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(data)
			// data.activeDuty = values.martialStatus;
			history.push("/ssn");
		},
		});
console.log(formik.values);
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
									<Link to="/active-duty">
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
									Are you married?
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
                                       fullWidth= {true}
                                            name="martialStatus"
                                            labelform="Active Duty"
                                            select='[{"value":"Married"}, {"value":"Unmarried"}, {"value":"Separated, under decree of legal separation"}]'
                                            value={formik.values.martialStatus}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.martialStatus && Boolean(formik.errors.martialStatus)}
											helperText={formik.touched.martialStatus && formik.errors.martialStatus}
                                        />
									
									</Grid>
									<Grid
										justify="center"
										alignItems="center"
										item
										lg={8}
										md={8}
										xs={12}
										className={formik.values.martialStatus === 'Married' || formik.values.martialStatus === 'Separated, under decree of legal separation' ? "showMsg" : "hideMsg"}
									>
										<TextField
											name="add"
											label="Spouse's Address (if different)"
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
										className={formik.values.martialStatus === 'Married' || formik.values.martialStatus === 'Separated, under decree of legal separation' ? "showMsg" : "hideMsg"}
									>
										<p class="left-align">
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
										className={formik.values.martialStatus === 'Married' || formik.values.martialStatus === 'Separated, under decree of legal separation' ? "showMsg" : "hideMsg"}
									>
										<Zipcode fullWidth id="zip" name="spouseZipcode" label="Zipcode" 
											value={formik.values.spouseZipcode}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.spouseZipcode && Boolean(formik.errors.spouseZipcode)}
											helperText={formik.touched.spouseZipcode && formik.errors.spouseZipcode}/>
									</Grid>
									<Grid
										justify="left"
										alignItems="left"
										item
										lg={8}
										md={8}
										xs={12}
										className={formik.values.martialStatus === 'Married' || formik.values.martialStatus === 'Separated, under decree of legal separation' ? "showMsg" : "hideMsg"}
									>
										<TextField
											name="spouseState"
											label="State"
											value={formik.values.spouseState}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.spouseState && Boolean(formik.errors.spouseState)}
											helperText={formik.touched.spouseState && formik.errors.spouseState}
										/>
									</Grid>
									<Grid
										justify="center"
										alignItems="center"
										item
										lg={8}
										md={8}
										xs={12}
										className={formik.values.martialStatus === 'Married' || formik.values.martialStatus === 'Separated, under decree of legal separation' ? "showMsg" : "hideMsg"}
									>
										<Select
											fullWidth={true}
											name="spouseSelectState"
											labelform="State"
											select='[{"value":"Alaska"}, {"value":"Alabama"}, {"value":"Arkansas"}]'
											value={formik.values.spouseSelectState}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.spouseSelectState && Boolean(formik.errors.spouseSelectState)}
											helperText={formik.touched.spouseSelectState && formik.errors.spouseSelectState}
										/>
										{/* <TextField name="yearsAtEmployer" label="Years at employer" /> */}
									</Grid>
									{/* <p class="left-align"><b>Location</b></p> */}

									<Grid item lg={8} md={8} xs={12} className="alignButton">
										<Button
											// onClick={handleRoute}
											type='submit'
											// disabled={livingPlace === "" ? true : false}
											stylebutton='{"background": "#0F4EB3", "height": "inherit", "color": "white"}'
										>
											<Typography align="center" className="textCSS whiteText">
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
