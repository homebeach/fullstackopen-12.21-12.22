import React, { createContext, useReducer, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const initialState = { message: null };
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const setNotification = (message) => {
    dispatch({ type: "SET_NOTIFICATION", message });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ state, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

const notificationReducer = (state, action) => {
  switch (action.type) {
  case "SET_NOTIFICATION":
    return { message: action.message };
  case "CLEAR_NOTIFICATION":
    return { message: null };
  default:
    return state;
  }
};
