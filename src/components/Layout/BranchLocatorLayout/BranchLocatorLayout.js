import Typography from "@mui/material/Typography";
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
            <a href="#" className="hrefTag">
              Careers
            </a>
          </Typography>
          <Typography className="topBarLinkOne" >
            <a href="#" className="hrefTag">
              Resume Application
            </a>
          </Typography>
          <NavLink className="topBarLinkTwo" to="/faq" style={ { textDecoration: "none" } }>
            <Typography >Customer Support</Typography>
          </NavLink>
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
