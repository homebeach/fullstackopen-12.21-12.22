// AuthContext.js
import React, { createContext, useReducer, useContext } from "react";

// Initial state
const initialState = {
  user: null,
};

// Actions
const SET_USER = "SET_USER";
const CLEAR_USER = "CLEAR_USER";

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
  case SET_USER:
    return { ...state, user: action.payload };
  case CLEAR_USER:
    return { ...state, user: null };
  default:
    return state;
  }
};

// Context
const AuthContext = createContext();

// Custom hook to use the auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setUser = (user) => {
    dispatch({ type: SET_USER, payload: user });
  };

  const clearUser = () => {
    dispatch({ type: CLEAR_USER });
  };

  const contextValue = {
    user: state.user,
    setUser,
    clearUser,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
