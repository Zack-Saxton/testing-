import PropTypes from "prop-types";
import React, { createContext, useContext, useReducer } from "react";

const initialGlobalState = {
  profileTabNumber: 0
};
export const GlobalStateContext = createContext(initialGlobalState);
export const DispatchStateContext = createContext(undefined);

/**
 * Global State provider & hooks
 */
export const GlobalStateProvider = ({ children }) => {
  const [ state, setprofileTabNumber ] = useReducer(
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
    PropTypes.func ]),
};

export const useGlobalState = () => [
  useContext(GlobalStateContext),
  useContext(DispatchStateContext)
];