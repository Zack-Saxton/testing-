import React from "react";
import "./footer.css";
import badge from "../../../assets/images/badge.png";
import logoimage from "../../../assets/images/Normallogo.png";

//Styling Part

export default function Footer() {
  //View Part
  return (
    <div>
      <footer style={{ "width": "100%"  }}>
        <section class="section-top">
        <div class="col">
            <div class="footer-content"><a href="#" class="hreftag">Community Guidelines</a></div>
            <div class="footer-content"><a href="#" class="hreftag">Privacy Statement</a></div>
            <div class="footer-content"><a href="#" class="hreftag">Terms of Use</a></div>
            <div class="footer-content"><a href="#" class="hreftag">Liscence & disclosures</a></div>
            <div class="footer-content"><a href="#" class="hreftag">Testing Terms of Use</a></div>
            <div class="footer-content"><a href="#" class="hreftag">Website Accessibility Statement</a></div>
            <div class="footer-content"><a href="#" class="hreftag">
              CAC Terms Of Use For California Residents Do Not Sell My personal
              Information
              </a></div>
          </div>

          <div class="col">
            <div>
              <img src={badge} alt="badge" style={{ height: "60px" }} />
            </div>
            <div>
              
              <img src={logoimage} alt="logoimage" style={{ height: "60px" }} />
            </div>
          </div>

          <div class="col">
            <div>
              <p class="left-align">
                Mariner Finance, LLC, NMLS No. 166564
                <a
                  href="https://www.nmlsconsumeraccess.org/"
                  target="_blank"
                  class=" "
                >
                  (www.nmlsconsumeraccess.com)
                </a>
                <br />
                8211 Town Center Drive,
                <br /> Nottingham, MD 21236; <br />
                Telephone Number
                <a href="tel:+8773102373" class=" ">
                  877-310-2373
                </a>
              </p>
            </div>
          </div>
        </section>

        <section class="section-bottom">
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
