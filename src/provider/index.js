import React, { useState } from "react";
import { createContext } from "react";
export const ProviderContextData = createContext();
const Provider = ({ children }) => {
  const [value, setValue] = useState("usd");
  return (
    <ProviderContextData.Provider value={{ value, setValue }}>
      {children}
    </ProviderContextData.Provider>
  );
};

export default Provider;
