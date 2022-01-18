import React, { useEffect, useState } from "react";
import {
	ButtonWithIcon,
	PhoneNumber,
	ButtonPrimary,
	ButtonSecondary,
	TextField,
} from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import * as yup from "yup";
import APICall from "../../../App/APIcall";
import {
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
} from "@material-ui/core";
import { errorMessage } from "../../../../helpers/ErrorMessage";
import {
	OTPInitialSubmission,
	verifyPasscode,
} from "../../../Controllers/ApplyForLoanController";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Cookies from "js-cookie";

//YUP validation schema
const validationSchema = yup.object({
	phone: yup
		.string("Enter a name")
		.required("Your Phone number is required")
		.transform((value) => value.replace(/[^\d]/g, ""))
		//eslint-disable-next-line
		.matches(/^[1-9]{1}\d{2}\d{3}\d{4}$/, "Invalid Phone")
		.matches(/^(\d)(?!\1+$)\d{9}$/, "Invalid Phone")
		.min(10, "Name must contain at least 10 digits"),
});

//View Part
export default function PhoneVerification(props) {
	const [hasPasscode, setOfferCode] = useState(false);
	const [passcode, setPasscode] = useState("");
	const [error, setError] = useState();
	const [phoneNum, setPhoneNum] = useState("");
	const [open, setOpen] = useState(false);

	// get phone number from using email from api
	const getPhone = async () => {
		let data = {};
		let userData = await APICall(
			"/customer/account_overview",
			data,
			"GET",
			true
		);
		setPhoneNum(
			userData.data.data.customer.latest_contact.phone_number_primary
		);
	};

	// get the phone number on load
	useEffect(() => {
		getPhone();
	}, []);

	useEffect(() => {
		formik.setFieldValue("phone", phoneNum);
	}, [phoneNum]);

	// configuring the formik variables
	const formik = useFormik({
		initialValues: {
			phone: "",
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
	const [value, setValue] = React.useState("T");

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	//To prevent spaces
	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};

	const onPasscodeChange = (event) => {
		const reg = /^\d*$/;
		let acc = event.target.value;
		setError("");

		if (acc === "" || reg.test(acc)) {
			setPasscode(event.target.value);
		}
	};

	const skipPhoneVerification = (event) => {
		Cookies.set("skip", JSON.stringify({ phone: true }));
		props.next();
	};

	const handleClose = () => {
		setOpen(false);
	};
	//view part
	return (
		<div>
			<Grid item sm={12} lg={12}>
				<p
					style={{
						textAlign: "justify",
						fontSize: "0.938rem",
						color: "#595959",
						fontWeight: "normal",
					}}
				>
					To verify your phone number we will deliver a passcode to your phone.
					Please select how you would like to receive this passcode.
				</p>
			</Grid>
			<form onSubmit={formik.handleSubmit}>
				<Grid
					item
					sm={5}
					className="textBlock"
					id="applyForLoanPhone"

				>
					<PhoneNumber
						name="phone"
						label="Phone number *"
						id="phone"
						type="text"
						onKeyDown={preventSpace}
						value={formik.values.phone}
						onChange={formik.handleChange}
						disabled={true}
						error={formik.touched.phone && Boolean(formik.errors.phone)}
						helperText={formik.touched.phone && formik.errors.phone}
					/>
					<div className="MuiTypography-alignLeft">
						<Typography
							style={{ fontWeight: "normal", fontSize:"0.75rem" }}
							className="smallTextLeft"
							align="left"
						>
							This is the Phone number you provided in your application
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12} style={{ lineHeight: 3 }}>
					<FormControl component="fieldset">
						<FormLabel style={{ fontSize:"0.75rem" }} component="legend">Delivery Method</FormLabel>
						<RadioGroup
							id="textAndCall"
							aria-label="method"
							name="method"
							value={value}
							onChange={handleChange}
							row={true}
						>
							<FormControlLabel value="T" control={<Radio />} label="Text" />
							<FormControlLabel value="M" control={<Radio />} label="Call" />
						</RadioGroup>
					</FormControl>
					<div className="MuiTypography-alignLeft">
						<Typography
							style={{ fontWeight: "normal",fontSize:"0.75rem" }}
							className="smallTextLeft"
							align="left"
						>
							Standard text message and voice rates apply.
						</Typography>
					</div>
				</Grid>

				<Grid item xs={12} style={{ lineHeight: 3 }}>
					<ButtonWithIcon
						stylebutton='{ "fontWeight":"normal" }'
						styleicon='{ "color":"" }'
						type="submit"
						fullWidth={true}
						onClick={async () => {
							setOfferCode(!hasPasscode);
						}}
					>
						Send Passcode
					</ButtonWithIcon>
				</Grid>
				<div className={hasPasscode ? "open" : "close"}>
					<Grid item sm={5}>
						<TextField
							name="firstName"
							form={true}
							label="Enter Passcode"
							value={passcode}
							onChange={onPasscodeChange}
							materialProps={{
								"data-test-id": "offer",
								maxLength: "4",
							}}
							error={error ? true : false}
							helperText={error}
						/>
					</Grid>
				</div>
			</form>
			<br />
			<div>
				<Typography
					onClick={() => {
						setOpen(true);
					}}
					className={props.classes.linkStyle}
				>
					I do not have access to this phone
				</Typography>
			</div>
			<div className={props.classes.actionsContainer}>
				<div className={props.classes.button_div}>
					<ButtonPrimary
						variant="contained"
						color="primary"
						id="button_stepper_next"
						stylebutton='{"marginRight": "10px", "color":"" }'
						onClick={async () => {
							let res = await verifyPasscode(passcode);
							if (res.data.data.phone_verification === true) {
								setError("");
								props.next();
							} else {
								setError(
									errorMessage.applyForLoan.phoneVerification
										.verificationNotFound
								);
							}
						}}
					>
						{props.activeStep === props?.steps.length - 1 ? "Finish" : "Next"}
					</ButtonPrimary>
				</div>
			</div>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Confirmation
				</DialogTitle>
				<DialogContent dividers>
					<Typography align="justify" style={{ fontSize: "15px" }} gutterBottom>
						If you are currently unable to access the phone you provided, click
						"Verify phone later" to proceed with the Remainder of the
						Verification process. Please note that we will need to manually
						verify your phone number by calling and speaking with you directly.
					</Typography>
				</DialogContent>
				<DialogActions className="modalAction">
					<br />

					<Grid container>
						<Grid item lg={5}>
							<ButtonSecondary
								stylebutton='{"background": "", "color": "black", "border-radius": "50px"}'
								onClick={handleClose}
							>
								<Typography align="center">Return To Selection</Typography>
							</ButtonSecondary>
						</Grid>
						<Grid item lg={5}>
							<ButtonPrimary
								stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
								onClick={skipPhoneVerification}
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
