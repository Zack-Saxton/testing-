import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AutoExpenseIcon from "../../../../assets/icon/AutoExpense-Repair.png";
import DeptIcon from "../../../../assets/icon/Debt-Consolidation.png";
import HolidayIcon from "../../../../assets/icon/Holiday-Spending.png";
import HomeImprovementIcon from "../../../../assets/icon/Home-Improvement.png";
import LifeEventIcon from "../../../../assets/icon/Life-Event.png";
import MajorPurchaseIcon from "../../../../assets/icon/Major-Purchase.png";
import MedicalIcon from "../../../../assets/icon/Medical-Dental.png";
import UnexpectedExpenseIcon from "../../../../assets/icon/Unexpected-Expenses.png";
import VacationIcon from "../../../../assets/icon/Vacation.png";
import AutoExpenseIconWhite from "../../../../assets/icon/white/AutoExpense-Repair.png";
import DeptIconWhite from "../../../../assets/icon/white/Debt-Consolidation.png";
import HolidayIconWhite from "../../../../assets/icon/white/Holiday-Spending.png";
import HomeImprovementIconWhite from "../../../../assets/icon/white/Home-Improvement.png";
import LifeEventIconWhite from "../../../../assets/icon/white/Life-Event.png";
import MajorPurchaseIconWhite from "../../../../assets/icon/white/Major-Purchase.png";
import MedicalIconWhite from "../../../../assets/icon/white/Medical-Dental.png";
import UnexpectedExpenseIconWhite from "../../../../assets/icon/white/Unexpected-Expenses.png";
import VacationIconWhite from "../../../../assets/icon/white/Vacation.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary } from "../../../FormsUI";
import ScrollToTopOnMount from "../ScrollToTop";
import { loanPurposeData } from "../../../../assets/data/constants"
import "./LoanPurpose.css";

