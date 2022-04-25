import PropTypes from "prop-types";
import React, { createContext, useState } from 'react';
export const NavContext = createContext();

function NavigationContext(props) {
  const [ data, setData ] = useState({
    navigationMessage: '',
  });

  const resetNavContext = () => {
    setData({
      navigationMessage: '',
    });
  };

  return (
    <NavContext.Provider
      value={ {
        dataNavmessage: data,
        setData,
        resetNavContext,
      } }
    >
      { props.children }
    </NavContext.Provider>
  );
}
NavigationContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func ]),
};

export default NavigationContext;
