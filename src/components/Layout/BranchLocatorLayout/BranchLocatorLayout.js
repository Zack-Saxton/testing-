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
            <NavLink to="/select-amount" className="nav_link topBarLinkThree">
            <Typography >Mail Offer?</Typography>
          </NavLink>
          </Grid>
          <Grid className="rightTopIcon">
          
            <Link href="/login" aria-label='myAccountIcon' className="topRightIcons">
              {MyAccountIcon ? <img width="60px" height="40px" alt="My Account" src={ MyAccountIcon }/> : ''}
            </Link>

            <Link href="/branch-locator" aria-label = "branchLocatorIcon" className="topRightIcons">
              {BranchLocatorIcon ? <img width="60px" height="40px" alt="Branch Locator" src={ BranchLocatorIcon }/> : ''}
            </Link>

            <Link href={`${ process.env.REACT_APP_WEBSITE }/customer-support/`} aria-label = 'customerSupportIcon' className="topRightIcons">
              {CustomerSupportIcon ? <img width="72px" height="40px" alt="Customer Support" src={ CustomerSupportIcon }/> : ''}
            </Link>

            <Link href={`${ process.env.REACT_APP_WEBSITE }/?s=search`} aria-label = 'searchIcon' className="topRightIcons">
              {SearchIcon ? <img width="30px" height="40px" alt="Search" src={ SearchIcon }/> : ''}
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
