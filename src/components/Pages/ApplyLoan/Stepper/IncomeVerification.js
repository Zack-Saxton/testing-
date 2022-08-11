import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verificationSteps } from "../../../Controllers/ApplyForLoanController";
import { ButtonPrimary } from "../../../FormsUI";
import messages from "../../../lib/Lang/applyForLoan.json";
import { useQuery } from "react-query";
import DocumentUpload from "./DocumentUpload";
import usrAccountDetails  from "../../../Controllers/AccountOverviewController"

//styling part
const useStyles = makeStyles(() => ({
	content_grid: {
		marginTop: "15px",
	},
}));

//View Part
//Initializing functional componentl
export default function IncomeVerification(props) {
	const navigate = useNavigate();
	const classes = useStyles();
	const [ internalLoading, setInternalLoading ] = useState(false);
	const [ fileUploadSuccess, setFileUploadSuccess ] = useState(false);
	const { data : verifySteps, refetch : loanRefetch } = useQuery('verification-data', verificationSteps);

	const handleUpload = (res) => {
		if (res?.data?.income_verification) {
			toast.success(messages.document.uploadSuccess);
			setFileUploadSuccess(true);
		} else {
			props.setLoadingFlag(false);
			setInternalLoading(false)
			toast.error(messages.document.upoloadFailed);
		}
	};

	const handleFinishOnClick = async () => {	
		if (!fileUploadSuccess) {
			toast.error(messages?.bankAccountVerification?.notValid);
			props.setLoadingFlag(false);
			setInternalLoading(false);
		}
		else {
			loanRefetch();
			props.setLoadingFlag(true);
			setInternalLoading(true);
		}
	}

	const checkApplicationStatus = () => {
		if (
			verifySteps?.data?.email &&
			verifySteps?.data?.financial_information &&
			verifySteps?.data?.id_document &&
			verifySteps?.data?.id_questions &&
			verifySteps?.data?.id_photo &&
			verifySteps?.data?.bank_account_information &&
			verifySteps?.data?.bank_account_verification &&
			verifySteps?.data?.income_verification
		) {
			props.setLoadingFlag(false);
			setInternalLoading(false)
			navigate("/customers/receiveYourMoney");
		} else {
			props.setLoadingFlag(false);
			setInternalLoading(false)
			toast.error(messages.incomeVerification.finishAllSteps);
		}
	}

	useEffect(() => {
		if(fileUploadSuccess) {
		checkApplicationStatus();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [verifySteps])

	//JSX part
	return (
		<div>
			<div>
				<p style={{ textAlign: "justify", fontSize: "0.938rem" }} data-testid="incomeVerificationText">
					<span>
						To finalize our review, we need to verify the income that you have stated.
					</span>
					<li style={{ fontSize: "0.938rem" }}>
						Please upload your most recent, complete pay statement (dated inside
						of 30 days) or your most recent benefits statement from the current
						calendar year if you are retired or not employed.
					</li>
					if you need to upload multiple documents to verify your stated income,
					you will have the opportunity to upload additional documents from your
					Account Overview &gt; Loan Documents page after you complete the
					verification steps.
				</p>

				<p style={{ textAlign: "justify", fontSize: "0.938rem" }}>
					Acceptable ﬁle Formats are PDF, JPG, JPEG and PNG (please note
					that we are unable to accept screenshots or photos of a computer
					screen).
				</p>

				<p style={{ textAlign: "justify", fontSize: "0.938rem" }}>
					Feel Free to chat with us or give us a call at 877-310-2373 if you
					have a question about what is an acceptable form of proof of income!
				</p>
			</div>

			<Grid className={classes.content_grid}></Grid>
			<Grid className={classes.content_grid}>
				<DocumentUpload
					classes={classes}
					docType={"income information"}
					handle={handleUpload}
					setLoadingFlag={props.setLoadingFlag}
				/>
			</Grid>
			<div className={props.classes.actionsContainer}>
				<div className={props.classes.button_div}>
					<ButtonPrimary
						variant="contained"
						color="primary"
						id="button_stepper_next"
						stylebutton='{"marginRight": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
						onClick={() => {
							handleFinishOnClick();
						}}
					>
						{props.activeStep === props?.steps.length - 1 ? "Finish" : "Next"}
						<i
							className="fa fa-refresh fa-spin customSpinner"
							style={{
								display: internalLoading ? "block" : "none",
							}}
						/>
					</ButtonPrimary>
				</div>
			</div>
		</div>
	);
}

IncomeVerification.propTypes = {
	setLoadingFlag: PropTypes.func,
	classes: PropTypes.object,
	steps: PropTypes.array,
	activeStep: PropTypes.number
};