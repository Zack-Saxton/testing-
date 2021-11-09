import React, { useState } from "react";
import { ButtonPrimary, ButtonSecondary, Radio, TextField } from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import TextFieldWithToolTip from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { errorMessage } from "../../../../helpers/ErrorMessage";
import FormHelperText from "@material-ui/core/FormHelperText";
import APICall from '../../../App/APIcall';
import DocumentUpload from './DocumentUpload';
import { toast } from "react-toastify";

import "./stepper.css"

//Styling part
const useStyles = makeStyles((theme) => ({
	content_grid: {
		marginTop: "15px",
	},
	open: {},
}));

//YUP validation schema 
const validationSchema = yup.object({
	accountHolder: yup
		.string("Enter Account holder's name")
		.required(
			errorMessage.applyForLoan.bankAccountVerification.accountHolderRequired
		),
	bankRoutingNumber: yup
		.string("Enter your Martial Status")
		.required(
			errorMessage.applyForLoan.bankAccountVerification
				.bankRoutingNumberRequired
		)
		.min(9, "Bank Routing number should be 9 digits"),
	bankInformation: yup
		.string("Enter your Martial Status")
		.required(
			errorMessage.applyForLoan.bankAccountVerification.bankInformationRequired
		),
	bankAccountNumber: yup
		.string("Enter your Martial Status")
		.required(
			errorMessage.applyForLoan.bankAccountVerification
				.bankAccountNumberRequired
		)
		.min(7, "Account numner should be minimum of 7 digits")
		.max(16, "Account numner should be minimum of 16 digits"),
	confirmBankAccountNumber: yup
		.string("Enter your Martial Status")
		.required(
			errorMessage.applyForLoan.bankAccountVerification
				.bankAccountNumberConfirmationRequired
		)
		.min(7, "Account numner should be minimum of 7 digits")
		.max(16, "Account numner should be minimum of 16 digits"),
});



