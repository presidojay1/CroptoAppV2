import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CryptoProvider } from "./Components/context/CryptoContext";
import { TrendingProvider } from "./Components/context/TrendingContext";
import { StorageProvider } from "./Components/context/StorageContext";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CryptoProvider>
      <TrendingProvider>
        <StorageProvider>
          <App />
        </StorageProvider>
      </TrendingProvider>
    </CryptoProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
