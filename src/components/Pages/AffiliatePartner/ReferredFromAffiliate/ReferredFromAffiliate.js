import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CongratulationsImage from "../../../../assets/images/Referred-to-Branch.png";
import CustomerRatings from "../../../Pages/MyBranch/CustomerRatings"
import "../../../Pages/MyBranch/BranchInfo.css"
import { ButtonPrimary } from "../../../FormsUI";
import { ReferredUsestyle } from "./style";
import {usePopulatePartnerReferred} from "./ReferredFromAffiliateMockData"
import "./ReferredFromAffiliate.css";

//Referred From Affiliate functional component initialization
function ReferredFromAffiliate() {
  const classes = ReferredUsestyle()
  const navigate = useNavigate();

  const useQueryURL = () => new URLSearchParams(useLocation().search);
  const query = useQueryURL();
  const applicantId = query.get("REF");

  const [ populatePartnerSignupState, SetPopulatePartnerSignupState ] = useState(null);
  const { isLoading, PopulatePartnerSignupData } = usePopulatePartnerReferred(applicantId);

  //API Call
  // const { data: PopulatePartnerSignupData } = useQuery([ 'populate-data-referred',  applicantId], () => PopulatePartnerReferred( applicantId ));

  useEffect(() => {
    SetPopulatePartnerSignupState(PopulatePartnerSignupData);
    if(!applicantId)
    {
      navigate("/error")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ PopulatePartnerSignupData ]);

  //Populate referred application username from API
   let populateSignupData = populatePartnerSignupState?.data?.application?.identification?.full_name;
  const splitOnSpace = populateSignupData ?  populateSignupData?.split(' ') : [];
  const firstNameCaps = splitOnSpace[0];
  const firstName = firstNameCaps ? firstNameCaps.charAt(0).toUpperCase() + firstNameCaps.slice(1) : "";

	//JSX part
	return (
		<div data-testid="ReferredFromAffiliate_component">
      {!firstName ?
      <Grid className={classes.circularGrid}>
      <CircularProgress /> 
      </Grid>:
      <Grid>
        <Grid className={classes.congratulationsGrid}>
			  <img data-testid="congratulationsImage" className="congratulationsImage" alt="Congratulations Image" src={CongratulationsImage}/>
        <Grid className="congratulationsTextWrap">
        <Typography data-testid="congratulationsText" className={classes.congratsHeading} variant="h4">
          Congratulations! {firstName}
        </Typography>

        <Typography className={classes.congratsPara}>
          We believe we have a solution for you.
        </Typography>
        <Typography data-testid="completionApplicationText" className={classes.congratsPara}>
          Upon completion of your application and verification of your information,<br/>
          we may be able to extend your final offer as soon as today!* Let{"'"}s get on a call!**
        </Typography>
        </Grid>
        <Grid>
        <ButtonPrimary id="telephoneNmber" stylebutton='{"background": "", "color":"" }'>
          <a data-testid="phoneNumber" className={classes.telNumber} href="tel:+6152779090">
          Call : (615) 277-9090
          </a>
        </ButtonPrimary>
        </Grid>
                  <Grid className="questionsText">
          <Typography className={classes.congratsPara}>
            Questions?
          </Typography>
         
          <Typography data-testid="callBranchText" className={classes.questions}>
            Feel free to call the branch at
            <a data-testid="callBranchTextPhoneNumber" className={classes.branchNumber} href="tel:+6152779090"> (615) 277-9090</a>.
            Due to the health risks surrounding <br/>COVID-19, 
            Mariner will not be accepting unscheduled walk-ins 
            at this time. <br/>Instead, please call to schedule an 
            appointment to meet with one of our team members.
          </Typography>
        </Grid>
        
        <Grid>
          <Typography className={classes.congratsPara}>
            Our business hours are listed below
          </Typography>

         <Grid className={classes.TableGrid} container  item xs={12} sm={12}>
          <TableContainer data-testid="tableContainer">
            <Table>
              <TableHead className="businessHoursHead">
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Mon - Wed - Thur</TableCell>
                  <TableCell>Tue</TableCell>
                  <TableCell>Fri</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="businessHours">
              <TableRow>
                  <TableCell>From</TableCell>
                  <TableCell>9:00AM</TableCell>
                  <TableCell>9:00AM</TableCell>
                  <TableCell>9:00AM</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell>To</TableCell>
                  <TableCell>5:00PM</TableCell>
                  <TableCell>7:00PM</TableCell>
                  <TableCell>5:30PM</TableCell>
              </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>
        </Grid>
        </Grid>
        <Grid className="customerRatingsWrap">
          <CustomerRatings />
        </Grid>
        <Grid className="preFooter">
          <Typography data-testid="preFooterText" className={classes.preFooterText}>
          California branch hours differ and are as follows: Monday 9AM–5:30PM Tuesday 10AM–7PM Wednesday 9AM–5:30PM Thursday 9AM–5:30PM Friday 9AM–5:30PM
          <br/><br/>

          * The offer presented is a conditional offer and does not constitute an actual commitment to lend or an offer to extend credit. We offer personal loans from $1,000 to $25,000, with loans terms from 12 to 60 months. Minimum and maximum amounts dependent on an applicant’s state of residence and the underwriting of the loan. Loans between $1,500 and $15,000 may be funded online. Loans greater than $15,000 or less than $1,500 are funded through our branch network. Specific interest rates and fees are determined as permitted under applicable state law and depend upon loan amount, term, and the applicant’s ability to meet our credit criteria, including, but not limited to, credit history, income, debt payment obligations, and other factors such as availability of collateral. Not all rates and loan amounts are available in all states. Additional fees may apply to some loan offers; some state required and/or permitted fees may be treated as prepaid finance charges. Any such charges shall be in addition to the loan amount requested and/or approved and shall be fully disclosed to the applicant on his/her loan agreement. Not all applicants will qualify for the lowest rates or larger loan amounts, which may require a first lien on a motor vehicle not more than ten years old titled in the applicant’s name with valid insurance. Not all loan types are eligible for loan by phone or online loan closing. All terms and conditions of a loan offer will be disclosed during the application process, which requires the submission of a completed application and will be subject to verification of applicant, submission of any required supporting documentation, and review of credit information. Some loan offers may require you to visit a Mariner Finance branch. Loan proceeds may be disbursed by check or by Automated Clearing House (“ACH”) deposit depending upon whether the loan is closed in a branch or online. ACH disbursements are typically sent to your bank in 1 to 2 business days. CA Residents - Loans made or arranged pursuant to a California Financing Law License.
          <br/><br/>

          VA Residents: Mariner Finance of Virginia, LLC Licensed by the Virginia State Corporation Commission, Consumer Finance Company License No. CFI-114.
          <br/><br/>    

          Existing Loan - If you have a loan with us now, acceptance of this offer requires refinancing the balance of your existing loan and the submission of updated application information. The new loan may result in terms that differ from your current loan. Additional fees may apply in connection with the extension of a new loan pursuant to state law as will be detailed in your new loan documents. Before you refinance your existing loan to obtain additional money, you should carefully consider increasing your debt and the length of your repayment term, in connection with your overall monthly obligations.
          <br/><br/>

          Debt Consolidation - When refinancing your existing debts, the total finance charges over the life of the new loan may be higher than for your current debts if you have a higher interest rate and/or a longer term. Loans may also include origination fees, which may reduce funds available to pay off other debts. Prohibited Use of Proceeds – Loan proceeds may not be used for business or commercial purposes, to finance direct postsecondary education expenses, for the purchase of securities, for gambling or for any illegal purpose.
          <br/><br/>

          USA Patriot Act - To help the government fight the funding of terrorism and money laundering, Federal Law requires financial institutions to obtain, verify, and record information that identifies each person who opens an account. As a result, under our customer identification program, we must ask for your name, street address, mailing address, date of birth, and other information that will allow us to identify you. We may also ask to see your driver{"'"}s license or other identifying documents.
          <br/><br/>

          ** Loan by Phone - Our loan by phone process requires a compatible mobile or computer device on which you can access your email and electronic documents. Not all loan types are eligible for loan by phone or online loan closing.
          </Typography>

        </Grid>
      </Grid>
}
		</div>
	);
}

export default ReferredFromAffiliate;