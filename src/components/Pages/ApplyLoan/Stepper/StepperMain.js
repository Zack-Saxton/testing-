import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Cookies from "js-cookie";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { verificationSteps } from "../../../Controllers/ApplyForLoanController";
import { NavLink, useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../../../FormsUI";
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
		"ID Verification Questions",
		"ID Document & Photo",	
		"Bank Account Verification",
		"Income Verification",
	];
}

//Vertial stepper configuration
export default function StepperMain() {
	const navigate = useNavigate();
	const classes = useStyles();
	const [ activeStep, setActiveStep ] = useState();
	const [ loadingFlag, setLoadingFlag ] = useState(false);
	const steps = getSteps();
	const elementsRef = useRef(steps.map(() => createRef()));
	const { data: res, refetch } = useQuery('verification-data', verificationSteps);

	//To open the the stepper from were the user needs to continue.
	const getApplicationStatus = async () => {
		const skip = JSON.parse(Cookies.get("skip") ? Cookies.get("skip") : "{ }");
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
		} else if (!res?.data?.id_questions && !tabPosition) {
			tabPosition = 3;
		} else if (!res?.data?.id_document && !tabPosition) {
			tabPosition = 4;
		} else if (!res?.data?.id_photo && !tabPosition) {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [res]);

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
						next={refetch}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
						setLoadingFlag={setLoadingFlag}
					/>
				);
			case 1:
				return (
					<PhoneVerification
						next={refetch}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
						setLoadingFlag={setLoadingFlag}
					/>
				);
			case 2:
				return (
					<FinancialInformation
						next={refetch}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
						setLoadingFlag={setLoadingFlag}
					/>
				);
			case 3:
				return (
					<VerificationQuestion
						next={refetch}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
						setLoadingFlag={setLoadingFlag}
						reference={elementsRef}
					/>
				);
			case 4:
				return (
					<DocumentPhoto
						next={refetch}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
						reference={elementsRef}
						setLoadingFlag={setLoadingFlag}
					/>
				);
			case 5:
				return (
					<BankAccountVerification
						next={refetch}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
						setLoadingFlag={setLoadingFlag}
					/>
				);
			case 6:
				return (
					<IncomeVerification
						next={refetch}
						prev={handleBack}
						reset={handleReset}
						steps={steps}
						activeStep={activeStep}
						classes={classes}
						setLoadingFlag={setLoadingFlag}
					/>
				);
			default:
				return "Unknown step";
		}
	}

	// view part
	return (
		<div data-testid="stepperComponent" className={classes.root}>
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>
							{<span className={classes.steplabel} ref={elementsRef.current[ index ]} id={label}>{label}</span>}
						</StepLabel>
						<StepContent
							className={loadingFlag ? classes.loadingOn : classes.loadingOff}
						>
							<div>{getStepContent(index)}</div>
							<div className={classes.actionsContainer}></div>
						</StepContent>
					</Step>
				))}
			</Stepper>
			{activeStep === steps.length && (
				<Paper square elevation={0} className={classes.resetContainer}>
					<Typography>All steps completed - you&apos;re finished</Typography>
					<Grid className={classes.padTop}>
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
