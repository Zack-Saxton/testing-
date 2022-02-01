import React from "react";
import badge from "../../../assets/images/badge.png";
import Logo from "../../../assets/images/MarinerLogo.png";
import ConsumerDialog from "../ConsumerFooterDialog/ConsumerDialog";
import "./Footer.css";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";


export default function Footer() {
  const [ consumer, setConsumer ] = React.useState(false);
  //Consumer popup
  const handleOpenConsumer = () => {
    setConsumer(true);
  };
  //View Part
  return (
    <div >
      <footer style={ { width: "100%" } }>
        <section className="section-top" >
          <div className="col">
            <div className="main-footer-content">
              <a target="_blank" rel="noreferrer" href="https://www.marinerfinance.com/resources/legal/community-guidelines/" className="hrefTag">
                Community Guidelines
              </a>
            </div>
            <div className="main-footer-content">
              <a target="_blank" rel="noreferrer" href="https://www.marinerfinance.com/resources/legal/privacy-statement/" className="hrefTag">
                Privacy Statement
              </a>
            </div>
            <div className="main-footer-content">
              <a target="_blank" rel="noreferrer" href="https://www.marinerfinance.com/resources/legal/terms-of-use/" className="hrefTag">
                Terms of Use
              </a>
            </div>
            <div className="main-footer-content">
              <a target="_blank" rel="noreferrer" href="https://www.marinerfinance.com/resources/legal/licensing-disclosures/" className="hrefTag">
                Licensing & Disclosures
              </a>
            </div>
            <div className="main-footer-content">
              <a target="_blank" rel="noreferrer" href="https://www.marinerfinance.com/resources/legal/texting-terms-of-use/" className="hrefTag">
                Texting Terms of Use
              </a>
            </div>
            <div className="main-footer-content">
              <a target="_blank" rel="noreferrer" href="https://www.marinerfinance.com/resources/legal/website-accessibility-statement/" className="hrefTag">
                Website Accessibility Statement
              </a>
            </div>

            <div className="main-footer-content">
            <NavLink to="/termsofuse" target="_blank" className="hrefTag">
              <Typography>
                CAC Terms of Use
              </Typography>
              </NavLink>
            </div>
            <div className="main-footer-content">
              <a target="_blank" rel="noreferrer" href="https://www.marinerfinance.com/resources/legal/privacy-statement/#online-lending" className="hrefTag">
                For California Residents Do Not Sell My
                personal Information
              </a>
            </div>
          </div>

          <div className="col2">
            <div >
              <input type="image" src={ badge } alt="badge" id="badge" style={ { height: "100%" } } />
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

        <section className="section-bottom">
          <div>
            <span style={ { color: "white" } }>
              &copy; 2022 Mariner Finance All rights reserved.
            </span>
          </div>
        </section>
      </footer>
      <ConsumerDialog consumer={ consumer } onChange={ setConsumer } />
    </div>
  );
}
