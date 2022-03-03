import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { NavLink } from "react-router-dom";
import { ButtonPrimary, ButtonSecondary } from "../../../FormsUI";
import BankAccountVerification from "./BankAccountVerification";
import DocumentPhoto from "./DocumentPhoto";
import EmailVerification from "./EmailVerification";
import FinancialInformation from "./FinancialInformation";
import IncomeVerification from "./IncomeVerification";
import PhoneVerification from "./PhoneVerification";
import VerificationQuestion from "./VerificationQuestion";
import "./VerticalLinearStepper.css";

// styling part
const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		paddingBottom: "30px",
	},
	button_div: {
		marginTop: theme.spacing(3),
		marginRight: theme.spacing(1),
	},
	stepLabel: {
		fontSize: "15px",
		fontWeight: "600",
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	resetContainer: {
		padding: theme.spacing(3),
	},
}));

// Get the steps
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

// load step content
function getStepContent(step) {
	switch (step) {
		case 0:
			return <EmailVerification />;
		case 1:
			return <PhoneVerification />;
		case 2:
			return <FinancialInformation />;
		case 3:
			return <DocumentPhoto />;
		case 4:
			return <VerificationQuestion />;
		case 5:
			return <BankAccountVerification />;
		case 6:
			return <IncomeVerification />;
		default:
			return "Unknown step";
	}
}

//Component for vertical linear stepper
export default function VerticalLinearStepper() {
	const classes = useStyles();
	const [ activeStep, setActiveStep ] = React.useState(0);
	const steps = getSteps();

	//next, prev and reset functionality

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

	//view part
	return (
		<div className={ classes.root }>
			<Stepper activeStep={ activeStep } orientation="vertical">
				{ steps.map((label, index) => (
					<Step key={ label }>
						<StepLabel>
							{ <span className={ classes.stepLabel }>{ label }</span> }
						</StepLabel>
						<StepContent>
							<Typography>{ getStepContent(index) }</Typography>
							<div className={ classes.actionsContainer }>
								<div className={ classes.button_div }>
									<ButtonSecondary
										stylebutton='{"margin-right": "10px", "color":"" }'
										onClick={ handleReset }
										id="button_stepper_reset"
									>
										Reset
									</ButtonSecondary>

									<ButtonSecondary
										disabled={ activeStep === 0 }
										onClick={ handleBack }
										id="button_stepper_prev"
										stylebutton='{"margin-right": "10px", "color":"" }'
									>
										Prev
									</ButtonSecondary>
									<ButtonPrimary
										variant="contained"
										color="primary"
										id="button_stepper_next"
										stylebutton='{"margin-right": "10px", "color":"" }'
										onClick={ handleNext }
									>
										{ activeStep === steps.length - 1 ? "Finish" : "Next" }
									</ButtonPrimary>
								</div>
							</div>
						</StepContent>
					</Step>
				)) }
			</Stepper>
			{ activeStep === steps.length && (
				<Paper square elevation={ 0 } className={ classes.resetContainer }>
					<Typography>All steps completed - you&apos;re finished</Typography>
					<Grid style={ { paddingTop: "20px" } }>
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
