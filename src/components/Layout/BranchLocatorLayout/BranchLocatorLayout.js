import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import BranchLocatorHeader from "../BranchLoacatorHeader/BranchLocatorHeader";
import BranchLocatorFooter from "../BranchLocatorFooter/BranchLocatorFooter";
import GA4 from "../../Layout/ga4/GA4";

const BranchLocatorLayout = ({ children }) => {
  return (
    <div id="BG">
      <GA4 />
      <div className="topBar">
        <div className="topBarlinks" >
          <Typography className="topBarLinkOne" >
            <Link href={`${ process.env.REACT_APP_WEBSITE }/careers/`} className="hrefTag">
              Careers
            </Link>
          </Typography>
          <Typography className="topBarLinkOne" >
            <Link href="/customers/applyForLoan" className="hrefTag">
              Application
            </Link>
          </Typography>
          <Typography className="topBarLinkOne">
            <Link href={`${ process.env.REACT_APP_WEBSITE }/customer-support/`} className="hrefTag">
              Customer Support
            </Link>
          </Typography>
          <NavLink to="/branch-locator" className="nav_link topBarLinkThree">
            <Typography >Branch Locator</Typography>
          </NavLink>
        </div>
      </div>
      <BranchLocatorHeader />
      {children}
      <BranchLocatorFooter />
    </div>
  );
};

BranchLocatorLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export default BranchLocatorLayout;
