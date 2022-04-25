import Cookies from 'js-cookie';
import PropTypes from "prop-types";
import React, { createContext, useState } from 'react';

export const LoanAccount = createContext();

function LoanAccountContext(props) {
  const [ selectedLoanAccount, setSelectedLoanAccount ] = useState();

  const resetLoanAccount = () => {
    const loginToken = JSON.parse(
      Cookies.get('token') ? Cookies.get('token') : '{ }'
    );
    if (!loginToken?.isLoggedIn) {
      // clear data
      setSelectedLoanAccount('');
    }
  }

  return (
    <LoanAccount.Provider value={{ selectedLoanAccount, setSelectedLoanAccount, resetLoanAccount }}>
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