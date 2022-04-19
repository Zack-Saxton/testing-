import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { toast } from "react-toastify";
import * as yup from "yup";
import usrAccountDetails from "../../../Controllers/AccountOverviewController";
import { OTPInitialSubmission, verifyPasscode } from "../../../Controllers/ApplyForLoanController";
import { ButtonPrimary, ButtonSecondary, ButtonWithIcon, TextField } from "../../../FormsUI";
import messages from "../../../lib/Lang/applyForLoan.json";

const useStyles = makeStyles((Theme) => ({
	pTagTextStyle: {
		textAlign: "justify",
		fontSize: "0.938rem",
		color: "#595959",
		fontWeight: "normal",
	},
	smallTextLeft: {
		textAlign: "left",
		fontSize: "0.75rem !important",
		color: "#595959",
		marginTop: "10px !important",
		fontWeight: "normal"
	},
	fontLableStyle: {
		fontSize: "0.75rem"
	},
	typoStyle: {
		fontSize: "15px"
	},
	lineHightStyle: {
		lineHeight: 3
	}
})
);
//YUP validation schema
const validationSchema = yup.object({
	phone: yup
		.string(messages?.phoneVerification?.phoneNumRequired)
		.required(messages?.phoneVerification?.phoneNumRequired)
		.transform((value) => value.replace(/[^\d]/g, ""))
		//eslint-disable-next-line
		.matches(/^[1-9]{1}\d{2}\d{3}\d{4}$/, messages?.phoneVerification?.invalidPhone)
		.matches(/^(\d)(?!\1+$)\d{9}$/, messages?.phoneVerification?.invalidPhone)
		.min(10, messages?.phoneVerification?.phoneNumMin),
});

