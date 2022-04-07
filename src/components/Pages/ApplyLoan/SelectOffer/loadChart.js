import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import React from "react";
import HSBar from "react-horizontal-stacked-bar-chart";
import messages from "../../../lib/Lang/applyForLoan.json";

export default function LoadChart(props) {
	let maxMonthly;
	const currencyFormat = (currencyValue) => {
		if (currencyValue) {
			let formated = parseFloat(currencyValue);
			let currency = "$";
			return (
				currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
			);
		}
	};

	const toNumeric = (stringValue) => {
		return parseFloat(stringValue.replace(/\$/g, "").replace(/,/g, "").replace(/ /g, "") || "");
	};
	let finArray = [];

	if (props?.offersToCompareChart?.length >= 2 && props?.offersToCompareChart[ 0 ] && props?.offersToCompareChart[ 1 ]) {
		props.offersToCompareChart.forEach((offer) => {
			finArray.push({
				monthlyPaymentConverted: toNumeric(offer.monthlyPayment),
				term: offer.termNum,
				loanAmount: toNumeric(offer.loanAmount),
				intrest: (toNumeric(offer.loanAmount) / 100) * toNumeric(offer.apr),
				total: toNumeric(offer.loanAmount) + (toNumeric(offer.loanAmount) / 100) * toNumeric(offer.apr),
			});
		});
		maxMonthly =
			finArray[ 0 ].monthlyPaymentConverted > finArray[ 1 ].monthlyPaymentConverted
				? finArray[ 0 ].monthlyPaymentConverted
				: finArray[ 1 ].monthlyPaymentConverted;
	}

	return (
		<div>
			{ finArray?.length >= 2 ? (
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell width="15%" className={ props.classes.tableHead }>
								Term
							</TableCell>
							<TableCell width="65%" className={ props.classes.tableHead }>
								Monthly Payment
							</TableCell>
							<TableCell
								width="20%"
								className={ props.classes.tableHead }
							></TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{ finArray.map((compareOffer, ind) => (
							<TableRow hover key={ compareOffer.term + compareOffer.loanAmount.toString() }>
								<TableCell className={ props.classes.tableHead }>
									{ compareOffer.term } Mo
								</TableCell>
								<TableCell className={ props.classes.tableHead }>
									<HSBar
										height={ 20 }
										id="new_id"
										fontColor="rgb(50,20,100)"
										data={ [
											{
												name: "Monthly payment",
												value: maxMonthly,
												color: "#FB6F53",
											},
											{
												name: "Difference",
												value: maxMonthly - compareOffer.monthlyPaymentConverted,
												color: "#49CFAE",
											},
										] }
									/>
								</TableCell>
								<TableCell>
									{ currencyFormat(compareOffer.monthlyPaymentConverted) }
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			) : (
				<div className="chartGrid">
					{ props.offerFlag ? (
						null
					) : (
						<p>{ messages.selectAmount.selectTwoToCompare }</p>
					) }
				</div>
			) }
		</div>
	);
}

LoadChart.propTypes = {
	offersToCompareChart: PropTypes.array,
	classes: PropTypes.object,
	offerFlag: PropTypes.bool
};
