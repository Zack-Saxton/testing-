import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import housingImage from "../../../assets/images/equal_Housing_Lender.png";
import badge from "../../../assets/images/FeefoRatting.png";
import Logo from "../../../assets/images/mf-logo.png";
import ConsumerDialog from "../ConsumerFooterDialog/ConsumerDialog";
import SocialMediaDialog from "../ConsumerFooterDialog/SocialMediaDialog";
import "./Footer.css";

export default function Footer() {
  const [ consumer, setConsumer ] = useState(false);
  const [ socialMedia, setSocialMedia ] = useState(false);
  const [ URL, setURL] = useState('');
  //Consumer popup
  const handleOpenConsumer = () => {
    setConsumer(true);
  };
  // Social media redirect popup
  const handleOpensocialMedia = (customUrl) => {
    setURL(customUrl);
    setSocialMedia(true);
  };

  //View Part
  return (
    <div data-testid="prelogin_footer_component">
      <footer id="mainFooter">
        <Grid className="FooterGridWrap">
              <Grid className="FooterLogo" item xs={12} sm={12} md={2} lg={2}>
                {Logo ? <img type="image" id="mfInfoImg" src={Logo} alt="logo image" /> : ''}                
              </Grid>
          <Grid className="footerWrap" container>
            <Grid item xs={12} sm={12} md={3} lg={2.5}>
            <Grid className="linkHeadings">
              <strong>
                Privacy Policy
              </strong>
              </Grid>
              <div className="footer-content">
                <NavLink
                  to="/communityGuidelines"
                  className="hrefTag"
                >
                  <Typography className="normalFooterFont">
                    Community Guidelines
                  </Typography>
                </NavLink>
              </div>
              <div className="footer-content" >
              <a href={`${ process.env.REACT_APP_WEBSITE }/resources/legal/#fusion-tab-privacystatement`} rel="noreferrer" className="hrefTag privacyStatementWeb" data-testid="privacyStatementWeb">
                  <Typography className="normalFooterFont">
                    Privacy Statement
                  </Typography>
                </a>
                <a href={`${ process.env.REACT_APP_WEBSITE }/resources/legal/#mobile-fusion-tab-privacystatement`} rel="noreferrer" className="hrefTag privacyStatementMobile" data-testid="privacyStatement">
                  <Typography className="normalFooterFont">
                    Privacy Statement
                  </Typography>
                </a>
              </div>
              <div className="footer-content">
                <NavLink to="/termsofuse" className="hrefTag" data-testid="termsofuse">
                  <Typography className="normalFooterFont">
                    Terms of Use
                  </Typography>
                </NavLink>
              </div>
              <div className="footer-content">
                <NavLink data-testid="licenseDisclosure"
                  to="/licenseDisclosure"
                  className="hrefTag"
                >
                  <Typography className="normalFooterFont">
                    Licensing & Disclosures
                  </Typography>
                </NavLink>
              </div>
              <div className="footer-content">
                <NavLink data-testid="textingTermsOfUse"
                  to="/textingTermsOfUse"
                  className="hrefTag"
                >
                  <Typography className="normalFooterFont">
                    Texting Terms of Use
                  </Typography>
                </NavLink>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={5}>
              <Grid className="linkHeadings">
                <strong>
                  Website Terms
                </strong>
              </Grid>
              <div className="footer-content">
                <NavLink data-testid="websiteAccessibility"
                  to="/websiteAccessibility"
                  className="hrefTag"
                >
                  <Typography className="normalFooterFont">
                    Website Accessibility Statement
                  </Typography>
                </NavLink>
              </div>
              <div className="footer-content">
                <NavLink to="/cac-termsofuse" className="hrefTag" data-testid="cac-termsofuse">
                  <Typography className="normalFooterFont">
                    CAC Terms of Use
                  </Typography>
                </NavLink>
              </div>
              <div className="footer-content">
                <a data-testid="californiaResident"
                  href={`${ process.env.REACT_APP_WEBSITE }/california-consumer-privacy-act-ccpa-request/`}
                  rel="noreferrer"
                  className="hrefTag"
                >
                  <Typography className="normalFooterFont">
                    For California Residents Do Not Sell My personal Information
                  </Typography>
                </a>
              </div>
              <div className="footer-content">
                <a data-testid="sitemap"
                  href={`https://${ process.env.REACT_APP_HOST_NAME }/sitemap.xml`}
                  rel="noreferrer"
                  target="_blank"
                  className="hrefTag"
                >
                  <Typography className="normalFooterFont">
                    Sitemap
                  </Typography>
                </a>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Grid className="linkHeadings">
                <strong>
                  Global HQ
                </strong>
              </Grid>
              <Grid>
                <Typography className="adressFooterFont">
                  <span>
                    8211 Town Center Drive
                  </span>
                  <br/> 
                  <span>
                    Nottingham, MD 21236, USA
                  </span>
                </Typography>
              </Grid>

              <Grid className="contactUs">
              <Grid className="linkHeadings">
                <strong>
                  Contact Us
                </strong>
              </Grid>
              <Typography className="adressFooterFont">
                Phone:
                  <a href="tel:+18773102373" className="hrefTag ">
                      &nbsp;+1 877 310 2373
                    </a>
                </Typography>
              </Grid>
            </Grid>

            <Grid className="stayConnected" item xs={12} sm={12} md={2} lg={1.5}>
              <Grid className="linkHeadings">
                <strong>
                  Stay Connected
                </strong>
              </Grid>
              <Grid className="footerSocialIconsWrap">
                <span data-testid="facebookIcon">
                  <IconButton
                  id = "facebookIcon"
                  aria-label = "facebookIcon"
                  onClick={()=>{
                    handleOpensocialMedia("https://www.facebook.com/MarinerFinance/")
                  }}
                  className="footerSocialIcons">
                    <FacebookIcon />
                  </IconButton>
                </span>
                <span data-testid="twitterIcon">
                  <IconButton
                  id = "twitterIcon"
                  aria-label="twitterIcon"
                    onClick={()=>{
                      handleOpensocialMedia("https://twitter.com/MarinerFinance")
                    }}
                    className="footerSocialIcons">
                    <TwitterIcon />
                  </IconButton>
                </span>
                <span data-testid="linkedInIcon">
                  <IconButton 
                  id="linkedIcon"
                  aria-label="linkedIcon"
                  onClick={()=>{
                    handleOpensocialMedia("https://www.linkedin.com/company/mariner-finance/")
                  }}
                  className="footerSocialIcons">
                    <LinkedInIcon />
                  </IconButton>
                </span>
              </Grid>
            </Grid>
          </Grid>

          <Grid container className="californiaVirginiaGrid">
          <Grid item md={3} lg={3.5} className="californiaGrid">
              <Grid className="linkHeadings">
                <strong>
                  California Residents
                </strong>
              </Grid>
              <Grid>
                <Typography className="adressFooterFont">
                  <span>
                    Loans made or arranged pursuant to a 
                  </span>
                  <br></br>
                  <span>
                    California Financing Law license.
                  </span>
                </Typography>
              </Grid>
          </Grid>
          <Grid item lg={8.5}>
              <Grid className="linkHeadings">
                <strong>
                VA Residents
                </strong>
              </Grid>
              <Grid>
                <Typography className="adressFooterFont">
                  <span>
                    Mariner Finance of Virginia. LLC, Licensed by the Virginia State Corporation
                  </span>
                  <br></br>
                    <span>
                    Commission, Consumer Finance Company License No.CFI-114.
                    </span>
                </Typography>
              </Grid>
          </Grid>
          </Grid>

          <Grid>
            <Grid container id="mfInfo" className="row">
             <Grid className="feefoBadgeWrap" item xs={12} sm={12} md={3} lg={3}>
              {badge ? <img type="image" width="1000" src={badge} alt="photo" id="badge" /> : ''}              
            </Grid>
              <Grid className="footerPadding row" item xs={12} sm={12} md={6} lg={6}>
                <div >
                  <p className="leftAlignAddress">
                    Mariner Finance, LLC, NMLS No. 166564
                    <span
                      className="spanLeftAlignAddress"
                      onClick={handleOpenConsumer}
                    >
                      {' '}(www.nmlsconsumeraccess.com){' '}
                    </span>
                  </p>
                </div>
              </Grid>

              <Grid className="footerPadding FooterHousingLogo" item xs={12} sm={12} md={3} lg={3}>
                {housingImage ?
                <img
                type="image"
                id="housingImage"
                src={housingImage}
                alt="logo image"
              />
                : 
                ''}
                
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </footer>

      <footer className="bottomBar">
        <div className="footer-copyright">
          <div className="footerText">
            <span>
              &#169; {new Date().getFullYear()}{' '}
              <Link className="footerHomeLink" to="/customers/accountOverview" >
                Mariner Finance
              </Link>{" "}
              All rights reserved.
            </span>
          </div>
        </div>
      </footer>
      <ConsumerDialog consumer={consumer} onChange={setConsumer} />
      <SocialMediaDialog URL={URL} socialMedia={socialMedia} onChange={setSocialMedia} />
    </div>
  );
}
