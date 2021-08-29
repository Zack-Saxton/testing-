import React, { useState, useContext } from "react";
import "./loadPurpose.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ButtonPrimary } from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import HomeImprovenentIcon from "../../../../assets/icon/Home-Improvement.png";
import HomeImprovenentIconWhite from "../../../../assets/icon/white/Home-Improvement.png";
import AutoExpenceIcon from "../../../../assets/icon/AutoExpense-Repair.png";
import VacationIcon from "../../../../assets/icon/Vacation.png";
import HolidayIcon from "../../../../assets/icon/Holiday-Spending.png";
import MedicalIcon from "../../../../assets/icon/Medical-Dental.png";
import DeptIcon from "../../../../assets/icon/Debt-Consolidation.png";
import LifeEventIcon from "../../../../assets/icon/Life-Event.png";
import UnexpectedExpenceIcon from "../../../../assets/icon/Unexpected-Expenses.png";
import MajorPurchaseIcon from "../../../../assets/icon/Major-Purchase.png";
import AutoExpenceIconWhite from "../../../../assets/icon/white/AutoExpense-Repair.png";
import VacationIconWhite from "../../../../assets/icon/white/Vacation.png";
import HolidayIconWhite from "../../../../assets/icon/white/Holiday-Spending.png";
import MedicalIconWhite from "../../../../assets/icon/white/Medical-Dental.png";
import DeptIconWhite from "../../../../assets/icon/white/Debt-Consolidation.png";
import LifeEventIconWhite from "../../../../assets/icon/white/Life-Event.png";
import UnexpectedExpenceIconWhite from "../../../../assets/icon/white/Unexpected-Expenses.png";
import MajorPurchaseIconWhite from "../../../../assets/icon/white/Major-Purchase.png";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import ScrollToTopOnMount from '../scrollToTop';
import { GridApiContext } from "@material-ui/data-grid";

