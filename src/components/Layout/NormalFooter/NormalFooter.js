import React from "react";
import "./normalfooter.css";
import badge from "../../../assets/images/badge.png";
import Logo from "../../../assets/images/MarinerLogo.png";

export default function NormalFooter() {
  //View Part
  return (
    <div>
      <footer style={{ width: "100%" }}>
        <section class="section-top">
          <div class="col">
            <div class="footer-content">
              <a href="/#" class="hreftag">
                Community Guidelines
              </a>
            </div>
            <div class="footer-content">
              <a href="/#" class="hreftag">
                Privacy Statement
              </a>
            </div>
            <div class="footer-content">
              <a href="/#" class="hreftag">
                Terms of Use
              </a>
            </div>
            <div class="footer-content">
              <a href="/#" class="hreftag">
                Liscence & disclosures
              </a>
            </div>
            <div class="footer-content">
              <a href="/#" class="hreftag">
                Testing Terms of Use
              </a>
            </div>
            <div class="footer-content">
              <a href="/#" class="hreftag">
                Website Accessibility Statement
              </a>
            </div>
            <div class="footer-content">
              <a href="/#" class="hreftag">
                CAC Terms Of Use For California Residents Do Not Sell My
                personal Information
              </a>
            </div>
          </div>

          <div class="col">
            <div>
              <img
                src={badge}
                alt="badge"
                id="badge"
                style={{ height: "90px" }}
              />
            </div>
            <div>
              <img
                src={Logo}
                alt="logoimage"
                id="logoimage"
                style={{ height: "60px" }}
              />
            </div>
          </div>

          <div class="col">
            <div>
              <p class="leftalign">
                Mariner Finance, LLC, NMLS No. 166564
                <br />
                <a href="https://www.nmlsconsumeraccess.org/" class=" hreftag">
                  (www.nmlsconsumeraccess.com)
                </a>
                <br />
                8211 Town Center Drive,
                <br /> Nottingham, MD 21236; <br />
                Telephone Number -
                <a href="tel:+8773102373" class="hreftag ">
                  &nbsp; 877-310-2373
                </a>
              </p>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
}
