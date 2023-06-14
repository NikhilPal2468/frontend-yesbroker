import React, { useState, createContext } from "react";

const LoadContext = createContext();

const LoadContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  const loadingHandler = () => {
    setLoading((prev) => {
      return prev === false ? true : false;
    });
    console.log(isLoading);
  };

  return (
    <LoadContext.Provider value={{ isLoading, loadingHandler }}>
      {children}
    </LoadContext.Provider>
  );
};

export { LoadContext, LoadContextProvider };
