import { Link } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import BranchLocatorHeader from "../BranchLoacatorHeader/BranchLocatorHeader";
import BranchLocatorFooter from "../BranchLocatorFooter/BranchLocatorFooter";

const BranchHeaderLayout = ({ children }) => {
  return (
    <div id="BG">
      <div className="topBar">
        <div className="topBarlinks" >
          <Typography className="topBarLinkOne" >
            <Link href={ `${ process.env.REACT_APP_WEBSITE }/careers/` } className="hrefTag">
              Careers
            </Link>
          </Typography>
          <Typography className="topBarLinkOne" >
            <Link href="/customers/applyForLoan" className="hrefTag">
              Resume Application
            </Link>
          </Typography>
          <Typography className="topBarLinkOne">
            <Link href={ `${ process.env.REACT_APP_WEBSITE }/customer-support/` } className="hrefTag">
              Customer Support
            </Link>
          </Typography>
          <NavLink to="/branch-locator" className="nav_link topBarLinkThree">
            <Typography >Branch Locator</Typography>
          </NavLink>
        </div>
      </div>
      <BranchLocatorHeader />
      { children }
      <BranchLocatorFooter />
    </div>
  );
};

BranchHeaderLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export default BranchHeaderLayout;
