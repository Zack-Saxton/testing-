import HSBar from "react-horizontal-stacked-bar-chart";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function LoadChart(props) {
	let maxMonthly, maxTotal;
	const currencyFormat = (val) => {
		if (val) {
			var formated = parseFloat(val);
			var currency = "$";
			return (
				currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
			);
		}
	};

	const toNumeric = (stringVal) => {
		const tempVal = stringVal.replace(/\$/g, "").replace(/,/g, "").replace(/ /g, "") || "";
		return parseFloat(tempVal);
	};
	let finArray = [];

	if (props?.offersToCompareChart?.length >= 2) {
		props.offersToCompareChart.forEach((x, i) => {
			var arr = {
				monthlyPaymentConverted: toNumeric(x.monthlyPayment),
				term: x.termNum,
				loanAmount: toNumeric(x.loanAmount),
				intrest: (toNumeric(x.loanAmount) / 100) * toNumeric(x.apr),
				total: toNumeric(x.loanAmount) + (toNumeric(x.loanAmount) / 100) * toNumeric(x.apr),
			};
			finArray.push(arr);
		});
		maxMonthly =
			finArray[0].monthlyPaymentConverted > finArray[1].monthlyPaymentConverted
				? finArray[0].monthlyPaymentConverted
				: finArray[1].monthlyPaymentConverted;
		maxTotal =
			finArray[0].total > finArray[1].total
				? finArray[0].total
				: finArray[1].total;
	}

	return (
		<div>
			{props.termData1 ? (
				<Table className={props.classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell width="20%" className={props.classes.tableHead}>
								Term
							</TableCell>
							<TableCell width="20%" className={props.classes.tableHead}>
								Monthly Payment
							</TableCell>
							<TableCell
								width="15%"
								className={props.classes.tableHead}
							></TableCell>
							<TableCell width="20%" className={props.classes.tableHead}>
								Loan Amount + Interest
							</TableCell>
							<TableCell
								width="25%"
								className={props.classes.tableHead}
							></TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{finArray.map((nam, ind) => (
							<TableRow hover key={nam.term + nam.loanAmount.toString()}>
								<TableCell className={props.classes.tableHead}>
									{nam.term} Mo
								</TableCell>
								<TableCell className={props.classes.tableHead}>
									<HSBar
										height={20}
										id="new_id"
										fontColor="rgb(50,20,100)"
										data={[
											{
												name: "Monthly payment",
												value: maxMonthly,
												color: "#FB6F53",
											},
											{
												name: "Difference",
												value: maxMonthly - nam.monthlyPaymentConverted,
												color: "#F3F3F3",
											},
										]}
									/>
								</TableCell>
								<TableCell>
									{currencyFormat(nam.monthlyPaymentConverted)}
								</TableCell>
								<TableCell className={props.classes.tableHead}>
									<HSBar
										height={20}
										id="new_id"
										fontColor="rgb(50,20,100)"
										data={[
											{
												name: "Loan Amount",
												value: nam.loanAmount,
												color: "#49CFAE",
											},
											{
												name: "Intrest",
												value: nam.intrest,
												color: "#FB6F53",
											},
											{
												name: "Difference",
												value: maxTotal - nam.total,
												color: "#F3F3F3",
											},
										]}
									/>
								</TableCell>
								<TableCell>
									{currencyFormat(nam.loanAmount) +
										"(" +
										currencyFormat(nam.intrest) +
										")"}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<div className="chartGrid">
					{props.offerFlag ? (
						<p></p>
					) : (
						<p>Please select any two offers to compare</p>
					)}
				</div>
			)}
		</div>
	);
}
