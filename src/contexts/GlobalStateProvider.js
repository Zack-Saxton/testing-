import React from "react";

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
    (state, newValue) => ({ ...state, ...newValue }),
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

export const useGlobalState = () => [
  React.useContext(GlobalStateContext),
  React.useContext(DispatchStateContext)
];