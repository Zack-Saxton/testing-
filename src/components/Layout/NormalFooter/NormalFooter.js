import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { NavLink } from "react-router-dom";
import housingImage from "../../../assets/images/equal_Housing_Lender.png";
import badge from "../../../assets/images/FeefoRatting.png";
import Logo from "../../../assets/images/mf-logo.png";
import ConsumerDialog from "../ConsumerFooterDialog/ConsumerDialog";
import "./NormalFooter.css";

export default function NormalFooter() {
  const [ consumer, setConsumer ] = React.useState(false);
  //Consumer popup
  const handleOpenConsumer = () => {
    setConsumer(true);
  };

  //View Part
  return (
    <div style={ { background: "#d7e6ed" } }>
      <footer style={ { width: "100%" } }>
        <Grid className="mainFooterWrap">

          <Grid className="footerWrap" container>
            <Grid item xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 }>
              <div className="footer-content">
                <NavLink to="/communityGuidelines" target="_blank" className="hrefTag">
                  <Typography className="normalFooterFont">
                    Community Guidelines
                  </Typography>
                </NavLink>
              </div>
              <div className="footer-content">
                <NavLink to="/privacyStatement" target="_blank" className="hrefTag">
                  <Typography className="normalFooterFont">
                    Privacy Statement
                  </Typography>
                </NavLink>
              </div>
              <div className="footer-content">
                <NavLink to="/termsofuse" target="_blank" className="hrefTag">
                  <Typography className="normalFooterFont">
                    Terms of Use
                  </Typography>
                </NavLink>
              </div>
              <div className="footer-content">
                <NavLink to="/licenseDisclosure" target="_blank" className="hrefTag">
                  <Typography className="normalFooterFont">
                    Licensing & Disclosures
                  </Typography>
                </NavLink>
              </div>
              <div className="footer-content">
                <NavLink to="/textingTermsOfUse" target="_blank" className="hrefTag">
                  <Typography className="normalFooterFont">
                    Texting Terms of Use
                  </Typography>
                </NavLink>
              </div>
            </Grid>

            <Grid item xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 }>

              <div className="footer-content">
                <NavLink to="/websiteAccessibility" target="_blank" className="hrefTag">
                  <Typography className="normalFooterFont">
                    Website Accessibility Statement
                  </Typography>
                </NavLink>
              </div>
              <div className="footer-content">
                <NavLink to="/cac-termsofuse" target="_blank" className="hrefTag">
                  <Typography className="normalFooterFont">
                    CAC Terms of Use
                  </Typography>
                </NavLink>
              </div>
              <div className="footer-content">
                <NavLink to="/californiaResident" target="_blank" className="hrefTag">
                  <Typography className="normalFooterFont">
                    For California Residents Do Not Sell My
                    personal Information
                  </Typography>
                </NavLink>
              </div>
            </Grid>

            <Grid className="feefoBadgeWrap" item xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 }>
              <img type="image"
                src={ badge }
                alt="photo"
              />
            </Grid>

          </Grid>

          <Grid >

            <Grid container className="bottomSectionWrap" >
              <Grid className="FooterLogo" item xs={ 12 } sm={ 12 } md={ 2 } lg={ 2 }>
                <img type="image" id="mfInfoImg" src={ Logo } alt="logo image" />
              </Grid>

              <Grid className="footerPadding footerTextInfo" item xs={ 12 } sm={ 12 } md={ 8 } lg={ 8 } >
                <div>
                  <p className="leftAlignAddress">
                    Mariner Finance, LLC, NMLS No. 166564{ ' ' }
                    <span style={ { margin: "0", cursor: "pointer" } } onClick={ handleOpenConsumer }>
                      (www.nmlsconsumeraccess.com)
                    </span>
                    { ' ' }
                    8211 Town Center Drive,
                    Nottingham, MD 21236;
                    Telephone Number -
                    <a href="tel:+8773102373" className="hrefTag ">
                      &nbsp; (877) 310-2373
                    </a>
                  </p>
                </div>
              </Grid>

              <Grid className="footerPadding FooterHousingLogo" item xs={ 12 } sm={ 12 } md={ 2 } lg={ 2 }>
                <img type="image" src={ housingImage } alt="logo image" />
              </Grid>

            </Grid>
          </Grid>

        </Grid>

      </footer>
      <ConsumerDialog consumer={ consumer } onChange={ setConsumer } />
    </div>
  );
}
