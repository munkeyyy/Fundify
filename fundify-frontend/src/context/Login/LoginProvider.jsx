import React, { useState } from "react";
import { LoginContext } from "./LoginContext";

const LoginProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
