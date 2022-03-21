import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useQuery } from 'react-query';
import { NavLink, useNavigate } from "react-router-dom";
import adBanner from "../../../assets/gallery/AdBanner.jpg";
import MortgageBanner from "../../../assets/images/Latest_Mortgage_Banner.png";
import MyBranchAPI from "../../Controllers/MyBranchController";
import { ButtonPrimary } from "../../FormsUI";
import "./AccountOverview.css";
import AboutMariner from "./Marketing_offer/AboutMariner";
import Disclaimer from "./Marketing_offer/Disclaimer";
import MarketingOffer from "./Marketing_offer/MarketingOffer";
import OptOutNotice from "./Marketing_offer/OptOutNotice";
import PreScreen from "./Marketing_offer/PreScreen";
import "./Style.css";

export default function LimitedOffer(userOfferData) {

  // Get offers details
  const [ userOfferAmount, setUserOfferAmount ] = useState(null);
  const [ initModal, setInitModal ] = useState(false);
  const [ offerCode, setOfferCode ] = useState(" ");
  const [ campaignType, setCampaignType ] = useState("");
  const [ amount, setAmount ] = useState("");
  const [ expiryDate, setExpiryDate ] = useState(" ");
  const [ firstName, setFirstName ] = useState("");
  // Get Branch API data
  const { data: branchApiStatus } = useQuery('my-branch', MyBranchAPI);
  let myBranchData = branchApiStatus?.data;
  const branchCno = myBranchData?.PhoneNumber ?? "";
  const branchName = myBranchData?.branchName ? (`${ myBranchData?.branchName } Branch`) : "";
  const branchManager = myBranchData?.branchmanager ?? "";

  const navigate = useNavigate();
  useEffect(() => {
    if (userOfferData) {
      setOfferCode(userOfferData?.userOffers?.OfferCode);
      setExpiryDate(userOfferData?.userOffers?.dateExpiration);
      setAmount(userOfferData?.userOffers?.offerAmount);
      setFirstName(userOfferData?.userOffers?.firstName);
      setCampaignType(userOfferData?.userOffers?.CampaignTypeDesc);
      setUserOfferAmount(userOfferData?.userOffers?.offerAmount);
    }
    return null;
  }, [ userOfferData ]);

  const showModal = () => setInitModal(true);
  const closeModal = () => setInitModal(false);
  const handleContinue = () => navigate("/select-amount");

  //View
  return (
    <div id="limitedOfferWrap" className="limitedOfferWrap">
      <Grid container id="overviewWrap" className="overviewWrap">
        <Grid className="imageholder">
          <div className="yellowBackground">
            <img
              className="bannerImage"
              src={ adBanner }
              data-testid="background"
              alt="ad_banner"
            />
            <div className="secondGrid">
              { userOfferData.isLoading ? (
                <CircularProgress />
              ) : userOfferAmount ? (
                <div id="offerText">
                  <p id="loanText">You may have money available now! Up to </p>
                  <p id="loanPercent">
                    <NumberFormat
                      value={ userOfferAmount }
                      displayType={ "text" }
                      thousandSeparator={ true }
                      prefix={ "$" }
                    />
                  </p>
                  <ButtonPrimary
                    onClick={ showModal }
                    id="claimButton"
                    stylebutton='{"color":""}'
                  >
                    Check My Offer
                  </ButtonPrimary>
                </div>
              ) : (
                <div id="offerText">
                  <NavLink
                    to="/customers/applyForLoan"
                    state={ { from: "user" } }
                  >
                    <ButtonPrimary
                      id="claimButton"
                      stylebutton='{"color":"", "textTransform": "none"}'
                    >
                      Apply for a Loan
                    </ButtonPrimary>
                  </NavLink>
                </div>
              ) }
            </div>
          </div>
        </Grid>
        <Grid className="secondBannerWrap">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.marinerfinance.com/apply-home-loan/?utm_source=CAC&utm_medium=panel&utm_campaign=Mrktoffer_Mortgage"
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

      <Dialog maxWidth="lg" open={ initModal }>
        <DialogContent className="dialogContentWrap">
          <IconButton
            id="debitCardDialogClose"
            aria-label="close"
            onClick={ closeModal }
          >
            <CloseIcon />
          </IconButton>
          <Grid className="popupHeading">
            <h2>The money you need, when you need it!</h2>
            <h4>When life happens, we have your back*</h4>
          </Grid>
          <Grid id="modal-modal-description" sx={ { mt: 2 } }>
            <Grid>
              <p className="common">Dear { firstName },</p>
              <MarketingOffer
                promoType={ campaignType }
                offerCode={ offerCode }
                amount={ amount }
                branchPhone={ branchCno }
                branchName={ branchName }
                dateExpiration={ expiryDate }
              ></MarketingOffer>
              <p>
                Sincerely,<br></br>
                { branchManager }
                <br></br>
                { branchName }
                <br></br>
                { branchCno }
              </p>
            </Grid>
            <PreScreen offerData={ userOfferData }></PreScreen>
            <Grid className="apply-offer">
              <p>Yes, I want to apply for this offer</p>
              <ButtonPrimary
                id="ClaimButton"
                stylebutton='{"color":"", "textTransform": "none"}'
                onClick={ handleContinue }
              >
                Apply Now
              </ButtonPrimary>
              <p>We need more information from you to show you your offers.</p>
              <p> Please click continue to tell us more about yourself.</p>
            </Grid>
            <Grid className="offerInfo">
              <h3>
                *SEE BELOW FOR IMPORTANT OFFER INFORMATION.
              </h3>
            </Grid>
            <AboutMariner></AboutMariner>
            <OptOutNotice offerData={ userOfferData }></OptOutNotice>
            <Disclaimer offerData={ userOfferData }></Disclaimer>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
