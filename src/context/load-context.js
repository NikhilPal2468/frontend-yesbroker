import React, { useState, createContext } from "react";

const LoadContext = createContext({
  isLoading: false,
  setLoading: null,
});

const LoadContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadContext.Provider>
  );
};

export { LoadContext, LoadContextProvider };
