import React from "react";
import "./Footer.css";
import badge from "../../../assets/images/badge.png";
import Logo from "../../../assets/images/MarinerLogo.png";
//Styling Part

export default function Footer() {
  //View Part
  return (
    <div >
      <footer style={{ width: "100%" }}>
        <section className="section-top" >
          <div className="col">
            <div className="main-footer-content">
              <a href="/#" className="hrefTag">
                Community Guidelines
              </a>
            </div>
            <div className="main-footer-content">
              <a href="/#" className="hrefTag">
                Privacy Statement
              </a>
            </div>
            <div className="main-footer-content">
              <a href="/#" className="hrefTag">
                Terms of Use
              </a>
            </div>
            <div className="main-footer-content">
              <a href="/#" className="hrefTag">
                Licence & disclosures
              </a>
            </div>
            <div className="main-footer-content">
              <a href="/#" className="hrefTag">
                Testing Terms of Use
              </a>
            </div>
            <div className="main-footer-content">
              <a href="/#" className="hrefTag">
                Website Accessibility Statement
              </a>
            </div>
            <div className="main-footer-content">
              <a href="/#" className="hrefTag">
                CAC Terms Of Use For California Residents Do Not Sell My
                personal Information
              </a>
            </div>
          </div>

          <div className="col">
            <div >
            <input type="image" src={badge} alt="badge" id= "badge" style={{ height: "90px" }} />
            </div>
            <div id="mfInfo" className="row" style={{display:"flex",paddingTop:"15px",paddingBottom:"15px",paddingLeft:"25px"}}>
            <input type="image" id="mfInfoImg" src={Logo} alt="logo image" style={{ height: "60px",paddingRight:"25px" }} />
            <div className="row">
            <div style={{paddingTop:"15px",paddingBottom:"15px",}}>
              <p className="leftAlign">
                Mariner Finance, LLC, NMLS No. 166564
                <br />
                <a
                  href="https://www.nmlsconsumeraccess.org/"
                  target="_blank"
                  className=" hrefTag"
                  rel="noreferrer"
                >
                  (www.nmlsconsumeraccess.com)
                </a>
                <br />
                8211 Town Center Drive,
                <br /> Nottingham, MD 21236; <br />
                Telephone Number -
                <a href="tel:+8773102373" className="hrefTag ">
                  &nbsp; 877-310-2373
                </a>
              </p>
            </div>
          </div>
            </div>
          </div>

        </section>

        <section className="section-bottom">
          <div>
            <span style={{ color: "white" }}>
              &copy; 2020 Mariner Finance All rights reserved.
            </span>
          </div>
        </section>
      </footer>
    </div>
  );
}
