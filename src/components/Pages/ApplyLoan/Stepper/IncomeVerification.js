import React from "react";
import { useHistory } from "react-router-dom";
import { ButtonPrimary, ButtonSecondary } from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DocumentUpload from "./DocumentUpload";
import APICall from "../../../App/APIcall";
import { toast } from "react-toastify";

//styling part
const useStyles = makeStyles(() => ({
	content_grid: {
		marginTop: "15px",
	},
}));

//View Part
//Initializing functional componentl
export default function IncomeVerification(props) {
	const history = useHistory();
	const classes = useStyles();
	const handleUpload = (res) => {
		if (res?.income_verification) {
			toast.success("Document uploaded successfully!", {
				position: "bottom-left",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
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
	};
	//JSX part
	return (
		<div>
			<div>
				<p style={{ textAlign: "justify", fontSize:"0.938rem" }}>
					<span>
						To finalize our review, we need to verify the income that you have stated.
					</span>
					<li style={{ fontSize:"0.938rem"}}>
						Please upload your most recent, complete pay statement (dated inside
						of 30 days) or your most recent benefits statement from the current
						calendar year if you are retired or not employed.
					</li>
					if you need to upload multiple documents to verify your stated income,
					you will have the opportunity to upload additional documents from your
					My Account Page &gt; Loan Application after you complete the
					verification steps.
				</p>

				<p style={{ textAlign: "justify", fontSize:"0.938rem" }}>
					Acceptable ﬁle Formats are PDF, JPG, JPEG, GIF, 81 PNG (please note
					that we are unable to accept screenshots or photos of a computer
					screen).
				</p>

				<p style={{ textAlign: "justify", fontSize:"0.938rem" }}>
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
					<ButtonSecondary
						stylebutton='{"margin-right": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
						onClick={props.reset}
						id="button_stepper_reset"
					>
						Reset
					</ButtonSecondary>

					<ButtonPrimary
						variant="contained"
						color="primary"
						id="button_stepper_next"
						stylebutton='{"margin-right": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
						onClick={async () => {
							let data = {};
							props.setLoadingFlag(true);

							// API call
							let res = await APICall(
								"/verification/verification_steps_cac",
								data,
								"POST",
								true
							);

							//To check all the steps are completed or not
							if (
								res?.data?.data?.email === true &&
								res?.data?.data?.financial_information === true &&
								res?.data?.data?.id_document === true &&
								res?.data?.data?.id_questions === true &&
								res?.data?.data?.id_photo === true &&
								res?.data?.data?.bank_account_information === true &&
								res?.data?.data?.bank_account_verification === true &&
								res?.data?.data?.income_verification === true
							) {
								props.setLoadingFlag(false);
								history.push({
									pathname: "/customers/receiveYourMoney",
								});
							} else {
								props.setLoadingFlag(false);
								alert("please finish all the steps");
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
