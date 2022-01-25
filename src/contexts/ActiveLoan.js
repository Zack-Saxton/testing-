import React, { createContext, useState } from 'react';

export const ActiveLoanAccNO = createContext();

function ActiveLoanAccNOContext(props) {
  const [data, setData] = useState({
    AccountNumber: '',
    applicationGuid: '',
    isActive: '',
  });

  return (
    <ActiveLoanAccNO.Provider value={{ data, setData }}>
      {props.children}
    </ActiveLoanAccNO.Provider>
  );
}

export default ActiveLoanAccNOContext;
