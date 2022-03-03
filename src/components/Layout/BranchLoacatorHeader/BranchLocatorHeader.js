import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from '@material-ui/icons/Menu';
import Logo from "../../../assets/images/mf-logo.png";
import { ButtonPrimary } from "../../FormsUI";
import { useStyles } from "../BranchLoacatorHeader/BranchLocatorStyle";
import "../Layout.css";
import Cookies from "js-cookie";

const BranchLocatorHeader = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const loginToken = JSON.parse(
    Cookies.get("token") ? Cookies.get("token") : "{ }"
  );
  const redirectToAccountOverview = () => {
    navigate("/customers/accountOverview");
  };
  const [ display , setdisplay ] = useState(true);


  //View Part
  return (
    <div id="headerWrap" className={classes.grow}>
      <AppBar id="MainHeaderWrap" position="static">
        <Toolbar className="branchLocatorHeaderToolBar">
          <Typography
            onClick={redirectToAccountOverview}
            className={classes.title}
          >
            <img
              style={{ marginTop: "6px" }}
              className={classes.logoFormat}
              src={Logo}
              alt="MF logo"
            />
          </Typography>
          {/* <div className={ classes.grow } /> */}
          <div id="desktopMenu" className={classes.sectionDesktop}>
            <Grid className="personalLoanHolder">
              <Typography className="branchHeaderLinks">
                Personal Loans
              </Typography>
              <Grid className="personalLoansubLinks">
                <Link href="https://wps-qa.marinerfinance.io/personal-loans/unexpected-expenses/">
                  Unexpected Expenses
                </Link>
                <Link href="https://wps-qa.marinerfinance.io/personal-loans/vacation-loans/">
                  Vacation Loans
                </Link>
                <Link href="https://wps-qa.marinerfinance.io/personal-loans/debt-consolidation-loans/">
                  Debt Consolidation Loans
                </Link>
                <Link href="https://wps-qa.marinerfinance.io/personal-loans/home-improvement-loans/">
                  Home Improvement Loans
                </Link>
                <Link href="https://wps-qa.marinerfinance.io/personal-loans/wedding-loans/">
                  Wedding Loans
                </Link>
              </Grid>
            </Grid>

            <Grid className="carLoansHolder">
              <Typography className="branchHeaderLinks">Car Loans</Typography>

              <Grid className="carLoanSubLinks">
                <Link href="https://wps-qa.marinerfinance.io/car-loans/auto-refinance/">
                  Auto Refinancing Loans
                </Link>
                <Link href="https://wps-qa.marinerfinance.io/car-loans/new-car-loan/">
                  Finance Car Loans
                </Link>
                <Link href="https://wps-qa.marinerfinance.io/car-loans/used-car-loan/">
                  Finance Used Car Loan
                </Link>
              </Grid>
            </Grid>

            <Grid className="homeLoansHolder">
              <Typography className="branchHeaderLinks">Home Loans</Typography>

              <Grid className="homeLoanSubLinks">
                <Link href="https://wps-qa.marinerfinance.io/car-loans/auto-refinance/">
                  Auto Refinancing Loans
                </Link>
                <Link href="https://wps-qa.marinerfinance.io/car-loans/new-car-loan/">
                  Finance Car Loans
                </Link>
                <Link href="https://wps-qa.marinerfinance.io/car-loans/used-car-loan/">
                  Finance Used Car Loan
                </Link>
              </Grid>
            </Grid>

            <Grid className="resourcesHolder">
              <Typography className="branchHeaderLinks">Resources</Typography>

              <Grid className="resourcesSubLinks">
                <Link href="https://wps-qa.marinerfinance.io/resources/how-to-apply/">
                  How to Apply for a Personal loan
                </Link>
                <Link href="/faq">FAQ</Link>
                <Link href="https://wps-qa.marinerfinance.io/blog/">Blog</Link>
                <Link href="https://wps-qa.marinerfinance.io/state/">
                  Mariner States
                </Link>
                <Link href="https://wps-qa.marinerfinance.io/resources/legal/">
                  Legal
                </Link>
              </Grid>
            </Grid>

            <Grid className="whyUsHolder">
              <Typography className="branchHeaderLinks">Why Us?</Typography>

              <Grid className="whyUsSubLinks">
                <Link href="https://wps-qa.marinerfinance.io/testimonials/">
                  Testimonials
                </Link>
                <Link href="https://wps-qa.marinerfinance.io/why-mariner-finance/mariner-finance-reviews/">
                  Mariner Finance Reviews
                </Link>
                <Link href="https://wps-qa.marinerfinance.io/why-mariner-finance/excellent-customer-service/">
                  Excellent Customer Service
                </Link>
                <Link href="https://wps-qa.marinerfinance.io/why-mariner-finance/history/">
                  Mariner Finance History
                </Link>

                <Grid className="subLinkDropdown">
                  <Link href="https://wps-qa.marinerfinance.io/why-mariner-finance/partner-with-us/">
                    Partner With Us
                  </Link>
                  <Grid className="subLinkList">
                    <Link href="https://wps-qa.marinerfinance.io/why-mariner-finance/partner-with-us/point-of-sale-financing/">
                      Point of Sale Financing
                    </Link>
                    <Link href="https://wps-qa.marinerfinance.io/why-mariner-finance/partner-with-us/corporate-acquisition/">
                      Corporate Acquisition
                    </Link>
                    <Link href="https://wps-qa.marinerfinance.io/why-mariner-finance/partner-with-us/">
                      Affiliate Program
                    </Link>
                  </Grid>
                </Grid>

                <Link href="https://wps-qa.marinerfinance.io/why-mariner-finance/community-outreach/">
                  Community Outreach
                </Link>

                <Grid className="subLinkDropdown">
                  <Link href="https://wps-qa.marinerfinance.io/careers/">
                    Careers
                  </Link>
                  <Grid className="subLinkList">
                    <Link href="https://wps-qa.marinerfinance.io/careers/branch-manager-trainee-and-internship-programs/">
                      Branch Manager Trainee and Internship programs
                    </Link>
                    <Link href="https://wps-qa.marinerfinance.io/careers/jobs-for-veterans/">
                      Jobs For Veterans
                    </Link>
                    <Link href="https://wps-qa.marinerfinance.io/careers/corporate-culture/">
                      Corporate Culture
                    </Link>
                    <Link href="https://wps-qa.marinerfinance.io/careers/benefits/">
                      Benefits
                    </Link>
                    <Link href="https://wps-qa.marinerfinance.io/careers/faq/">
                      FAQ
                    </Link>
                  </Grid>
                </Grid>
                <Link href="https://wps-qa.marinerfinance.io/sweepstakes/">
                  Sweepstakes
                </Link>
              </Grid>
            </Grid>

            <NavLink
              to="/select-amount/"
              className="nav_link branchHeaderLinks"
            >
              <Typography className={classes.subtitle}>Mail Offer?</Typography>
            </NavLink>
            {!loginToken.isLoggedIn ? (
              <NavLink to="/login" className="nav_link branchHeaderLinks">
                <Typography className={classes.subtitle}>Login</Typography>
              </NavLink>
            ) : null}
            <NavLink
              to="/customers/applyForLoan"
              className="nav_link branchHeaderLinksLast"
            >
              <ButtonPrimary
                id="Continue"
                stylebutton='{"fontSize":"1rem","fontWeight":"400","color":"#151147"}'
                target="_blank"
              >
                Check My Offers
              </ButtonPrimary>
            </NavLink>
          </div>
          <button
            onClick={(event) => {
              setdisplay(display ? false : true);
            }}
            className="menuHamburger"
          >
            <MenuIcon />
          </button>
          <Grid id="mainMobileMenu" className={display ? classes.hideSection : classes.showSection}>
            <Accordion className="noShadow">
              <AccordionSummary
                className="menuHead"
                expandIcon={<ExpandMoreIcon />}
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://wps-qa.marinerfinance.io/personal-loans/"
                >
                  Personal Loans
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://wps-qa.marinerfinance.io/personal-loans/unexpected-expenses/"
                  >
                    Unexpected Expenses
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://wps-qa.marinerfinance.io/personal-loans/vacation-loans/"
                  >
                    Vacation Loans
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://wps-qa.marinerfinance.io/personal-loans/debt-consolidation-loans/"
                  >
                    Debt Consolidation Loans
                  </a>

                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://wps-qa.marinerfinance.io/personal-loans/home-improvement-loans/"
                  >
                    Home Improvement Loans
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://wps-qa.marinerfinance.io/personal-loans/wedding-loans/"
                  >
                    Wedding Loans
                  </a>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion className="noShadow">
              <AccordionSummary
                className="menuHead"
                expandIcon={<ExpandMoreIcon />}
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://wps-qa.marinerfinance.io/car-loans/"
                >
                  Car Loans
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <Link href="https://wps-qa.marinerfinance.io/car-loans/auto-refinance/">
                    Auto Refinancing Loans
                  </Link>
                  <Link href="https://wps-qa.marinerfinance.io/car-loans/new-car-loan/">
                    Finance Car Loans
                  </Link>
                  <Link href="https://wps-qa.marinerfinance.io/car-loans/used-car-loan/">
                    Finance Used Car Loan
                  </Link>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion className="noShadow">
              <AccordionSummary
                className="menuHead"
                expandIcon={<ExpandMoreIcon />}
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://wps-qa.marinerfinance.io/car-loans/"
                >
                  Home Loans
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <Link href="https://wps-qa.marinerfinance.io/home-loans/mortgage-loans/">
                    Home Purchase
                  </Link>
                  <Link href="https://wps-qa.marinerfinance.io/home-loans/home-refinance/">
                    Home Refinance
                  </Link>
                  <Link href="https://wps-qa.marinerfinance.io/home-loans/meet-our-loan-officers/">
                    Meet Our Loan Officers
                  </Link>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion className="noShadow">
              <AccordionSummary
                className="menuHead"
                expandIcon={<ExpandMoreIcon />}
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://wps-qa.marinerfinance.io/resources/"
                >
                  Resources
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <Link href="https://wps-qa.marinerfinance.io/resources/how-to-apply/">
                    How to Apply for a Personal loan
                  </Link>
                  <Link href="/faq">FAQ</Link>
                  <Link href="https://wps-qa.marinerfinance.io/blog/">
                    Blog
                  </Link>
                  <Link href="https://wps-qa.marinerfinance.io/state/">
                    Mariner States
                  </Link>
                  <Link href="https://wps-qa.marinerfinance.io/resources/legal/">
                    Legal
                  </Link>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion className="noShadow">
              <AccordionSummary
                className="menuHead"
                expandIcon={<ExpandMoreIcon />}
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://wps-qa.marinerfinance.io/why-mariner-finance/"
                >
                  Why Us?
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <Link href="https://wps-qa.marinerfinance.io/testimonials/">
                    Testimonials
                  </Link>
                  <Link href="https://wps-qa.marinerfinance.io/why-mariner-finance/mariner-finance-reviews/">
                    Mariner Finance Reviews
                  </Link>
                  <Link href="https://wps-qa.marinerfinance.io/why-mariner-finance/excellent-customer-service/">
                    Excellent Customer Service
                  </Link>
                  <Link href="https://wps-qa.marinerfinance.io/why-mariner-finance/history/">
                    Mariner Finance History
                  </Link>

                  <Accordion className="borderTop">
                    <AccordionSummary className="menuHead" expandIcon={<ExpandMoreIcon />}>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://wps-qa.marinerfinance.io/why-mariner-finance/partner-with-us/"
                      >
                        Partner With Us
                      </a>
                    </AccordionSummary>
                    <AccordionDetails className="pointOfSale">
                      <Grid className="subMenuWrapTwo">
                        <Link className="" href="https://wps-qa.marinerfinance.io/why-mariner-finance/partner-with-us/point-of-sale-financing/">
                        Point of Sale Financing
                      </Link>
                      <Link href="https://wps-qa.marinerfinance.io/why-mariner-finance/partner-with-us/corporate-acquisition/">
                        Corporate Acquisition
                      </Link>
                      <Link href="https://wps-qa.marinerfinance.io/why-mariner-finance/partner-with-us/">
                        Affiliate Program
                      </Link>
                      </Grid>
                      
                    </AccordionDetails>
                  </Accordion>

                  <Link className="mobileMenuLink" href="https://wps-qa.marinerfinance.io/why-mariner-finance/community-outreach/">
                    Community Outreach
                  </Link>

                  <Accordion className="careersWrap">
                    <AccordionSummary className="menuHead" expandIcon={<ExpandMoreIcon />}>
                      <a
                      className="noBorder"
                        target="_blank"
                        rel="noreferrer"
                        href="https://wps-qa.marinerfinance.io/careers/"
                      >
                        Careers
                      </a>
                    </AccordionSummary>
                    <AccordionDetails className="noPadding">
                      <Grid className="subMenuWrapThree">
                        <Link href="https://wps-qa.marinerfinance.io/careers/branch-manager-trainee-and-internship-programs/">
                        Branch Manager Trainee and Internship programs
                      </Link>
                      <Link href="https://wps-qa.marinerfinance.io/careers/jobs-for-veterans/">
                        Jobs For Veterans
                      </Link>
                      <Link href="https://wps-qa.marinerfinance.io/careers/corporate-culture/">
                        Corporate Culture
                      </Link>
                      <Link href="https://wps-qa.marinerfinance.io/careers/benefits/">
                        Benefits
                      </Link>
                      <Link href="https://wps-qa.marinerfinance.io/careers/faq/">
                        FAQ
                      </Link>
                      </Grid>
                      
                    </AccordionDetails>
                  </Accordion>

                  <Link href="https://wps-qa.marinerfinance.io/sweepstakes/">
                    Sweepstakes
                  </Link>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion className="noShadow">
              <AccordionDetails className="menuHead">
                <Link href="https://cac-qa.marinerfinance.io/select-amount/">
                  Mail Offer?
                </Link>
              </AccordionDetails>
            </Accordion>

            <Accordion className="noShadow">
              <AccordionDetails className="menuHead">
                <Link href="/login">Login</Link>
              </AccordionDetails>
            </Accordion>

            <Accordion className="noShadow">
              <AccordionDetails className="menuHead">
                <Link href="#">Check My Offers</Link>
              </AccordionDetails>
            </Accordion>

            {/* <Link href="https://cac-qa.marinerfinance.io/select-amount/">
              Mail Offer?
            </Link>

            <Link href="/login">Login</Link>
            <Link href="#">Check My Offers</Link> */}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default BranchLocatorHeader;