function LoanPurpose(props) {
	console.log(props);
	const { data } = useContext(CheckMyOffers);
	const [purpose, setPurpose] = useState(data.loanPurpose ?? "");
	const history = useHistory();

	const handleRoute = () => {
		data.loanPurpose = purpose;
		data.completedPage = data.completedPage > data.page.loanPurpose ? data.completedPage :  data.page.loanPurpose;
		history.push("/citizenship-status");
	};

	const goNext = (val) => {
		data.loanPurpose = val;
		setPurpose(val);
		if(data.completedPage < data.page.loanPurpose)
		{
			
			data.completedPage = data.completedPage > data.page.loanPurpose ? data.completedPage :  data.page.loanPurpose;
			history.push("/citizenship-status");
		}
		
	};
    	const useStyles = makeStyles((Theme) =>
		createStyles({
			root: {},
			paper: {
				padding: Theme.spacing(2),
				height: "100%",
				textAlign: "center",
				color: Theme.palette.text.secondary,
				boxSizing: "border-box",
				// border: "1px solid #134ba2 !important"
			},
			gridItem: {
				boxSizing: "border-box",
				padding: Theme.spacing(1),
			},
			masonryItemFirst: {
				boxSizing: "border-box",
				padding: `${Theme.spacing(1)}px ${Theme.spacing(1)}px ${Theme.spacing(
					1
				)}px ${Theme.spacing(1)}px`,
				[Theme.breakpoints.up("lg")]: {
					padding: `${Theme.spacing(1)}px ${Theme.spacing(1)}px ${Theme.spacing(
						1
					)}px ${Theme.spacing(1)}px`,
				},
				[Theme.breakpoints.down("sm")]: {
					padding: `${Theme.spacing(1)}px ${Theme.spacing(1)}px ${Theme.spacing(
						1
					)}px ${Theme.spacing(1)}px`,
				},
			},
		})
	);
	const classes = useStyles();
	console.log(data); 
	if (data.completedPage < data.page.selectAmount || data.formStatus === 'completed' ){
		history.push("/select-amount");
	}
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid xs={12} container justify="center" alignItems="center">
						<Grid
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6}
							className="cardWrapper"
							justify="center"
							alignItems="center"
						>
							<Paper
								className="cardWOPadding"
								justify="center"
								alignItems="center"
							>
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det1 determinate slantDiv"
									></div>
									<span class="floatLeft detNum1">8%</span>
								</div>
								<Grid class="floatLeft">
									<Link to={{
										pathname: '/select-amount',
										fromLoanPurpose: "yes"
										}}>
										
										<i class="material-icons dp48 yellowText ">arrow_back</i>
									</Link>
								</Grid>
								<Typography variant="h5" align="center" className="borrowCSSLP">
									How are you planning to use the money?
								</Typography>
								<Grid
									className="blockDiv"
									container
									justify="center"
									alignItems="stretch"
								>
									<Grid
										item
										lg={4}
										md={4}
										xs={6}
										className={`${classes.masonryItemFirst}`}
									>
										<Paper
											data-testid="home"
											elevation={3}
											className={
												purpose === "Home Improvement"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												goNext("Home Improvement");
											}}
										>
											<img
												src={
													purpose === "Home Improvement"
														? HomeImprovenentIconWhite
														: HomeImprovenentIcon
												}
												className="icon"
												alt="Home improvement"
											/>
											<Typography
												align="center"
												className={
													purpose === "Home Improvement"
														? "borrowCSS textCSS whiteText"
														: "borrowCSS textCSS"
												}
											>
												Home improvement
											</Typography>
										</Paper>
									</Grid>
									<Grid
										item
										lg={4}
										md={4}
										xs={6}
										className={`${classes.masonryItemFirst}`}
									>
										<Paper
											data-testid="autoExpense"
											elevation={3}
											className={
												purpose === "Auto Expense/Repair"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												goNext("Auto Expense/Repair");
											}}
										>
											<img
												alt="Auto Expense/Repair"
												src={
													purpose === "Auto Expense/Repair"
														? AutoExpenceIconWhite
														: AutoExpenceIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "Auto Expense/Repair"
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
										lg={4}
										md={4}
										xs={6}
										className={`${classes.masonryItemFirst}`}
									>
										<Paper
											data-testid="vacation"
											elevation={3}
											className={
												purpose === "Vacation"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												goNext("Vacation");
											}}
										>
											<img
												alt="Vacation"
												src={
													purpose === "Vacation"
														? VacationIconWhite
														: VacationIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "Vacation"
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
										lg={4}
										md={4}
										xs={6}
										className={`${classes.masonryItemFirst}`}
									>
										<Paper
											data-testid="holiday"
											elevation={3}
											className={
												purpose === "Holiday Spending"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												goNext("Holiday Spending");
											}}
										>
											<img
												alt="Holiday Spending"
												src={
													purpose === "Holiday Spending"
														? HolidayIconWhite
														: HolidayIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "Holiday Spending"
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
										lg={4}
										md={4}
										xs={6}
										className={`${classes.masonryItemFirst}`}
									>
										<Paper
											data-testid="medical"
											elevation={3}
											className={
												purpose === "Medical/Dental"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												goNext("Medical/Dental");
											}}
										>
											<img
												alt="Medical/Dental"
												src={
													purpose === "Medical/Dental" ? MedicalIconWhite : MedicalIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "Medical/Dental"
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
										lg={4}
										md={4}
										xs={6}
										className={`${classes.masonryItemFirst}`}
									>
										<Paper
											data-testid="deptConsolidation"
											elevation={3}
											className={
												purpose === "Debt Consolidation"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												goNext("Debt Consolidation");
											}}
										>
											<img
												alt="Debt Consolidation"
												src={
													purpose === "Debt Consolidation"
														? DeptIconWhite
														: DeptIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "Debt Consolidation"
														? "borrowCSS textCSS whiteText"
														: "borrowCSS textCSS"
												}
											>
												Dept Consolidation
											</Typography>
										</Paper>
									</Grid>
									<Grid
										item
										lg={4}
										md={4}
										xs={6}
										className={`${classes.masonryItemFirst}`}
									>
										<Paper
											data-testid="lifeEvent"
											elevation={3}
											className={
												purpose === "Life Event (Wedding, Graduation, etc)"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												goNext("Life Event (Wedding, Graduation, etc)");
											}}
										>
											<img
												alt="Life Event (Wedding, Graduation, etc)"
												src={
													purpose === "Life Event (Wedding, Graduation, etc)"
														? LifeEventIconWhite
														: LifeEventIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "Life Event (Wedding, Graduation, etc)"
														? "borrowCSS textCSS whiteText"
														: "borrowCSS textCSS"
												}
											>
												Life Event (wedding, graduation, etc)
											</Typography>
										</Paper>
									</Grid>
									<Grid
										item
										lg={4}
										md={4}
										xs={6}
										className={`${classes.masonryItemFirst}`}
									>
										<Paper
											data-testid="unexpectedBills"
											elevation={3}
											className={
												purpose === "Unexpected Expenses/Bills"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												goNext("Unexpected Expenses/Bills");
											}}
										>
											<img
												alt="Unexpected Expenses/Bills"
												src={
													purpose === "Unexpected Expenses/Bills"
														? UnexpectedExpenceIconWhite
														: UnexpectedExpenceIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "Unexpected Expenses/Bills"
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
										lg={4}
										md={4}
										xs={6}
										className={`${classes.masonryItemFirst}`}
									>
										<Paper
											data-testid="majorPurchase"
											elevation={3}
											className={
												purpose === "Major Purchase"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												goNext("Major Purchase");
											}}
										>
											<img
												alt="Major Purchase"
												src={
													purpose === "Major Purchase"
														? MajorPurchaseIconWhite
														: MajorPurchaseIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "Major Purchase"
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
										lg={12}
										md={12}
										xs={12}
										className={`${classes.masonryItemFirst}`}
									>
										<Paper
											data-testid="others"
											elevation={3}
											className={
												purpose === "Other"
													? "activeCard othersBlock "
													: "othersBlock "
											}
											onClick={() => {
												goNext("Other");
											}}
										>
											<Typography
												align="center"
												className={
													purpose === "Other" ? "textCSS whiteText" : "textCSS"
												}
											>
												Others
											</Typography>
										</Paper>
									</Grid>
									<Grid
										className="ContinueButton"
										lg={9}
										md={9}
										sm={12}
										xs={12}
									>
										<ButtonPrimary
											data-testid="contButton"
											onClick={handleRoute}
											disabled={purpose === "" ? true : false}
											stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black !important"}'
										>
											<Typography align="center" className="textCSS ">
												Continue
											</Typography>
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
