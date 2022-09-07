import Grid from "@mui/material/Grid";
import React from "react";
import { ButtonPrimary } from "../../../FormsUI";
import { SpringFourNoOffersAvailableStyle } from "./Style";
import SpringFour from "../../../../assets/images/SpringFour_logo.png"
import Financial from "../../../../assets/icon/financial.png"
import Recruitment from "../../../../assets/icon/recruitment.png"
import Deal from "../../../../assets/icon/deal.png"
import "./SpringFourNoOffersAvailable.css";
import { Typography } from "@mui/material";
import ScrollToTopOnMount from "../ScrollToTop";

const SpringFourNoOffersAvailable = () => {
  const classes = SpringFourNoOffersAvailableStyle();

  return (
    <div>
      <ScrollToTopOnMount />
      <Grid data-testid="springFourComponent" className={classes.blueBG}>
          <Grid className={classes.mainContentWrap}>
            <Grid item container md={12} lg={9} className={classes.centerGrid}>
              <Grid className={classes.fullWidth}>  
              <Typography data-testid="thankYouText" className={classes.mainHeadingOne} variant="h5">
                Thank you for applying!
              </Typography>
              <Typography  data-testid="unfortunatelyText" className={classes.mainHeadingTwo} variant="h5">
                Unfortunately! We don{"'"}t have an offer for you<br/>
                based on your application at this time.
              </Typography>
              </Grid>
              <Grid className={classes.blueGradiantBox}>
                <Grid className={classes.boxGrid} item lg={10} md={10} sm={10} xl={10}>
                  <Typography data-testid="blueBoxText" className={classes.boxText} variant="h5">
                    However, Mariner Finance has partnered with SpringFour, a free online tool that helps consumers
                    locate verified and vetted food, financial, and health resources in their community.
                  </Typography>
                <Grid className={classes.whiteBorderBox}>
                  <Grid className="whiteBorderWrap" container item md={10} sm={10} lg={10} xl={10}>
                    <Grid className="SpringFourImgWrap">
                      <img data-testid="springFourLogo" alt="Spring four logo" src={ SpringFour } />
                    </Grid>
                    <Grid className="SpringFourText">
                      <Typography data-testid="resourcesText" variant="h5">
                        Resources When You Need Them Most!
                      </Typography>
                    </Grid>
                    <Grid container>
                      <Grid container item md={4} className="imageTextWrap">
                        <img data-testid="financialAdviceLogo"  alt="Financial Advice" src={ Financial }/>
                        <Typography data-testid="financialAdviceText">Financial<br/>Advice</Typography>
                      </Grid>
                      <Grid container item md={4} className="imageTextWrap">
                        <img data-testid="employmentServicesLogo" alt="Employment Services" src={ Recruitment }/>
                        <Typography data-testid="employmentServicesText">Employment<br/>Services</Typography>
                      </Grid>
                      <Grid container item md={4} className="imageTextWrap">
                        <img data-testid="rentalResourcesLogo" alt="Rental Resources" src={ Deal }/>
                        <Typography data-testid="rentalResourcesText">Rental<br/>Resources</Typography>
                      </Grid>
                    </Grid>
                    <ButtonPrimary stylebutton='{"color":""}'>
                    <a 
                    rel="noreferrer"
                    className={classes.getStartedSpringFourButton}  href={`${ process.env.REACT_APP_WEBSITE }/resources/#springfour`}>
                    Get Started
                    </a>                      
                    </ButtonPrimary>
                  </Grid>
                </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="hrGrid">
            <hr/>
          </Grid>
          
          <Grid className={classes.bottomTextGrid}>
            <Typography data-testid="preFooterTxt">
            *We offer personal loans from $1,000 to $25,000, with loans terms from 12 to 60 months. Minimum and maximum amounts dependent on an applicant’s state of residence and the underwriting of the loan. 
            Loans between $1,500 and $15,000 may be funded online. Loans greater than $15,000 or less than $1,500 are funded through our branch network. Specific interest rates and fees are determined as permitted 
            under applicable state law and depend upon loan amount, term, and the applicant’s ability to meet our credit criteria, including, but not limited to, credit history, income, debt payment obligations, and 
            other factors such as availability of collateral. Not all rates and loan amounts are available in all states. Additional fees may apply to some loan offers; some state required and/or permitted fees may be 
            treated as prepaid finance charges. Any such charges shall be in addition to the loan amount requested and/or approved and shall be fully disclosed to the applicant on his/her loan agreement. Not all applicants 
            will qualify for the lowest rates or larger loan amounts, which may require a first lien on a motor vehicle not more than ten years old titled in the applicant’s name with valid insurance. Not all loan types are 
            eligible for loan by phone or online loan closing. All terms and conditions of a loan offer will be disclosed during the application process, which requires the submission of a completed application and will be subject to 
            verification of applicant identity, submission of any required supporting documentation, and review of credit information. Some loan offers may require you to visit a Mariner Finance branch. Loan proceeds may be disbursed by 
            check or by Automated Clearing House (“ACH”) deposit depending upon whether the loan is closed in a branch or online. ACH disbursements are typically sent to your bank in 1 to 2 business days.
            </Typography>
            <br/>
            <Typography>
            CA Residents - Loans made or arranged pursuant to a California Financing Law License.
            </Typography>
            <br/>
            <Typography>
            VA Residents: Mariner Finance of Virginia, LLC, Licensed by the Virginia State Corporation Commission, Consumer Finance Company License No. CFI-114.
            </Typography>
            <br/>
            <Typography>
            Prohibited Use of Proceeds {"–"} Loan proceeds may not be used for business or commercial purposes, to finance direct postsecondary education expenses, for the purchase of securities, for gambling or for any illegal purpose.
            </Typography>
            <br/>
            <Typography>
            USA Patriot Act - To help the government fight the funding of terrorism and money laundering, Federal Law requires financial institutions to obtain, verify, and record information that identifies each person who opens an account. 
            As a result, under our customer identification program, we must ask for your name, street address, mailing address, date of birth, and other information that will allow us to identify you. We may also ask to see your driver{"'"}s license or other identifying documents.
            </Typography>
            <br/>
            <Typography>
            **Loan by Phone - Our loan by phone process requires a compatible mobile or computer device on which you can access your email and electronic documents. Not all loan types are eligible for loan by phone or online loan closing.
            </Typography>
            <br/>
            <Typography>
            15 Day Satisfaction Guarantee- If, for any reason, you are dissatisfied with your loan and repay it in full within 15 days we will waive all finance charges with no penalties. Your repayment amount must be in the form of cash or certified funds.
            </Typography>
            <br/>
            <Typography data-testid="preFooterLastText">
            2 This is where you put the disclosure provided from legal on the approval conditions.
            </Typography>
          </Grid>

      </Grid>
        
    </div>
  );
};
export default SpringFourNoOffersAvailable;