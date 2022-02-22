import { Box, Modal, Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import adBanner from "../../../assets/gallery/AdBanner.jpg";
import MortgageBanner from "../../../assets/images/Latest_Mortgage_Banner.png";
import MyBranchAPI from "../../Controllers/MyBranchController";
import { ButtonPrimary } from "../../FormsUI";
import "./AccountOverview.css";
import AboutMariner from "./Marketing_offer/AboutMariner";
import CampaignMessage from "./Marketing_offer/CampaignMessage";
import Disclaimer from "./Marketing_offer/Disclaimer";
import MarketingOffer from "./Marketing_offer/MarketingOffer";
import OptOutNotice from "./Marketing_offer/OptOutNotice";
import PreScreen from "./Marketing_offer/PreScreen";
import "./Style.css";

export default function LimitedOffer(userOfferData) {
  //Material UI css class
  window.zeHide();
  // Get offers details
  let userOfferAmount = userOfferData?.offerAmount ?? 0;
  const [ initModal, setinitModal ] = useState(false);
  const [ offerCode, setOfferCode ] = useState(" ");
  const [ campaignType, setCampaignType ] = useState("");
  const [ amount, setAmount ] = useState(" ");
  const [ expiryDate, setExpiryDate ] = useState(" ");
  const [ firstName, setfirstName ] = useState("");

  const { data: branchApiStatus } = useQuery('my-branch', MyBranchAPI);
  let myBranchData = branchApiStatus?.data;
  const branchCno = myBranchData?.PhoneNumber ?? "";
  const branchName = myBranchData?.branchName ? (`${ myBranchData?.branchName } Branch`) : "";
  const branchManager = myBranchData?.branchmanager ?? "";
  
  const navigate = useNavigate();
  useEffect(() => {
    if(userOfferData){
      setOfferCode(userOfferData?.OfferCode);
      setExpiryDate(userOfferData?.dateExpiration);
      setAmount(userOfferData?.offerAmount);
      setfirstName(userOfferData?.firstName);
      setCampaignType(userOfferData?.CampaignTypeDesc);
    }
    return null;    
  }, [ userOfferData ]);

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
      <div id="limitedOfferWrap" className="limitedOfferWrap">
        <Grid container id="overviewWrap" className="overviewWrap">
          <Grid  className="imageholder">
            <div className="yellowBackground">
               <img
                    className="bannerImage"
                    src={ adBanner }
                    data-testid="background"
                    alt="ad_banner"
                  />
                  <div className="secondGrid">
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
                      <NavLink to="/customers/applyForLoan" state={ { from: "user" } }
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
            </div>
          </Grid>
          <Grid  className="secondBannerWrap">
          <a
                target="_blank"
                rel="noreferrer"
                href="https://www.marinerfinance.com/apply-home-loan/?utm_source=CAC&utm_medium=panel&utm_campaign=Mrktoffer_Mortgage"
                style={ { textDecoration: "none", height: "100%"} }
              >
                 <img
                  className="secondBannerImage"
                  src={ MortgageBanner }
                  data-testid="background"
                  alt="mortgage_banner"
                />
                </a>
          </Grid>
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
      </div>
  );
}
