import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { StoreProvider } from "./app/store";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <StoreProvider>
        <App />
      </StoreProvider>
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
}
