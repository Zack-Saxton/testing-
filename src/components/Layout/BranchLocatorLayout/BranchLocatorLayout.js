import React from "react";
import BranchLocatorFooter from "../BranchLocatorFooter/BranchLocatorFooter";
import BranchLocatorHeader from "../BranchLoacatorHeader/BranchLocatorHeader";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";


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
      {children}
      <BranchLocatorFooter />
    </div>
  );
};

export default BranchHeaderLayout;
