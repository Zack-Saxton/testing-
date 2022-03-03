import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  const ServerURL = 'https://wps-qa.marinerfinance.io';
  const loginToken = JSON.parse(
    Cookies.get("token") ? Cookies.get("token") : "{ }"
  );
  const redirectToAccountOverview = () => {
    navigate("/customers/accountOverview");
  };

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
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Grid className="personalLoanHolder">
              <Typography className="branchHeaderLinks">
                Personal Loans
              </Typography>
              <Grid className="personalLoansubLinks">
                <Link href={`${ServerURL}/personal-loans/unexpected-expenses/`}>
                  Unexpected Expenses
                </Link>
                <Link href={`${ServerURL}/personal-loans/vacation-loans/`}>
                  Vacation Loans
                </Link>
                <Link href={`${ServerURL}/personal-loans/debt-consolidation-loans/`}>
                  Debt Consolidation Loans
                </Link>
                <Link href={`${ServerURL}/personal-loans/home-improvement-loans/`}>
                  Home Improvement Loans
                </Link>
                <Link href={`${ServerURL}/personal-loans/wedding-loans/`}>
                  Wedding Loans
                </Link>
              </Grid>
            </Grid>

            <Grid className="carLoansHolder">
              <Typography className="branchHeaderLinks">Car Loans</Typography>

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
              <Typography className="branchHeaderLinks">Home Loans</Typography>

              <Grid className="homeLoanSubLinks">
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

            <Grid className="resourcesHolder">
              <Typography className="branchHeaderLinks">Resources</Typography>

              <Grid className="resourcesSubLinks">
                <Link href={`${ServerURL}/resources/how-to-apply/`}>
                  How to Apply for a Personal loan
                </Link>
                <Link href="/faq">FAQ</Link>
                <Link href={`${ServerURL}/blog/`}>Blog</Link>
                <Link href={`${ServerURL}/state/`}>
                  Mariner States
                </Link>
                <Link href={`${ServerURL}/resources/legal/`}>
                  Legal
                </Link>
              </Grid>
            </Grid>

            <Grid className="whyUsHolder">
              <Typography className="branchHeaderLinks">Why Us?</Typography>

              <Grid className="whyUsSubLinks">
                <Link href={`${ServerURL}/testimonials/`}>
                  Testimonials
                </Link>
                <Link href={`${ServerURL}/why-mariner-finance/mariner-finance-reviews/`}>
                  Mariner Finance Reviews
                </Link>
                <Link href={`${ServerURL}/why-mariner-finance/excellent-customer-service/`}>
                  Excellent Customer Service
                </Link>
                <Link href={`${ServerURL}/why-mariner-finance/history/`}>
                  Mariner Finance History
                </Link>

                <Grid className="subLinkDropdown">
                  <Link href={`${ServerURL}/why-mariner-finance/partner-with-us/`}>
                    Partner With Us
                  </Link>
                  <Grid className="subLinkList">
                    <Link href={`${ServerURL}/why-mariner-finance/partner-with-us/point-of-sale-financing/`}>
                      Point of Sale Financing
                    </Link>
                    <Link href={`${ServerURL}/why-mariner-finance/partner-with-us/corporate-acquisition/`}>
                      Corporate Acquisition
                    </Link>
                    <Link href={`${ServerURL}/why-mariner-finance/partner-with-us/`}>
                      Affiliate Program
                    </Link>
                  </Grid>
                </Grid>

                <Link href={`${ServerURL}/why-mariner-finance/community-outreach/`}>
                  Community Outreach
                </Link>

                <Grid className="subLinkDropdown">
                  <Link href={`${ServerURL}/careers/`}>
                    Careers
                  </Link>
                  <Grid className="subLinkList">
                    <Link href={`${ServerURL}/careers/branch-manager-trainee-and-internship-programs/`}>
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
                    <Link href={`${ServerURL}/careers/faq/`}>
                      FAQ
                    </Link>
                  </Grid>
                </Grid>
                <Link href={`${ServerURL}/sweepstakes/`}>
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
            {!loginToken.isLoggedIn ? <NavLink to="/login" className="nav_link branchHeaderLinks">
              <Typography className={classes.subtitle}>Login</Typography>
            </NavLink>
              : <div onClick={logoutUser} className="nav_link branchHeaderLinks">
                <Typography className={classes.subtitle}>Sign out</Typography>
              </div>}
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default BranchLocatorHeader;