//Loan purpose component initialization
function LoanPurpose(props) {
	const { data } = useContext(CheckMyOffers);
	const [ purpose, setPurpose ] = useState(data.loanPurpose ?? "");
	const history = useHistory();

	//handle the user data nd store it into context and procced next step
	const handleRoute = () => {
		data.loanPurpose = purpose;
		data.completedPage = data.completedPage > data.page.loanPurpose ? data.completedPage : data.page.loanPurpose;
		history.push("/citizenship-status");
	};

	//  validate and procceeds to next step
	const goNext = (val) => {
		data.loanPurpose = val;
		setPurpose(val);
		if (data.completedPage < data.page.loanPurpose) {
			data.completedPage = data.completedPage > data.page.loanPurpose ? data.completedPage : data.page.loanPurpose;
			history.push("/citizenship-status");
		}
	};

	//styling
	const useStyles = makeStyles((Theme) =>
		createStyles({
			root: {},
			paper: {
				padding: Theme.spacing(2),
				height: "100%",
				textAlign: "center",
				color: Theme.palette.text.secondary,
				boxSizing: "border-box",
			},
			gridItem: {
				boxSizing: "border-box",
				padding: Theme.spacing(1),
			},
			masonryItemFirst: {
				boxSizing: "border-box",
				padding: `${ Theme.spacing(1) }px ${ Theme.spacing(1) }px ${ Theme.spacing(1) }px ${ Theme.spacing(1) }px`,
				[ Theme.breakpoints.up("lg") ]: {
					padding: `${ Theme.spacing(1) }px ${ Theme.spacing(1) }px ${ Theme.spacing(1) }px ${ Theme.spacing(1) }px`,
				},
				[ Theme.breakpoints.down("sm") ]: {
					padding: `${ Theme.spacing(1) }px ${ Theme.spacing(1) }px ${ Theme.spacing(1) }px ${ Theme.spacing(1) }px`,
				},
			},
		})
	);
	const classes = useStyles();

	//redirect to select offers if directly called
	if (data.completedPage < data.page.selectAmount || data.formStatus === "completed") {
		history.push("/select-amount");
	}

	//view part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid
						container
						item
						xs={ 12 }
						justifyContent="center"
						alignItems="center"
						style={ { padding: "4% 0%" } }
					>
						<Grid
							container
							item
							xs={ 11 }
							sm={ 10 }
							md={ 6 }
							lg={ 6 }
							xl={ 6 }
							className="cardWrapper"
							justifyContent="center"
							alignItems="center"
						>
							<Paper
								className="cardWOPadding"
								justify="center"
								alignitems="center"
								id="loanPurposeWrap"
							>
								<div className="progress mt-0">
									<div id="determinate" className="det1 determinate slantDiv" />
									<span className="floatLeft detNum1">8%</span>
								</div>
								<Grid className="floatLeft">
									<Link
										to={ {
											pathname: "/select-amount",
											fromLoanPurpose: "yes",
										} }
									>
										<i className="material-icons dp48 yellowText ">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Typography variant="h5" align="center" className="borrowCSSLP checkMyOfferText">
									How are you planning to use the money?
								</Typography>
								<Grid
									className="blockDiv"
									container
									justifyContent="center"
									alignItems="stretch"
								>
									<Grid
										item
										lg={ 4 }
										md={ 4 }
										xs={ 6 }
										className={ `${ classes.masonryItemFirst }` }
									>
										<Paper
											data-testid="home"
											elevation={ 3 }
											className={
												purpose === loanPurposeData.homeImprovement
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={ () => {
												goNext(loanPurposeData.homeImprovement);
											} }
										>
											<img
												src={
													purpose === loanPurposeData.homeImprovement
														? HomeImprovementIconWhite
														: HomeImprovementIcon
												}
												className="icon"
												alt={loanPurposeData.homeImprovement}
											/>
											<Typography
												id="purposeTxt01"
												align="center"
												className={
													purpose === loanPurposeData.homeImprovement
														? "borrowCSS textCSS whiteText"
														: "borrowCSS textCSS"
												}
											>
												Home Improvement
											</Typography>
										</Paper>
									</Grid>
									<Grid
										item
										lg={ 4 }
										md={ 4 }
										xs={ 6 }
										className={ `${ classes.masonryItemFirst }` }
									>
										<Paper
											data-testid="autoExpense"
											elevation={ 3 }
											className={
												purpose === loanPurposeData.autoExpence
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={ () => {
												goNext(loanPurposeData.autoExpence);
											} }
										>
											<img
												alt={loanPurposeData.autoExpence}
												src={
													purpose === loanPurposeData.autoExpence
														? AutoExpenseIconWhite
														: AutoExpenseIcon
												}
												className="icon"
											/>
											<Typography
												id="purposeTxt02"
												align="center"
												className={
													purpose === loanPurposeData.autoExpence
														? "borrowCSS textCSS whiteText"
														: "borrowCSS textCSS"
												}
											>
												Auto Expense / Repair
											</Typography>
										</Paper>
									</Grid>
									<Grid
										item
										lg={ 4 }
										md={ 4 }
										xs={ 6 }
										className={ `${ classes.masonryItemFirst }` }
									>
										<Paper
											data-testid="vacation"
											elevation={ 3 }
											className={
												purpose === loanPurposeData.vacation
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={ () => {
												goNext(loanPurposeData.vacation);
											} }
										>
											<img
												alt={loanPurposeData.vacation}
												src={
													purpose === loanPurposeData.vacation
														? VacationIconWhite
														: VacationIcon
												}
												className="icon"
											/>
											<Typography
												id="purposeTxt03"
												align="center"
												className={
													purpose === loanPurposeData.vacation
														? "borrowCSS textCSS whiteText"
														: "borrowCSS textCSS"
												}
											>
												Vacation
											</Typography>
										</Paper>
									</Grid>
									<Grid
										item
										lg={ 4 }
										md={ 4 }
										xs={ 6 }
										className={ `${ classes.masonryItemFirst }` }
									>
										<Paper
											data-testid="holiday"
											elevation={ 3 }
											className={
												purpose === loanPurposeData.holidaySpending
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={ () => {
												goNext(loanPurposeData.holidaySpending);
											} }
										>
											<img
												alt={loanPurposeData.holidaySpending}
												src={
													purpose === loanPurposeData.holidaySpending
														? HolidayIconWhite
														: HolidayIcon
												}
												className="icon"
											/>
											<Typography
												id="purposeTxt04"
												align="center"
												className={
													purpose === loanPurposeData.holidaySpending
														? "borrowCSS textCSS whiteText"
														: "borrowCSS textCSS"
												}
											>
												Holiday Spending
											</Typography>
										</Paper>
									</Grid>
									<Grid
										item
										lg={ 4 }
										md={ 4 }
										xs={ 6 }
										className={ `${ classes.masonryItemFirst }` }
									>
										<Paper
											data-testid="medical"
											elevation={ 3 }
											className={
												purpose === loanPurposeData.medicalDental
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={ () => {
												goNext(loanPurposeData.medicalDental);
											} }
										>
											<img
												alt={loanPurposeData.medicalDental}
												src={
													purpose === loanPurposeData.medicalDental
														? MedicalIconWhite
														: MedicalIcon
												}
												className="icon"
											/>
											<Typography
												id="purposeTxt05"
												align="center"
												className={
													purpose === loanPurposeData.medicalDental
														? "borrowCSS textCSS whiteText"
														: "borrowCSS textCSS"
												}
											>
												Medical / Dental
											</Typography>
										</Paper>
									</Grid>
									<Grid
										item
										lg={ 4 }
										md={ 4 }
										xs={ 6 }
										className={ `${ classes.masonryItemFirst }` }
									>
										<Paper
											data-testid="deptConsolidation"
											elevation={ 3 }
											className={
												purpose === loanPurposeData.debtConsolidation
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={ () => {
												goNext(loanPurposeData.debtConsolidation);
											} }
										>
											<img
												alt={loanPurposeData.debtConsolidation}
												src={
													purpose === loanPurposeData.debtConsolidation
														? DeptIconWhite
														: DeptIcon
												}
												className="icon"
											/>
											<Typography
												id="purposeTxt06"
												align="center"
												className={
													purpose === loanPurposeData.debtConsolidation
														? "borrowCSS textCSS whiteText"
														: "borrowCSS textCSS"
												}
											>
												Debt Consolidation
											</Typography>
										</Paper>
									</Grid>
									<Grid
										item
										lg={ 4 }
										md={ 4 }
										xs={ 6 }
										className={ `${ classes.masonryItemFirst }` }
									>
										<Paper
											data-testid="lifeEvent"
											elevation={ 3 }
											className={
												purpose === loanPurposeData.lifeEvents
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={ () => {
												goNext(loanPurposeData.lifeEvents);
											} }
										>
											<img
												alt={loanPurposeData.lifeEvents}
												src={
													purpose === loanPurposeData.lifeEvents
														? LifeEventIconWhite
														: LifeEventIcon
												}
												className="icon"
											/>
											<Typography
												id="purposeTxt07"
												align="center"
												className={
													purpose === loanPurposeData.lifeEvents
														? "borrowCSS textCSS whiteText"
														: "borrowCSS textCSS"
												}
											>
												Life Event <span>(wedding, graduation, etc)</span>
											</Typography>
										</Paper>
									</Grid>
									<Grid
										item
										lg={ 4 }
										md={ 4 }
										xs={ 6 }
										className={ `${ classes.masonryItemFirst }` }
									>
										<Paper
											data-testid="unexpectedBills"
											elevation={ 3 }
											className={
												purpose === loanPurposeData.unexpectedExpence
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={ () => {
												goNext(loanPurposeData.unexpectedExpence);
											} }
										>
											<img
												alt={loanPurposeData.unexpectedExpence}
												src={
													purpose === loanPurposeData.unexpectedExpence
														? UnexpectedExpenseIconWhite
														: UnexpectedExpenseIcon
												}
												className="icon"
											/>
											<Typography
												id="purposeTxt08"
												align="center"
												className={
													purpose === loanPurposeData.unexpectedExpence
														? "borrowCSS textCSS whiteText"
														: "borrowCSS textCSS"
												}
											>
												Unexpected Bills / Expenses
											</Typography>
										</Paper>
									</Grid>
									<Grid
										item
										lg={ 4 }
										md={ 4 }
										xs={ 6 }
										className={ `${ classes.masonryItemFirst }` }
									>
										<Paper
											data-testid="majorPurchase"
											elevation={ 3 }
											className={
												purpose === loanPurposeData.majorPruchase
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={ () => {
												goNext(loanPurposeData.majorPruchase);
											} }
										>
											<img
												alt={loanPurposeData.majorPruchase}
												src={
													purpose === loanPurposeData.majorPruchase
														? MajorPurchaseIconWhite
														: MajorPurchaseIcon
												}
												className="icon"
											/>
											<Typography
												id="purposeTxt10"
												align="center"
												className={
													purpose === loanPurposeData.majorPruchase
														? "borrowCSS textCSS whiteText"
														: "borrowCSS textCSS"
												}
											>
												Major Purchase
											</Typography>
										</Paper>
									</Grid>
									<Grid
										item
										lg={ 12 }
										md={ 12 }
										xs={ 12 }
										className={ `${ classes.masonryItemFirst }` }
										style={ { paddingTop: "7px", paddingBottom: "15px" } }
									>
										<Paper
											data-testid="others"
											elevation={ 3 }
											className={
												purpose === loanPurposeData.other
													? "activeCard othersBlock "
													: "othersBlock "
											}
											onClick={ () => {
												goNext(loanPurposeData.other);
											} }
										>
											<Typography
												id="otherText"
												align="center"
												className={
													purpose === loanPurposeData.other ? "textCSS whiteText" : "textCSS"
												}
											>
												Other
											</Typography>
										</Paper>
									</Grid>
									<Grid
										item
										className="ContinueButton"
										lg={ 9 }
										md={ 9 }
										sm={ 12 }
										xs={ 12 }
										style={ { margin: "15px 0px" } }
									>
										<ButtonPrimary
											data-testid="contButton"
											onClick={ handleRoute }
											disabled={ purpose === "" }
											stylebutton='{"background": "#FFBC23","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
										>
											Continue
										</ButtonPrimary>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</div>
		</div>
	);
}

export default LoanPurpose;
