import React from "react";
import PropTypes from "prop-types";

const initialGlobalState = {
  profileTabNumber: 0
};
export const GlobalStateContext = React.createContext(initialGlobalState);
export const DispatchStateContext = React.createContext(undefined);

/**
 * Global State provider & hooks
 */
export const GlobalStateProvider = ({ children }) => {
  const [ state, setprofileTabNumber ] = React.useReducer(
    (newState, newValue) => ({ ...newState, ...newValue }),
    initialGlobalState
  );
  return (
    <GlobalStateContext.Provider value={ state }>
      <DispatchStateContext.Provider value={ setprofileTabNumber }>
        { children }
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  );
};
GlobalStateProvider.propTypes = {
  children: PropTypes.oneOfType([ 
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node, 
    PropTypes.func]),
}

export const useGlobalState = () => [
  React.useContext(GlobalStateContext),
  React.useContext(DispatchStateContext)
];