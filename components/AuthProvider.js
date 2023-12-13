"use client";

import React, { createContext, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, login, logout } = useAuth();
  const [authUser, setAuthUser] = useState(user);

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
