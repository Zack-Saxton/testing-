import React, { useContext, useEffect, useRef, useState } from 'react';
import {
	FormControl,
	Typography
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import {
	ButtonPrimary,
	PhoneNumber
} from "../../FormsUI";
import { useStylesMFA } from "./Style";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import globalMessages from '../../../assets/data/globalMessages.json';
import { SavePhoneNumber } from "./../../Controllers/MFAController"


//Yup validation schema
const validationSchema = yup.object({
	phone: yup
		.string(globalMessages.PhoneEnter)
		.required(globalMessages.PhoneRequired)
		.transform((value) => value.replace(/[^\d]/g, ""))
		//eslint-disable-next-line
		.matches(
			/^[1-9]{1}\d{2}\d{3}\d{4}$/,
			globalMessages.PhoneValid
		)
		.matches(/^(\d)(?!\1+$)\d{9}$/, globalMessages.PhoneValid)
		.min(10, globalMessages.PhoneMin)
});

const MFAGetPhoneNumber = ({
}) => {
	const classes = useStylesMFA();
	const navigate = useNavigate();
	const [disabledButton, setDisabledButton] = useState(true);
	const [phoneNumber,SetPhoneNumber] =useState("");

	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};
	const checkMobileNumber = (event) => {
		console.log("clicked");
		let mobileNUmber = event.target.value;
		SetPhoneNumber(event.target.value);
		console.log(SetPhoneNumber);
		let phone = mobileNUmber.replace(/[()-\s]/g, '');
		if (phone.length >= 10) {
			setDisabledButton(false);
		} else {
			setDisabledButton(true);
		}
	}
	const handleToSaveContinue = async () => {
		setDisabledButton(true);
		const email = Cookies.get("email");
		let response = await SavePhoneNumber(email, phoneNumber.replace(/[()-\s]/g, ''));
		if (response?.data?.statusCode === 200) {
			toast.success(response.data?.Message);
			navigate('/customers/accountOverview');
		} else {
			toast.error(response.data?.Message ?? response.data?.errorMessage);
		}
		setDisabledButton(false);
	}
	const handleToSkipContinue = async () => {
		const email = Cookies.get("email");
		let mobile = "";
		let response = await SavePhoneNumber(email, mobile);
		if (response?.data?.statusCode === 200) {
			toast.success(response.data?.Message);
			navigate('/customers/accountOverview');
		} else {
			toast.error(response.data?.Message ?? response.data?.errorMessage);
		}
	}
	//configuring formik
	const formik = useFormik({
		initialValues: {
			phone: "",
		},
		validationSchema: validationSchema,
	});

	return (
		<div >
			<Grid>
				<Grid
					spacing={1}
					container
					item
					xs={12}
					sm={12}
					md={6}
					lg={6}
					xl={6}
					className={classes.twoStepWrap}
				>
					<Paper className={classes.twoStepPaper}>
						<Typography className={classes.twoStepHeading} variant="h5">
							Enter Mobile Number
						</Typography>
						<Typography className={classes.twoStepParagraph}>
							For your security we are asking you to verify your identity.
							Enter your mobile number to complete your login.
						</Typography>
						<FormControl
							className={classes.radioButtonwrap}
							component="fieldset"
						>
							<Grid
								container
								alignItems="center"
								item
								lg={12}
								md={12}
								xs={12}
								className="textBlock"
								id="phoneInput"
							>
								<PhoneNumber
									name="phone"
									label="Phone number *"
									placeholder="Enter your phone number"
									id="phone"
									type="text"
									onKeyDown={preventSpace}
									value={formik.values.phone}
									onChange={checkMobileNumber}
									onBlur={formik.handleBlur}
									error={
										formik.touched.phone && Boolean(formik.errors.phone)
									}
									helperText={formik.touched.phone && formik.errors.phone}
								/>
							</Grid>
						</FormControl>
						<Grid className={classes.nextButtonGrid} container >
							<ButtonPrimary stylebutton='{"color":""}' onClick={handleToSkipContinue} className={classes.button_space}>Skip</ButtonPrimary>
							<ButtonPrimary stylebutton='{"color":""}' disabled={disabledButton}  className={classes.button_space}
								onClick={handleToSaveContinue}>Continue</ButtonPrimary>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</div>
	)
}
export default MFAGetPhoneNumber