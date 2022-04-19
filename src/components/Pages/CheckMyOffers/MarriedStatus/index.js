import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { maritalStatusData } from "../../../../assets/data/constants";
import globalMessages from "../../../../assets/data/globalMessages.json";
import MarriedStatusLogo from "../../../../assets/icon/married-status.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import ZipCodeLookup from "../../../Controllers/ZipCodeLookup";
import { ButtonPrimary, Select, TextField, Zipcode } from "../../../FormsUI";
import ErrorLogger from "../../../lib/ErrorLogger";
import "../CheckMyOffer.css";
import ScrollToTopOnMount from "../ScrollToTop";

//Yup validation schema
const validationSchema = yup.object({
	maritalStatus: yup
		.string(globalMessages.Marital_Status_Enter)
		.required(globalMessages.Marital_Status_Select),
	add: yup
		.string()
		.when("maritalStatus", {
			is: maritalStatusData.married,
			then: yup.string().required(globalMessages.Marital_Status_Select),
		})
		.when("maritalStatus", {
			is: maritalStatusData.seperated,
			then: yup.string().required(globalMessages.Spouse_Address_Required),
		}),
	spouseZipcode: yup
		.string()
		.when("maritalStatus", {
			is: maritalStatusData.married,
			then: yup.string().required(globalMessages.ZipCodeRequired),
		})
		.when("maritalStatus", {
			is: maritalStatusData.seperated,
			then: yup.string().required(globalMessages.ZipCodeRequired),
		}),
	spousecity: yup
		.string()
		.when("maritalStatus", {
			is: maritalStatusData.married,
			then: yup
				.string()
				.required(globalMessages.Address_Home_City),
		})
		.when("maritalStatus", {
			is: maritalStatusData.seperated,
			then: yup
				.string()
				.required(globalMessages.Address_Home_City),
		}),
	spouseSelectState: yup
		.string()
		.when("maritalStatus", {
			is: maritalStatusData.married,
			then: yup.string().required(globalMessages.Address_State_Required),
		})
		.when("maritalStatus", {
			is: maritalStatusData.seperated,
			then: yup.string().required(globalMessages.Address_State_Required),
		}),
});

const useStyles = makeStyles((Theme) => ({

	typoStyle: {
		align: "center",
		justify: "center",
		alignItems: "center",
		marginBottom: "1%",
		marginTop: "1%",
	},
	negativeMargin: {
		marginTop: "-4%"
	},
	paperStyle: {
		justify: "center",
		alignItems: "center",
		width: "inherit",
		marginBottom: "10%",
		marginTop: "10%",
		textAlign: "center"
	}
})
);

