import React, { useEffect, useState } from "react";
import { ButtonWithIcon, PhoneNumber, ButtonSecondary, ButtonPrimary, TextField } from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import * as yup from "yup";
import APICall from '../../../App/APIcall';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@material-ui/core";
import { errorMessage } from "../../../../helpers/ErrorMessage";
import { OTPInitialSubmission, verifyPasscode } from "../../../Controllers/ApplyForLoanController"

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
    const [passcode, setPasscode] = useState('');
	const [error, setError] = useState();

	// get phone number from using email from api 
	const getPhone = async () => {
		const email = localStorage.getItem("email");

		let data = {
			"email": email,
			"ssn": "",
			"isAuthenticated": true
		}
		await APICall("/customer/check_customer_user", data, 'POST', false);
	}

	// get the phone number on load
	useEffect(() => {
		getPhone();

	}, []);

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
			let res = await OTPInitialSubmission(values.phone, value);
			console.log("API Call responce:", res);
		},
	});

	const [value, setValue] = React.useState("T");

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	//To prevent spaces 
	const preventSpace = (event) => {
		// const reg = /[a-zA-Z]+[ ]{0,1}[']{0,1}/;
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};

	const onPasscodeChange = (event) => {
		const reg = /^\d*$/;
		let acc = event.target.value;
		setError("");
	
		if (acc === "" || reg.test(acc)) {
			setPasscode(event.target.value)
		}
	};

	//view part
	return (
		<div>
			<Grid item sm={12} lg={12}>
				<p
					style={{
						textAlign: "justify",
						fontSize: "14px",
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
					
				>
					<PhoneNumber
						name="phone"
						label="Phone number *"
						id="phone"
						type="text"
						onKeyDown={preventSpace}
						value={formik.values.phone}
						onChange={formik.handleChange}
						// value={phone}
						// onChange={handleChangePhone}
						error={
							formik.touched.phone && Boolean(formik.errors.phone)
						}
						helperText={formik.touched.phone && formik.errors.phone}
						
					/>
					<div className="MuiTypography-alignLeft">
						<Typography
							style={{ fontWeight: "normal" }}
							className="smallTextLeft"
							align="left"
						>
							This is the Phone number you provided in your application
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12} style={{ lineHeight: 3 }}>
					<FormControl component="fieldset">
						<FormLabel component="legend">Delivery Method</FormLabel>
						<RadioGroup
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
							style={{ fontWeight: "normal" }}
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
					<Grid item  sm={5}>
						<TextField
							name="firstName"
							form={true}
							label="Enter Passcode"
                            value={passcode}
                            // onChange={(e) => { setPasscode(e.target.value)}}
							onChange={onPasscodeChange}
							materialProps={{
								"data-test-id": "offer",
								maxLength: "4",
							}}
							error = {error ? true : false}
							helperText = {error}
						/>

                     
					</Grid>
				</div>
			</form>
			<div className={props.classes.actionsContainer}>
                <div className={props.classes.button_div} >
                  
                  <ButtonSecondary
                    stylebutton='{"marginRight": "10px", "color":"" }'
                    onClick={props.reset}
                    id = "button_stepper_reset"
                  >
                    Reset
                  </ButtonSecondary>
                 
                  <ButtonSecondary
                    disabled={props.activeStep === 0}
                    onClick={props.prev}
                    id = "button_stepper_prev"
                    stylebutton='{"marginRight": "10px", "color":"" }'
                  >
                    Prev
                  </ButtonSecondary>
                  <ButtonPrimary
                    variant="contained"
                    color="primary"
                    id = "button_stepper_next"
                    stylebutton='{"marginRight": "10px", "color":"" }'
                    // onClick={()=>{ props.next() }}
					onClick={async () => {
						let res = await verifyPasscode(passcode);
						if(res.data.data.phone_verification === true){
							setError('');
							props.next() 
						}
						else{
							setError(errorMessage.applyForLoan.phoneVerification.verificationNotFound);
						}
					
					}}
>
                    {props.activeStep === props?.steps.length - 1 ? "Finish" : "Next"}
                  </ButtonPrimary>
                </div>
              </div>
		</div>
	);
}
