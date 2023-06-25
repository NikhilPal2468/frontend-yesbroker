import React, { useState, createContext } from "react";

const LoadContext = createContext({
  isLoading: false,
  setLoading: null,
  isReset: false,
  setReset: null,
});

const LoadContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [isReset, setReset] = useState(false);

  return (
    <LoadContext.Provider value={{ isLoading, setLoading, isReset, setReset }}>
      {children}
    </LoadContext.Provider>
  );
};

export { LoadContext, LoadContextProvider };
