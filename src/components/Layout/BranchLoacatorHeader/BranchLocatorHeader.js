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
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "../../../assets/images/mf-logo.png";
import { ButtonPrimary } from "../../FormsUI";
import { useStyles } from "../BranchLoacatorHeader/BranchLocatorStyle";
import "../Layout.css";
import Cookies from "js-cookie";
import LogoutController from "../../Controllers/LogoutController";
import globalMessages from "../../../assets/data/globalMessages.json";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
const BranchLocatorHeader = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const ServerURL = "https://wps-qa.marinerfinance.io";
  const loginToken = JSON.parse(
    Cookies.get("token") ? Cookies.get("token") : "{ }"
  );
  const redirectToAccountOverview = () => {
    window.open("https://wps-qa.marinerfinance.io/", "_self")
  };
  const [display, setdisplay] = useState(true);

  function logOut() {
    queryClient.removeQueries();
    LogoutController();
    navigate("/login");
  }

  const logoutUser = () => {
    toast.success(globalMessages.LoggedOut, {
      onClose: () => logOut(),
    });
  };
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
          <div id="desktopMenu" className={classes.sectionDesktop}>
            <Grid className="personalLoanHolder">
              <Typography className="branchHeaderLinks">
                <Link href={`${ServerURL}/personal-loans/`}>
                  Personal Loans
                </Link>
              </Typography>

              <Grid className="personalLoansubLinks">
                <Link href={`${ServerURL}/personal-loans/unexpected-expenses/`}>
                  Unexpected Expenses
                </Link>
                <Link href={`${ServerURL}/personal-loans/vacation-loans/`}>
                  Vacation Loans
                </Link>
                <Link
                  href={`${ServerURL}/personal-loans/debt-consolidation-loans/`}
                >
                  Debt Consolidation Loans
                </Link>
                <Link
                  href={`${ServerURL}/personal-loans/home-improvement-loans/`}
                >
                  Home Improvement Loans
                </Link>
                <Link href={`${ServerURL}/personal-loans/wedding-loans/`}>
                  Wedding Loans
                </Link>
              </Grid>
            </Grid>

            <Grid className="carLoansHolder">
              <Typography className="branchHeaderLinks">
                <Link href={`${ServerURL}/car-loans/`}>
                Car Loans
                </Link>
              </Typography>

              <Grid className="carLoanSubLinks">
                <Link href={`${ServerURL}/car-loans/auto-refinance/`}>
                  Auto Refinancing Loans
                </Link>
                <Link href={`${ServerURL}/car-loans/new-car-loan/`}>
                  Finance Car Loans
                </Link>
                <Link href={`${ServerURL}/car-loans/used-car-loan/`}>
                  Finance Used Car Loan
                </Link>
              </Grid>
            </Grid>

            <Grid className="homeLoansHolder">
              <Typography className="branchHeaderLinks">
               
                <Link href={`${ServerURL}/home-loans/`}>
                Home Loans
                </Link>
                </Typography>

              <Grid className="homeLoanSubLinks">
                <Link href={`${ServerURL}/home-loans/mortgage-loans/`}>
                Home Purchase
                </Link>
                <Link href={`${ServerURL}/home-loans/home-refinance/`}>
                Home Refinance
                </Link>
                <Link href={`${ServerURL}/home-loans/meet-our-loan-officers/`}>
                Meet Our Loan Officers
                </Link>
              </Grid>
            </Grid>

            <Grid className="resourcesHolder">
              <Typography className="branchHeaderLinks">
                <Link href={`${ServerURL}/resources//`}>
                Resources
                </Link>
                </Typography>

              <Grid className="resourcesSubLinks">
                <Link href={`${ServerURL}/resources/how-to-apply/`}>
                  How to Apply for a Personal loan
                </Link>
                <Link href="/faq">FAQ</Link>
                <Link href={`${ServerURL}/blog/`}>Blog</Link>
                <Link href="/branch-locator">Mariner States</Link>
                <Link href={`${ServerURL}/resources/legal/`}>Legal</Link>
              </Grid>
            </Grid>

            <Grid className="whyUsHolder">
              <Typography className="branchHeaderLinks">
                
                <Link href={`${ServerURL}/why-mariner-finance/`}>
                  Why Us?
                </Link>
                </Typography>

              <Grid className="whyUsSubLinks">
                <Link href={`${ServerURL}/testimonials/`}>Testimonials</Link>
                <Link
                  href={`${ServerURL}/why-mariner-finance/mariner-finance-reviews/`}
                >
                  Mariner Finance Reviews
                </Link>
                <Link
                  href={`${ServerURL}/why-mariner-finance/excellent-customer-service/`}
                >
                  Excellent Customer Service
                </Link>
                <Link href={`${ServerURL}/why-mariner-finance/history/`}>
                  Mariner Finance History
                </Link>

                <Grid className="subLinkDropdown">
                  <Link
                    href={`${ServerURL}/why-mariner-finance/partner-with-us/`}
                  >
                    Partner With Us
                  </Link>
                  <Grid className="subLinkList">
                    <Link
                      href={`${ServerURL}/why-mariner-finance/partner-with-us/point-of-sale-financing/`}
                    >
                      Point of Sale Financing
                    </Link>
                    <Link
                      href={`${ServerURL}/why-mariner-finance/partner-with-us/corporate-acquisition/`}
                    >
                      Corporate Acquisition
                    </Link>
                    <Link
                      href={`${ServerURL}/why-mariner-finance/partner-with-us/affiliate-program/`}
                    >
                      Affiliate Program
                    </Link>
                  </Grid>
                </Grid>

                <Link
                  href={`${ServerURL}/why-mariner-finance/community-outreach/`}
                >
                  Community Outreach
                </Link>

                <Grid className="subLinkDropdown">
                  <Link href={`${ServerURL}/careers/`}>Careers</Link>
                  <Grid className="subLinkList">
                    <Link
                      href={`${ServerURL}/careers/branch-manager-trainee-and-internship-programs/`}
                    >
                      Branch Manager Trainee and Internship programs
                    </Link>
                    <Link href={`${ServerURL}/careers/jobs-for-veterans/`}>
                      Jobs For Veterans
                    </Link>
                    <Link href={`${ServerURL}/careers/corporate-culture/`}>
                      Corporate Culture
                    </Link>
                    <Link href={`${ServerURL}/careers/benefits/`}>
                      Benefits
                    </Link>
                    <Link href={`${ServerURL}/careers/faq/`}>FAQ</Link>
                  </Grid>
                </Grid>
                <Link href={`${ServerURL}/sweepstakes/`}>Sweepstakes</Link>
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
            ) : (
              <div onClick={logoutUser} className="nav_link branchHeaderLinks">
                <Typography className={classes.subtitle}>Sign out</Typography>
              </div>
            )}
            <NavLink
              to="/customers/resumeApplication"
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
          <Grid
            id="mainMobileMenu"
            className={display ? classes.hideSection : classes.showSection}
          >
            <Accordion className="noShadow">
              <AccordionSummary
                className="menuHead"
                expandIcon={<ExpandMoreIcon />}
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${ServerURL}/personal-loans/`}
                >
                  Personal Loans
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`${ServerURL}/personal-loans/unexpected-expenses/`}
                  >
                    Unexpected Expenses
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`${ServerURL}/personal-loans/vacation-loans/`}
                  >
                    Vacation Loans
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`${ServerURL}/personal-loans/debt-consolidation-loans/`}
                  >
                    Debt Consolidation Loans
                  </a>

                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`${ServerURL}/personal-loans/home-improvement-loans/`}
                  >
                    Home Improvement Loans
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`${ServerURL}/personal-loans/wedding-loans/`}
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
                  href={`${ServerURL}/car-loans/`}
                >
                  Car Loans
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <Link href={`${ServerURL}/car-loans/auto-refinance/`}>
                    Auto Refinancing Loans
                  </Link>
                  <Link href={`${ServerURL}/car-loans/new-car-loan/`}>
                    Finance Car Loans
                  </Link>
                  <Link href={`${ServerURL}/car-loans/used-car-loan/`}>
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
                  href={`${ServerURL}/home-loans`}
                >
                  Home Loans
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <Link href={`${ServerURL}/home-loans/mortgage-loans/`}>
                    Home Purchase
                  </Link>
                  <Link href={`${ServerURL}/home-loans/home-refinance/`}>
                    Home Refinance
                  </Link>
                  <Link
                    href={`${ServerURL}/home-loans/meet-our-loan-officers/`}
                  >
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
                  href={`${ServerURL}/resources/`}
                >
                  Resources
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <Link href={`${ServerURL}/resources/how-to-apply/`}>
                    How to Apply for a Personal loan
                  </Link>
                  <Link href="/faq">FAQ</Link>
                  <Link href={`${ServerURL}/blog/`}>Blog</Link>
                  <Link href={`${ServerURL}/state/`}>Mariner States</Link>
                  <Link href={`${ServerURL}/resources/legal/`}>Legal</Link>
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
                  href={`${ServerURL}/why-mariner-finance/`}
                >
                  Why Us?
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <Link href={`${ServerURL}/testimonials/`}>Testimonials</Link>
                  <Link
                    href={`${ServerURL}/why-mariner-finance/mariner-finance-reviews/`}
                  >
                    Mariner Finance Reviews
                  </Link>
                  <Link
                    href={`${ServerURL}/why-mariner-finance/excellent-customer-service/`}
                  >
                    Excellent Customer Service
                  </Link>
                  <Link href={`${ServerURL}/why-mariner-finance/history/`}>
                    Mariner Finance History
                  </Link>
                  <Accordion className="borderTop">
                    <AccordionSummary
                      className="menuHead"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`${ServerURL}/why-mariner-finance/partner-with-us/`}
                      >
                        Partner With Us
                      </a>
                    </AccordionSummary>
                    <AccordionDetails className="pointOfSale">
                      <Grid className="subMenuWrapTwo">
                        <Link
                          className=""
                          href={`${ServerURL}/why-mariner-finance/partner-with-us/point-of-sale-financing/`}
                        >
                          Point of Sale Financing
                        </Link>
                        <Link
                          href={`${ServerURL}/why-mariner-finance/partner-with-us/corporate-acquisition/`}
                        >
                          Corporate Acquisition
                        </Link>
                        <Link
                          href={`${ServerURL}/why-mariner-finance/partner-with-us/`}
                        >
                          Affiliate Program
                        </Link>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Link
                    className="mobileMenuLink"
                    href={`${ServerURL}/why-mariner-finance/community-outreach/`}
                  >
                    Community Outreach
                  </Link>
                  <Accordion className="careersWrap">
                    <AccordionSummary
                      className="menuHead"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <a
                        className="noBorder"
                        target="_blank"
                        rel="noreferrer"
                        href={`${ServerURL}/careers/`}
                      >
                        Careers
                      </a>
                    </AccordionSummary>
                    <AccordionDetails className="noPadding">
                      <Grid className="subMenuWrapThree">
                        <Link
                          href={`${ServerURL}/careers/branch-manager-trainee-and-internship-programs/`}
                        >
                          Branch Manager Trainee and Internship programs
                        </Link>
                        <Link href={`${ServerURL}/careers/jobs-for-veterans/`}>
                          Jobs For Veterans
                        </Link>
                        <Link href={`${ServerURL}/careers/corporate-culture/`}>
                          Corporate Culture
                        </Link>
                        <Link href={`${ServerURL}/careers/benefits/`}>
                          Benefits
                        </Link>
                        <Link href={`${ServerURL}/careers/faq/`}>FAQ</Link>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Link href={`${ServerURL}/sweepstakes/`}>Sweepstakes</Link>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion className="noShadow">
              <AccordionDetails className="menuHead">
                <Link href='/select-amount/'>Mail Offer?</Link>
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
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default BranchLocatorHeader;