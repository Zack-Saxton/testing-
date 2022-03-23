import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Cookies from "js-cookie";
import React, { createRef, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../../../FormsUI";
import APICall from "../../../lib/AxiosLib";
import BankAccountVerification from "./BankAccountVerification";
import DocumentPhoto from "./DocumentPhoto";
import EmailVerification from "./EmailVerification";
import FinancialInformation from "./FinancialInformation";
import IncomeVerification from "./IncomeVerification";
import PhoneVerification from "./PhoneVerification";
import VerificationQuestion from "./VerificationQuestion";
import "./VerticalLinearStepper.css";

//Styling part
const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		paddingBottom: "30px",
	},
	button_div: {
		marginTop: theme.spacing(3),
		marginRight: theme.spacing(1),
	},
	steplabel: {
		fontSize: "15px",
		fontWeight: "600",
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	loadingOn: {
		opacity: 0.55,
		pointerEvents: "none",
	},
	loadingOff: {
		opacity: 1,
		pointerEvents: "initial",
	},
	linkStyle: {
		color: "blue",
		textDecoration: "underline",
		cursor: "pointer",
	},
	resetContainer: {
		padding: theme.spacing(3),
	},
	padTop: {
		paddingTop: "20px"
	},
	textDecoreNone: {
		textDecoration: "none"
	}
}));

// To get the steps as response
function getSteps() {
	return [
		"Email Verification",
		"Phone Verification",
		"Financial Information",
		"ID Document & Photo",
		"ID Verification Questions",
		"Bank Account Verification",
		"Income Verification",
	];
}

//Vertial stepper configuration
export default function VerticalLinearStepper() {
	const navigate = useNavigate();
	const classes = useStyles();
	const [ activeStep, setActiveStep ] = useState();
	const [ loadingFlag, setLoadingFlag ] = useState(false);
	const steps = getSteps();
	const elementsRef = useRef(steps.map(() => createRef()));

	//To open the the stepper from were the user needs to continue.
	const getApplicationStatus = async () => {
		let data = {};
		const skip = JSON.parse(Cookies.get("skip") ? Cookies.get("skip") : "{ }");
		let res = await APICall("verification_steps_cac", '', data, "POST", true);
		let tabPosition = "";
		if (
			res?.data?.email &&
			res?.data?.financial_information &&
			res?.data?.id_document &&
			res?.data?.id_photo &&
			res?.data?.id_questions &&
			res?.data?.bank_account_information &&
			res?.data?.bank_account_verification &&
			res?.data?.income_verification
		) {
			navigate("/customers/receiveYourMoney");
		} else if (!res?.data?.email) {
			tabPosition = 0;
		} else if (!res?.data?.phone_verification && !tabPosition && !skip?.phone) {
			tabPosition = 1;
		} else if (!res?.data?.financial_information && !tabPosition) {
			tabPosition = 2;
		} else if (!res?.data?.id_document && !tabPosition) {
			tabPosition = 3;
		} else if (!res?.data?.id_photo && !tabPosition) {
			tabPosition = 3;
		} else if (!res?.data?.id_questions && !tabPosition) {
			tabPosition = 4;
		} else if (!res?.data?.bank_account_information && !tabPosition) {
			tabPosition = 5;
		} else if (!res?.data?.bank_account_verification && !tabPosition) {
			tabPosition = 5;
		} else if (!res?.data?.income_verification && !tabPosition) {
			tabPosition = 6;
		}
		setActiveStep(tabPosition ?? 0);
		setLoadingFlag(false);
	};

	useEffect(() => {
		getApplicationStatus();
		return null;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//To handle the next prev and reset funcationality

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		if (activeStep >= 0 && activeStep < 7) setActiveStep(activeStep);
	};

	//To load the component based on the step selected
	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<EmailVerification
						next={ getApplicationStatus }
						prev={ handleBack }
						reset={ handleReset }
						steps={ steps }
						activeStep={ activeStep }
						classes={ classes }
						setLoadingFlag={ setLoadingFlag }
					/>
				);
			case 1:
				return (
					<PhoneVerification
						next={ getApplicationStatus }
						prev={ handleBack }
						reset={ handleReset }
						steps={ steps }
						activeStep={ activeStep }
						classes={ classes }
						setLoadingFlag={ setLoadingFlag }
					/>
				);
			case 2:
				return (
					<FinancialInformation
						next={ getApplicationStatus }
						prev={ handleBack }
						reset={ handleReset }
						steps={ steps }
						activeStep={ activeStep }
						classes={ classes }
						setLoadingFlag={ setLoadingFlag }
					/>
				);
			case 3:
				return (
					<DocumentPhoto
						next={ getApplicationStatus }
						prev={ handleBack }
						reset={ handleReset }
						steps={ steps }
						activeStep={ activeStep }
						classes={ classes }
						setLoadingFlag={ setLoadingFlag }
						reference={ elementsRef }
					/>
				);
			case 4:
				return (
					<VerificationQuestion
						next={ getApplicationStatus }
						prev={ handleBack }
						reset={ handleReset }
						steps={ steps }
						activeStep={ activeStep }
						classes={ classes }
						setLoadingFlag={ setLoadingFlag }
					/>
				);
			case 5:
				return (
					<BankAccountVerification
						next={ getApplicationStatus }
						prev={ handleBack }
						reset={ handleReset }
						steps={ steps }
						activeStep={ activeStep }
						classes={ classes }
						setLoadingFlag={ setLoadingFlag }
					/>
				);
			case 6:
				return (
					<IncomeVerification
						next={ getApplicationStatus }
						prev={ handleBack }
						reset={ handleReset }
						steps={ steps }
						activeStep={ activeStep }
						classes={ classes }
						setLoadingFlag={ setLoadingFlag }
					/>
				);
			default:
				return "Unknown step";
		}
	}

	// view part
	return (
		<div className={ classes.root }>
			<Stepper activeStep={ activeStep } orientation="vertical">
				{ steps.map((label, index) => (
					<Step key={ label }>
						<StepLabel>
							{ <span className={ classes.steplabel } ref={ elementsRef.current[ index ] } id={ label }>{ label }</span> }
						</StepLabel>
						<StepContent
							className={ loadingFlag ? classes.loadingOn : classes.loadingOff }
						>
							<div>{ getStepContent(index) }</div>
							<div className={ classes.actionsContainer }></div>
						</StepContent>
					</Step>
				)) }
			</Stepper>
			{ activeStep === steps.length && (
				<Paper square elevation={ 0 } className={ classes.resetContainer }>
					<Typography>All steps completed - you&apos;re finished</Typography>
					<Grid className={ classes.padTop }>
						<NavLink
							to="/customers/receiveYourMoney"
							style={ { textDecoration: "none" } }
						>
							<ButtonPrimary stylebutton='{ "color":"" }'>
								Click here for application status
							</ButtonPrimary>
						</NavLink>
					</Grid>
				</Paper>
			) }
		</div>
	);
}
