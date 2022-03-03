import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ButtonPrimary } from "../../../FormsUI";
import APICall from "../../../lib/AxiosLib";
import messages from "../../../lib/Lang/applyForLoan.json";
import DocumentUpload from "./DocumentUpload";

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
	const handleUpload = (res) => {
		if (res?.data?.income_verification) {
			toast.success("Document uploaded successfully!");
		} else {
			toast.error("Document submission failed. Please try again");
		}
	};
	//JSX part
	return (
		<div>
			<div>
				<p style={ { textAlign: "justify", fontSize: "0.938rem" } }>
					<span>
						To finalize our review, we need to verify the income that you have stated.
					</span>
					<li style={ { fontSize: "0.938rem" } }>
						Please upload your most recent, complete pay statement (dated inside
						of 30 days) or your most recent benefits statement from the current
						calendar year if you are retired or not employed.
					</li>
					if you need to upload multiple documents to verify your stated income,
					you will have the opportunity to upload additional documents from your
					My Account Page &gt; Loan Application after you complete the
					verification steps.
				</p>

				<p style={ { textAlign: "justify", fontSize: "0.938rem" } }>
					Acceptable ﬁle Formats are PDF, JPG, JPEG, GIF, 81 PNG (please note
					that we are unable to accept screenshots or photos of a computer
					screen).
				</p>

				<p style={ { textAlign: "justify", fontSize: "0.938rem" } }>
					Feel Free to chat with us or give us a call at 877-310-2373 if you
					have a question about what is an acceptable form of proof of income!
				</p>
			</div>

			<Grid className={ classes.content_grid }></Grid>
			<Grid className={ classes.content_grid }>
				<DocumentUpload
					classes={ classes }
					docType={ "income information" }
					handle={ handleUpload }
					setLoadingFlag={ props.setLoadingFlag }
				/>
			</Grid>
			<div className={ props.classes.actionsContainer }>
				<div className={ props.classes.button_div }>
					<ButtonPrimary
						variant="contained"
						color="primary"
						id="button_stepper_next"
						stylebutton='{"marginRight": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
						onClick={ async () => {
							let data = {};
							props.setLoadingFlag(true);

							// API call
							let res = await APICall("verification_steps_cac", '', data, "POST", true);

							//To check all the steps are completed or not
							if (
								res?.data?.email === true &&
								res?.data?.financial_information === true &&
								res?.data?.id_document === true &&
								res?.data?.id_questions === true &&
								res?.data?.id_photo === true &&
								res?.data?.bank_account_information === true &&
								res?.data?.bank_account_verification === true &&
								res?.data?.income_verification === true
							) {
								props.setLoadingFlag(false);
								navigate("/customers/receiveYourMoney");
							} else {
								props.setLoadingFlag(false);
								alert(messages.incomeVerification.finishAllSteps);
							}
						} }
					>
						{ props.activeStep === props?.steps.length - 1 ? "Finish" : "Next" }
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