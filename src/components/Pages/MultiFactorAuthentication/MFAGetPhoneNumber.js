import React, { useContext, useEffect, useRef, useState } from 'react';
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
	ButtonPrimary,
	DatePicker,
	EmailTextField,
	PhoneNumber,
	SocialSecurityNumber,
	TextField, Popup
} from "../../FormsUI";
import { useStylesMFA } from "./Style";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import globalMessages from '../../../assets/data/globalMessages.json';

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

const handleClick = async() =>{
    if (selectionValue !== 'security questions'){ 
      const passCodeResponse = await sendPassCode(selectionValue);
      console.log(passCodeResponse); //Left this console log intentionally for QA
      passCodeResponse?.data?.passCode ? navigate('/MFA-OTP', {state: {phoneNumber : selectionValue, mfaQueries:mfaDetails}}) : toast.error(passCodeResponse.data?.Message); //Navigate to OTP page or else show error.  
    } else if (selectionValue === 'security questions' && securityQuestionsSaved) {
      navigate('/MFA-SecurityQuestions', {state: {mfaSecurityQuestions: mfaDetails}});
    } else {
      selectionValue === 'security questions' && !securityQuestionsSaved && navigate('/mfa-kbaQuestions', {state: {mfaSecurityQuestions: mfaDetails}})
    }
  }
  const selection  = async(phone) =>{
    phone.length > 10 ? false : true
  }
const MFAGetPhoneNumber = ({
}) => {

	const classes = useStylesMFA();
	const navigate = useNavigate();
	//const { data } = useContext(CheckMyOffers);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	function phoneNumberMask(values) {
		let phoneNumber = values.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
		values = !phoneNumber[2] ? phoneNumber[1] : '(' + phoneNumber[1] + ') ' + phoneNumber[2] + (phoneNumber[3] ? '-' + phoneNumber[3] : '');
		return (values);
	}
	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};
	//configuring formik
	const formik = useFormik({
		initialValues: {
			phone: "",
		},
		validationSchema: validationSchema,
		//On submit functionality updating context values
		onSubmit: async (values) => {
			const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : "{ }");
			setLoading(true);
			//To check the component is mounted or not to update the state
			if (componentMounted.current) {
				data.phone = values.phone;
				const phone =
					values.phone
						.replace(/-/g, "")
						.replace(/\)/g, "")
						.replace(/\(/g, "")
						.replace(/ /g, "") || "";
				data.phone = phone;
				
			}
		},
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
								lg={8}
								md={8}
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
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.phone && Boolean(formik.errors.phone)
									}
									helperText={formik.touched.phone && formik.errors.phone}
								/>
							</Grid>
						</FormControl>
						<Grid className={classes.nextButtonGrid} container>
							<ButtonPrimary stylebutton='{"color":""}' >Skip</ButtonPrimary>
							<ButtonPrimary stylebutton='{"color":""}' disabled={selection} onClick={handleClick}>Continue</ButtonPrimary>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</div>
	)
}



export default MFAGetPhoneNumber