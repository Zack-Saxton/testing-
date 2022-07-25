import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { idVerificationAnswer } from '../../Controllers/MFAController';
import { AutoCompleteMultiple, ButtonPrimary, Radio } from "../../FormsUI"
import ScrollToTopOnMount from "../CheckMyOffers/ScrollToTop";
import Messages from "../../../assets/data/globalMessages.json"

//Component to load the questions
//To build the structure for load
const buildOptions = (options) => {
	let newArr = [];
	if (options) {
		options.map((question) => {AutoCompleteMultiple
			newArr.push({
				label: question?.text?.statement,
				value: question[ "choice-id" ],
			});
			return null;
		});
	}
	return JSON.stringify(newArr);
};

//Customer function to load the questions to view
export default function MultipleQuestion(props) {
	const [ questionArray, setQuestionArray ] = useState([]);
	const [ refresh, setRefresh ] = useState([]);
	let qarr = [];

	useEffect(() => {
		for (const x of props.responseData) {
			qarr[ x.questionId ] = "";
		}
		setQuestionArray(qarr);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleMultipleNextClick = async () => {
		props.setLoadingFlag(true);
		let allset = true;
		props.responseData.forEach(myFunction);
		if (allset) {
			let questionsArrayData = [];
			props.responseData.forEach((val) => {
				let tempArr = {};
				tempArr = {
					id: val.questionId,
					answer: questionArray[ val.questionId ],
				};
				questionsArrayData.push(tempArr);
			});
			let passData = {
				email:props.customerEmail,
				ref: props.transactionIdMultiple,
				answers: {
					question_set_id: props.questionSetIdMultiple,
					questions: questionsArrayData,
				},
			};

			let response = await idVerificationAnswer(passData);
			if (response?.data?.result === 'success') {
				props.setLoadingFlag(false);
				toast.success(Messages.Your_Identity_Verified_Successfully);
				props.navigate('/MFA-SelectSecurityQuestions', { state: { currentFlow: true, preVerification: true } })
			} else if(response?.data?.result === 'error') {
				props.setLoadingFlag(false);
				toast.error(response?.data?.Message);
				if(response?.data?.Message !== "Your account has been locked.  Please contact your branch for further assistance."){
					props.navigate("/MFA", {state: props?.mfaDetails});
				}
				else{
					props.navigate("/login");
				}
			} else {
				toast.error("Internal Server Error")
				props.navigate("/login");
			}
			props.setLoadingFlag(false);
		} else {
			toast.error("Please answer every question before continuing");
			props.setLoadingFlag(false);
		}
		function myFunction(value) {
			if (!questionArray[ value.questionId ]) {
				allset = false;
			}
		}
	};

	return (
		<>
		 <ScrollToTopOnMount />
			{props.responseData.map((question, index) => {
				return (
					<Grid key={index} item xs={12}>
						<Typography id="IdQuestionsTxt" data-testid={question.questionId} >{question?.question} *</Typography>
						<Radio
							id="radioSelectTxt"
							name="question"
							radiolabel={buildOptions(question.choice)}
							checked={questionArray[ question.questionId ]}
							onClick={(event) => {
								questionArray[ question.questionId ] = event;
								setRefresh(event);
							}}
							row={true}
							required={true}
							labelplacement={"end"}
							style={{ fontWeight: "normal" }}
						/>
						<br />
						<br />
					</Grid>
				);
			})}
			<Grid container>
				<p style={{ display: "none" }}>{refresh}</p>
				<ButtonPrimary
					variant="contained"
					color="primary"
					id="continue_button"
					onClick={handleMultipleNextClick}
					stylebutton='{"fontFamily":"" }'
				>
					Continue
				</ButtonPrimary>
			</Grid>
		</>
	);
}
MultipleQuestion.propTypes = {
	responseData: PropTypes.array,
	setLoadingFlag: PropTypes.func,
	transactionIdMultiple: PropTypes.string,
	questionSetIdMultiple: PropTypes.string,
	customerEmail: PropTypes.string,
	navigate: PropTypes.func,
	mfaDetails: PropTypes.object
};