import axios from "axios";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (values) => {
    const { data } = await axios.post("/public/api/login", values);
    // Perform login logic, e.g., make an API call and set the authentication state
    setIsLoggedIn(true);
    return data;
  };

  const register = async (values) => {
    const { data } = await axios.post("/public/api/register", values);
    // Perform logout logic, e.g., clear authentication tokens and set the authentication state
    setIsLoggedIn(true);
    return data;
  };

  const logout = () => {
    // Perform logout logic, e.g., clear authentication tokens and set the authentication state
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        register,
        showLogin,
        setShowLogin,
        showRegister,
        setShowRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
