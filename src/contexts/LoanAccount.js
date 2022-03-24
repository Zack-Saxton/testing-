import React, { createContext, useState } from 'react';
import PropTypes from "prop-types";

export const LoanAccount = createContext();

function LoanAccountContext(props){
  const [selectedLoanAccount, setSelectedLoanAccount] = useState();

  return(
    <LoanAccount.Provider value={{selectedLoanAccount, setSelectedLoanAccount}}>
      {props.children}
    </LoanAccount.Provider>
  )
}
LoanAccountContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func ]),
};

export default LoanAccountContext;