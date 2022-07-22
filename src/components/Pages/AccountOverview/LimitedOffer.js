import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material/DialogContent';
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useQuery } from 'react-query';
import { NavLink, useNavigate } from "react-router-dom";
import adBanner from "../../../assets/gallery/adBanner3.jpg";
import MortgageBanner from "../../../assets/gallery/Mortgage-Loan-Banner-Small-b.png";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import MyBranchAPI from "../../Controllers/MyBranchController";
import { ButtonPrimary, ButtonSecondary } from "../../FormsUI";
import "./AccountOverview.css";
import AboutMariner from "./Marketing_offer/AboutMariner";
import Disclaimer from "./Marketing_offer/Disclaimer";
import MarketingOffer from "./Marketing_offer/MarketingOffer";
import OptOutNotice from "./Marketing_offer/OptOutNotice";
import PreScreen from "./Marketing_offer/PreScreen";
import { useStylesAccountOverview } from "./Style";
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
  const classes = useStylesAccountOverview()

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
    <div id="limitedOfferWrap" className="limitedOfferWrap" data-testid="limited_offer">
      <Grid container id="overviewWrap" className="overviewWrap">
        <Grid item sm={6} md={6} xs={12} lg={6} xl={6} className="imageholdernewtop">

          <Grid className="imageholdernew">
            <Grid className="yellowBackground">
              <Grid container data-testid = "bannerGrid" item md={6} lg={6}>

                <img
                  className="bannerImage"
                  src={adBanner}
                  data-testid="background"
                  alt="ad_banner"
                />
              </Grid>
              <Grid item md={6} lg={6} className="secondGrid">
                {userOfferData.isLoading ? (
                  <CircularProgress />
                ) : userOfferAmount ? (
                  <div data-testid = "offerText" id="offerText">

                    <Grid className="offerTextWrap">

                      <Typography id="personalText" variant="h6" color="initial">
                        You may have money available now! Up to
                      </Typography>
                      <NumberFormat
                        id="offerMoney"
                        data-testid = "offerMoney"
                        name = "offerMoney"
                        value={userOfferAmount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </Grid>
                    <Grid id="applyForLoanLink">

                      <ButtonPrimary
                        onClick={showModal}
                        id="applyForLoanButton"
                        data-testid = "checkMyOfferButton"
                        stylebutton='{"color":""}'
                      >
                        Check My Offer
                      </ButtonPrimary>
                    </Grid>
                  </div>
                ) : (
                  <div className="offerTextTwo" data-testid = "offerTextTwo" id="offerText">

                    <Grid className="offerTextWrap">
                      <Typography id="personalText" variant="h6" color="initial">
                        Personal loans <br /> with a personal touch
                      </Typography>
                    </Grid>
                    <NavLink
                      id="applyForLoanLink"
                      to="/customers/applyForLoan"
                      state={{ from: "user" }}
                      onClick={(event) => {
                        currentLoan && event.preventDefault();
                      }}
                    >
                      <ButtonPrimary
                        id="applyForLoanButton"
                        stylebutton='{"color":"", "textTransform": "none"}'
                        disabled={currentLoan}
                        data-testid = "applyForLoanButton"
                      >
                        Apply for a Loan
                      </ButtonPrimary>
                    </NavLink>
                    <small>
                      <i className="disclosureLink">*Important disclosure information </i>
                    </small>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="secondBannerWrapNewtop" item sm={6} md={6} xs={12} lg={6} xl={6}>
          <Grid className="imageholdernew">
            <Grid className="greyBackgroundHolder">
              <Grid className={classes.secondBannerImage} container item md={5}>
                <img
                  className="secondBannerImage"
                  src={MortgageBanner}
                  data-testid="mortgage_banner"
                  alt="mortgage_banner"
                />
              </Grid>
              <Grid className="mortgageText" data-testid = "mortgageText" container item md={7} >
                <Typography className="mortgageHeading" variant="h4">
                  Put Your Home{"'"}s <br /> Equity To Work!
                </Typography>
                <Typography className="mortgageParagraph" variant="h6">
                  refinance your mortgage
                </Typography>
                <Grid className="buttonSecondaryWrap" container>
                  <a rel="noreferrer" target="_blank" href="https://www.marinerfinance.com/apply-home-loan/?utm_source=CAC&utm_medium=panel&utm_campaign=Mrktoffer_Mortgage" alt="mortgage link">
                    <ButtonSecondary
                      id="applyNowButton"
                      data-testid = "mortgageApplyNowbutton"
                      stylebutton='{"color":"", "textTransform": ""}'
                    >
                      Apply Now
                    </ButtonSecondary>
                  </a>
                </Grid>
                <Typography className="adText">
                  <small>
                    <i className="disclosureLink">No payments until Sep 2022*</i>
                  </small>

                </Typography>
              </Grid>
            </Grid>
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
          <Grid data-testid = "popUpheading" className="popupHeading">
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
              data-testid = "popupApplyNowButton"
                id="applyForLoanButton"
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
