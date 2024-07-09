import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CollectionContextProvider } from "./context/CollectionContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CollectionContextProvider>
        <App />
      </CollectionContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
