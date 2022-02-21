import React from "react";
import BranchLocatorFooter from "../BranchLocatorFooter/BranchLocatorFooter";
import NormalHeader from "../NormalHeader/NormalHeader";

const BranchHeaderLayout = ({ children }) => {
  return (
    <div id="BG">
      <div className="topBar"></div>
      <NormalHeader />
      { children }
      <BranchLocatorFooter />
    </div>
  );
};

export default BranchHeaderLayout;
