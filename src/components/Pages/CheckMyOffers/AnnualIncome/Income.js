import React from 'react'
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((Theme) => ({
	listTitle: {
		marginTop: "1.56rem !important",
		marginBottom: "2rem !important",
	}
})
);
const Income = () => {
	const innerClasses = useStyles();
	return (
		<>
			<Typography variant='body2'>
				We consider your personal annual income, prior to taxes, when evaluating your application.
				Your income must be verifiable via pay stubs, tax forms or other records. Do not include income from
				your household.
			</Typography>
			<Typography variant='subtitle1' className={innerClasses.listTitle}>
				The Following are acceptable forms of income, as long as they are personal income and regularly recurring:
			</Typography>
			<Typography variant='subtitle1'>
				<ul>
					<li>Salary, bonuses and commisions</li>
					<li>Hourly wages including overtime</li>
					<li>Self-employment income</li>
					<li>Rental property income</li>
					<li>Trust, pension or social security income</li>
					<li>Public assistance income</li>
					<li>Other forms of regularly recurring income</li>
				</ul>
			</Typography>
			<Typography variant='subtitle1' className={innerClasses.listTitle}>
				Alimony, child support, or separate maintenance income need not be revealed if you do not
				wish to have it considered as a basis for repaying this loan.
			</Typography>
		</>
	)
}

export default Income