//View Part
export default function PhoneVerification(props) {
	const [ hasPasscode, setOfferCode ] = useState(false);
	const [ passcode, setPasscode ] = useState("");
	const [ error, setError ] = useState();
	const [ phoneNum, setPhoneNum ] = useState("");
	const [ open, setOpen ] = useState(false);
	const innerClasses = useStyles();
	const { data: accountDetials } = useQuery('loan-data', usrAccountDetails);

	function phoneNumberMask(values) {
		let phoneNumber = values.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
		values = !phoneNumber[ 2 ] ? phoneNumber[ 1 ] : '(' + phoneNumber[ 1 ] + ') ' + phoneNumber[ 2 ] + (phoneNumber[ 3 ] ? '-' + phoneNumber[ 3 ] : '');
		return (values);
	}
	// get the phone number on load
	useEffect(() => {
		setPhoneNum(accountDetials?.data?.customer?.latest_contact?.phone_number_primary);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ accountDetials ]);

	useEffect(() => {
		formik.setFieldValue("phone", phoneNum);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ phoneNum ]);

	// configuring the formik variables
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			phone: phoneNum ?? "",
			type: "",
			code: "",
		},
		validationSchema: validationSchema,
		//On submit - calls he otp initial submission API to send code
		onSubmit: async (values) => {
			setOfferCode(true);
			setOfferCode(hasPasscode ? hasPasscode : !hasPasscode);
			await OTPInitialSubmission(values.phone, value);
		},
	});
	const [ value, setValue ] = useState("T");

	const handleChange = (event) => {
		setValue(event.target.value.trim());
	};

	//To prevent spaces
	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};

	const onPasscodeChange = (event) => {
		const reg = /^\d*$/;
		let firstName = event.target.value.trim();
		setError("");

		if (!firstName || reg.test(firstName)) {
			setPasscode(firstName);
		}
	};

	const onNextClick = async () => {
		const skip = JSON.parse(Cookies.get("skip") ? Cookies.get("skip") : "{ }");
		if(skip?.phone && !passcode){
			props.next();
		}else if(!passcode){
			toast.error("Enter Passcode");
		}else{
			let res = await verifyPasscode(passcode);
			if (res?.data?.phone_verification) {
				setError("");
				props.next();
			} else {
				setError(
					messages.phoneVerification
						.verificationNotFound
				);
			}
		}		
	};

	const skipPhoneVerification = (event) => {
		Cookies.set("skip", JSON.stringify({ phone: true }));
		handleClose();
	};

	const handleClose = () => {
		setOpen(false);
	};
	//view part
	return (
		<div>
			<Grid item sm={ 12 } lg={ 12 }>
				<p
					className={ innerClasses.pTagTextStyle }
				>
					To verify your phone number we will deliver a passcode to your phone.
					Please select how you would like to receive this passcode.
				</p>
			</Grid>
			<form onSubmit={ formik.handleSubmit }>
				<Grid
					item
					sm={ 5 }
					className="textBlock"
					id="applyForLoanPhone"
				>
					<TextField
						name="phone"
						label="Phone number *"
						id="phone"
						type="text"
						onKeyDown={ preventSpace }
						value={ formik.values.phone ? phoneNumberMask(formik.values.phone) : "" }
						onChange={ formik.handleChange }
						disabled={ true }
						error={ formik.touched.phone && Boolean(formik.errors.phone) }
						helperText={ formik.touched.phone && formik.errors.phone }
					/>
					<div className="MuiTypography-alignLeft">
						<Typography
							className={ innerClasses.smallTextLeft }
							align="left"
						>
							This is the Phone number you provided in your application
						</Typography>
					</div>
				</Grid>
				<Grid item xs={ 12 } className={ innerClasses.lineHightStyle }>
					<FormControl component="fieldset">
						<FormLabel className={ innerClasses.fontLableStyle } component="legend">Delivery Method</FormLabel>
						<RadioGroup
							id="textAndCall"
							aria-label="method"
							name="method"
							value={ value }
							onChange={ handleChange }
							row={ true }
						>
							<FormControlLabel value="T" control={ <Radio color='primary' /> } label="Text" />
							<FormControlLabel value="M" control={ <Radio color='primary' /> } label="Call" />
						</RadioGroup>
					</FormControl>
					<div className="MuiTypography-alignLeft">
						<Typography
							className={ innerClasses.smallTextLeft }
							align="left"
						>
							Standard text message and voice rates apply.
						</Typography>
					</div>
				</Grid>

				<Grid item xs={ 12 } className={ innerClasses.lineHightStyle }>
					<ButtonWithIcon
						stylebutton='{ "fontWeight":"normal" }'
						styleicon='{ "color":"" }'
						type="submit"
						fullWidth={ true }
						onClick={ () => {
							setOfferCode(!hasPasscode);
						} }
					>
						Send Passcode
					</ButtonWithIcon>
				</Grid>
				<div className={ hasPasscode ? "open" : "close" }>
					<Grid item sm={ 5 }>
						<TextField
							name="firstName"
							label="Enter Passcode"
							value={ passcode }
							onChange={ onPasscodeChange }
							materialProps={ {
								"data-test-id": "offer",
								maxLength: "4",
							} }
							error={ error ? true : false }
							helperText={ error }
						/>
					</Grid>
				</div>
			</form>
			<br />
			<div>
				<Typography
					onClick={ () => {
						setOpen(true);
					} }
					className={ props.classes.linkStyle }
				>
					I do not have access to this phone
				</Typography>
			</div>
			<div className={ props.classes.actionsContainer }>
				<div className={ props.classes.button_div }>
					<ButtonPrimary
						variant="contained"
						color="primary"
						id="button_stepper_next"
						stylebutton='{"marginRight": "10px", "color":"" }'
						onClick={ () => { onNextClick(); } }
					>
						{ props.activeStep === props?.steps.length - 1 ? "Finish" : "Next" }
					</ButtonPrimary>
				</div>
			</div>
			<Dialog
				className="confirmationDialog"
				onClose={ handleClose }
				aria-labelledby="customized-dialog-title"
				open={ open }
			>
				<DialogTitle id="customized-dialog-title" onClose={ handleClose }>
					Confirmation
				</DialogTitle>
				<DialogContent dividers>
					<Typography align="justify" className={ innerClasses.typoStyle } gutterBottom>
						If you are currently unable to access the phone you provided, click
						{ " Verify phone later " } to proceed with the Remainder of the
						Verification process. Please note that we will need to manually
						verify your phone number by calling and speaking with you directly.
					</Typography>
				</DialogContent>
				<DialogActions className="modalAction">
					<br />

					<Grid className="confirmationButtons" container>
						<Grid className="returnButton" item lg={ 5 }>
							<ButtonSecondary
								stylebutton='{"background": "", "color": "black", "borderRadius": "50px"}'
								onClick={ handleClose }
							>
								<Typography align="center">Return To Selection</Typography>
							</ButtonSecondary>
						</Grid>
						<Grid item lg={ 5 }>
							<ButtonPrimary
								stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
								onClick={ skipPhoneVerification }
							>
								<Typography align="center">Verify Phone Later</Typography>
							</ButtonPrimary>
						</Grid>
					</Grid>
					<br />
				</DialogActions>
			</Dialog>
		</div>
	);
}
PhoneVerification.propTypes = {
	next: PropTypes.func,
	classes: PropTypes.object,
	steps: PropTypes.array,
	activeStep: PropTypes.number
};