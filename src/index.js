import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CryptoProvider } from "./context/CryptoContext";
import { TrendingProvider } from "./context/TrendingContext";
import { StorageProvider } from "./context/StorageContext";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  polygon,
  bsc,
  arbitrum,
  optimism,
  fantom,
  avalanche,
  mainnet,
} from "wagmi/chains";

// 0. Setup queryClient
const queryClient = new QueryClient();

const chains = [mainnet, polygon, bsc, arbitrum, optimism, fantom, avalanche];

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = "74c8786c3a735af466f2a6a82669d85b";
const metadata = {
  name: "Web3 Dapp",
  description: "Defi Dapp",
  url: "https://defi.finance",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

export const Web3Modal = createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "dark",
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    "8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4",
    "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
    "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
  ],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <CryptoProvider>
          <TrendingProvider>
            <StorageProvider>
              <App />
            </StorageProvider>
          </TrendingProvider>
        </CryptoProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
