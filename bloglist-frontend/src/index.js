import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { AuthProvider } from "./AuthContext";
import { NotificationProvider } from "./NotificationContext";

const queryClient = new QueryClient();
const container = document.getElementById("root");

// Ensure container is not null
if (container) {
  const root = createRoot(container); // Use createRoot instead of ReactDOM.render

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
