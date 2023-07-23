import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({})

function AuthProvider({ children }) {
  const contextValue = {};
  return (
    <AuthProvider.Provider value={contextValue}>
      {children}
    </AuthProvider.Provider>
  );
}

export default AuthProvider
export {AuthContext}
