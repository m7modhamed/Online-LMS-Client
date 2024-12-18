import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserFromToken } from "./jwtDecode";
import { useNavigate } from "react-router-dom";

// Create AuthContext

interface AuthContextType {
  user: Record<string, any> | null;
  login: (token: string, callback?: (user: Record<string, any>) => void) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
let isAuthenticated = false;

// Provide AuthContext globally
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<null | Record<string, any>>(null);

  useEffect(() => {
    // Check for a token in localStorage and set user if valid
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = getUserFromToken();

      setUser(decodedUser);
    }
  }, []);

  // Save token and user details on login
const login = (token: string, callback?: (user: Record<string, any>) => void) => {
    localStorage.setItem("token", token);
    const user = getUserFromToken(); // Decode token to get user details
    setUser(user);

    if (callback && user) {
      callback(user);
    }
  };

  // Check if user is authenticated
  isAuthenticated = !!user;

  // Clear token and user details on logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
