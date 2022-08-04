import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from "@mui/icons-material/Menu";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import globalMessages from "../../../assets/data/globalMessages.json";
import Logo from "../../../assets/images/mf-logo.png";
import LogoutController from "../../Controllers/LogoutController";
import { ButtonPrimary } from "../../FormsUI";
import { useStyles } from "../BranchLoacatorHeader/BranchLocatorStyle";
import "../Layout.css";
const BranchLocatorHeader = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const ServerURL = `${ process.env.REACT_APP_WEBSITE }`;
  const loginToken = JSON.parse(
    Cookies.get("token") ? Cookies.get("token") : "{ }"
  );
  const redirectToAccountOverview = () => {
    window.open(`${ ServerURL }`, "_blank");
  };
  const [ display, setdisplay ] = useState(true);

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
  const logoutMobileUser = () => {
    toast.success(globalMessages.LoggedOut, {
      onClose: () => logOut(),
    });
  };
  //View Part
  return (
    <div id="headerWrap" className={classes.grow} data-testid="branch_locater_header_component">
      <AppBar id="MainHeaderWrap" position="static">
        <Toolbar className="branchLocatorHeaderToolBar">
          <Typography
            onClick={redirectToAccountOverview}
            className={classes.title}
          >
            <img
              data-testid="MF_logo"
              className={classes.logoFormat}
              src={Logo}
              alt="MF logo"
            />
          </Typography>
          <div id="desktopMenu" className={classes.sectionDesktop}>
            <Grid className="personalLoanHolder">
              <Typography className="branchHeaderLinks">
                <Link data-testid="desktopMenuLink" href={`${ ServerURL }/personal-loans/`}>
                  Personal Loans
                </Link>
              </Typography>

              <Grid className="personalLoansubLinks">
                <Link data-testid="unexpectedExpenses" href={`${ ServerURL }/personal-loans/unexpected-expenses/`}>
                  Unexpected Expenses
                </Link>
                <Link data-testid="vacationLoans" href={`${ ServerURL }/personal-loans/vacation-loans/`}>
                  Vacation Loans
                </Link>
                <Link
                  data-testid="debtConsolidationLoans"
                  href={`${ ServerURL }/personal-loans/debt-consolidation-loans/`}
                >
                  Debt Consolidation Loans
                </Link>
                <Link
                  data-testid="homeImprovementLoans"
                  href={`${ ServerURL }/personal-loans/home-improvement-loans/`}
                >
                  Home Improvement Loans
                </Link>
                <Link data-testid="weddingLoans" href={`${ ServerURL }/personal-loans/wedding-loans/`}>
                  Wedding Loans
                </Link>
              </Grid>
            </Grid>

            <Grid className="carLoansHolder">
              <Typography className="branchHeaderLinks">
                <Link data-testid="carLoansLink" href={`${ ServerURL }/car-loans/`}>
                  Car Loans
                </Link>
              </Typography>

              <Grid className="carLoanSubLinks">
                <Link data-testid="autoRefinancingLoans" href={`${ ServerURL }/car-loans/auto-refinance/`}>
                  Auto Refinancing Loans
                </Link>
                <Link data-testid="financeCarLoans" href={`${ ServerURL }/car-loans/new-car-loan/`}>
                  Finance Car Loans
                </Link>
                <Link data-testid="financeUsedCarLoan" href={`${ ServerURL }/car-loans/used-car-loan/`}>
                  Finance Used Car Loan
                </Link>
              </Grid>
            </Grid>

            <Grid className="homeLoansHolder">
              <Typography className="branchHeaderLinks">
                <Link data-testid="homeLoansLink" href={`${ ServerURL }/home-loans/`}>
                  Home Loans
                </Link>
              </Typography>

              <Grid className="homeLoanSubLinks">
                <Link data-testid="homePurchase" href={`${ ServerURL }/home-loans/mortgage-loans/`}>
                  Home Purchase
                </Link>
                <Link data-testid="homeRefinance" href={`${ ServerURL }/home-loans/home-refinance/`}>
                  Home Refinance
                </Link>
                <Link data-testid="meetOurLoanOfficers" href={`${ ServerURL }/home-loans/meet-our-loan-officers/`}>
                  Meet Our Loan Officers
                </Link>
              </Grid>
            </Grid>

            <Grid className="resourcesHolder">
              <Typography className="branchHeaderLinks">
                <Link data-testid="ResourcesLink" href={`${ ServerURL }/resources//`}>
                  Resources
                </Link>
              </Typography>

              <Grid className="resourcesSubLinks">
                <Link data-testid="howToApplyLink" href={`${ ServerURL }/resources/how-to-apply/`}>
                  How to Apply for a Personal loan
                </Link>
                <Link target="_blank"  data-testid="FAQLink" href={`${ ServerURL }/resources/faq/`}>FAQ</Link>
                <Link data-testid="BlogLink" href={`${ ServerURL }/blog/`}>Blog</Link>
                <Link data-testid="marinerStates" href="/branch-locator">Mariner States</Link>
                <Link data-testid="LegalLink" href={`${ ServerURL }/resources/legal/`}>Legal</Link>
              </Grid>
            </Grid>

            <Grid className="whyUsHolder">
              <Typography className="branchHeaderLinks">
                <Link data-testid="whyUsLink" href={`${ ServerURL }/why-mariner-finance/`}>
                  Why Us?
                </Link>
              </Typography>

              <Grid className="whyUsSubLinks">
                <Link data-testid="testimonialsLink" href={`${ ServerURL }/testimonials/`}>Testimonials</Link>
                <Link
                  data-testid="marinerFinanceReviewsLink"
                  href={`${ ServerURL }/why-mariner-finance/mariner-finance-reviews/`}
                >
                  Mariner Finance Reviews
                </Link>
                <Link
                  data-testid="customerServiceLink"
                  href={`${ ServerURL }/why-mariner-finance/excellent-customer-service/`}
                >
                  Excellent Customer Service
                </Link>
                <Link data-testid="marinerFinanceHistoryLink" href={`${ ServerURL }/why-mariner-finance/history/`}>
                  Mariner Finance History
                </Link>

                <Grid className="subLinkDropdown">
                  <Link
                    data-testid="partnerWithUs"
                    href={`${ ServerURL }/why-mariner-finance/partner-with-us/`}
                  >
                    Partner With Us
                  </Link>
                  <Grid className="subLinkList">
                    <Link
                      data-testid="pointOfSaleLink"
                      href={`${ ServerURL }/why-mariner-finance/partner-with-us/point-of-sale-financing/`}
                    >
                      Point of Sale Financing
                    </Link>
                    <Link
                      data-testid="corporateAcquisitionLink"
                      href={`${ ServerURL }/why-mariner-finance/partner-with-us/corporate-acquisition/`}
                    >
                      Corporate Acquisition
                    </Link>
                    <Link
                      data-testid="affiliateProgramLink"
                      href={`${ ServerURL }/why-mariner-finance/partner-with-us/affiliate-program/`}
                    >
                      Affiliate Program
                    </Link>
                  </Grid>
                </Grid>

                <Link
                  data-testid="communityOutreachLink"
                  href={`${ ServerURL }/why-mariner-finance/community-outreach/`}
                >
                  Community Outreach
                </Link>

                <Grid className="subLinkDropdown">
                  <Link data-testid="careersLink" href={`${ ServerURL }/careers/`}>Careers</Link>
                  <Grid className="subLinkList">
                    <Link
                      data-testid="branchProgramLink"
                      href={`${ ServerURL }/careers/branch-manager-trainee-and-internship-programs/`}
                    >
                      Branch Manager Trainee and Internship programs
                    </Link>
                    <Link data-testid="jobsForVeteransLink" href={`${ ServerURL }/careers/jobs-for-veterans/`}>
                      Jobs For Veterans
                    </Link>
                    <Link data-testid="corporateCultureLink" href={`${ ServerURL }/careers/corporate-culture/`}>
                      Corporate Culture
                    </Link>
                    <Link data-testid="benefitsLink" href={`${ ServerURL }/careers/benefits/`}>
                      Benefits
                    </Link>
                    <Link data-testid="FAQsLink" href={`${ ServerURL }/careers/faq/`}>FAQ</Link>
                  </Grid>
                </Grid>
                <Link data-testid="sweepstakesLink" href={`${ ServerURL }/sweepstakes/`}>Sweepstakes</Link>
              </Grid>
            </Grid>

            <NavLink  to= {!loginToken.isLoggedIn ? "/select-amount" : "/customers/resumeApplication" }
              className="nav_link branchHeaderLinksLast"
            >
              <ButtonPrimary
                data-testid="applyNowBtn"
                id="applynowid"
                stylebutton='{"fontSize":"1rem","fontWeight":"400","color":"#151147"}'
                target="_blank"
              >
                Apply Now
              </ButtonPrimary>
            </NavLink>
          </div>
          <button
            data-testid="menuHamburgerButton"
            onClick={(_event) => {
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
                  data-testid="personalLoansLink"
                  target="_blank"
                  rel="noreferrer"
                  href={`${ ServerURL }/personal-loans/`}
                >
                  Personal Loans
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid  className="subMenuWrap">
                  <a
                    data-testid="unexpectedExpensesLink"
                    target="_blank"
                    rel="noreferrer"
                    href={`${ ServerURL }/personal-loans/unexpected-expenses/`}
                  >
                    Unexpected Expenses
                  </a>
                  <a
                    data-testid="vacationLoansLinks"
                    target="_blank"
                    rel="noreferrer"
                    href={`${ ServerURL }/personal-loans/vacation-loans/`}
                  >
                    Vacation Loans
                  </a>
                  <a
                    data-testid="debtConsolidationLoanLink"
                    target="_blank"
                    rel="noreferrer"
                    href={`${ ServerURL }/personal-loans/debt-consolidation-loans/`}
                  >
                    Debt Consolidation Loans
                  </a>

                  <a
                    data-testid="homeImprovementLoansLinks"
                    target="_blank"
                    rel="noreferrer"
                    href={`${ ServerURL }/personal-loans/home-improvement-loans/`}
                  >
                    Home Improvement Loans
                  </a>
                  <a
                    data-testid="weddingLoansLinks"
                    target="_blank"
                    rel="noreferrer"
                    href={`${ ServerURL }/personal-loans/wedding-loans/`}
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
                  data-testid="carLoanLinkMobile"
                  target="_blank"
                  rel="noreferrer"
                  href={`${ ServerURL }/car-loans/`}
                >
                  Car Loans
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <Link data-testid="autoRefinancingLoansLinks" href={`${ ServerURL }/car-loans/auto-refinance/`}>
                    Auto Refinancing Loans
                  </Link>
                  <Link data-testid="financeCarLoansLinks" href={`${ ServerURL }/car-loans/new-car-loan/`}>
                    Finance Car Loans
                  </Link>
                  <Link data-testid="financeUsedCarLoanLinks" href={`${ ServerURL }/car-loans/used-car-loan/`}>
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
                  data-testid="homeLoansLinks"
                  target="_blank"
                  rel="noreferrer"
                  href={`${ ServerURL }/home-loans`}
                >
                  Home Loans
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <Link data-testid="homePurchaseLinks" href={`${ ServerURL }/home-loans/mortgage-loans/`}>
                    Home Purchase
                  </Link>
                  <Link data-testid="homeRefinanceLinks" href={`${ ServerURL }/home-loans/home-refinance/`}>
                    Home Refinance
                  </Link>
                  <Link
                    data-testid="meetOurLoanOfficersLinks"
                    href={`${ ServerURL }/home-loans/meet-our-loan-officers/`}
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
                  data-testid="ResourcesLinks"
                  target="_blank"
                  rel="noreferrer"
                  href={`${ ServerURL }/resources/`}
                >
                  Resources
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <Link data-testid="ApplyLoanLinks" href={`${ ServerURL }/resources/how-to-apply/`}>
                    How to Apply for a Personal loan
                  </Link>
                  <Link target="_blank"  data-testid="FAQLinks" href={`${ ServerURL }/resources/faq/`}>FAQ</Link>
                  <Link data-testid="blogLinks" href={`${ ServerURL }/blog/`}>Blog</Link>
                  <Link data-testid="marinerStatesLinks" href={`${ ServerURL }/state/`}>Mariner States</Link>
                  <Link data-testid="LegalLinks" href={`${ ServerURL }/resources/legal/`}>Legal</Link>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion className="noShadow">
              <AccordionSummary
                className="menuHead"
                expandIcon={<ExpandMoreIcon />}
              >
                <a
                  data-testid="whyUsLinks"
                  target="_blank"
                  rel="noreferrer"
                  href={`${ ServerURL }/why-mariner-finance/`}
                >
                  Why Us?
                </a>
              </AccordionSummary>
              <AccordionDetails className="menuSubLinksWrap">
                <Grid className="subMenuWrap">
                  <Link data-testid="testimonialsLinks" href={`${ ServerURL }/testimonials/`}>Testimonials</Link>
                  <Link
                    data-testid="marinerFinanceReviewsLinks"
                    href={`${ ServerURL }/why-mariner-finance/mariner-finance-reviews/`}
                  >
                    Mariner Finance Reviews
                  </Link>
                  <Link
                    data-testid="excellentCustomerServiceLinks"
                    href={`${ ServerURL }/why-mariner-finance/excellent-customer-service/`}
                  >
                    Excellent Customer Service
                  </Link>
                  <Link data-testid="marinerFinanceHistoryLinks" href={`${ ServerURL }/why-mariner-finance/history/`}>
                    Mariner Finance History
                  </Link>
                  <Accordion className="borderTop">
                    <AccordionSummary
                      className="menuHead"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <a
                        data-testid="partnerWithUsLinks"
                        target="_blank"
                        rel="noreferrer"
                        href={`${ ServerURL }/why-mariner-finance/partner-with-us/`}
                      >
                        Partner With Us
                      </a>
                    </AccordionSummary>
                    <AccordionDetails className="pointOfSale">
                      <Grid className="subMenuWrapTwo">
                        <Link
                          data-testid="pointofSaleFinancingLink"
                          className=""
                          href={`${ ServerURL }/why-mariner-finance/partner-with-us/point-of-sale-financing/`}
                        >
                          Point of Sale Financing
                        </Link>
                        <Link
                          data-testid="corporateAcquisitionLinks"
                          href={`${ ServerURL }/why-mariner-finance/partner-with-us/corporate-acquisition/`}
                        >
                          Corporate Acquisition
                        </Link>
                        <Link
                          data-testid="affiliateProgramLinks"
                          href={`${ ServerURL }/why-mariner-finance/partner-with-us/`}
                        >
                          Affiliate Program
                        </Link>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Link
                    data-testid="communityOutreachLinks"
                    className="mobileMenuLink"
                    href={`${ ServerURL }/why-mariner-finance/community-outreach/`}
                  >
                    Community Outreach
                  </Link>
                  <Accordion className="careersWrap">
                    <AccordionSummary
                      className="menuHead"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <a
                        data-testid="careersLinks"
                        className="noBorder"
                        target="_blank"
                        rel="noreferrer"
                        href={`${ ServerURL }/careers/`}
                      >
                        Careers
                      </a>
                    </AccordionSummary>
                    <AccordionDetails className="noPadding">
                      <Grid className="subMenuWrapThree">
                        <Link
                          data-testid="programsLinks"
                          href={`${ ServerURL }/careers/branch-manager-trainee-and-internship-programs/`}
                        >
                          Branch Manager Trainee and Internship programs
                        </Link>
                        <Link data-testid="jobsForVeteransLinks" href={`${ ServerURL }/careers/jobs-for-veterans/`}>
                          Jobs For Veterans
                        </Link>
                        <Link data-testid="corporateCultureLinks" href={`${ ServerURL }/careers/corporate-culture/`}>
                          Corporate Culture
                        </Link>
                        <Link data-testid="benefitsLinks" href={`${ ServerURL }/careers/benefits/`}>
                          Benefits
                        </Link>
                        <Link data-testid="FAQ_Links" href={`${ ServerURL }/careers/faq/`}>FAQ</Link>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Link href={`${ ServerURL }/sweepstakes/`}>Sweepstakes</Link>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion className="noShadow">
              <AccordionDetails className="menuHead">
                {!loginToken.isLoggedIn ? (
                  <Link href="/login">Apply Now</Link>
                ) : (
                  <div onClick={logoutMobileUser} >
                    <span className={classes.signOutSpan}>Sign out</span>
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion className="noShadow">
              <AccordionDetails className="menuHead">
                <Link data-testid="MailOfferLinks" href={`${ ServerURL }/careers/`}>Careers</Link>
              </AccordionDetails>
            </Accordion>
            <Accordion className="noShadow">
              <AccordionDetails className="menuHead">
                  <Link data-testid="checkMyLinks" to= {!loginToken.isLoggedIn ? "/select-amount" : "/customers/resumeApplication" }>Resume application</Link>                
              </AccordionDetails>
            </Accordion>
            <Accordion className="noShadow">
              <AccordionDetails className="menuHead">
                <Link data-testid="MailOfferLinks" href='/select-amount/'>Mail Offer?</Link>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default BranchLocatorHeader;