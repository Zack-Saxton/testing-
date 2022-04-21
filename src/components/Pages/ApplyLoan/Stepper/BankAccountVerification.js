import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import TextFieldWithToolTip from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ButtonPrimary, ButtonSecondary, Radio, TextField } from "../../../FormsUI";
import APICall from "../../../lib/AxiosLib";
import messages from "../../../lib/Lang/applyForLoan.json";
import DocumentUpload from "./DocumentUpload";
import "./stepper.css";

//Styling part
const useStyles = makeStyles((theme) => ({
	content_grid: {
		marginTop: "15px",
	},
	InfoOutlinedIcon:{
		fontSize: "small", 
		color: "#004e9c",
		cursor:"pointer"
	},
	open: {},
}));

//YUP validation schema
const validationSchema = yup.object({
	accountHolder: yup
		.string(messages?.bankAccountVerification?.enterAccHolderName)
		.required(messages?.bankAccountVerification?.accountHolderRequired),
	bankRoutingNumber: yup
		.string(messages?.bankAccountVerification?.enterBankRoutingNum)
		.required(messages?.bankAccountVerification?.bankRoutingNumberRequired)
		.min(9, messages?.bankAccountVerification?.minBankRoutingNum),
	bankInformation: yup
		.string(messages?.bankAccountVerification?.enterBankIfo)
		.required(messages?.bankAccountVerification?.bankInformationRequired),
	bankAccountNumber: yup
		.string(messages?.bankAccountVerification?.minMaxAccountNum)
		.required(messages?.bankAccountVerification?.bankAccountNumberRequired)
		.min(4, messages?.bankAccountVerification?.minMaxAccountNum)
		.max(17, messages?.bankAccountVerification?.minMaxAccountNum),
	confirmBankAccountNumber: yup
		.string(messages?.bankAccountVerification?.enterConfirmAccNum)
		.required(messages?.bankAccountVerification?.bankAccountNumberConfirmationRequired)
		.when("bankAccountNumber", {
			is: (bankAccountNumber) => bankAccountNumber?.length > 0,
			then: yup
				.string()
				.oneOf(
					[ yup.ref("bankAccountNumber") ],
					messages?.bankAccountVerification?.matchAccountNum
				),
		})
		.min(4, messages?.bankAccountVerification?.minMaxAccountNum)
		.max(17, messages?.bankAccountVerification?.minMaxAccountNum),
});

