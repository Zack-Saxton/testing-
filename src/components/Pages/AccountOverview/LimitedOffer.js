import { Box, Modal, Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import { NavLink,useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import adBanner from "../../../assets/gallery/AdBanner.jpg";
import logo from "../../../assets/images/mariner-finance.jpg";
import MortgageBanner from "../../../assets/images/Mortgage-Banner.jpg";
import setAccountDetails from "../../Controllers/AccountOverviewController";
import { ButtonPrimary } from "../../FormsUI";
import { useStylesAccountOverview } from "./Style";
import "./Style.css";
import MyBranchAPI from "../../Controllers/MyBranchController";

export default function LimitedOffer(userOfferData) {
  //Material UI css class
  const classes = useStylesAccountOverview();
  window.zeHide();
  // Get offers details
  let userOfferAmount = (userOfferData.userOffers != null) ? userOfferData.userOffers.offerAmount : 0;
  const history = useHistory();
  const [initModal,setinitModal] = useState(false);
  const [offerCode,setOfferCode] = useState(" ");
  const [amount,setAmount] = useState(" ");
  const [expiryDate,setExpiryDate] = useState(" ")
  const [firstName,setfirstName] = useState("")
  const [branchCno,setBranchCno] = useState("");
  const [branchName,setBranchName] = useState("");
  const [branchManager,setbranchManager] = useState("");
  

  useEffect(()=>{
            setAccountDetails().then((res)=>{
              console.log(res);
              setOfferCode(res?.data?.offerData?.OfferCode)
              setExpiryDate(res?.data?.offerData?.dateExpiration)
              setAmount(res?.data?.offerData?.offerAmount)
              setfirstName(res?.data?.offerData?.firstName);
            })
            MyBranchAPI().then((res)=>{
              setBranchCno(res?.data?.PhoneNumber)
              setBranchName(res?.data?.branchName + " Branch")
              setbranchManager(res?.data?.branchmanager)
              
            })
  },[])

  const showModal = () => {
    setinitModal(true);
  };

  const closeModal = () => {
    setinitModal(false);
  };

  const style = {
    position: 'absolute',
    top: '45%',
    left: '53%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    overflow: 'scroll',
    height: 630,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const handleContinue = () =>{
    history.push({pathname:"/loan-purpose"})
  }
  
  //View
  return (
    <div id="mainContainer">
      <Grid container spacing={ 2 } style={ { paddingBottom: "50px" } }>
        <Grid id="LimitedOfferGrid" item xs={ 12 } sm={ 8 } >
          <Paper id="paperProperties" style={ { height: "100%" } } className={ classes.paperPropertiesLimitedOffer }>
            <div id="yellowBg">
              <div id="Wrapp">
                <img
                  src={ adBanner }
                  data-testid="background"
                  style={ { textDecoration: "none", height: "100%" } }
                  alt="ad_banner"
                />
              </div>
              { userOfferData.isLoading ? (<CircularProgress />) : (
                (userOfferAmount) ? (
                  <div id="offerText">
                    <p id="loanText">You may have money available now! Up to </p>
                    <p id="loanPercent">
                      <NumberFormat value={ userOfferAmount } displayType={ 'text' } thousandSeparator={ true } prefix={ '$' } />
                    </p>

                    <ButtonPrimary onClick={ showModal } id="claimButton" stylebutton='{"color":""}'>
                      Check My Offer
                    </ButtonPrimary>

                  </div>
                ) : (
                  <div id="offerText">
                    <NavLink
                      to={ { pathname: '/customers/applyForLoan', state: { from: "user" } } }
                      style={ { textDecoration: "none" } }
                    >
                      <ButtonPrimary id="claimButton" stylebutton='{"color":"", "textTransform": "none"}'>
                        Apply for a Loan
                      </ButtonPrimary>
                    </NavLink>
                  </div>
                )
              ) }
            </div>
          </Paper>
        </Grid>
        <Grid id="offerTwo" item xs={ 12 } sm={ 4 } >
          <Paper id="paperPropertiesOfferTwo" style={ { height: "100%" } } className={ classes.paperPropertiesOfferTwo }>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.marinerfinance.com/apply-home-loan/?utm_source=CAC&utm_medium=panel&utm_campaign=Mrktoffer_Mortgage"
              style={ { textDecoration: "none", height: "100%" } }
            >
              <img
                src={ MortgageBanner }
                data-testid="background"
                alt="mortgage_banner"
                style={ { width: "100%", height: "100%" } }
              />
            </a>
          </Paper>
        </Grid>
        <Modal
          open={ initModal }
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ style }>
            <Typography id="modal-modal-title" variant="h4" component="h2" className="title">
              You may have money available now!
              <IconButton
                id="debitCardModalClose"
                aria-label="close"

                onClick={ closeModal }
              >
                <CloseIcon />
              </IconButton>
            </Typography>
            <Typography id="modal-modal-description" sx={ { mt: 2 } }>
              <Grid className="checkMyOffers">
                <Grid className="leftcheckMyOffers">
                  <img src={ logo } width="120px" height="70px"></img>
                  <p className="common">Don't wait! This offer expires { expiryDate }</p>
                </Grid>
                <Grid className="rightcheckMyOffers">
                  <p className="common">You are prequalified up to</p>
                  <p className="common" style={{color:"#0F4EB3",fontSize:"bold",textAlign:"center"}}>
                    ${ amount }
                    
</p>

                  <p className="common">Use it to get things done.</p>
  
<p className="common">Offer Code:{offerCode}</p>
<ButtonPrimary id="ClaimButton" stylebutton='{"color":"", "textTransform": "none","marginLeft":"40px"}' onClick={handleContinue}>
                        Continue
                      </ButtonPrimary>
                </Grid>
              </Grid>
              <Grid>
                <p className="common">Dear { firstName },</p>
                <p className="common">
                  Looking for an easy way to break up the cost of big expenses, without breaking the bank? Or get rid of lingering credit
                  card bills? A fixed-rate, fixed-payment personal loan of ${ amount } from Mariner Finance can help you get the
                  things you want-and get rid of the bills you don't.
                </p>
                <p className="common">What will you do with your money?</p>
            <p className="common">Get rid of bills & credit card debt? Spruce up the house? Take a vacation?</p>
            <p className="common">Use offer code {offerCode} before {expiryDate}. Remember, checking your offer online does not affect your credit.*</p>
<p className="common">
Sincerely,<br></br>
{branchManager}<br></br>
{branchName}<br></br>
{branchCno}
</p>
            </Grid>
            <Grid className="content">
            You can choose to stop receiving "prescreened" offers of credit from this and other companies by calling toll-free 888-567-8688.
                 <br/>See PRESCREEN & OPT-OUT NOTICE below for more information about prescreened offers.
           </Grid>
           <Grid style={{textAlign:"center"}}>
           <p>Easy, Fast, Flexible & Convenient</p>
           <ButtonPrimary id="ClaimButton" stylebutton='{"color":"", "textTransform": "none"}' onClick={handleContinue}>
                        Continue
                      </ButtonPrimary>
<p>We need more information from you to show you your offers. Please click continue to tell us more about yourself.</p>
           <p>P.P.S. Still have questions? Give your local branch a call today! 708-425-1176</p>
              </Grid>
              <Grid>
                <p className="common para">
                  *SEE BELOW FOR IMPORTANT OFFER INFORMATION<br />
                  About Mariner Finance<br /><br />

                  <span className="small">
                    Since 1927, the Mariner Finance family of companies have provided individually tailored and convenient lending options to its customers with the goal of
                    pairing them with a personal loan that meets their immediate needs. At the core of Mariner Finance is the principle that superior customer service will
                    build lasting relationships. Our experienced team members take pride in finding options that are beneficial to each customer's specific needs and are
                    ready to assist you. Superior customer service is the reason for our continued success and why we are recognized by our customers as the community's
                    consumer finance company of choice.
                  </span>
                </p>
              </Grid><br />
              <Grid>
                <p className="common para">PRESCREEN & OPT-OUT NOTICE<br /><br />
                  <span className="small"> This “prescreened” offer of credit is based on information in your credit report indicating that you meet certain criteria. This offer is not
                    guaranteed if you do not meet our criteria, including providing acceptable property as collateral. If you do not want to receive prescreened offers of
                    credit from this and other companies, call the nationwide consumer reporting agencies toll-free: 1-888-5OPT OUT, or write: Equifax, Inc Options, PO Box 740123,
                    Atlanta, GA 30374; or Experian Opt Out, PO Box 919, Allen, TX 75013; or TransUnion Name Removal Option, PO Box 505, Woodlyn, PA 19094, or
                    visit the website at www.optoutprescreen.com.</span>
                </p>
              </Grid>
              <Grid>
                <p className="common para">Important Offer Information<br /><br />
                  <span className="small">
                    You received this loan offer because you met specific predetermined criteria for creditworthiness. This offer can only be accepted by the person(s) named in the offer. You must not have opened a loan account with Mariner Finance, LLC, Personal Finance Company LLC, each entity's respective parents companies, subsidiaries, and affiliated companies (the "Company") in the last 60 days. You must be at least 21 years of age or older to accept this offer. Qualification for this offer requires verification of your identity. Acceptance of this offer creates a new loan, which requires paying off of the balance of any existing loan with the Company and the submission of updated application information. The new loan may result in different terms from your current loan. Additional fees may apply in connection with the extension of a new loan pursuant to state law as will be detailed in your new loan documents. If you are interested in more money than the guaranteed amount, additional amounts are subject to normal lending requirements.
                    Check Your Offers Without Affecting Your Credit – The online application process uses a "soft" credit inquiry, which does not impact your credit score, to determine whether a loan offer is available. If you continue with the application process and accept a loan offer, we will pull your credit report and credit score again using a "hard" credit inquiry. This "hard" credit inquiry may impact your credit score. Applying at your local branch will result in a “hard” credit inquiry that may impact your credit score.
                    CA Residents - Loans made or arranged pursuant to a California Financing Law License
                    Existing Loans - If you have a loan with us now, acceptance of any offer creates a new loan, which requires paying off the balance of any existing loan and the submission of updated application information. Any pre-existing collateral in connection with the prior, refinanced loan may be retained, and the new loan may result in terms that are different than those of your current loan. Additional fees may apply in connection with the extension of a new loan pursuant to state law as will be detailed in your new loan documents.
                    Prohibited Use of Proceeds - Loan proceeds may not be used for business or commercial purposes, to finance direct postsecondary education expenses, for purchase of securities, for gambling or any illegal purpose.
                    USA Patriot Act - To help the government fight the funding of terrorism and money laundering activities, Federal Law requires financial insitiutions to obtain, verify, and record information that identifies each person who opens an account. As a result, under our customer identification program, we must ask you for your name, street address, mailing address, date of birth, and other information that will allow us to identify you.
                  </span>
                </p>
              </Grid>
              <Grid>
                <p className="common para">15 Day Satisfaction Guarantee<br></br>
                  <span className="small">
                    If, for any reason, you are dissatisfied with your loan and repay it in full within 15 days we will waive all finance charges with no
                    penalties. Your repayment amount must be in the form of cash or certified funds.
                  </span>
                </p>
              </Grid>
            </Typography>
          </Box>
        </Modal>

      </Grid>
    </div>
  );
}
