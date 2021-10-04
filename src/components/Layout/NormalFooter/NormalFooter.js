import React from "react";
import "./NormalFooter.css";
import badge from "../../../assets/images/badge.png";
import Logo from "../../../assets/images/MarinerLogo.png";

export default function NormalFooter() {
  //View Part
  return (
    <div>
      <footer style={{ width: "100%" }}>
        <section className="section-top-normal-footer">
          <div className="col">
            <div className="footer-content">
              <a href="/#" className="hrefTag">
                Community Guidelines
              </a>
            </div>
            <div className="footer-content">
              <a href="/#" className="hrefTag">
                Privacy Statement
              </a>
            </div>
            <div className="footer-content">
              <a href="/#" className="hrefTag">
                Terms of Use
              </a>
            </div>
            <div className="footer-content">
              <a href="/#" className="hrefTag">
                Licence & disclosures
              </a>
            </div>
            <div className="footer-content">
              <a href="/#" className="hrefTag">
                Testing Terms of Use
              </a>
            </div>
            <div className="footer-content">
              <a href="/#" className="hrefTag">
                Website Accessibility Statement
              </a>
            </div>
            <div className="footer-content">
              <a href="/#" className="hrefTag">
                CAC Terms Of Use For California Residents Do Not Sell My
                personal Information
              </a>
            </div>
          </div>

          <div className="">
            <div>
            <input type="image"
                src={badge}
                alt="photo"
                id="badge"
                style={{ height: "90px" }}
              />
            </div>
            <div className="col">
              <div className="row" style={{display:"flex",paddingTop:"15px",paddingBottom:"15px",paddingLeft:"25px"}}>
              <input type="image" src={Logo} alt="logo image" style={{ height: "60px",paddingRight:"25px" }} />
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
          </div>

          
        </section>
      </footer>
    </div>
  );
}