//View Part
//Initializing functional component -  BankAccountVerification
export default function BankAccountVerification(props) {
	const classes = useStyles();
	//Initializing state variables
	const [ accountType, setAccountType ] = useState("saving");
	const [ paymnetMode, setPaymentMode ] = useState("autopayment");
	const [ verifyRequired, setVerifyRequired ] = useState(false);
	const [ error, setError ] = useState("");
	const [ fileUploadSuccess, setFileUploadSuccess ] = useState(false);
	const [ invalidRN, setInvalidRN ] = useState(false);
	const [ resetUpload, setResetUpload ] = useState(false);
	const [ openAutoPayAuth, setOpenAutoPayAuth ] = useState(false);
	function getValueByLable(text, ctx) {
		return document.evaluate("//*[.='" + text + "']",
			ctx || document, null, XPathResult.ANY_TYPE, null).iterateNext();
	}
	const handleUpload = (res) => {
		if (res?.data?.bank_account_verification) {
			toast.success(messages?.document?.uploadSuccess);
			setFileUploadSuccess(true);
			getValueByLable("Bank Account Verification").scrollIntoView();
		} else {
			props.setLoadingFlag(false);
			toast.error(messages?.document?.upoloadFailed);
		}
	};

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
			props.setLoadingFlag(true);
			let data = {
				account_number: values.bankAccountNumber,
				account_type: accountType,
				routing_number: values.bankRoutingNumber,
				bank_name: values.bankInformation,
				repayment: paymnetMode,
			};
			if (verifyRequired && !fileUploadSuccess) {
				toast.error(messages?.bankAccountVerification?.pleaseUploadDoc);
				props.setLoadingFlag(false);
			}
			else if (verifyRequired && fileUploadSuccess) {
				getValueByLable("Bank Account Verification").scrollIntoView();
				props.next();
			}
			else {
				let res = await APICall("bank_information_cac", '', data, "POST", true);
				if (res?.data?.bank_account_information && res?.data?.bank_account_verification) {
					props.setLoadingFlag(false);
					getValueByLable("Bank Account Verification").scrollIntoView();
					props.next();
				} else if (res?.data?.bank_account_information || res?.data?.bank_account_verification) {
					setError(
						paymnetMode === "autopayment"
							? messages?.bankAccountVerification?.notValid
							: messages?.bankAccountVerification?.uploadCheck
					);
					setVerifyRequired(true);
					props.setLoadingFlag(false);
				} else if (!res?.data?.bank_account_information || !res?.data?.bank_account_verification) {
					props.setLoadingFlag(false);
					alert(messages?.bankAccountVerification?.notValid);
				} else {
					props.setLoadingFlag(false);
					alert("Network Error");
				}
			}
		},
	});

	//restrictTextOnChange
	const restrictTextOnChange = (event) => {
		const reg = /^[0-9\b]+$/;
		let account = event.target.value.trim();

		if (!account || reg.test(account)) {
			formik.handleChange(event);
		}
	};

	// restrict Account Holder On Change
	const restrictAccountHolderOnChange = (event) => {
		const reg = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
		let account = event.target.value.trim();
		//Checking non null and accepting reg ex
		if (!account || reg.test(account)) {
			formik.handleChange(event);
		}
	};

	const handleEdit = (event) => {
		event.preventDefault();
	};

	const handleClickOpenAutoPayAuth = () => {
		setOpenAutoPayAuth(true);
	};

	const handleCloseAutoPayAuth = () => {
		setOpenAutoPayAuth(false);
	};

	//View part - JSX part
	return (
		<div>
			<form onSubmit={ formik.handleSubmit }>
				<div>
					<p style={ { textAlign: "justify", fontSize: "0.938rem" } }>
						<span style={ { fontSize: "1.063rem", paddingBottom: "6px", fontWeight: "400", display: "block" } }>Funding</span>
						Please provide your bank account information. This is the bank
						account where you will receive your Funds Please note that this bank
						account must be in the applicant&apos;s name
					</p>

					<Grid sm={ 12 } item className={ classes.content_grid }>
						<TextField
							id="accountHolderInput"
							name="accountHolder"
							placeholder="Account Holder"
							label="Account Holder *"
							value={ formik.values.accountHolder }
							onChange={ restrictAccountHolderOnChange }
							onBlur={ formik.handleBlur }
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

				<Grid id="accountTypeTxt" item xs={ 12 } className={ classes.content_grid }>
					<Radio
						id="accountTypeRadioTxt"
						name="accountType"
						labelforform="Account Type"
						radiolabel='[{"label":"Savings", "value":"saving"},{"label":"Checking", "value":"checking"}]'
						checked={ accountType }
						onClick={ (event) => {
							setAccountType(event);
						} }
						row={ true }
						labelplacement={ "end" }
						style={ { fontWeight: "normal", fontSize: "10px" } }
					/>
					<FormHelperText error={ true }>
						{ !accountType ? "Account type required" : "" }
					</FormHelperText>
				</Grid>
				<Grid container spacing={ 4 } direction="row">
					<Grid item xs={ 12 } sm={ 6 } style={ { width: "100%" } }>
						<TextFieldWithToolTip
							id="bankRoutingNumberInput"
							variant="standard"
							name="bankRoutingNumber"
							style={ { width: "100%" } }
							value={ formik.values.bankRoutingNumber }
							inputProps={ { maxLength: "9", "data-test-id": "BRN" } }
							onChange={ (event) => {
								setInvalidRN(false);
								restrictTextOnChange(event);
							} }
							onBlur={ async (event) => {
								if (
									event.target.value !== "" &&
									event.target.value.length === 9
								) {
									fetch(
										"https://www.routingnumbers.info/api/data.json?rn=" +
										event.target.value.trim()
									)
										.then((res) => res.json())
										.then((result) => {
											formik.setFieldValue(
												"bankInformation",
												result?.customer_name ?? ""
											);
											setInvalidRN(result?.customer_name ? false : true);
										});
									formik.handleBlur(event);
								}
							} }
							error={
								(formik.touched.bankRoutingNumber &&
									Boolean(formik.errors.bankRoutingNumber)) ||
								invalidRN
							}
							helperText={
								formik.touched.bankRoutingNumber &&
									formik.errors.bankRoutingNumber
									? formik.touched.bankRoutingNumber &&
									formik.errors.bankRoutingNumber
									: invalidRN
										? messages?.bankAccountVerification?.enterValidRoutingNum
										: ""
							}
							type="text"
							placeholder="Bank Routing number"
							label={
								<div>
									Bank Routing number *
									<Tooltip title="Bank Routing Number" placement="top-start">
										<InfoOutlinedIcon
											className={classes.InfoOutlinedIcon}
										/>
									</Tooltip>
								</div>
							}
						/>
					</Grid>

					<Grid item xs={ 12 } sm={ 6 } style={ { width: "100%" } }>
						<TextFieldWithToolTip
							id="bankInformationInput"
							variant="standard"
							name="bankInformation"
							style={ { width: "100%" } }
							value={ formik.values.bankInformation }
							onChange={ formik.handleChange }
							disabled={ true }
							inputProps={ {
								maxLength: "100",
								"data-test-id": "bankInformation",
							} }
							onBlur={ formik.handleBlur }
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
									Bank Information *
									<Tooltip title="Bank Information" placement="top-start">
										<InfoOutlinedIcon
											className={classes.InfoOutlinedIcon}
										/>
									</Tooltip>
								</div>
							}
						/>
					</Grid>
				</Grid>
				<Grid item sm={ 12 } className={ classes.content_grid }>
					<TextField
						id="bankAccountNumberInput"
						name="bankAccountNumber"
						placeholder="Bank Account Number"
						label="Bank Account Number *"
						value={ formik.values.bankAccountNumber }
						materialProps={ { maxLength: "16", "data-test-id": "BRN" } }
						onChange={ restrictTextOnChange }
						onBlur={ formik.handleBlur }
						inputProps={ { maxLength: "16", "data-test-id": "BankAccnum" } }
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
				<Grid item sm={ 12 } className={ classes.content_grid }>
					<TextField
						id="confirmAccountNumberInput"
						name="confirmBankAccountNumber"
						placeholder="Confirm Account Number"
						label="Confirm Account Number *"
						value={ formik.values.confirmBankAccountNumber }
						onCut={ handleEdit }
						onCopy={ handleEdit }
						onPaste={ handleEdit }
						materialProps={ {
							maxLength: "16",
							"data-test-id": "BRN",
							autoComplete: "off",
						} }
						onChange={ restrictTextOnChange }
						onBlur={ formik.handleBlur }
						inputProps={ { maxLength: "16", "data-test-id": "BankAccnum" } }
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
					<p style={ { fontSize: "0.938rem" } }>
						<span style={ { fontSize: "1.063rem", paddingBottom: "6px", marginTop: "30px", fontWeight: "500", display: "block" } }>Repayment</span>
						Please choose your preferred repayment method.
					</p>
				</div>
				<Grid item xs={ 12 } className={ classes.content_grid }>
					<Radio
						name="paymnetMode"
						radiolabel='[{"label":"Automatic Payment", "value":"autopayment"}]'
						row={ true }
						checked={ paymnetMode }
						value={ "autopayment" }
						onClick={ () => {
							setPaymentMode("autopayment");
						} }
						labelplacement={ "end" }
						style={ { fontWeight: "normal" } }
					/>
					<FormHelperText style={ { paddingLeft: "28px" } } error={ true }>
						{ !paymnetMode ? messages?.bankAccountVerification?.accountTypeRequired : "" }
					</FormHelperText>
					<span>
						<p
							style={ {
								margin: "0px",
								paddingLeft: "28px",
								textAlign: "justify",
								fontSize: "0.938rem"
							} }
						>
							We electronically debit your bank account each month. You can
							cancel or change the bank account at any time. By clicking the box
							you are electronically signing and acknowledging and agreeing to
							the{ " " }
							<span onClick={ handleClickOpenAutoPayAuth } className="linkStyle">
								Auto Pay Authorization
							</span>{ " " }
						</p>
					</span>
				</Grid>
				<Grid item xs={ 12 }>
					<Radio
						id="paymentbyCheckTxt"
						name="question"
						radiolabel='[{"label":"Payment by Check", "value":"checkpayment"}]'
						row={ true }
						checked={ paymnetMode }
						value={ "checkpayment" }
						onClick={ () => {
							setPaymentMode("checkpayment");
						} }
						labelplacement={ "end" }
						style={ { fontWeight: "normal" } }
					/>
					<span>
						<br />
						<p style={ { marginLeft: "30px", marginTop: "-10px", fontSize: "0.938rem" } }>
							{ " " }
							You&apos;ll mail us a check each month.
						</p>
					</span>
				</Grid>
				<div style={ { display: verifyRequired ? "block" : "none" } }>
					<div>
						<p
							style={ {
								display: !error ? "none" : "block",
								fontWeight: "bold",
							} }
						>
							{ error }
						</p>
						<p className={classes.exampleText} style={ { textAlign: "justify" } }>
							<b>Upload Voided Personal Check:</b>
							<br />
							Please upload a voided personal check for the bank account you
							provided. If you do not have a personal check, please upload your
							most recent bank statement.
						</p>

						<p className={classes.exampleText}>
							Please ensure:
							<li className={classes.exampleText}>Your full account number and name are visibless</li>
							<li className={classes.exampleText}>Acceptable file formats are PDF, JPG, JPEG, GIF and PNG</li>
						</p>
					</div>
					<DocumentUpload
						classes={ classes }
						resetUpload={ resetUpload }
						docType={ "bank information" }
						handle={ handleUpload }
						setLoadingFlag={ props.setLoadingFlag }
						multiple={ paymnetMode === "checkpayment" ? false : true }
					/>
				</div>
				<div className={ props.classes.actionsContainer }>
					<div className={ props.classes.button_div }>
						<ButtonSecondary
							stylebutton='{"marginRight": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
							onClick={ (event) => {
								formik.resetForm();
								setVerifyRequired(false);
								setResetUpload(!resetUpload)
							} }
							id="button_stepper_reset"
						>
							Reset
						</ButtonSecondary>
						<ButtonPrimary
							variant="contained"
							color="primary"
							id="button_stepper_next"
							stylebutton='{"marginRight": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
							type="submit"
							disabled={ invalidRN }
						>
							{ props.activeStep === props?.steps.length - 1 ? "Finish" : "Next" }
						</ButtonPrimary>
					</div>
				</div>
			</form>

			<Dialog
				onClose={ handleCloseAutoPayAuth }
				aria-labelledby="customized-dialog-title"
				maxWidth="md"
				open={ openAutoPayAuth }
			>
				<div id="printableArea">
					<DialogTitle
						id="customized-dialog-title"
						onClose={ handleCloseAutoPayAuth }
					>
						Auto Pay Authorization
						<CloseIcon
							style={ { float: "right", cursor: "pointer" } }
							onClick={ handleCloseAutoPayAuth }
						/>
					</DialogTitle>
					<DialogContent dividers>
						<Typography align="justify" gutterBottom>
							As used in this authorization, the words, “I,” “MY,” and “ME”
							refer to the borrower agreeing to the terms of this authorization,
							and the word “YOU” refers to Mariner Finance, LLC (and its
							subsidiaries and affiliates) (collectively “Lender”).
						</Typography>
						<br />
						<Typography align="justify" gutterBottom>
							I hereby authorize and direct Lender to initiate periodic debit
							entries for my scheduled loan payments from the bank account
							information provided to Lender. I agree that debit entries will be
							made on my scheduled due date (as specified in my loan documents).
							Changes made to my account or banking information must be received
							by Lender at least three (3) business days prior to the payment
							due date.
						</Typography>
						<br />
						<Typography align="justify" gutterBottom>
							If the first scheduled payment is an extended due date payment,
							then the first drafted payment amount may differ from the
							contractually agreed upon amount due each month. If any scheduled
							debit amount is greater than the outstanding balance of the loan,
							the scheduled payment will be debited in full and a check in the
							amount of the overpayment will be issued and mailed to me.
						</Typography>
						<br />
						<Typography align="justify" gutterBottom>
							Lender may cancel my automatic payment enrollment if any automatic
							payment is returned unpaid by my financial institution. Lender may
							also cancel the automatic payment service for any reason and will
							notify me if such an action takes place. The automatic payment
							amount will only be reduced or canceled to avoid creating a credit
							balance on the account.
						</Typography>
						<br />
						<Typography align="justify" gutterBottom>
							Further, I understand and agree that if my account at the
							depository financial institution provided does not have sufficient
							funds to make my loan payment, Lender will not be responsible or
							liable for any penalties or charges assessed by any other
							financial institution as a result of such insufficiency. I
							acknowledge that, in the event Lender’s additional attempts to
							collect my payment via EFT‐ACH are unsuccessful, I must make my
							loan payment by other means. I understand that a fee may be
							assessed by Lender in accordance with the terms of my loan
							agreement as a result of my account at the depository financial
							institution listed below having insufficient funds.
						</Typography>
						<br />
						<Typography align="justify" gutterBottom>
							<span className="underline">Termination:</span> I have the right to
							stop payment of preauthorized transfers from my account by
							notifying Lender, verbally or in writing at the mailing address or
							email address noted below; any such notification must be received
							by Lender at any time up to three (3) business days before the
							scheduled date of the transfer. If the debit item is resubmitted,
							Lender must continue to honor the stop payment order.
						</Typography>
						<br />
						<Typography align="justify" gutterBottom>
							I may terminate this authorization at any time (i) through the
							Customer Account Center; (ii) by providing written notice to
							Lender at Mariner Finance, LLC, 8211 Town Center Drive,
							Nottingham, MD 21236, Attn: Servicing; or (iii) by providing
							written notice to the following email address:
							recurringpymtoptout@marinerfinance.com.
						</Typography>
						<br />
						<Typography align="justify" gutterBottom>
							This authorization will remain in effect until the underlying
							obligation to you is satisfied OR you receive written notification
							from me of termination of this authorization and you have
							reasonable time to act upon it, whichever comes first.
						</Typography>
					</DialogContent>
				</div>
				<DialogActions className="modalAction">
					<ButtonPrimary
						stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
						onClick={ handleCloseAutoPayAuth }
						className="modalButton"
					>
						<Typography align="center">Close</Typography>
					</ButtonPrimary>
				</DialogActions>
			</Dialog>
		</div>
	);
}

BankAccountVerification.propTypes = {
	next: PropTypes.func,
	setLoadingFlag: PropTypes.func,
	steps: PropTypes.array,
	activeStep: PropTypes.number,
	classes: PropTypes.object
};