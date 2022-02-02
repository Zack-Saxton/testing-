import Typography from "@material-ui/core/Typography";
import React from "react";
import { NavLink } from "react-router-dom";
import badge from "../../../assets/images/badge.png";
import Logo from "../../../assets/images/MarinerLogo.png";
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
        <section className="section-top-normal-footer">
          <div className="col">
            <div className="footer-content">
            <NavLink to="/communityGuidelines" target="_blank" className="hrefTag">
                <Typography>
                  Community Guideliness
                </Typography>
              </NavLink>
            </div>
            <div className="footer-content">
            <NavLink to="/privacyStatement" target="_blank" className="hrefTag">
                <Typography>
                  Privacy Statement
                </Typography>
              </NavLink>
            </div>
            <div className="footer-content">
            <NavLink to="/termsofuse" target="_blank" className="hrefTag">
                <Typography>
                  Terms of Use
                </Typography>
              </NavLink>
            </div>
            <div className="footer-content">
            <NavLink to="/licenseDisclosure" target="_blank" className="hrefTag">
                <Typography>
                Licensing & Disclosures
                </Typography>
              </NavLink>              
            </div>
            <div className="footer-content">
              <NavLink to="/textingTermsOfUse" target="_blank" className="hrefTag">
                <Typography>
                Texting Terms of Use
                </Typography>
              </NavLink> 
            </div>
            <div className="footer-content">              
              <NavLink to="/websiteAccessibility" target="_blank" className="hrefTag">
                <Typography>
                Website Accessibility Statement
                </Typography>
              </NavLink>
            </div>
            <div className="footer-content">
              <NavLink to="/cac-termsofuse" target="_blank" className="hrefTag">
                <Typography>
                  CAC Terms of Use
                </Typography>
              </NavLink>
            </div>
            <div className="footer-content">
              <NavLink to="/californiaResident" target="_blank" className="hrefTag">
                <Typography>
                For California Residents Do Not Sell My
                personal Information
                </Typography>
              </NavLink>
            </div>
          </div>

          <div className="col2">
            <div>
              <input type="image"
                src={ badge }
                alt="photo"
                id="badge"
                style={ { height: "100%" } }
              />
            </div>

            <div id="mfInfo" className="row" style={ { display: "flex", paddingTop: "15px", paddingBottom: "15px", paddingLeft: "25px" } }>
              <input type="image" id="mfInfoImg" src={ Logo } alt="logo image" style={ { height: "100%", paddingRight: "25px" } } />
              <div className="row">
                <div style={ { paddingTop: "15px", paddingBottom: "15px", } }>
                  <p className="leftAlignAddress">
                    Mariner Finance, LLC, NMLS No. 166564
                    <span style={ { margin: "0", cursor: "pointer" } } onClick={ handleOpenConsumer }>
                      (www.nmlsconsumeraccess.com)
                    </span>
                    <br />
                    8211 Town Center Drive,
                    Nottingham, MD 21236; <br />
                    Telephone Number -
                    <a href="tel:+8773102373" className="hrefTag ">
                      &nbsp; (877) 310-2373
                    </a>
                  </p>
                </div>

              </div>
            </div>
          </div>

        </section>
      </footer>
      <ConsumerDialog consumer={ consumer } onChange={ setConsumer } />
    </div>
  );
}
