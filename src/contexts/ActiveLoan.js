import React, { createContext, useState } from 'react';
import PropTypes from "prop-types";

export const ActiveLoanAccNO = createContext();

function ActiveLoanAccNOContext(props) {
  const [ data, setData ] = useState({
    AccountNumber: '',
    applicationGuid: '',
    isActive: '',
  });

  return (
    <ActiveLoanAccNO.Provider value={ { data, setData } }>
      { props.children }
    </ActiveLoanAccNO.Provider>
  );
}

ActiveLoanAccNOContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]),
};

export default ActiveLoanAccNOContext;
