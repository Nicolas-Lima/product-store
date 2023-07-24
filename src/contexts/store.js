import { createContext, useState } from "react";

const StoreContext = createContext({});

function StoreProvider({ children }) {
  const contextValue = {};
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
export { StoreContext };