//View Part
//Initializing functional component -  BankAccountVerification
export default function BankAccountVerification(props) {
	const classes = useStyles();

	//Initializing state variables 
	const [accountType, setAccountType] = useState("saving");
	const [paymnetMode, setPaymentMode] = useState("autopayment");
	const [verifyRequired, setVerifyRequired] = useState(false);
	const [error, setError] = useState('');
	const [invalidRN, setInvalidRN] = useState(false);

	const handleUpload = (res) => {
		if(res?.bank_account_verification){
			props.next();
		}
		else{
			toast.error("Document submission failed. Please try again", {
				position: "bottom-left",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			  });
		}
	}

	//Configuring the formik variable usign useFormik hook 
	const formik = useFormik({
		initialValues: {
			accountHolder: "",
			bankRoutingNumber: "",
			bankInformation: "",
			bankAccountNumber: "",
			confirmBankAccountNumber: "",
		},
		validationSchema: validationSchema,

		//On submit - submit the user entered details 
		onSubmit: async (values) => {

			let data = {
				"account_number": values.bankAccountNumber,
				"account_type": accountType,
				"routing_number": values.bankRoutingNumber,
				"bank_name": values.bankInformation,
				"repayment": paymnetMode
			}
			let res = await APICall("/verification/bank_information_cac", data, "POST", true);
			if (res?.data?.data?.bank_account_information && res?.data?.data?.bank_account_verification) {
				props.next();
			}
			else if (res?.data?.data?.bank_account_information || res?.data?.data?.bank_account_verification) {
				setError(verifyRequired ? errorMessage?.applyForLoan?.bankAccountVerification?.uploadCheck : errorMessage?.applyForLoan?.bankAccountVerification?.notValid)
				setVerifyRequired(true);
			}
			else if (res?.data?.data?.bank_account_information === false || res?.data?.data?.bank_account_verification === false) {
				alert(errorMessage?.applyForLoan?.bankAccountVerification?.notValid);
			}
			else {
				alert("Network Error");
			}
		},
	});

	//restrictTextOnChange
	const restrictTextOnChange = (event) => {
		// const reg = /[a-zA-Z]+[ ]{0,1}[']{0,1}/;
		const reg = /^[0-9\b]+$/;
		let acc = event.target.value;

		if (acc === "" || reg.test(acc)) {
			formik.handleChange(event);
		}
	};

	// restrict Account Holder On Change
	const restrictAccountHolderOnChange = (event) => {
		const reg = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
		let acc = event.target.value;
		//Checking non null and accepting reg ex
		if (acc === "" || reg.test(acc)) {
			formik.handleChange(event);
		}
	};

	//View part - JSX part
	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<div>
					<p style={{ textAlign: "justify" }}>
						<b>Funding</b> <br />
						Please provide your bank account information. This is the bank
						account where you will receive your Funds Please note that this bank
						account must be in the applicant's name
					</p>

					<Grid sm={12} item className={classes.content_grid}>
						<TextField
							name="accountHolder"
							placeholder="Account Holder"
							label="Account Holder"
							value={formik.values.accountHolder}
							onChange={restrictAccountHolderOnChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.accountHolder &&
								Boolean(formik.errors.accountHolder)
							}
							helperText={
								formik.touched.accountHolder && formik.errors.accountHolder
							}
						/>
					</Grid>
				</div>

				<Grid item xs={12} className={classes.content_grid}>
					<Radio
						name="accountType"
						labelforform="Account Type"
						radiolabel='[{"label":"Savings", "value":"saving"},{"label":"Checking", "value":"checking"}]'

						checked={accountType}
						onClick={(e) => {
							setAccountType(e);
						}}
						row={true}
						labelplacement={"end"}
						style={{ fontWeight: "normal" }}
					/>
					<FormHelperText error={true}>
						{accountType === "" ? "Account type required" : ""}
					</FormHelperText>
				</Grid>
				<Grid container spacing={4} direction="row">
					<Grid item xs={12} sm={6} style={{ width: "100%" }}>
						<TextFieldWithToolTip
							name="bankRoutingNumber"
							style={{ width: "100%" }}
							value={formik.values.bankRoutingNumber}
							inputProps={{ maxLength: "9", "data-test-id": "BRN" }}
							onChange={restrictTextOnChange}
							onBlur={async (event) => {
								if (event.target.value !== "" && event.target.value.length === 9) {
									fetch("https://www.routingnumbers.info/api/data.json?rn=" + event.target.value).then((res) => res.json()).then(
										(result) => {
											formik.setFieldValue("bankInformation", result?.customer_name ?? '');
											setInvalidRN(result?.customer_name ? false : true);
										})
									formik.handleBlur(event);
								}
							}
							}
							error={
								formik.touched.bankRoutingNumber &&
								Boolean(formik.errors.bankRoutingNumber)
							}
							helperText={
								formik.touched.bankRoutingNumber &&
								formik.errors.bankRoutingNumber
							}
							type="text"
							placeholder="Bank Routing number"
							label={
								<div>
									Bank Routing number
									<Tooltip title="Bank Routing Number" placement="top-start">
										<InfoOutlinedIcon
											style={{ fontSize: "small", color: "blue" }}
										/>
									</Tooltip>
								</div>
							}
						/>
					</Grid>

					<Grid item xs={12} sm={6} style={{ width: "100%" }}>
						<TextFieldWithToolTip
							name="bankInformation"
							style={{ width: "100%" }}
							value={formik.values.bankInformation}
							onChange={formik.handleChange}
							disabled={true}
							inputProps={{
								maxLength: "100",
								"data-test-id": "bankInformation",
							}}
							onBlur={formik.handleBlur}
							error={
								formik.touched.bankInformation &&
								Boolean(formik.errors.bankInformation)
							}
							helperText={
								formik.touched.bankInformation && formik.errors.bankInformation
							}
							type="text"
							placeholder="Bank Information"
							label={
								<div>
									Bank Information
									<Tooltip title="Bank Information" placement="top-start">
										<InfoOutlinedIcon
											style={{ fontSize: "small", color: "blue" }}
										/>
									</Tooltip>
								</div>
							}
						/>
					</Grid>
				</Grid>
				<p className={invalidRN ? "showError" : "hide"}>Please enter a valid Routing number </p>
				<Grid item sm={12} className={classes.content_grid}>
					<TextField
						name="bankAccountNumber"
						placeholder="Bank Account Number"
						label="Bank Account Number"
						value={formik.values.bankAccountNumber}
						materialProps={{ maxLength: "16", "data-test-id": "BRN" }}
						onChange={restrictTextOnChange}
						onBlur={formik.handleBlur}
						inputProps={{ maxLength: "16", "data-test-id": "BankAccnum" }}
						error={
							formik.touched.bankAccountNumber &&
							Boolean(formik.errors.bankAccountNumber)
						}
						helperText={
							formik.touched.bankAccountNumber &&
							formik.errors.bankAccountNumber
						}
					/>
				</Grid>
				<Grid item sm={12} className={classes.content_grid}>
					<TextField
						name="confirmBankAccountNumber"
						placeholder="Confirm Account Number"
						label="Confirm Account Number"
						value={formik.values.confirmBankAccountNumber}
						materialProps={{ maxLength: "16", "data-test-id": "BRN" }}
						onChange={restrictTextOnChange}
						onBlur={formik.handleBlur}
						inputProps={{ maxLength: "16", "data-test-id": "BankAccnum" }}
						error={
							formik.touched.confirmBankAccountNumber &&
							Boolean(formik.errors.confirmBankAccountNumber)
						}
						helperText={
							formik.touched.confirmBankAccountNumber &&
							formik.errors.confirmBankAccountNumber
						}
					/>
				</Grid>
				<div>
					<p>
						<b>Repayment</b> <br />
						Please choose your preferred repayment method.
					</p>
				</div>
				<Grid item xs={12} className={classes.content_grid}>
					<Radio
						name="paymnetMode"
						radiolabel='[{"label":"Automatic Payment", "value":"autopayment"}]'
						row={true}

						checked={paymnetMode}
						value={"autopayment"}
						onClick={() => {
							setPaymentMode("autopayment");
						}}
						labelplacement={"end"}
						style={{ fontWeight: "normal" }}
					/>
					<FormHelperText error={true}>
						{paymnetMode === "" ? "Account type required" : ""}
					</FormHelperText>
					<span>
						<br />
						<p
							style={{
								marginLeft: "30px",
								marginTop: "-10px",
								textAlign: "justify",
							}}
						>
							We electronically debit your bank account each month. You can
							cancel or change the bank account at any time. By clicking the box
							you are electronically signing and acknowledging and agreeing to
							the Auto Pay Authorization{" "}
						</p>
					</span>
				</Grid>
				<Grid item xs={12}>
					<Radio
						name="question"
						radiolabel='[{"label":"Payment by Check", "value":"checkpayment"}]'
						row={true}
						checked={paymnetMode}
						value={"checkpayment"}
						onClick={() => {
							setPaymentMode("checkpayment");
						}}
						labelplacement={"end"}
						style={{ fontWeight: "normal" }}
					/>
					<span>
						<br />
						<p style={{ marginLeft: "30px", marginTop: "-10px" }}>
							{" "}
							You'll mail us a check each month.
						</p>
					</span>
				</Grid>
				<div
					style={{ display: verifyRequired ? "block" : "none" }}
				>
					<div>
						<p style={{ display: error && error === '' ? "none" : "block", color: "red" }}>
							{error}
						</p>
						<p style={{ textAlign: "justify" }}>
							<b>Upload Voided Personal Check:</b>
							<br />
							Please upload a voided personal check for the bank account you
							provided. If you do not have a personal check, please upload your
							most recent bank statement.
						</p>

						<p>
							Please ensure:
							<li>Your full account number and name are visible</li>
							<li>Acceptable file formats are PDF, JPG, JPEG, GIF and PNG</li>
						</p>
					</div>
					<DocumentUpload classes={classes} docType={"bank information"} handle={handleUpload} />

				</div>
				<div className={props.classes.actionsContainer}>
					<div className={props.classes.button_div}>
						<ButtonSecondary
							stylebutton='{"margin-right": "10px", "color":"" }'
							onClick={(e) => {
								formik.resetForm();
							}}
							id="button_stepper_reset"
						>
							Reset
						</ButtonSecondary>
						<ButtonPrimary
							variant="contained"
							color="primary"
							id="button_stepper_next"
							stylebutton='{"margin-right": "10px", "color":"" }'
							type="submit"
							disabled={invalidRN}
						>
							{props.activeStep === props?.steps.length - 1 ? "Finish" : "Next"}
						</ButtonPrimary>
					</div>
				</div>
			</form>
		</div>
	);
}
