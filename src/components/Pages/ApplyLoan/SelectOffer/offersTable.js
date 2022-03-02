import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
	ButtonPrimary,
	ButtonSecondary, Checkbox,
	Radio
} from "../../../FormsUI";
import messages from "../../../lib/Lang/applyForLoan.json";
import LoadChart from "./loadChart";

function TabVerticalPanel(props) {
	const { children, tabValue, verticalIndex, ...other } = props;

	return (
		<div
			hidden={ tabValue !== verticalIndex }
			id={ `scrollable-auto-tab-panel-${ verticalIndex }` }
			aria-labelledby={ `scrollable-auto-tab-${ verticalIndex }` }
			{ ...other }
		>
			{ tabValue === verticalIndex && (
				<Box>
					<div>{ children }</div>
				</Box>
			) }
		</div>
	);
}

TabVerticalPanel.propTypes = {
	children: PropTypes.node,
	verticalIndex: PropTypes.any.isRequired,
	tabValue: PropTypes.any.isRequired,
};

const HtmlTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 500,
		fontSize: theme.typography.pxToRem(14),
		border: '1px solid #dadde9',
		fontFamily: "Muli, sans-serif"
	},
}))(Tooltip);

export default function OfferTable(props) {
	const [ termDataMax, setTermDataMax ] = useState();
	const [ selectData, setSelectData ] = useState([]);
	let offersComp = props.offersToCompare ? props.offersToCompare : [];
	let offersCompChart = props.offersToCompareChart
		? props.offersToCompareChart
		: [];
	// Shows the Brnach icon
	const branch = (
		<Grid container direction="row" alignItems="center">
			<AccountBalanceIcon /> In Branch
		</Grid>
	);

	//Shows the Online icon
	const online = (
		<Grid container direction="row" alignItems="center">
			<DesktopMacIcon /> Online
		</Grid>
	);

	const handleAdd = (selectedOffer) => {
		const newRecord = [ ...selectData ];
		newRecord.push(selectedOffer);
		setSelectData(newRecord);
	};
	// Select the offers to compare : will push the selected offer value into array
	const selectOfferToCompare = (row) => {
		offersComp = props.offersToCompare;
		if (offersComp.findIndex((offerInfo) => offerInfo._id === row._id) === -1) {
			offersComp.push(row);
		} else {
			offersComp.findIndex((offerInfo) => offerInfo._id === row._id) === -1
				? offersComp.push(row)
				: offersComp.splice(offersComp.indexOf(row), 1);
		}
		props.setOffersToCompare(offersComp);
		handleAdd(row);
	};
	const buildChartData = (chartData) => {
		if (chartData.length >= 2) {
			setTermDataMax(
				chartData[ 0 ]?.monthlyPayment > chartData[ 1 ]?.monthlyPayment
					? chartData[ 0 ]?.monthlyPayment
					: chartData[ 1 ].monthlyPayment
			);
		}
	};
	const selectOfferToCompareChart = (row) => {
		if (offersCompChart.indexOf(row) === -1) {
			if (offersCompChart.length < 2) {
				offersCompChart.push(row);
			} else {
				offersCompChart.shift();
				offersCompChart.push(row);
			}
			buildChartData(offersCompChart);
		} else {
			let index = offersCompChart.indexOf(row);
			if (index !== -1) {
				offersCompChart.splice(index, 1);
			}
			buildChartData(offersCompChart);
		}
		handleAdd(row);
	};
	return (
		<Grid id="loanListTable" item xs={ 12 } sm={ 9 } className={ props.loading ? props.classes.loadingOnWithoutBlur : props.classes.loadingOff } style={ { padding: "0px 0px 0px 15px", width: "100%" } }>
			<Paper className={ props.classes.paper }>
				{ props.rowData ? (
					<TabVerticalPanel tabValue={ props.value } verticalIndex={ props.value }>
						<Grid item xs={ 12 } style={ { paddingBottom: "10px", width: "100%" } }>
							<LoadChart
								termDataMax={ termDataMax }
								classes={ props.classes }
								offersToCompareChart={ props.offersToCompareChart }
								offersToCompare={ props.offersToCompare }
								offerFlag={ props.offerFlag }
							/>
						</Grid>
						<Grid item xs={ 12 } style={ { paddingBottom: "10px", width: "100%" } }>
							<TableContainer>
								<Table
									className={ props.classes.table }
									aria-label="simple table"
								>
									<TableHead>
										<TableRow>
											<TableCell width="8%" className={ props.classes.tableHead }>
												Select
											</TableCell>
											<TableCell
												className={ props.classes.tableHead }
												align="right"
											>
												Loan Amount
											</TableCell>
											<TableCell
												className={ props.classes.tableHead }
												align="left"
											>
												Availability
											</TableCell>
											<TableCell
												className={ props.classes.tableHead }
												align="left"
											>
												<Grid container direction="row" alignItems="center">
													{ " " }
													APR &nbsp;
													<HtmlTooltip
														title={
															<>
																<Typography color="inherit">What Is An APR?</Typography>
																<p>APR stands for { "annual percentage rate" } and represents the effective annual cost of a loan, including both the interest rate and origination fee.</p>
															</>
														}
													>
														<InfoOutlinedIcon
															style={ {
																fontSize: "small",
																color: "blue",
															} }
														/>
													</HtmlTooltip>
												</Grid>
											</TableCell>
											{ props.offerFlag === false ? (
												<TableCell
													className={ props.classes.tableHead }
													align="right"
												>
													Term
												</TableCell>
											) : null }
											<TableCell
												className={ props.classes.tableHead }
												align="right"
											>
												Monthly Payment
											</TableCell>
											<TableCell
												className={ props.classes.tableHead }
												align="left"
											>
												Compare
												{/* {props.offerFlag === true ? "Compare" : "Term"} */ }
											</TableCell>
										</TableRow>
									</TableHead>

									{ props.rowData ? (
										<TableBody>
											{ props.rowData.map((row, ind) => (
												<TableRow key={ ind }>
													<TableCell
														component="th"
														className={ props.classes.tableHeadRow }
														scope="row"
													>
														<Radio
															name="select"
															radiolabel={ '[{ "value":"' + row._id + '"}]' }
															checked={ props.checkedValue }
															value={ row._id }
															onClick={ () => {
																props.setCheckedValue(row._id);
																props.setSelectedIndex(ind);
																props.setSelectedTerm(row.termNum);
															} }
														/>
													</TableCell>
													<TableCell
														className={ props.classes.tableHeadRow }
														align="right"
													>
														{ row.loanAmount }
													</TableCell>
													<TableCell
														className={ props.classes.tableHeadRow }
														align="left"
													>
														{ row.availability === "online" ? online : branch }
													</TableCell>
													<TableCell
														className={ props.classes.tableHeadRow }
														align="left"
													>
														{ row.apr + "%" }
													</TableCell>

													{ props.offerFlag === false ? (
														<TableCell
															className={ props.classes.tableHeadRow }
															align="right"
														>
															{ row.termNum + "Mo" }
														</TableCell>
													) : null }

													<TableCell
														className={ props.classes.tableHeadRow }
														align="right"
													>
														{ row.monthlyPayment }
													</TableCell>
													<TableCell
														className={ props.classes.tableHeadRow }
														align="left"
													>
														{ props.offerFlag === true ? (
															<Checkbox
																name="offerToCompare"
																label="Add"
																labelid="offerToCompare"
																testid="checkbox"
																value={ row._id }
																checked={
																	props.offersToCompare.findIndex(
																		(x) => x._id === row._id
																	) === -1
																		? false
																		: true
																}
																onChange={ () => {
																	selectOfferToCompare(row);
																} }
																stylelabelform='{ "color":"" }'
																stylecheckbox='{ "color":"" }'
																stylecheckboxlabel='{ "color":"" }'
															/>
														) : (
															<Checkbox
																name="chartData"
																label="Add"
																labelid="chartData"
																testid="checkbox"
																value={ row._id }
																checked={
																	props.offersToCompareChart.indexOf(row) === -1
																		? false
																		: true
																}
																onChange={ () => {
																	selectOfferToCompareChart(row);
																} }
																stylelabelform='{ "color":"" }'
																stylecheckbox='{ "color":"" }'
																stylecheckboxlabel='{ "color":"" }'
															/>
														) }
													</TableCell>
												</TableRow>
											)) }
										</TableBody>
									) : (
										<Typography>{ messages.selectAmount.noOffersAvailable } </Typography>
									) }
								</Table>
							</TableContainer>
						</Grid>
						<Grid container direction="row">
							<Grid
								className="circleprog"
								style={ {
									display: props.loading ? "block" : "none",
									width: "100%",
									textAlign: "center",
								} }
							>
								<CircularProgress />
							</Grid>
						</Grid>
						<Grid style={ { padding: "10px 0px" } } container direction="row">
							<Grid
								style={ { float: "left" } }
							>
								<ButtonSecondary
									stylebutton='{"marginRight": "","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
									styleicon='{ "color":"" }'
									id="apply-loan-reset-button"
									onClick={ () => {
										props.setCheckedValue("");
										props.setSelectedTerm("");
										props.setSelectedIndex("");
										props.setOffersToCompareChart([]);
										props.setOffersToCompare([]);
									} }
									{ ...props.tabVerticalProps(0) }
								>
									Reset
								</ButtonSecondary>
							</Grid>

							<Grid
								style={ { float: "left" } }
								id="apply-loan-continue-button-grid"
							>
								<ButtonPrimary
									stylebutton='{"marginLeft": "10px" ,"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
									id="apply-loan-continue-button"
									onClick={ () => {
										props.submitSelectedOffer(
											props.selectedTerm,
											props.selectedIndex
										);
									} }
									disabled={
										props.selectedTerm &&
											(props.selectedIndex || props.selectedIndex === 0)
											? props.loading
											: true
									}
								>
									Continue
									<i
										className="fa fa-refresh fa-spin customSpinner"
										style={ {
											marginRight: "10px",
											display: props.loading ? "block" : "none",
										} }
									/>
								</ButtonPrimary>
							</Grid>

							<Grid
								style={ {
									float: "right",
									justifyContent: "end",
									display: props.offerFlag ? "block" : "none",
								} }
								id="apply-loan-comparison-button-grid"
							>
								<ButtonSecondary
									fullWidth={ true }
									stylebutton='{"background": "", "float":"right"  }'
									styleicon='{ "color":"" }'
									id="apply-loan-comparison-button"
									onClick={ () => {
										props.onCompareOfferTabClick();
										props.handleTabChange(props.noOfTerms, props.noOfTerms);
										window.scrollTo(0, 0);
									} }
									{ ...props.tabVerticalProps(4) }
								>
									View Comparison
								</ButtonSecondary>
							</Grid>
						</Grid>
					</TabVerticalPanel>
				) : (
					<Grid
						className="circleprog"
						style={ { width: "100%", textAlign: "center" } }
					>
						<CircularProgress />
					</Grid>
				) }
			</Paper>
		</Grid>
	);
}

OfferTable.propTypes = {
	offersToCompare : PropTypes.array,
	setOffersToCompare : PropTypes.func,
	classes : PropTypes.object,
	loading : PropTypes.bool,
	offersToCompareChart : PropTypes.array,
	rowData : PropTypes.array,
	value : PropTypes.number,
	offerFlag : PropTypes.bool,
	checkedValue : PropTypes.string,
	setCheckedValue : PropTypes.func,
	setSelectedIndex : PropTypes.func,
	setSelectedTerm : PropTypes.func,
	selectedTerm : PropTypes.string,
	selectedIndex : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
	setOffersToCompareChart : PropTypes.func,
	tabVerticalProps : PropTypes.func,
	noOfTerms : PropTypes.number,
	handleTabChange : PropTypes.func,
	submitSelectedOffer : PropTypes.func,
	onCompareOfferTabClick : PropTypes.func
  };
  
