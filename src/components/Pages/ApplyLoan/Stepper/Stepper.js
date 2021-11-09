import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EmailVerification from "./EmailVerification";
import PhoneVerification from "./PhoneVerification";
import FinancialInformation from "./FinancialInformation";
import DocumentPhoto from "./DocumentPhoto";
import VerificationQuestion from "./VerificationQuestion";
import IncomeVerification from "./IncomeVerification";
import BankAccountVerification from "./BankAccountVerification";
import { ButtonPrimary } from "../../../FormsUI";
import { NavLink } from "react-router-dom";
import { Grid } from "@material-ui/core";
import APICall from "../../../App/APIcall";
import "./VerticalLinearStepper.css";
import { resendVerificationEmail } from "../../../Controllers/ApplyForLoanController";


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
	linkStyle: {
		color: "blue",	
		textDecoration: "underline",
		cursor: "pointer"
	},
	resetContainer: {
		padding: theme.spacing(3),
	},
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
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState();
	const steps = getSteps();

	//To open the the stepper from were the user needs to continue.
	const getApplicationStatus = async () => {
		let data = {};
		const skip = JSON.parse(localStorage.getItem('skip'));
		let res = await APICall(
			"/verification/verification_steps_cac",
			data,
			"POST",
			true
		);
		let tabPosition = "";
		if (res?.data?.data?.email === false) {
			tabPosition = 0;
			resendVerificationEmail();
		} else if (res?.data?.data?.phone_verification === false && tabPosition === "" && skip?.phone !== true) {
			tabPosition = 1;
		} else if (
			res?.data?.data?.financial_information === false && tabPosition === "") {
			tabPosition = 2;
		} else if (res?.data?.data?.id_document === false && tabPosition === "") {
			tabPosition = 3;
		}else if (res?.data?.data?.id_photo === false && tabPosition === "") {
			tabPosition = 3;
		} else if (res?.data?.data?.id_questions === false && tabPosition === "") {
			tabPosition = 4;
		} else if (
			res?.data?.data?.bank_account_information === false &&
			tabPosition === ""
		) {
			tabPosition = 5;
		} else if (
			res?.data?.data?.bank_account_verification === false &&
			tabPosition === ""
		) {
			tabPosition = 5;
		} else if (
			res?.data?.data?.income_verification === false &&
			tabPosition === ""
		) {
			tabPosition = 6;
		}
		setActiveStep(tabPosition ?? 0);

		//  setActiveStep(3);
	};

	useEffect(() => {
		getApplicationStatus();
	}, []);

	//To handle the next prev and reset funcationality
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		if (activeStep === 0) {
			setActiveStep(0);
		}
		if (activeStep === 1) {
			setActiveStep(1);
		}
		if (activeStep === 2) {
			setActiveStep(2);
		}
		if (activeStep === 3) {
			setActiveStep(3);
		}
		if (activeStep === 4) {
			setActiveStep(4);
		}
		if (activeStep === 5) {
			setActiveStep(5);
		}
		if (activeStep === 6) {
			setActiveStep(6);
		}
	};

	//To load the component based on the step selected
	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<EmailVerification
						next={handleNext}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
					/>
				);
			case 1:
				return (
					<PhoneVerification
						next={handleNext}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
					/>
				);
			case 2:
				return (
					<FinancialInformation
						next={handleNext}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
					/>
				);
			case 3:
				return (
					<DocumentPhoto
						next={handleNext}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
					/>
				);
			case 4:
				return (
					<VerificationQuestion
						next={handleNext}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
					/>
				);
			case 5:
				return (
					<BankAccountVerification
						next={handleNext}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
					/>
				);
			case 6:
				return (
					<IncomeVerification
						next={handleNext}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
					/>
				);
			default:
				return "Unknown step";
		}
	}

	// view part
	return (
		<div className={classes.root}>
			{/* <ToastContainer /> */}
			{/* { activeStep ?  */}
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>
							{<span className={classes.steplabel}>{label}</span>}
						</StepLabel>
						<StepContent>
							<div>{getStepContent(index)}</div>
							<div className={classes.actionsContainer}></div>
						</StepContent>
					</Step>
				))}
			</Stepper>

			{activeStep === steps.length && (
				<Paper square elevation={0} className={classes.resetContainer}>
					<Typography>All steps completed - you&apos;re finished</Typography>
					<Grid style={{ paddingTop: "20px" }}>
						<NavLink
							to="/customers/receiveYourMoney"
							style={{ textDecoration: "none" }}
						>
							<ButtonPrimary stylebutton='{ "color":"" }'>
								Click here for application status
							</ButtonPrimary>
						</NavLink>
					</Grid>
				</Paper>
			)}
		</div>
	);
}
