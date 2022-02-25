import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ButtonPrimary } from "../../FormsUI";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/mf-logo.png";
import { useStyles } from "../BranchLoacatorHeader/BranchLocatorStyle";
import "../Layout.css"

const BranchLocatorHeader = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  
  const redirectToAccountOverview = () => {
    navigate("/customers/accountOverview" );
  };

  //View Part
  return (
    <div id="headerWrap" className={classes.grow}>
      <AppBar id="MainHeaderWrap" position="static">
        <Toolbar className="headerToolBar">
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
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
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
            <NavLink to="/login" className="nav_link branchHeaderLinks">
              <Typography className={classes.subtitle}>Login</Typography>
            </NavLink>
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default BranchLocatorHeader;
