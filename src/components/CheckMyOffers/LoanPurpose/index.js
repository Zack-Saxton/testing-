import React, { useState, useContext } from "react";
import Header from "../../Layout/NormalHeader/NormalHeader";
import Footer from "../../Layout/NormalFooter/NormalFooter";
import "./loadPurpose.css";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Slider, TextField, Button, RadioButtonBox } from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import HomeImprovenentIcon from "../../../assets/icon/Home-Improvement.png";
import HomeImprovenentIconWhite from "../../../assets/icon/white/Home-Improvement.png";
import AutoExpenceIcon from "../../../assets/icon/AutoExpense-Repair.png";
import VacationIcon from "../../../assets/icon/Vacation.png";
import HolidayIcon from "../../../assets/icon/Holiday-Spending.png";
import MedicalIcon from "../../../assets/icon/Medical-Dental.png";
import DeptIcon from "../../../assets/icon/Debt-Consolidation.png";
import LifeEventIcon from "../../../assets/icon/Life-Event.png";
import UnexpectedExpenceIcon from "../../../assets/icon/Unexpected-Expenses.png";
import MajorPurchaseIcon from "../../../assets/icon/Major-Purchase.png";
import AutoExpenceIconWhite from "../../../assets/icon/white/AutoExpense-Repair.png";
import VacationIconWhite from "../../../assets/icon/white/Vacation.png";
import HolidayIconWhite from "../../../assets/icon/white/Holiday-Spending.png";
import MedicalIconWhite from "../../../assets/icon/white/Medical-Dental.png";
import DeptIconWhite from "../../../assets/icon/white/Debt-Consolidation.png";
import LifeEventIconWhite from "../../../assets/icon/white/Life-Event.png";
import UnexpectedExpenceIconWhite from "../../../assets/icon/white/Unexpected-Expenses.png";
import MajorPurchaseIconWhite from "../../../assets/icon/white/Major-Purchase.png";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { CheckMyOffers } from "../../../contexts/CheckMyOffers";

function LoanPurpose(props) {
	console.log(props);
	const { data } = useContext(CheckMyOffers);
	const [purpose, setPurpose] = useState(data.loanPurpose ?? "");
	const history = useHistory();

	const handleRoute = () => {
		data.loanPurpose = purpose;
		history.push("/citizenship-status");
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
	return (
		<div>
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
									<Link to="/select-amount">
										<i class="material-icons dp48 yellowText ">arrow_back</i>
									</Link>
								</Grid>
								<Typography variant="h5" align="center" className="borrowCSS">
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
												purpose === "home"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												setPurpose("home");
											}}
										>
											<img
												src={
													purpose === "home"
														? HomeImprovenentIconWhite
														: HomeImprovenentIcon
												}
												className="icon"
												alt="Home improvement"
											/>
											<Typography
												align="center"
												className={
													purpose === "home"
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
												purpose === "autoExpence"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												setPurpose("autoExpence");
											}}
										>
											<img
												alt="autoExpence"
												src={
													purpose === "autoExpence"
														? AutoExpenceIconWhite
														: AutoExpenceIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "autoExpence"
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
												purpose === "vacation"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												setPurpose("vacation");
											}}
										>
											<img
												alt="vacation"
												src={
													purpose === "vacation"
														? VacationIconWhite
														: VacationIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "vacation"
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
												purpose === "holidaySpending"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												setPurpose("holidaySpending");
											}}
										>
											<img
												alt="HolidayIcon"
												src={
													purpose === "holidaySpending"
														? HolidayIconWhite
														: HolidayIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "holidaySpending"
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
												purpose === "medical"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												setPurpose("medical");
											}}
										>
											<img
												alt="medical"
												src={
													purpose === "medical" ? MedicalIconWhite : MedicalIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "medical"
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
												purpose === "deptConsolidation"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												setPurpose("deptConsolidation");
											}}
										>
											<img
												alt="deptConsolidation"
												src={
													purpose === "deptConsolidation"
														? DeptIconWhite
														: DeptIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "deptConsolidation"
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
												purpose === "lifeEvent"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												setPurpose("lifeEvent");
											}}
										>
											<img
												alt="lifeEvent"
												src={
													purpose === "lifeEvent"
														? LifeEventIconWhite
														: LifeEventIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "lifeEvent"
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
												purpose === "unexpectedBills"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												setPurpose("unexpectedBills");
											}}
										>
											<img
												alt="unexpectedBills"
												src={
													purpose === "unexpectedBills"
														? UnexpectedExpenceIconWhite
														: UnexpectedExpenceIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "unexpectedBills"
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
												purpose === "majorPurchase"
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												setPurpose("majorPurchase");
											}}
										>
											<img
												alt="majorPurchase"
												src={
													purpose === "majorPurchase"
														? MajorPurchaseIconWhite
														: MajorPurchaseIcon
												}
												className="icon"
											/>
											<Typography
												align="center"
												className={
													purpose === "majorPurchase"
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
												purpose === "others"
													? "activeCard othersBlock "
													: "othersBlock "
											}
											onClick={() => {
												setPurpose("others");
											}}
										>
											<Typography
												align="center"
												className={
													purpose === "others" ? "textCSS whiteText" : "textCSS"
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
										<Button
											data-testid="contButton"
											onClick={handleRoute}
											disabled={purpose === "" ? true : false}
											stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black !important"}'
										>
											<Typography align="center" className="textCSS ">
												Continue
											</Typography>
										</Button>
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
