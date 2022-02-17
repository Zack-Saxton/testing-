import { Box, Modal, Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import adBanner from "../../../assets/gallery/AdBanner.jpg";
import MortgageBanner from "../../../assets/images/Mortgage-Banner.jpg";
import setAccountDetails from "../../Controllers/AccountOverviewController";
import { ButtonPrimary } from "../../FormsUI";
import { useStylesAccountOverview } from "./Style";
import "./Style.css";
import MyBranchAPI from "../../Controllers/MyBranchController";
import Disclaimer from "./Marketing_offer/Disclaimer";
import AboutMariner from "./Marketing_offer/AboutMariner";
import PreScreen from "./Marketing_offer/PreScreen";
import MarketingOffer from "./Marketing_offer/MarketingOffer";
import OptOutNotice from "./Marketing_offer/OptOutNotice";
import CampaignMessage from "./Marketing_offer/CampaignMessage";

export default function LimitedOffer(userOfferData) {
  //Material UI css class
  const classes = useStylesAccountOverview();
  window.zeHide();
  // Get offers details
  let userOfferAmount = (userOfferData.userOffers != null) ? userOfferData.userOffers.offerAmount : 0;
  const [initModal,setinitModal] = useState(false);
  const [offerCode,setOfferCode] = useState(" ");
  const [campaignType, setCampaignType] = useState("");
  const [amount,setAmount] = useState(" ");
  const [expiryDate,setExpiryDate] = useState(" ")
  const [firstName,setfirstName] = useState("")
  const [branchCno,setBranchCno] = useState("");
  const [branchName,setBranchName] = useState("");
  const [branchManager,setbranchManager] = useState("");

  useEffect(()=>{
            setAccountDetails().then((res)=>{
              setOfferCode(res?.data?.offerData?.OfferCode)
              setExpiryDate(res?.data?.offerData?.dateExpiration)
              setAmount(res?.data?.offerData?.offerAmount)
              setfirstName(res?.data?.offerData?.firstName);
              setCampaignType(res?.data?.offerData?.CampaignTypeDesc)
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

  const handleContinue = () => {
    navigate("/pre-approved");
  };

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
                <CampaignMessage amount={amount} offerCode={offerCode} handleContinue={handleContinue} expiryDate={expiryDate}>
                </CampaignMessage>      
                <Grid>
                  <p className="common">Dear { firstName },</p>
                  <MarketingOffer promoType ={campaignType} offerCode ={offerCode} amount ={amount} branchPhone ={branchCno} branchName ={branchName} dateExpiration = {expiryDate}></MarketingOffer>
                  <p>Sincerely,<br></br>
                  {branchManager}<br></br>
                  {branchName}<br></br>
                  {branchCno}
                  </p>
                </Grid>
                <PreScreen offerData={userOfferData}></PreScreen>
                <Grid style={{textAlign:"center"}}>
                  <p>Easy, Fast, Flexible & Convenient</p>
                    <ButtonPrimary id="ClaimButton" stylebutton='{"color":"", "textTransform": "none"}' onClick={handleContinue}>
                              Continue
                    </ButtonPrimary>
                  <p>We need more information from you to show you your offers. Please click continue to tell us more about yourself.</p>
                  <p>P.S. Still have questions? Give your local branch a call today! {branchCno}</p>
                </Grid>
                <AboutMariner>
                </AboutMariner>
                <OptOutNotice  offerData={userOfferData}>
                </OptOutNotice>
                <Disclaimer offerData={userOfferData}>
                </Disclaimer>        
              </Typography>
            </Box>
          </Modal>
        </Grid>
      </div>
  );
}
