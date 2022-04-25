import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material/DialogContent';
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useQuery } from 'react-query';
import { NavLink, useNavigate } from "react-router-dom";
import adBanner from "../../../assets/gallery/adBanner3.jpg";
import MortgageBanner from "../../../assets/gallery/mortgageBanner3.jpg";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
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
  const [ currentLoan, setCurrentLoan ] = useState(true);
  // Get Branch API data
  const { data: branchApiStatus } = useQuery('my-branch', MyBranchAPI);
  let myBranchData = branchApiStatus?.data;
  const branchCno = myBranchData?.PhoneNumber ?? "";
  const branchName = myBranchData?.branchName ? (`${ myBranchData?.branchName } Branch`) : "";
  const branchManager = myBranchData?.branchmanager ?? "";
  const { data: dataAccountOverview } = useQuery('loan-data', usrAccountDetails);

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
  }, [ userOfferData ]);


  useEffect(() => {
    const userAccountStatus = dataAccountOverview?.data?.customer?.user_account?.status;
    let activeLoan = dataAccountOverview?.data?.applicants;
    const presenceOfLoan = activeLoan?.some((applicant) => applicant.isActive && applicant?.status !== "referred" && applicant?.status !== "contact_branch");
    setCurrentLoan(presenceOfLoan || userAccountStatus === "closed" ? true : false);
  }, [ dataAccountOverview, currentLoan ])


  const showModal = () => setInitModal(true);
  const closeModal = () => setInitModal(false);
  const handleContinue = () => navigate("/select-amount");

  //View
  return (
    <div id="limitedOfferWrap" className="limitedOfferWrap">
      <Grid container id="overviewWrap" className="overviewWrap">
        <Grid item sm={6} md={6} xs={12} lg={6} xl={6} className="imageholdernewtop">

          <Grid className="imageholdernew">
            <div className="yellowBackground">
              <img
                className="bannerImage"
                src={adBanner}
                data-testid="background"
                alt="ad_banner"
              />
              <div className="secondGrid">
                {userOfferData.isLoading ? (
                  <CircularProgress />
                ) : userOfferAmount ? (
                  <div id="offerText">
                    <p id="loanText">You may have money available now! Up to </p>
                    <p id="loanPercent">
                      <NumberFormat
                        value={userOfferAmount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </p>
                    <ButtonPrimary
                      onClick={showModal}
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
                      state={{ from: "user" }}
                      onClick={(event) => {
                        currentLoan ? event.preventDefault() : "";
                      }}
                    >
                      <ButtonPrimary
                        id="claimButton"
                        stylebutton='{"color":"", "textTransform": "none"}'
                        disabled={currentLoan}
                      >
                        Apply for a Loan
                      </ButtonPrimary>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid className="secondBannerWrapNewtop" item sm={6} md={6} xs={12} lg={6} xl={6}>

          <Grid className="secondBannerWrapNew" >
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.marinerfinance.com/apply-home-loan/?utm_source=CAC&utm_medium=panel&utm_campaign=Mrktoffer_Mortgage"
            >
              <img
                className="secondBannerImage"
                src={MortgageBanner}
                data-testid="background"
                alt="mortgage_banner"
              />
            </a>
          </Grid>
        </Grid>
      </Grid>

      <Dialog maxWidth="lg" open={initModal}>
        <DialogContent className="dialogContentWrap">
          <IconButton
            id="debitCardDialogClose"
            aria-label="close"
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>
          <Grid className="popupHeading">
            <h2>The money you need, when you need it!</h2>
            <h4>When life happens, we have your back*</h4>
          </Grid>
          <Grid id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid>
              <p className="common">Dear {firstName},</p>
              <MarketingOffer
                promoType={campaignType}
                offerCode={offerCode}
                amount={amount}
                branchPhone={branchCno}
                branchName={branchName}
                dateExpiration={expiryDate}
              ></MarketingOffer>
              <p>
                Sincerely,<br></br>
                {branchManager}
                <br></br>
                {branchName}
                <br></br>
                {branchCno}
              </p>
            </Grid>
            <PreScreen offerData={userOfferData}></PreScreen>
            <Grid className="apply-offer">
              <p>Yes, I want to apply for this offer</p>
              <ButtonPrimary
                id="ClaimButton"
                stylebutton='{"color":"", "textTransform": "none"}'
                onClick={handleContinue}
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
            <OptOutNotice offerData={userOfferData}></OptOutNotice>
            <Disclaimer offerData={userOfferData}></Disclaimer>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
