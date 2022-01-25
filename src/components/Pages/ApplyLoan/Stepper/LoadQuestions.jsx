import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Radio } from "../../../FormsUI";

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
export default function LoadQuestions(props) {
	return (
		<>
			{props.responseData.map((question, index) => {
				return (
					<Grid key={index} item xs={12}>
						<Typography>{question?.question}</Typography>
						<Radio
							name="question"
							radiolabel={buildOptions(question.choice)}
							checked={props.check}
							onClick={(event) => {
								props.setCheck(event);
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
			<Grid container></Grid>
		</>
	);
}
