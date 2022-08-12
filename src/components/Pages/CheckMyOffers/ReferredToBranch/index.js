import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary, ButtonSecondary } from "../../../FormsUI";
import CustomerRatings from "../../MyBranch/CustomerRatings";
import "../CheckMyOffer.css";
import ScrollToTopOnMount from "../ScrollToTop";
import goldIcon from "../../../../assets/icon/dollarIcon.png"

//reffered to branch functional component initialization
function ReferredToBranch(props) {
	//get context values
	const { data } = useContext(CheckMyOffers);
	const navigate = useNavigate();
	const classes = preLoginStyle();
	const useLocationData = useLocation();
	data.formStatus = "completed";
	const branchPhoneNumber = useLocationData?.state?.referedToBranchData?.PhoneNumber
	const branchName = useLocationData?.state?.referedToBranchData?.branchName
	const branchAdress = useLocationData?.state?.referedToBranchData?.Address
	const branchaddress_2 = useLocationData?.state?.referedToBranchData?.branchaddress2
	const branchcity = useLocationData?.state?.referedToBranchData?.branchcity
	const branchState = useLocationData?.state?.referedToBranchData?.branchstate
	const branchZipCode = useLocationData?.state?.referedToBranchData?.branchzipcode
	const refferdToBranchName = Cookies.get("firstName") 
	useEffect(() => {
		//redirects to select amount of directly called
		if (data?.completedPage < data?.page?.ssn && data?.applicationStatus?.toLowerCase() !== "referred" && props?.location?.formcomplete?.toLowerCase() !== "yes") {
			navigate("/select-amount");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	window.onbeforeunload = null;

	//JSX part
	return (
		<div data-testid = "referredToBranch_Component">
			<ScrollToTopOnMount />
			<Grid className={classes.blueBackground}>
				<Grid className="mainText">
				<img className={classes.goldIcon} src={goldIcon}/>
				<Typography variant="h4">
					Congratulations! {refferdToBranchName}
				</Typography>
				<Typography variant="h6">
					We have a solution for you.*
				</Typography>
				</Grid>
				<Grid container item md={6} lg={6} className={classes.blueBox}>
					<Grid container item md={10} lg={10} className="callNowSection">
					<Typography>
						We may be able to help but we need a bit more information to finish the application and verification process.* Let{"’"}s get on a call**
					</Typography>
					<ButtonPrimary stylebutton='{"background": ""}'>
						Call Now
						<br/>
						<a href={`tel:${branchPhoneNumber}`}>{ branchPhoneNumber }</a>
					</ButtonPrimary>
					<Typography variant="h6">
						Applying after hours? Schedule a call below
					</Typography>
					<Grid className="secondaryButton">
						<a href="/customers/myBranch">
						<ButtonSecondary stylebutton='{"background": ""}'>
							Schedule a Call Back
							</ButtonSecondary>
						</a>
							
					<Typography variant="h6">
						Can{"'"}t talk or get in touch with us? That{"'"}s ok, schedule a call back time and will call you back at your earliest convience.
					</Typography>
					</Grid>
					</Grid>
				</Grid>
					<Grid className="customerRatingsWrapReffreal">
            <CustomerRatings />
          </Grid>
					<Grid className="questionsText">
						<Typography className="questionsTextOne">
							Questions?
						</Typography>
						<Typography className="questionsTextTwo">
							Feel free to call the branch at (912) 764-6242
						</Typography>
						<Typography className="yellowTextOne">
							Prefer to visit in person? Our branches will be open to walk-ins.<br/>No appointment necessary!
						</Typography>
					</Grid>
					
					<Grid className="questionsTextTwoWrap">
						<Typography>
						{"[Branch Address]"}
						<br/>
						{branchName}, {branchAdress}, {branchaddress_2}, {branchcity}, {branchState}, {branchZipCode}
						</Typography>
						<Typography>
						Our business hours are listed below
						</Typography>
						<Typography>
							M, W, Th: 9:00 a.m. - 5:00 p.m. Tue: 9:00 a.m. - 7:00 p.m. {"&"} Fri: 9:00 a.m. - 5:30 p.m.<sup>1</sup>
						</Typography>
					</Grid>
					<hr className="horizontalLine"></hr>
					<Grid className="footerTexts">
						<Typography>
						1California branch hours differ and are as follows: Monday 9AM–5:30PM Tuesday10AM–7PM Wednesday 9AM–5:30PM Thursday 9AM–5:30PM Friday 9AM–5:30PM
						<br/>
						<br/>

						*We offer personal loans from $1,000 to $25,000, with loans terms from 12 to 60 months. Minimum and maximum amounts dependent on an applicant’s state of residence and the underwriting of the loan. Loans between $1,500 and $15,000 may be funded online. Loans greater than $15,000 or less than $1,500 are funded through our branch network. Specific interest rates and fees are determined as permitted under applicable state law and depend upon loan amount, term, and the applicant’s ability to meet our credit criteria, including, but not limited to, credit history, income, debt payment obligations, and other factors such as availability of collateral. Not all rates and loan amounts are available in all states. Additional fees may apply to some loan offers; some state required and/or permitted fees may be treated as prepaid finance charges. Any such charges shall be in addition to the loan amount requested and/or approved and shall be fully disclosed to the applicant on his/her loan agreement. Not all applicants will qualify for the lowest rates or larger loan amounts, which may require a first lien on a motor vehicle not more than ten years old titled in the applicant’s name with valid insurance. Not all loan types are eligible for loan by phone or online loan closing. All terms and conditions of a loan offer will be disclosed during the application process, which requires the submission of a completed application and will be subject to verification of applicant identity, submission of any required supporting documentation, and review of credit information. Some loan offers may require you to visit a Mariner Finance branch. Loan proceeds may be disbursed by check or by Automated Clearing House (“ACH”) deposit depending upon whether the loan is closed in a branch or online. ACH disbursements are typically sent to your bank in 1 to 2 business days.<br/>
						<br/>
						CA Residents - Loans made or arranged pursuant to a California Financing Law License.<br/>
						<br/>
						VA Residents: Mariner Finance of Virginia, LLC, Licensed by the Virginia State Corporation Commission, Consumer Finance Company License No. CFI-114.<br/>
						<br/>
						Prohibited Use of Proceeds – Loan proceeds may not be used for business or commercial purposes, to finance direct postsecondary education expenses, for the purchase of securities, for gambling or for any illegal purpose.<br/>
						<br/>
						USA Patriot Act - To help the government fight the funding of terrorism and money laundering, Federal Law requires financial institutions to obtain, verify, and record information that identifies each person who opens an account. As a result, under our customer identification program, we must ask for your name, street address, mailing address, date of birth, and other information that will allow us to identify you. We may also ask to see your driver{"'"}s license or other identifying documents.<br/>
						<br/>
						**Loan by Phone - Our loan by phone process requires a compatible mobile or computer device on which you can access your email and electronic documents. Not all loan types are eligible for loan by phone or online loan closing.<br/>
						<br/>
						15 Day Satisfaction Guarantee- If, for any reason, you are dissatisfied with your loan and repay it in full within 15 days we will waive all finance charges with no penalties. Your repayment amount must be in the form of cash or certified funds.<br/>
						</Typography>
					</Grid>
			</Grid>
		</div>
	);
}

ReferredToBranch.propTypes = {
	location: PropTypes.object,
};

export default ReferredToBranch;