// custom component - MarriedStatus
function MarriedStatus() {
	const { data, setData } = useContext(CheckMyOffers);
	const [ stateShort, setStateShort ] = useState("");
	const [ validZip, setValidZip ] = useState(true);
	const navigate = useNavigate();
	const classes = preLoginStyle();
	const innerClasses = useStyles();
	useEffect(() => {
		//redirect to select amount if page accessed directly
		if (data.completedPage < data.page.livingPlace || data.formStatus === "completed") {
			navigate("/select-amount");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	//Configuring formik
	const formik = useFormik({
		initialValues: {
			maritalStatus: data.maritalStatus ?? "",
			add: data.spouse_address_street ? data.spouse_address_street : (data.streetAddress ? data.streetAddress : ""),
			spouseZipcode: data.spouse_address_postal_code ? data.spouse_address_postal_code : (data.zip ? data.zip : ""),
			spouseSelectState: data.spouse_address_state_full_form ? data.spouse_address_state_full_form : (data.stateFullform ? data.stateFullform : ""),
			spousecity: data.spouse_address_city ? data.spouse_address_city : (data.city ? data.city : ""),
		},
		validationSchema: validationSchema,

		onSubmit: (values) => {
			//onsubmit store the data to context and procceds
			setData({
				...data,
				maritalStatus: values.maritalStatus,
				spouse_address_street: values.add,
				spouse_address_city: values.spousecity,
				spouse_address_state: stateShort,
				spouse_address_state_full_form: values.spouseSelectState,
				spouse_address_postal_code: values.spouseZipcode,
				completedPage: data.page.activeDuty,
			});
			navigate("/oneLastStep");
		},
	});

	//prevent the space in key down
	const preventSpace = (event) => {
		if (event.keyCode === 32 && !formik.values.streetAddress) {
			event.preventDefault();
		}
	};

	//fetch the state and city based in zip code
	const fetchAddress = async (event) => {
		try {
			if (event.target.value !== "" && event.target.value.length === 5) {
				let result = await ZipCodeLookup(event.target.value);
				if (result) {
					formik.setFieldValue("spouseSelectState", result?.data?.stateCode);
					formik.setFieldValue("spousecity", result?.data?.cityName);
					setStateShort(result?.data?.stateCode);
					setValidZip(true);
				} else {
					formik.setFieldValue("spouseSelectState", "");
					formik.setFieldValue("spousecity", "");
					setStateShort("");
					setValidZip(false);
				}
			} else {
				formik.setFieldValue("spouseSelectState", "");
				formik.setFieldValue("spousecity", "");
				setStateShort("");
			}
			formik.handleChange(event);
		} catch (error) {
			ErrorLogger(' Error from fetchAddress.', error);
		}
	};

	//JSX part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className={ classes.mainDiv }>
				<Box>
					<Grid
						item
						xs={ 12 }
						container
						justifyContent="center"
						alignItems="center"
					>
						<Grid
							container
							item
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
								id="maritalStatusWrap"
								className={ innerClasses.paperStyle }
							>
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det92 determinate slantDiv"
									/>
									<span className="floatLeft detNum92">92%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/living-place">
										<i className="material-icons dp48 yellowText  ">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid className={ innerClasses.negativeMargin }>
									<img
										alt="marriedlogo"
										src={ MarriedStatusLogo }
										className="spinAnimation"
									/>
								</Grid>

								<Typography
									variant="h5"
									className={ innerClasses.typoStyle }
								>
									Are you married?*
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
											id="selectMaritalStatus"
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
										>
											<Select
												id="selectMaritalStatusWrap"
												fullWidth={ true }
												name="maritalStatus"
												labelform="Marital Status *"
												select={ '[{"value":"' + maritalStatusData.married + '", "label":"Married"}, {"value":"' + maritalStatusData.unmarried + '", "label":"Unmarried"}, {"label":"Separated, under decree of legal separation", "value":"' + maritalStatusData.seperated + '"}]' }
												value={ formik.values.maritalStatus }
												onChange={ formik.handleChange }
												onBlur={ formik.handleBlur }
												error={
													formik.touched.maritalStatus &&
													Boolean(formik.errors.maritalStatus)
												}
												helperText={
													formik.touched.maritalStatus &&
													formik.errors.maritalStatus
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
											className={
												formik.values.maritalStatus === maritalStatusData.married ||
													formik.values.maritalStatus ===
													maritalStatusData.seperated
													? "showMsg space"
													: "hideMsg space"
											}
										>
											<TextField
												id="spouseAddressWrap"
												name="add"
												label="Spouse's Address (if different) *"
												value={ formik.values.add }
												onKeyDown={ preventSpace }
												onChange={ formik.handleChange }
												onBlur={ formik.handleBlur }
												error={ formik.touched.add && Boolean(formik.errors.add) }
												helperText={ formik.touched.add && formik.errors.add }
											/>
										</Grid>
										<Grid
											container
											justifyContent="flex-start"
											alignItems="flex-start"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className={
												formik.values.maritalStatus === maritalStatusData.married ||
													formik.values.maritalStatus ===
													maritalStatusData.seperated
													? "showMsg "
													: "hideMsg "
											}
										>
											<p className="left-align MarginUpDown10">
												<b>Location</b>
											</p>
										</Grid>
										<Grid
											container
											justifyContent="flex-start"
											alignItems="flex-start"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className={
												formik.values.maritalStatus === maritalStatusData.married ||
													formik.values.maritalStatus ===
													maritalStatusData.seperated
													? "showMsg space"
													: "hideMsg space"
											}
										>
											<Zipcode
												fullWidth
												id="zip"
												name="spouseZipcode"
												label="Zipcode *"
												value={ formik.values.spouseZipcode }
												onChange={ fetchAddress }
												onBlur={ formik.handleBlur }
												error={
													(formik.touched.spouseZipcode &&
														Boolean(formik.errors.spouseZipcode)) ||
													!validZip
												}
												helperText={
													validZip
														? formik.touched.spouseZipcode &&
														formik.errors.spouseZipcode
														: globalMessages.ZipCodeValid
												}
											/>
										</Grid>
										<Grid
											container
											justifyContent="flex-start"
											alignItems="flex-start"
											item
											lg={ 8 }
											md={ 8 }
											xs={ 12 }
											className={
												formik.values.maritalStatus === maritalStatusData.married ||
													formik.values.maritalStatus ===
													maritalStatusData.seperated
													? "showMsg space"
													: "hideMsg space"
											}
										>
											<TextField
												id="cityWrap"
												name="spouseCity"
												label="City"
												value={ formik.values.spousecity }
												onChange={ formik.handleChange }
												onBlur={ formik.handleBlur }
												disabled={ true }
												error={
													formik.touched.spousecity &&
													Boolean(formik.errors.spousecity)
												}
												helperText={
													formik.touched.spousecity &&
													formik.errors.spousecity
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
											className={
												formik.values.maritalStatus === maritalStatusData.married ||
													formik.values.maritalStatus ===
													maritalStatusData.seperated
													? "showMsg space"
													: "hideMsg space"
											}
										>
											<TextField
												id="stateWrap"
												name="spouseSelectState"
												label="State"
												value={ formik.values.spouseSelectState }
												onChange={ formik.handleChange }
												onBlur={ formik.handleBlur }
												disabled={ true }
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

										<Grid item lg={ 8 } md={ 8 } xs={ 12 } className="alignButton">
											<ButtonPrimary
												type="submit"
												disabled={ !validZip }
												stylebutton='{"background": "#FFBC23", "padding": "0px 30px", "color": "black","fontSize":"0.938rem"}'
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

export default MarriedStatus;
