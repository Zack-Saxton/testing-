import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loanPurposeData } from "../../../../assets/data/constants";
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
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary } from "../../../FormsUI";
import ScrollToTopOnMount from "../ScrollToTop";
import Cookies from "js-cookie";
import "./LoanPurpose.css";

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
		gridPadding: {
			paddingTop: "7px",
			paddingBottom: "15px"
		},
		gridItem: {
			boxSizing: "border-box",
			padding: Theme.spacing(1),
		},
		masonryItemFirst: {
			padding: Theme.spacing(1),
			boxSizing: "border-box",
		},
		mainGridPadding: {
			padding: "4% 0%"
		},
		gridMargin: {
			margin: "15px 0px 19px 0 !important"
		}
	})
);
//Loan purpose component initialization
function LoanPurpose() {
  const { data, setData} = useContext(CheckMyOffers);
	const [ purpose, setPurpose ] = useState(data.loanPurpose ?? "");
	const navigate = useNavigate();
	const preLoginStyles = preLoginStyle();

	const CKLightbox_Source = Cookies.get("CKLightbox_Source")
	const CKLightbox_Web = Cookies.get("CKLightbox_Web")
	const CKLightbox_trkcid = Cookies.get("CKLightbox_trkcid")
	const CKLightbox_campaign = Cookies.get("CKLightbox_campaign")
	const CKLightbox_term = Cookies.get("CKLightbox_term")
	const CKLightbox_amount = Cookies.get("CKLightbox_amount")

	const setCookieOtherPartner = () => {
		const utm_source_otherPartner = Cookies.get("utm_source_otherPartner")
		const utm_medium_otherPartner = Cookies.get("utm_medium_otherPartner")
		const utm_campaign_otherPartner = Cookies.get("utm_campaign_otherPartner")
		const referer_otherPartner = Cookies.get("referer_otherPartner")
		const gclid_otherPartner = Cookies.get("gclid")
	
		setData({
		  ...data, 
		  utm_source_otherPartner : utm_source_otherPartner ?? "",
		  utm_medium_otherPartner : utm_medium_otherPartner ?? "",
		  utm_campaign_otherPartner :  utm_campaign_otherPartner ?? "",
		  referer_otherPartner :    referer_otherPartner ?? "" ,
		  gclid_otherPartner :    gclid_otherPartner ?? "" ,
		})
	  }

	useEffect(() => {
		if(CKLightbox_Source === "CKLightbox"){      
			setData({
				...data, trkcid: CKLightbox_trkcid ?? "",
				utm_source : CKLightbox_Source ?? "",   
				utm_medium : CKLightbox_Web ?? "",
				utm_campaign : CKLightbox_campaign ?? "",
				term : CKLightbox_term ?? "",
				loanAmount : CKLightbox_amount ?? ""
			})
			navigate("/loan-purpose");	
		}
		else if( (data?.completedPage < data?.page?.selectAmount || data?.formStatus?.toLowerCase() === "completed"))  {
			navigate("/select-amount");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	//handle the user data nd store it into context and procced next step
	const handleRoute = () => {
		data.loanPurpose = purpose;
		data.completedPage = data?.completedPage > data?.page?.loanPurpose ? data?.completedPage : data?.page?.loanPurpose;
		setCookieOtherPartner()
		navigate("/citizenship-status");
	};

	//  validate and procceeds to next step
	const goNext = (val) => {
		data.loanPurpose = val;
		setPurpose(val);
		if (data.completedPage < data.page.loanPurpose) {
			data.completedPage = data?.completedPage > data?.page?.loanPurpose ? data?.completedPage : data?.page?.loanPurpose;
			setCookieOtherPartner()
			navigate("/citizenship-status");
		}
	};

	const classes = useStyles();

	const loanPurposeDataArray = [
		{
			
				data_testid : "home",
				title : loanPurposeData.homeImprovement,
				whiteIcon : HomeImprovementIconWhite,
				normalIcon : HomeImprovementIcon,
				typography_id : "purposeTxt01"
				
		},
		{
			
			data_testid : "autoExpense",
			title : loanPurposeData.autoExpence,
			whiteIcon : AutoExpenseIconWhite,
			normalIcon : AutoExpenseIcon,
			typography_id : "purposeTxt02"
			
	},
	{
			
		data_testid : "vacation",
		title : loanPurposeData.vacation,
		whiteIcon : VacationIconWhite,
		normalIcon : VacationIcon,
		typography_id : "purposeTxt03"
		
	},
	{
			
		data_testid : "holiday",
		title : loanPurposeData.holidaySpending,
		whiteIcon : HolidayIconWhite,
		normalIcon : HolidayIcon,
		typography_id : "purposeTxt04"	

},
{
			
		data_testid : "medical",
		title : loanPurposeData.medicalDental,
		whiteIcon : MedicalIconWhite,
		normalIcon : MedicalIcon,
		typography_id : "purposeTxt05"	

},
{
			
		data_testid : "deptConsolidation",
		title : loanPurposeData.debtConsolidation,
		whiteIcon : DeptIconWhite,
		normalIcon : DeptIcon,
		typography_id : "purposeTxt06"	

},
{
			
		data_testid : "lifeEvent",
		title : loanPurposeData.lifeEvents,
		whiteIcon : LifeEventIconWhite,
		normalIcon : LifeEventIcon,
		typography_id : "purposeTxt07"	

},
{
			
		data_testid : "unexpectedBills",
		title : loanPurposeData.unexpectedExpence,
		whiteIcon : UnexpectedExpenseIconWhite,
		normalIcon : UnexpectedExpenseIcon,
		typography_id : "purposeTxt08"	

},
{
			
		data_testid : "majorPurchase",
		title : loanPurposeData.majorPurchase,
		whiteIcon : MajorPurchaseIconWhite,
		normalIcon : MajorPurchaseIcon,
		typography_id : "purposeTxt09"	

},
	]

	//view part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className={preLoginStyles.mainDiv}>
				<Box>
					<Grid
						container
						item
						xs={12}
						justifyContent="center"
						alignItems="center"
						className={classes.mainGridPadding}
					>
						<Grid
							container
							item
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6}
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
										to={"/select-amount"}
										state={{ fromLoanPurpose: "yes" }}
										data-testid="routeBackwardLoanPurpose"
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

{loanPurposeDataArray.map((element) => (
	<Grid
										item
										lg={4}
										md={4}
										xs={6}
										key={element.title}
										className={`${ classes.masonryItemFirst }`}
									>
										<Paper 
											data-testid={element.data_testid}
											elevation={3}
											className={
												purpose === element.title
													? "activeCard block " + classes.paper
													: "block " + classes.paper
											}
											onClick={() => {
												goNext(element.title);
											}}
										>
											<img
												alt={element.title}
												src={
													purpose === element.title
														? element.whiteIcon
														: element.normalIcon
												}
												className="icon"
											/>
											<Typography
												id={element.typography_id}
												align="center"
												className={
													purpose === element.title
														? "borrowCSS textCSS whiteText"
														: "borrowCSS textCSS"
												}
											>
												{element.title}
											</Typography>
										</Paper>
									</Grid> ))} 

									<Grid
										item
										lg={12}
										md={12}
										xs={12}
										className={`${ classes.masonryItemFirst } ${ classes.gridPadding }`}
									>
										<Paper
											data-testid="others"
											elevation={3}
											className={
												purpose === loanPurposeData.other
													? "activeCard othersBlock "
													: "othersBlock "
											}
											onClick={() => {
												goNext(loanPurposeData.other);
											}}
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
										lg={9}
										md={9}
										sm={12}
										xs={12}
										className={classes.gridMargin}
									>
										<ButtonPrimary
											data-testid="contButtonLoanPurpose"
											onClick={handleRoute}
											disabled={!purpose}
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