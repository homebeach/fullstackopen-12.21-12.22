import React, { useEffect } from "react";
import { useNotification } from "../NotificationContext";

const Notification = () => {
  const { state } = useNotification();
  const { message } = state;

  useEffect(() => {
    if (message !== null) {
      setTimeout(() => {
        // Clear notification after 5 seconds
        // You can dispatch an action to clear it from the context here if needed
      }, 5000);
    }
  }, [message]);

  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
