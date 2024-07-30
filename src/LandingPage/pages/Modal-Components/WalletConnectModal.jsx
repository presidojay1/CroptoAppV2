import React, { useState } from "react";
import "./WalletConnectModal.css";
import * as Images from "./TokenImages";
import { connect_wallet } from "../../../context/assets/web3-provider";
const WalletConnectModal = ({ isOpen, onClose }) => {
  const [selectedWallet, setSelectedWallet] = useState("");

  const handleWalletMetaMask = () => {
    setSelectedWallet("MetaMask");
    connect_wallet("MetaMask");
  };

  const handleWalletCoinbase = () => {
    setSelectedWallet("Coinbase");
    connect_wallet("Coinbase");
  };

  const handleWalletBinance = () => {
    setSelectedWallet("Binance Wallet");
    connect_wallet("Binance Wallet");
  };

  const handleWalletTrust = () => {
    setSelectedWallet("Trust Wallet");
    connect_wallet("Trust Wallet");
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black opacity-50 custom-modal-overlay"
          onClick={onClose}
        ></div>
        <div className="rounded-lg shadow-lg p-4 z-10 WalletConnectModal">
          <div className="modal-content">
            <div className="flex justify-between modal-head mb-5">
              <a
                href="https://ethereum.org/en/wallets/find-wallet/"
                target="_blank"
                rel="noreferrer"
                aria-label="Close"
                className="bt-left mt-3"
              >
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM11.6445 12.7051C11.6445 13.1348 11.3223 13.4678 10.7744 13.4678C10.2266 13.4678 9.92578 13.1885 9.92578 12.6191V12.4795C9.92578 11.4268 10.4951 10.8574 11.2686 10.3203C12.2031 9.67578 12.665 9.32129 12.665 8.59082C12.665 7.76367 12.0205 7.21582 11.043 7.21582C10.3232 7.21582 9.80762 7.57031 9.45312 8.16113C9.38282 8.24242 9.32286 8.32101 9.2667 8.39461C9.04826 8.68087 8.88747 8.8916 8.40039 8.8916C8.0459 8.8916 7.66992 8.62305 7.66992 8.15039C7.66992 7.96777 7.70215 7.7959 7.75586 7.61328C8.05664 6.625 9.27051 5.75488 11.1182 5.75488C12.9336 5.75488 14.5234 6.71094 14.5234 8.50488C14.5234 9.7832 13.7822 10.417 12.7402 11.1045C11.999 11.5986 11.6445 11.9746 11.6445 12.5762V12.7051ZM11.9131 15.5625C11.9131 16.1855 11.376 16.6797 10.7529 16.6797C10.1299 16.6797 9.59277 16.1748 9.59277 15.5625C9.59277 14.9395 10.1191 14.4453 10.7529 14.4453C11.3867 14.4453 11.9131 14.9287 11.9131 15.5625Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
              <p className="modal-title">Connect wallet</p>
              <button
                onClick={onClose}
                aria-label="Close"
                className="bt-right mt-3"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 13L13 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M1 0.999999L13 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="modal-menu">
              <div className="modal-menu-first">
                <div
                  className={`modal-element ${
                    selectedWallet === "MetaMask" ? "selected" : ""
                  }`}
                  onClick={handleWalletMetaMask}
                >
                  <div className="modal-element-content">
                    <img src={Images.metamask} width="32px" alt="MetaMask" />
                    <div className="modal-element-title">
                      <div className="modal-element-title-first">MetaMask</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    id="wallet_mm"
                    name="wallet"
                    checked={selectedWallet === "MetaMask"}
                    readOnly
                  />
                </div>
                <div
                  className={`modal-element ${
                    selectedWallet === "Coinbase" ? "selected" : ""
                  }`}
                  onClick={handleWalletCoinbase}
                >
                  <div className="modal-element-content">
                    <img src={Images.coinbase} width="32px" alt="Coinbase" />
                    <div className="modal-element-title">
                      <div className="modal-element-title-first">Coinbase</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    id="wallet_cb"
                    name="wallet"
                    checked={selectedWallet === "Coinbase"}
                    readOnly
                  />
                </div>
                <div
                  className={`modal-element ${
                    selectedWallet === "Binance Wallet" ? "selected" : ""
                  }`}
                  onClick={handleWalletBinance}
                >
                  <div className="modal-element-content">
                    <img
                      src={Images.binance}
                      width="32px"
                      alt="Binance Wallet"
                    />
                    <div className="modal-element-title">
                      <div className="modal-element-title-first">Binance</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    id="wallet_bw"
                    name="wallet"
                    checked={selectedWallet === "Binance Wallet"}
                    readOnly
                  />
                </div>
                <div
                  className={`modal-element ${
                    selectedWallet === "Trust Wallet" ? "selected" : ""
                  }`}
                  onClick={handleWalletTrust}
                >
                  <div className="modal-element-content">
                    <img
                      src={Images.trustwallet}
                      width="32px"
                      alt="Trust Wallet"
                    />
                    <div className="modal-element-title">
                      <div className="modal-element-title-first">
                        Trust Wallet
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    id="wallet_tw"
                    name="wallet"
                    checked={selectedWallet === "Trust Wallet"}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletConnectModal;
