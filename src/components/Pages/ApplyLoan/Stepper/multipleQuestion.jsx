import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from "react";
import { Radio, ButtonPrimary } from "../../../FormsUI";
import { toast } from "react-toastify";
import { idVerificationAnswer } from "../../../Controllers/ApplyForLoanController";

//Component to load the questions
//To build the structure for load
const buildOptions = (options) => {
	let newArr = [];
	if (options) {
		options.map((question) => {
			newArr.push({
				label: question?.text?.statement,
				value: question["choice-id"],
			});
			return null;
		});
	}
	return JSON.stringify(newArr);
};

//Customer function to load the questions to view
export default function MultipleQuestion(props) {
	const [questionArray, setQuestionArray] = useState([]);
	const [refresh, setRefresh] = useState([]);
	let qarr = [];

	useEffect(() => {
		for (const x of props.responseData) {
			qarr[x.questionId] = "";
		}
		setQuestionArray(qarr);
	}, []);

	const handleMultipleNextClick = async () => {
		props.setLoadingFlag(true);
		let allset = true;
		props.responseData.forEach(myFunction);
		if (allset === true) {
			let questionsArrayData = [];
			props.responseData.forEach((val, ind) => {
				let tempArr = {};
				tempArr = {
					id: val.questionId,
					answer: questionArray[val.questionId],
				};
				questionsArrayData.push(tempArr);
			});
			let passData = {
				ref: props.transactionIdMultiple,
				answers: {
					question_set_id: props.questionSetIdMultiple,
					questions: questionsArrayData,
				},
			};

			let result = await idVerificationAnswer(passData);
			if (result?.data?.id_questions === true) {
				props.setLoadingFlag(false);
				props.next();
			} else {
				toast.error("Verification unsuccessful, please try again.", {
					position: "bottom-left",
					autoClose: 5500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				props.setLoadingFlag(false);
			}
			props.setLoadingFlag(false);
		} else {
			toast.error("Please answer every question before continuing.", {
				position: "bottom-left",
				autoClose: 5500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			props.setLoadingFlag(false);
		}
		function myFunction(value, index, array) {
			if (
				!questionArray[value.questionId] ||
				questionArray[value.questionId] === ""
			) {
				allset = false;
			}
		}
	};

	return (
		<>
			{props.responseData.map((question, index) => {
				return (
					<Grid key={index} item xs={12}>
						<Typography id="IdQuestionsTxt">{question?.question}</Typography>
						<Radio
							id="radioSelectTxt"
							name="question"
							radiolabel={buildOptions(question.choice)}
							checked={questionArray[question.questionId]}
							onClick={(event) => {
								questionArray[question.questionId] = event;
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
					id="button_stepper_next"
					onClick={handleMultipleNextClick}
					stylebutton='{"marginRight": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
				>
					Continue
				</ButtonPrimary>
			</Grid>
		</>
	);
}
