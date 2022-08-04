import { Grid } from '@mui/material';
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import BranchLocatorHeader from "../BranchLoacatorHeader/BranchLocatorHeader";
import BranchLocatorFooter from "../BranchLocatorFooter/BranchLocatorFooter";
import MyAccountIcon from "../../../assets/icon/My-Account.png" 
import BranchLocatorIcon from "../../../assets/icon/Branch.png" 
import CustomerSupportIcon from "../../../assets/icon/Customer.png" 
import SearchIcon from "../../../assets/icon/Search.png" 

const BranchLocatorLayout = ({ children }) => {
  return (
    <div id="BG">
      <div className="branchLocatorTopBar">
        <div className="branchLocatorTopBarLinks" >
          <Grid className="leftLinks">
          <Typography className="topBarLinkOne" >
            <Link href={`${ process.env.REACT_APP_WEBSITE }/careers/`} className="hrefTag">
              Careers
            </Link>
          </Typography>
          <Typography className="topBarLinkOne" >
            <Link href="/customers/applyForLoan" className="hrefTag">
              Resume Application
            </Link>
          </Typography>
          <NavLink to="/branch-locator" className="nav_link topBarLinkThree">
            <Typography >Mail Offer?</Typography>
          </NavLink>
          </Grid>
          <Grid className="rightTopIcon">
          
            <Link href="/login" className="topRightIcons">
              <img src={ MyAccountIcon }/>
            </Link>

            <Link href="/branch-locator" className="topRightIcons">
              <img src={ BranchLocatorIcon }/>
            </Link>

            <Link target="_blank" href={`${ process.env.REACT_APP_WEBSITE }/customer-support/`} className="topRightIcons">
              <img src={ CustomerSupportIcon }/>
            </Link>

            <Link target="_blank" href={`${ process.env.REACT_APP_WEBSITE }/?s=search`} className="topRightIcons">
              <img src={ SearchIcon }/>
            </Link>
          </Grid>
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
